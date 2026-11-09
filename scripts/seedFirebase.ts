#!/usr/bin/env tsx
/**
 * Valida ou publica, de forma insert-only, catálogos curriculares globais.
 * Por padrão este script executa apenas dry-run. Escrita exige --apply.
 * Dados legados eventualmente existentes não são removidos ou substituídos;
 * cleanup de produção requer migração aprovada separadamente.
 */
import 'dotenv/config';
import { initializeFirebaseAdmin, getDb } from '../server/config/firebaseAdmin';
import { executeSeed, CatalogEntity } from '../server/services/seedService';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const verify = args.includes('--verify');
const entities: CatalogEntity[] = ['trails', 'missions', 'abilities', 'cards', 'achievements', 'rewards'];
const entityArgs = args.filter((arg) => arg.startsWith('--entity=')).map((arg) => arg.slice('--entity='.length));
const invalid = entityArgs.filter((entity) => !entities.includes(entity as CatalogEntity));

async function main(): Promise<void> {
  if (invalid.length) throw new Error(`Coleção não permitida: ${invalid.join(', ')}`);
  const selected = (entityArgs.length ? entityArgs : entities) as CatalogEntity[];
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || '';
  const emulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_EMULATOR_HUB);

  if (verify) {
    if (!emulator && process.env.ACKNOWLEDGE_FIREBASE_PRODUCTION_WRITE !== projectId) {
      throw new Error('Verificação fora do emulator requer ACKNOWLEDGE_FIREBASE_PRODUCTION_WRITE igual ao project ID.');
    }
    if (!projectId) throw new Error('FIREBASE_PROJECT_ID/GCLOUD_PROJECT ausente.');
    initializeFirebaseAdmin();
    const db = getDb();
    console.log(`Coleções consultadas no projeto ${projectId}: ${selected.join(', ')}`);
    for (const collection of selected) {
      const snapshot = await db.collection(collection).count().get();
      console.log(`${collection}: ${snapshot.data().count} documentos`);
    }
    return;
  }

  if (!apply) {
    console.log('Modo: DRY-RUN (padrão; nenhuma conexão ou escrita no Firebase).');
    console.log(`Catálogos validados: ${selected.join(', ')}`);
    const progress = await executeSeed({ entities: selected, dryRun: true });
    for (const item of progress) {
      console.log(`${item.entity}: ${item.created} itens válidos; ${item.errors} erros`);
      item.errorMessages.forEach((message) => console.error(`  ${message}`));
    }
    if (progress.some((item) => item.errors > 0)) process.exitCode = 1;
    console.log('Para gravar explicitamente, use --apply. Documentos existentes serão mantidos; não há cleanup automático.');
    return;
  }

  if (!projectId) throw new Error('Escrita abortada: FIREBASE_PROJECT_ID/GCLOUD_PROJECT ausente.');
  if (!emulator && process.env.ACKNOWLEDGE_FIREBASE_PRODUCTION_WRITE !== projectId) {
    throw new Error('Escrita abortada: fora do emulator defina ACKNOWLEDGE_FIREBASE_PRODUCTION_WRITE exatamente igual ao project ID.');
  }

  // Exibe escopo/projeto antes de inicializar o cliente ou iniciar qualquer escrita.
  console.log(`Coleções que podem receber novos documentos: ${selected.join(', ')}`);
  console.log(`Projeto Firebase: ${projectId}${emulator ? ' (emulator)' : ' (fora do emulator)'}`);
  console.log('Modo: APPLY insert-only; documentos existentes não serão alterados nem removidos.');
  initializeFirebaseAdmin();
  const progress = await executeSeed({ entities: selected, mode: 'insert', dryRun: false });
  for (const item of progress) {
    console.log(`${item.entity}: ${item.created} criados, ${item.updated} existentes preservados, ${item.errors} erros`);
    item.errorMessages.forEach((message) => console.error(`  ${message}`));
  }
  if (progress.some((item) => item.errors > 0)) process.exitCode = 1;
  console.log('Dados já criados por seeds antigos não foram removidos ou substituídos. Cleanup de produção exige migração aprovada.');
}

main().catch((error) => {
  console.error(`Seed abortado: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

#!/usr/bin/env tsx
/**
 * scripts/seedFirebase.ts
 * 
 * Script de migração CLI para popular o Firestore com os dados mockados.
 * 
 * Uso:
 *   npm run firebase:seed:dry   — valida sem gravar
 *   npm run firebase:seed       — executa migração completa
 *   npm run firebase:verify     — verifica contagem de documentos
 * 
 * Flags:
 *   --dry-run    Apenas valida, sem gravar no Firestore
 *   --verify     Apenas conta documentos existentes
 *   --entity=X   Migra apenas entidade específica (pode repetir)
 * 
 * Segurança:
 *   Fora do ambiente de desenvolvimento, exige confirmação explícita
 *   digitando o nome do projeto antes de executar.
 */

import 'dotenv/config';
import * as readline from 'readline';
import { initializeFirebaseAdmin, getDb } from '../server/config/firebaseAdmin';
import {
  executeSeed,
  createMigrationRun,
} from '../server/services/seedService';
import { SeedableEntity } from '../server/types/server';

// ─── Parse de argumentos ──────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerify = args.includes('--verify');
const entityArgs = args
  .filter((a) => a.startsWith('--entity='))
  .map((a) => a.replace('--entity=', '') as SeedableEntity);

const ALL_ENTITIES: SeedableEntity[] = [
  'schools', 'users', 'classrooms', 'students', 'abilities', 'trails',
  'missions', 'studentMissions', 'cards', 'achievements', 'interventions',
  'diagnostics', 'rewards', 'recognitionEvents', 'historyLogs',
];

const entitiesToSeed = entityArgs.length > 0 ? entityArgs : ALL_ENTITIES;

// ─── Confirmação interativa ───────────────────────────────────────────────────

async function askConfirmation(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ─── Verificação de documentos ────────────────────────────────────────────────

async function verifyCollections(): Promise<void> {
  const db = getDb();
  const collections = [
    'schools', 'users', 'classrooms', 'students', 'abilities',
    'studentAbilities', 'trails', 'missions', 'studentMissions',
    'cards', 'studentCards', 'achievements', 'studentAchievements',
    'interventions', 'diagnostics', 'rewards', 'recognitionEvents', 'historyLogs',
  ];

  console.log('\n📊 Verificando coleções no Firestore:\n');
  let total = 0;

  for (const col of collections) {
    const snap = await db.collection(col).count().get();
    const count = snap.data().count;
    total += count;
    const indicator = count > 0 ? '✅' : '⭕';
    console.log(`   ${indicator} ${col.padEnd(25)} ${count} documentos`);
  }

  console.log(`\n   Total: ${total} documentos\n`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║    Sala de Missões — Firebase Seed Script    ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // Inicializa Firebase
  try {
    initializeFirebaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ Falha ao inicializar Firebase:', message);
    console.error('\nVerifique as variáveis de ambiente no .env:');
    console.error('  FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY\n');
    process.exit(1);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || 'desconhecido';
  const nodeEnv = process.env.NODE_ENV || 'development';

  console.log(`📌 Projeto Firebase: ${projectId}`);
  console.log(`🌍 Ambiente: ${nodeEnv}`);
  console.log(`📝 Modo: ${isDryRun ? '🔍 DRY-RUN (sem gravar)' : isVerify ? '📊 VERIFICAÇÃO' : '✍️  LIVE'}\n`);

  // Modo de verificação
  if (isVerify) {
    await verifyCollections();
    process.exit(0);
  }

  // Confirmação obrigatória fora de desenvolvimento
  if (!isDryRun && nodeEnv !== 'development') {
    console.warn('⚠️  ATENÇÃO: Você está executando o seed em ambiente de PRODUÇÃO!');
    console.warn('   Esta operação vai MODIFICAR dados no Firebase real.\n');

    const answer = await askConfirmation(
      `   Digite o nome do projeto (${projectId}) para confirmar: `
    );

    if (answer !== projectId) {
      console.log('\n❌ Confirmação incorreta. Operação cancelada.\n');
      process.exit(1);
    }

    console.log('\n✅ Confirmação aceita. Iniciando migração...\n');
  }

  // Exibe entidades que serão migradas
  console.log('📦 Entidades a migrar:');
  entitiesToSeed.forEach((e) => console.log(`   - ${e}`));
  console.log('');

  const requestId = `seed-cli-${new Date().toISOString().replace(/[:.]/g, '-')}`;

  try {
    // Cria o migration run (apenas em modo live)
    let runId = 'dry-run';
    if (!isDryRun) {
      runId = await createMigrationRun({
        requestId,
        source: 'mock',
        entities: entitiesToSeed,
        mode: 'upsert',
        dryRun: false,
        createdBy: 'cli-script',
      });
      console.log(`📋 Migration Run ID: ${runId}\n`);
    }

    // Executa seed
    const progress = await executeSeed({
      entities: entitiesToSeed,
      mode: 'upsert',
      dryRun: isDryRun,
      requestId,
      runId,
    });

    // Resultado final
    console.log('\n═══════════════════════════════════════════════');
    console.log('RESULTADO FINAL');
    console.log('═══════════════════════════════════════════════');

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalErrors = 0;

    for (const p of progress) {
      totalCreated += p.created;
      totalUpdated += p.updated;
      totalErrors += p.errors;

      const status = p.errors > 0 ? '⚠️ ' : '✅';
      console.log(`${status} ${p.entity.padEnd(22)} criados: ${p.created}, atualizados: ${p.updated}, erros: ${p.errors}`);

      if (p.errorMessages.length > 0) {
        p.errorMessages.forEach((msg) => console.error(`   └── ${msg}`));
      }
    }

    console.log('───────────────────────────────────────────────');
    console.log(`   Total: ${totalCreated + totalUpdated} documentos processados (${totalErrors} erros)`);
    console.log('═══════════════════════════════════════════════\n');

    if (isDryRun) {
      console.log('✅ Dry-run concluído. Nenhum dado foi gravado.');
      console.log('   Para executar de verdade: npm run firebase:seed\n');
    } else {
      console.log('✅ Migração concluída!');
      console.log(`   Execute "npm run firebase:verify" para confirmar os dados.\n`);
    }

    process.exit(totalErrors > 0 ? 1 : 0);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('\n❌ Erro fatal durante a migração:', message);
    process.exit(1);
  }
}

main();

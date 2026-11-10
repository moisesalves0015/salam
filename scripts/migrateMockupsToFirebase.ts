#!/usr/bin/env tsx
/**
 * scripts/migrateMockupsToFirebase.ts
 *
 * Ferramenta CLI de Migração Integral e Idempotente de todos os Mockups para o Firebase.
 *
 * Uso:
 *   npm run firebase:migrate              — executa migração idempotente (preserva existentes)
 *   npm run firebase:migrate -- --upsert  — executa migração atualizando campos com merge
 *   npm run firebase:migrate -- --dry-run — valida e contabiliza todos os mockups sem gravar
 */

import 'dotenv/config';
import {
  runMockupMigrationToFirestore,
  ALL_MOCKUP_COLLECTIONS,
  type MigrationReport,
} from '../src/services/firebaseMigrationService';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isUpsert = args.includes('--upsert');

function printReport(report: MigrationReport) {
  console.log('\n╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║        RELATÓRIO DE MIGRAÇÃO DE MOCKUPS PARA FIREBASE (salam-33122)      ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log(`  Run ID:              ${report.runId}`);
  console.log(`  Data/Hora:           ${report.timestamp}`);
  console.log(`  Projeto Firebase:    ${report.projectId}`);
  console.log(`  Modo de Execução:    ${report.mode}`);
  console.log(`  Conexão Firebase:    ${report.firebaseConnected ? 'CONECTADO' : 'OFFLINE'}`);
  console.log('────────────────────────────────────────────────────────────────────────────');
  console.log(
    `  ${'Coleção'.padEnd(22)} | ${'Identif.'.padStart(8)} | ${'Import.'.padStart(8)} | ${'Atualiz.'.padStart(8)} | ${'Ignor.'.padStart(8)} | ${'Erros'.padStart(6)}`,
  );
  console.log('────────────────────────────────────────────────────────────────────────────');

  for (const e of report.entities) {
    console.log(
      `  ${e.collection.padEnd(22)} | ${String(e.identified).padStart(8)} | ${String(e.imported).padStart(8)} | ${String(e.updated).padStart(8)} | ${String(e.ignored).padStart(8)} | ${String(e.errors).padStart(6)}`,
    );
    for (const msg of e.errorMessages) {
      console.log(`     ↳ ⚠️  ${msg}`);
    }
  }

  console.log('────────────────────────────────────────────────────────────────────────────');
  console.log(`  TOTAL IDENTIFICADOS: ${report.totalIdentified}`);
  console.log(`  TOTAL IMPORTADOS:    ${report.totalImported}`);
  console.log(`  TOTAL ATUALIZADOS:   ${report.totalUpdated}`);
  console.log(`  TOTAL IGNORADOS:     ${report.totalIgnored}`);
  console.log(`  TOTAL DE ERROS:      ${report.totalErrors}`);
  console.log(`  COLEÇÕES UTILIZADAS (${report.collectionsUsed.length}): ${report.collectionsUsed.join(', ')}`);

  if (report.manualInterventionNeeded.length > 0) {
    console.log('\n  ⚠️  ITENS QUE REQUEREM INTERVENÇÃO MANUAL:');
    for (const item of report.manualInterventionNeeded) {
      console.log(`     - ${item}`);
    }
  } else {
    console.log('\n  ✅ Nenhuma intervenção manual necessária nos dados migrados.');
  }
  console.log('════════════════════════════════════════════════════════════════════════════\n');
}

async function main() {
  const mode = isDryRun ? 'dry-run' : isUpsert ? 'idempotent-upsert' : 'idempotent-preserve';
  console.log(`[Migração] Iniciando varredura de ${ALL_MOCKUP_COLLECTIONS.length} coleções de mockups (modo: ${mode})...`);

  const report = await runMockupMigrationToFirestore({ mode });
  printReport(report);

  // Se houve erro de permissão nas regras remotas do Firestore, executa dry-run para exibir o inventário validado
  if (report.totalErrors > 0 && !isDryRun) {
    console.log('[Migração] Executando validação estrutural completa (Dry-Run) de todos os registros identificados:');
    const dryReport = await runMockupMigrationToFirestore({ mode: 'dry-run' });
    printReport(dryReport);
  }
  process.exit(report.totalErrors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[Migração] Erro inesperado:', err);
  process.exitCode = 1;
});


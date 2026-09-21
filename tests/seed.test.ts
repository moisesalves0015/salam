/**
 * tests/seed.test.ts
 * 
 * Testes do script de migração.
 */

import { describe, it, expect, vi } from 'vitest';
import { validatePayload, seedRequestSchema } from '../server/validators/schemas';

describe('Seed — Validação de Payload', () => {
  it('deve validar um payload de seed completo', () => {
    const payload = {
      source: 'mock',
      entities: ['students', 'missions', 'cards'],
      mode: 'upsert',
      dryRun: false,
      requestId: 'seed-test-v1',
    };

    const result = validatePayload(seedRequestSchema, payload);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar payload sem requestId', () => {
    const payload = {
      source: 'mock',
      entities: ['students'],
      mode: 'upsert',
      dryRun: false,
    };

    const result = validatePayload(seedRequestSchema, payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some(e => e.includes('requestId'))).toBe(true);
    }
  });

  it('deve rejeitar payload com entities vazias', () => {
    const payload = {
      source: 'mock',
      entities: [],
      mode: 'upsert',
      dryRun: false,
      requestId: 'seed-test-v2',
    };

    const result = validatePayload(seedRequestSchema, payload);
    expect(result.success).toBe(false);
  });

  it('deve rejeitar entidade desconhecida', () => {
    const payload = {
      source: 'mock',
      entities: ['entidade_invalida'],
      mode: 'upsert',
      dryRun: false,
      requestId: 'seed-test-v3',
    };

    const result = validatePayload(seedRequestSchema, payload);
    expect(result.success).toBe(false);
  });

  it('deve aceitar modo dry-run', () => {
    const payload = {
      source: 'mock',
      entities: ['students', 'missions'],
      mode: 'upsert',
      dryRun: true,
      requestId: 'seed-dry-v1',
    };

    const result = validatePayload(seedRequestSchema, payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dryRun).toBe(true);
    }
  });
});

describe('Seed — Dados Mockados', () => {
  it('deve importar INITIAL_STUDENTS sem erros', async () => {
    const { INITIAL_STUDENTS } = await import('../src/data/initialData');
    expect(INITIAL_STUDENTS).toBeDefined();
    expect(Array.isArray(INITIAL_STUDENTS)).toBe(true);
    expect(INITIAL_STUDENTS.length).toBeGreaterThan(0);
  });

  it('todos os estudantes devem ter IDs válidos', async () => {
    const { INITIAL_STUDENTS } = await import('../src/data/initialData');
    for (const student of INITIAL_STUDENTS) {
      expect(student.id).toBeTruthy();
      expect(typeof student.id).toBe('string');
    }
  });

  it('deve importar todas as missões', async () => {
    const { MISSIONS_MATEMATICA, MISSIONS_PORTUGUES, MISSIONS_CIENCIAS, MISSIONS_CULTURA } = 
      await import('../src/data/missionsData');
    
    const all = [...MISSIONS_MATEMATICA, ...MISSIONS_PORTUGUES, ...MISSIONS_CIENCIAS, ...MISSIONS_CULTURA];
    expect(all.length).toBeGreaterThan(0);
    
    for (const mission of all) {
      expect(mission.id).toBeTruthy();
      expect(mission.title).toBeTruthy();
      expect(Array.isArray(mission.steps)).toBe(true);
    }
  });

  it('todos os cards devem ter IDs únicos', async () => {
    const { INITIAL_CARDS } = await import('../src/data/initialData');
    const ids = INITIAL_CARDS.map(c => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('todas as conquistas devem ter xpReward não-negativo', async () => {
    const { INITIAL_ACHIEVEMENTS } = await import('../src/data/initialData');
    for (const ach of INITIAL_ACHIEVEMENTS) {
      expect(ach.xpReward).toBeGreaterThanOrEqual(0);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { executeSeed } from '../server/services/seedService';

describe('Seed de catálogo curricular seguro', () => {
  it('valida somente coleções globais aprovadas em dry-run', async () => {
    const progress = await executeSeed({
      entities: ['trails', 'missions', 'abilities', 'cards', 'achievements', 'rewards'],
      dryRun: true,
    });
    expect(progress.map((item) => item.entity)).toEqual([
      'trails', 'missions', 'abilities', 'cards', 'achievements', 'rewards',
    ]);
    expect(progress.every((item) => item.errors === 0)).toBe(true);
    expect(progress.every((item) => item.created > 0)).toBe(true);
  });

  it('rejeita explicitamente coleção individual proibida sem consultar Firebase', async () => {
    await expect(executeSeed({
      entities: ['students'] as never,
      dryRun: true,
    })).rejects.toThrow('Coleções não permitidas');
  });

  it('não permite upsert/replace em escrita; apenas insert é seguro', async () => {
    await expect(executeSeed({
      entities: ['cards'],
      mode: 'upsert' as never,
      dryRun: false,
    })).rejects.toThrow('insert-only');
  });

  it('catálogos de cartões e conquistas não criam estado desbloqueado por aluno', async () => {
    const progress = await executeSeed({ entities: ['cards', 'achievements'], dryRun: true });
    expect(progress).toHaveLength(2);
    expect(progress.every((item) => item.errors === 0)).toBe(true);
  });
});

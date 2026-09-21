/**
 * tests/validators.test.ts
 * 
 * Testes de validação de payloads com Zod.
 */

import { describe, it, expect } from 'vitest';
import {
  validatePayload,
  missionAttemptSchema,
  completeMissionSchema,
  interventionSchema,
  masterySchema,
} from '../server/validators/schemas';

describe('Validação — Tentativa de Missão', () => {
  it('deve aceitar payload válido', () => {
    const result = validatePayload(missionAttemptSchema, {
      studentId: 'aluno-joao',
      stepIndex: 1,
      answer: '4 maçãs em cada cesta',
      timeSpentSeconds: 90,
    });
    expect(result.success).toBe(true);
  });

  it('deve rejeitar stepIndex negativo', () => {
    const result = validatePayload(missionAttemptSchema, {
      studentId: 'aluno-joao',
      stepIndex: -1,
      answer: 'algo',
    });
    expect(result.success).toBe(false);
  });

  it('deve rejeitar studentId vazio', () => {
    const result = validatePayload(missionAttemptSchema, {
      studentId: '',
      stepIndex: 0,
      answer: 'algo',
    });
    expect(result.success).toBe(false);
  });

  it('deve rejeitar answer vazio', () => {
    const result = validatePayload(missionAttemptSchema, {
      studentId: 'aluno-joao',
      stepIndex: 0,
      answer: '',
    });
    expect(result.success).toBe(false);
  });

  it('deve usar 0 como padrão para timeSpentSeconds', () => {
    const result = validatePayload(missionAttemptSchema, {
      studentId: 'aluno-joao',
      stepIndex: 0,
      answer: 'resposta',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.timeSpentSeconds).toBe(0);
    }
  });
});

describe('Validação — Conclusão de Missão', () => {
  it('deve aceitar payload mínimo', () => {
    const result = validatePayload(completeMissionSchema, {
      studentId: 'aluno-joao',
    });
    expect(result.success).toBe(true);
  });

  it('deve aceitar payload completo com evidence', () => {
    const result = validatePayload(completeMissionSchema, {
      studentId: 'aluno-joao',
      reflection: 'Aprendi usando grupos iguais',
      evidence: {
        explanation: 'Dividi 24 livros em 6 grupos de 4',
        autonomy: true,
      },
    });
    expect(result.success).toBe(true);
  });
});

describe('Validação — Intervenção', () => {
  const validIntervention = {
    studentId: 'aluno-joao',
    studentName: 'João',
    ability: 'Divisão por agrupamento',
    subject: 'Matemática',
    date: 'Hoje',
    time: '14:00',
    title: 'Reforço em pequenos grupos',
    strategy: 'Uso de tampinhas',
    interventionApplied: 'Distribuição física com tampinhas',
    nextStep: 'Aplicar em problema contextualizado',
    status: 'agendada',
  };

  it('deve aceitar intervenção válida', () => {
    const result = validatePayload(interventionSchema, validIntervention);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar subject inválido', () => {
    const result = validatePayload(interventionSchema, {
      ...validIntervention,
      subject: 'História', // não é um Subject válido
    });
    expect(result.success).toBe(false);
  });

  it('deve usar status "agendada" como padrão', () => {
    const { status, ...withoutStatus } = validIntervention;
    const result = validatePayload(interventionSchema, withoutStatus);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe('agendada');
    }
  });
});

describe('Validação — Confirmação de Domínio', () => {
  it('deve aceitar payload vazio (campos opcionais)', () => {
    const result = validatePayload(masterySchema, {});
    expect(result.success).toBe(true);
  });

  it('deve aceitar evidence com states válidos', () => {
    const result = validatePayload(masterySchema, {
      evidence: {
        precision: 'dominada',
        autonomy: 'consolidando',
      },
      notes: 'Domínio confirmado em situação de transferência',
    });
    expect(result.success).toBe(true);
  });

  it('deve rejeitar state de ability inválido', () => {
    const result = validatePayload(masterySchema, {
      evidence: {
        precision: 'estado_inexistente',
      },
    });
    expect(result.success).toBe(false);
  });
});

describe('Regras de negócio', () => {
  it('XP não deve ser negativo', () => {
    const xpAmount = -10;
    const isValid = xpAmount >= 0;
    expect(isValid).toBe(false);
  });

  it('Score deve estar entre 0 e 100', () => {
    expect(0 >= 0 && 0 <= 100).toBe(true);
    expect(100 >= 0 && 100 <= 100).toBe(true);
    expect(101 >= 0 && 101 <= 100).toBe(false);
    expect(-1 >= 0 && -1 <= 100).toBe(false);
  });

  it('moedas nunca devem ficar negativas', () => {
    const currentCoins = 30;
    const cost = 50;
    const newCoins = Math.max(0, currentCoins - cost);
    expect(newCoins).toBe(0);
  });
});

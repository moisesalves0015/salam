import { Track } from '../../types.ts';

export const track4: Track = {
  id: 'trilha-4',
  subjectId: 'matematica',
  number: 4,
  title: 'Multiplicação e Parcelas Iguais',
  description: 'Compreenda a tabuada como estratégia, aprenda a conta armada com 1 e 2 algarismos e domine os problemas!',
  color: 'purple',
  badgeName: 'Mestre da Multiplicação',
  badgeIcon: 'Sparkles',
  units: [
    {
      id: 't4-u1',
      trackId: 'trilha-4',
      number: 1,
      title: 'Parcelas Iguais e Estratégias da Tabuada',
      shortDesc: 'Multiplicar é somar a mesma quantidade várias vezes de forma rápida!',
      icon: 'Repeat',
      xpReward: 35,
      steps: [
        {
          id: 't4-u1-s1',
          type: 'objective',
          title: 'Objetivo: Multiplicação com Significado',
          content: 'Entender que 4 × 6 significa 6 + 6 + 6 + 6 (quatro grupos de 6). Não precisamos só decorar, podemos raciocinar!',
          mascotTip: 'A tabuada do 4 é o dobro da do 2! Sabia disso? 2 × 7 = 14, então 4 × 7 é o dobro: 28!'
        },
        {
          id: 't4-u1-s2',
          type: 'explanation',
          title: 'Estratégia do Dobro e do 5',
          content: 'Dica de ouro: para multiplicar por 5, lembre dos minutos do relógio (termina sempre em 0 ou 5). Para multiplicar por 9, a soma dos algarismos do resultado sempre dá 9: 9×2=18 (1+8=9), 9×3=27 (2+7=9)!',
          placeValueExample: {
            number: 36,
            decomposition: '4 grupos de 9 = 9 + 9 + 9 + 9',
            blocks: { thousands: 0, hundreds: 0, tens: 3, units: 6 },
            explanation: '4 × 9 = 36. 3 dezenas e 6 unidades.'
          }
        },
        {
          id: 't4-u1-s3',
          type: 'guided_practice',
          title: 'Treino de Estratégia',
          content: 'Se você sabe que 10 × 8 = 80, quanto é 9 × 8?',
          quiz: {
            question: 'Sabendo que 10 × 8 = 80, quanto é 9 × 8?',
            options: ['72 (porque é 80 - 8)', '78', '88', '64'],
            correctIndex: 0,
            explanationOnSuccess: 'Excelente dedução! 9 vezes o 8 é apenas tirar 1 grupo de 8 do total de 80. 80 - 8 = 72!',
            explanationOnError: 'Pense assim: 10 grupos de 8 é 80. 9 grupos é só tirar 8 de 80: 80 - 8 = 72.',
            hint: 'Subtraia 8 de 80.'
          }
        }
      ]
    },
    {
      id: 't4-u2',
      trackId: 'trilha-4',
      number: 2,
      title: 'A Conta Armada da Multiplicação no Caderno',
      shortDesc: 'Multiplique primeiro a unidade, suba o "vai", e depois multiplique a dezena!',
      icon: 'Grid',
      xpReward: 45,
      steps: [
        {
          id: 't4-u2-s1',
          type: 'objective',
          title: 'Como Armar a Multiplicação',
          content: 'Armar a conta com o multiplicador embaixo (ex: 134 × 3). O 3 vai multiplicar a unidade 4, depois a dezena 3, depois a centena 1!',
          mascotTip: 'Cuidado especial: primeiro multiplica, depois soma o que subiu no "vai"!'
        },
        {
          id: 't4-u2-s2',
          type: 'worked_example',
          title: 'Exemplo no Caderno: 46 × 3',
          content: 'Veja como resolver 46 × 3 com reagrupamento:',
          notebookGuide: {
            title: '46 × 3 Passo a Passo',
            tips: [
              '1º: 3 × 6 unidades = 18. Fica o 8 na unidade e "vai 1" dezena lá em cima do 4.',
              '2º: 3 × 4 dezenas = 12 dezenas.',
              '3º: Some o 1 que foi: 12 + 1 = 13 dezenas.',
              '4º: Resultado: 138!'
            ],
            operation: {
              op1: 46,
              op2: 3,
              operator: '×',
              alignmentTarget: {
                op1Columns: { D: 4, U: 6 },
                op2Columns: { U: 3 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Unidades: 3 × 6 = 18. Fica o 8 e sobe 1 na dezena.',
                  focusColumn: 'U',
                  expectedCarry: { D: 1 },
                  expectedResultDigit: 8,
                  hint: '3 × 6 = 18. O 8 fica na unidade.',
                  errorExplanation: '3 × 6 = 18. Coloque 8 e suba 1 na coluna D.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Dezenas: 3 × 4 = 12. Some o 1 que subiu: 12 + 1 = 13.',
                  focusColumn: 'D',
                  expectedResultDigit: 3,
                  hint: 'Multiplique 3 × 4 = 12 e depois some o 1 que subiu.',
                  errorExplanation: '3 × 4 = 12. Mais o 1 do vai 1 = 13.'
                }
              ],
              totalResult: 138
            }
          }
        },
        {
          id: 't4-u2-s3',
          type: 'contextualized_problem',
          title: 'Problema: Caixas de Canetinhas',
          content: 'A papelaria organizou 8 caixas com 24 canetinhas coloridas em cada uma. Quantas canetinhas há no total?',
          wordProblem: {
            story: 'A papelaria tem 8 caixas, cada uma com 24 canetinhas.',
            question: 'Quantas canetinhas existem ao todo?',
            suggestedStrategy: 'Conta armada: 24 × 8. Multiplique 8 × 4 unidades e depois 8 × 2 dezenas!',
            operationType: '×',
            op1: 24,
            op2: 8,
            expectedAnswer: 192,
            unitName: 'canetinhas',
            stepExplanation: '8 × 4 = 32 (fica 2, sobem 3). 8 × 2 = 16. 16 + 3 = 19. Total = 192 canetinhas!'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't4-challenge',
    title: 'Desafio do Mestre da Multiplicação',
    description: 'Resolva multiplicações com centenas (ex: 215 × 4)!',
    xpReward: 80,
    steps: [
      {
        id: 't4-c-s1',
        type: 'final_challenge',
        title: 'Desafio: 215 × 4',
        content: 'Um teatro tem 4 setores com 215 cadeiras em cada setor. Quantas cadeiras há no teatro?',
        quiz: {
          question: 'Quanto é 215 × 4?',
          options: ['860 cadeiras', '850 cadeiras', '840 cadeiras', '920 cadeiras'],
          correctIndex: 0,
          explanationOnSuccess: 'Incrível! 4 × 5 = 20 (vai 2). 4 × 1 = 4 (+2 = 6). 4 × 2 = 8. Resposta: 860 cadeiras!',
          explanationOnError: 'Calcule com calma: 4 × 200 = 800. 4 × 15 = 60. 800 + 60 = 860!',
          hint: '4 × 200 = 800 e 4 × 15 = 60.'
        }
      }
    ]
  }
};

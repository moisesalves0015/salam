import { Track } from '../../types.ts';

export const track3: Track = {
  id: 'trilha-3',
  subjectId: 'matematica',
  number: 3,
  title: 'Subtração e a Troca de Ordens',
  description: 'Descubra a diferença, monte a conta no caderno e aprenda a fazer empréstimos com segurança!',
  color: 'amber',
  badgeName: 'Especialista em Diferenças',
  badgeIcon: 'MinusCircle',
  units: [
    {
      id: 't3-u1',
      trackId: 'trilha-3',
      number: 1,
      title: 'Conceito e Conta Armada Simples',
      shortDesc: 'O número maior fica em cima (minuendo) e o menor embaixo (subtraendo).',
      icon: 'Columns',
      xpReward: 35,
      steps: [
        {
          id: 't3-u1-s1',
          type: 'objective',
          title: 'Objetivo: Quem Fica em Cima na Subtração?',
          content: 'Entender que na subtração do 4º ano, o número maior sempre fica na linha de cima (Minuendo) e o que vamos tirar fica embaixo (Subtraendo).',
          mascotTip: 'Você não pode tirar 5 balas se só tem 2 no bolso! Por isso, o total maior vem sempre em cima no caderno!'
        },
        {
          id: 't3-u1-s2',
          type: 'notebook_demo',
          title: 'Subtração Sem Reagrupamento: 278 - 135',
          content: 'Veja como é simples quando todos os números de cima são maiores que os de baixo:',
          notebookGuide: {
            title: '278 - 135 no Caderno',
            tips: [
              'Alinhe Centena com Centena, Dezena com Dezena, Unidade com Unidade.',
              'Unidades: 8 menos 5 = 3.',
              'Dezenas: 7 menos 3 = 4.',
              'Centenas: 2 menos 1 = 1.',
              'Resultado: 143!'
            ],
            operation: {
              op1: 278,
              op2: 135,
              operator: '-',
              alignmentTarget: {
                op1Columns: { C: 2, D: 7, U: 8 },
                op2Columns: { C: 1, D: 3, U: 5 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Unidades: 8 - 5 = ?',
                  focusColumn: 'U',
                  expectedResultDigit: 3,
                  hint: 'Tire 5 de 8.',
                  errorExplanation: '8 - 5 = 3.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Dezenas: 7 - 3 = ?',
                  focusColumn: 'D',
                  expectedResultDigit: 4,
                  hint: 'Tire 3 de 7.',
                  errorExplanation: '7 - 3 = 4.'
                },
                {
                  stepIndex: 3,
                  instruction: 'Centenas: 2 - 1 = ?',
                  focusColumn: 'C',
                  expectedResultDigit: 1,
                  hint: 'Tire 1 de 2.',
                  errorExplanation: '2 - 1 = 1.'
                }
              ],
              totalResult: 143
            }
          }
        }
      ]
    },
    {
      id: 't3-u2',
      trackId: 'trilha-3',
      number: 2,
      title: 'Subtração com Reagrupamento (Empréstimo)',
      shortDesc: 'Aprenda a trocar 1 dezena por 10 unidades quando o de cima for menor!',
      icon: 'Scissors',
      xpReward: 45,
      steps: [
        {
          id: 't3-u2-s1',
          type: 'objective',
          title: 'O Enigma: 2 não tira 7! E agora?',
          content: 'Quando o algarismo de cima for menor que o de baixo, pedimos emprestado para o vizinho da esquerda. Ele nos dá 1 dezena, que vale 10 unidades!',
          mascotTip: 'O vizinho é muito camarada! Se ele tinha 5 dezenas, risca e vira 4. E as suas 2 unidades ganham 10 e viram 12!'
        },
        {
          id: 't3-u2-s2',
          type: 'worked_example',
          title: 'Exemplo Passo a Passo: 352 - 128',
          content: 'Vamos resolver 352 - 128 com muito cuidado no caderno:',
          notebookGuide: {
            title: '352 - 128 Passo a Passo',
            tips: [
              '1º: Nas unidades, temos 2 - 8. 2 não tira 8!',
              '2º: Pedimos 1 dezena ao vizinho 5. Riscamos o 5, ele vira 4 dezenas.',
              '3º: O 2 ganha 10 e vira 12! Agora fazemos: 12 - 8 = 4.',
              '4º: Nas dezenas, o 5 virou 4: 4 - 2 = 2.',
              '5º: Nas centenas: 3 - 1 = 2. Resposta: 224!'
            ],
            operation: {
              op1: 352,
              op2: 128,
              operator: '-',
              alignmentTarget: {
                op1Columns: { C: 3, D: 5, U: 2 },
                op2Columns: { C: 1, D: 2, U: 8 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Unidades: 2 não tira 8. Risque o 5 da dezena (vira 4) e transforme o 2 em 12. Quanto é 12 - 8?',
                  focusColumn: 'U',
                  expectedBorrow: { D: { scratched: 5, newValue: 4 } },
                  expectedResultDigit: 4,
                  hint: '12 - 8 = 4.',
                  errorExplanation: 'Conte de 8 até chegar a 12: 9, 10, 11, 12. A diferença é 4.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Dezenas: O 5 virou 4. Quanto é 4 - 2?',
                  focusColumn: 'D',
                  expectedResultDigit: 2,
                  hint: 'Lembre-se que o 5 virou 4.',
                  errorExplanation: '4 - 2 = 2.'
                },
                {
                  stepIndex: 3,
                  instruction: 'Centenas: 3 - 1 = ?',
                  focusColumn: 'C',
                  expectedResultDigit: 2,
                  hint: '3 - 1 = 2.',
                  errorExplanation: '3 - 1 = 2.'
                }
              ],
              totalResult: 224
            }
          }
        },
        {
          id: 't3-u2-s3',
          type: 'guided_practice',
          title: 'Prática Interativa: 461 - 238',
          content: 'Resolva no caderno quadriculado preenchendo as trocas e os resultados:',
          interactiveNotebook: {
            operation: {
              op1: 461,
              op2: 238,
              operator: '-',
              alignmentTarget: {
                op1Columns: { C: 4, D: 6, U: 1 },
                op2Columns: { C: 2, D: 3, U: 8 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: '1 não dá para tirar 8. Empreste da dezena 6 (vira 5) e o 1 vira 11. Quanto é 11 - 8?',
                  focusColumn: 'U',
                  expectedBorrow: { D: { scratched: 6, newValue: 5 } },
                  expectedResultDigit: 3,
                  hint: '11 - 8 = 3.',
                  errorExplanation: '11 menos 8 dá 3.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Dezenas: O 6 virou 5. Quanto é 5 - 3?',
                  focusColumn: 'D',
                  expectedResultDigit: 2,
                  hint: '5 - 3 = 2.',
                  errorExplanation: '5 dezenas menos 3 dezenas = 2.'
                },
                {
                  stepIndex: 3,
                  instruction: 'Centenas: 4 - 2 = ?',
                  focusColumn: 'C',
                  expectedResultDigit: 2,
                  hint: '4 - 2 = 2.',
                  errorExplanation: '4 - 2 = 2 centenas.'
                }
              ],
              totalResult: 223
            },
            requireBorrowInputs: true
          }
        },
        {
          id: 't3-u2-s4',
          type: 'contextualized_problem',
          title: 'Problema: A Biblioteca da Escola',
          content: 'A biblioteca tinha 540 livros. Os alunos emprestaram 175 livros durante a semana. Quantos livros ainda restam nas prateleiras?',
          wordProblem: {
            story: 'A biblioteca tinha 540 livros e foram emprestados 175 livros.',
            question: 'Quantos livros continuam na biblioteca?',
            suggestedStrategy: 'Subtração armada: 540 - 175. Como 0 não tira 5, pegue emprestado do 4!',
            operationType: '-',
            op1: 540,
            op2: 175,
            expectedAnswer: 365,
            unitName: 'livros',
            stepExplanation: '0 vira 10: 10 - 5 = 5. O 4 vira 3, que pega emprestado do 5 e vira 13: 13 - 7 = 6. O 5 vira 4: 4 - 1 = 3. Resposta: 365 livros!'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't3-challenge',
    title: 'Desafio do Mestre da Subtração',
    description: 'Resolva subtrações com zeros no minuendo (como 500 - 148)!',
    xpReward: 75,
    steps: [
      {
        id: 't3-c-s1',
        type: 'final_challenge',
        title: 'O Mistério dos Zeros',
        content: 'Em 400 - 165, como o zero da unidade pega emprestado se a dezena também é zero?',
        quiz: {
          question: 'Para resolver 400 - 165, de quem a unidade e a dezena pegam emprestado primeiro?',
          options: [
            'A centena (4) empresta para a dezena (vira 10), e depois a dezena empresta para a unidade!',
            'Não é possível resolver essa conta',
            'O zero vira 10 sozinho sem ninguém emprestar',
            'Basta subtrair de baixo para cima'
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Brilhante raciocínio! A centena empresta primeiro para a dezena, que vira 10 e depois empresta para a unidade, ficando com 9!',
          explanationOnError: 'A regra é em cascata: a centena 4 vira 3 e manda 10 para a dezena. Depois a dezena vira 9 e manda 10 para a unidade!',
          hint: 'A ajuda vem da Centena primeiro!'
        }
      }
    ]
  }
};

import { Track } from '../../types.ts';

export const track2: Track = {
  id: 'trilha-2',
  subjectId: 'matematica',
  number: 2,
  title: 'Adição e a Conta Armada',
  description: 'Aprenda a montar a conta no caderno, alinhar colunas e o segredo do Vai 1!',
  color: 'blue',
  badgeName: 'Mestre da Soma Armada',
  badgeIcon: 'PlusCircle',
  units: [
    {
      id: 't2-u1',
      trackId: 'trilha-2',
      number: 1,
      title: 'Como Montar a Conta no Caderno',
      shortDesc: 'Aprenda o segredo de alinhar unidade com unidade e dezena com dezena!',
      icon: 'Edit3',
      xpReward: 35,
      steps: [
        {
          id: 't2-u1-s1',
          type: 'objective',
          title: 'O Segredo do Caderno Quadriculado',
          content: 'Aprender a posicionar os números na conta armada para não errar o resultado. Cada número na sua casinha!',
          mascotTip: 'Se você colocar a unidade embaixo da dezena, a conta vira uma bagunça! Vamos aprender a alinhar como um mestre!'
        },
        {
          id: 't2-u1-s2',
          type: 'notebook_demo',
          title: 'Demonstração: 143 + 52',
          content: 'Veja como armar a conta 143 + 52 no caderno quadriculado. O 52 só tem Dezena e Unidade, então a Centena fica vazia!',
          notebookGuide: {
            title: 'Alinhando 143 + 52',
            tips: [
              '1º: Escreva o 143: 1 na Centena, 4 na Dezena, 3 na Unidade.',
              '2º: Escreva o 52 EMBAIXO: o 5 embaixo do 4 (dezenas) e o 2 embaixo do 3 (unidades).',
              '3º: Passe o traço horizontal com régua e coloque o sinal de + à esquerda.',
              '4º: Comece somando SEMPRE pelas Unidades: 3 + 2 = 5!'
            ],
            operation: {
              op1: 143,
              op2: 52,
              operator: '+',
              alignmentTarget: {
                op1Columns: { C: 1, D: 4, U: 3 },
                op2Columns: { C: 0, D: 5, U: 2 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Some as Unidades: 3 + 2',
                  focusColumn: 'U',
                  expectedResultDigit: 5,
                  hint: 'Some 3 unidades + 2 unidades.',
                  errorExplanation: '3 + 2 é igual a 5.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Some as Dezenas: 4 + 5',
                  focusColumn: 'D',
                  expectedResultDigit: 9,
                  hint: 'Some 4 dezenas + 5 dezenas.',
                  errorExplanation: '4 + 5 é igual a 9.'
                },
                {
                  stepIndex: 3,
                  instruction: 'Baixe a Centena: 1 + 0',
                  focusColumn: 'C',
                  expectedResultDigit: 1,
                  hint: '1 centena mais nada continua 1.',
                  errorExplanation: '1 + 0 = 1.'
                }
              ],
              totalResult: 195
            }
          }
        },
        {
          id: 't2-u1-s3',
          type: 'guided_practice',
          title: 'Treino de Alinhamento',
          content: 'Se vamos armar 245 + 34, onde devemos colocar o algarismo 3 do número 34?',
          quiz: {
            question: 'Em 245 + 34, o algarismo 3 deve ficar embaixo de qual algarismo?',
            options: [
              'Embaixo do 4, porque ambos são Dezenas',
              'Embaixo do 2, porque é o primeiro algarismo',
              'Embaixo do 5, na Unidade',
              'Tanto faz a posição'
            ],
            correctIndex: 0,
            explanationOnSuccess: 'Exatamente! O 3 vale 30 (dezena) e o 4 do 245 vale 40 (dezena). Dezena embaixo de dezena!',
            explanationOnError: 'Cuidado! 34 tem 3 dezenas e 4 unidades. Ele deve alinhar dezena com dezena (o 4 do 245).',
            hint: 'Lembre-se: U com U, D com D, C com C.'
          }
        }
      ]
    },
    {
      id: 't2-u2',
      trackId: 'trilha-2',
      number: 2,
      title: 'Adição com Reagrupamento e o "Vai 1"',
      shortDesc: 'O que fazer quando a soma passa de 9? Suba a dezena para a casinha vizinha!',
      icon: 'ArrowUpRight',
      xpReward: 40,
      steps: [
        {
          id: 't2-u2-s1',
          type: 'objective',
          title: 'Objetivo: Entender o Reagrupamento ("Vai 1")',
          content: 'Descobrir por que o "vai 1" existe: quando a soma das unidades passa de 9, 10 unidades viram 1 dezena e viajam para a coluna da dezena!',
          mascotTip: 'Na casinha da unidade só cabe 1 dígito de 0 a 9. Se deu 13, o 3 fica e o 10 sobe como 1 dezena!'
        },
        {
          id: 't2-u2-s2',
          type: 'worked_example',
          title: 'Exemplo Passo a Passo: 347 + 286',
          content: 'Vamos resolver a conta clássica: 347 + 286!',
          notebookGuide: {
            title: 'Resolvendo 347 + 286 no Caderno',
            tips: [
              'Passo 1 (Unidades): 7 + 6 = 13. Fica o 3 embaixo e "vai 1" dezena para cima do 4.',
              'Passo 2 (Dezenas): 1 (que foi) + 4 + 8 = 13 dezenas! Fica o 3 embaixo e "vai 1" centena para cima do 3.',
              'Passo 3 (Centenas): 1 (que foi) + 3 + 2 = 6 centenas.',
              'Resultado final: 633!'
            ],
            operation: {
              op1: 347,
              op2: 286,
              operator: '+',
              alignmentTarget: {
                op1Columns: { C: 3, D: 4, U: 7 },
                op2Columns: { C: 2, D: 8, U: 6 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: '1º Passo: Some as unidades (7 + 6 = 13). Digite o 3 no resultado e 1 no "Vai 1" da dezena.',
                  focusColumn: 'U',
                  expectedCarry: { D: 1 },
                  expectedResultDigit: 3,
                  hint: '7 + 6 = 13. O 3 fica na unidade e o 1 sobe para a dezena!',
                  errorExplanation: '7 + 6 = 13. A unidade é 3 e a dezena que sobe é 1.'
                },
                {
                  stepIndex: 2,
                  instruction: '2º Passo: Some as dezenas: 1 (vai 1) + 4 + 8 = 13 dezenas! Digite o 3 e suba 1 na centena.',
                  focusColumn: 'D',
                  expectedCarry: { C: 1 },
                  expectedResultDigit: 3,
                  hint: 'Não esqueça de somar o 1 que subiu: 1 + 4 + 8 = 13.',
                  errorExplanation: '1 + 4 + 8 = 13. Deixe o 3 e mande 1 para a centena.'
                },
                {
                  stepIndex: 3,
                  instruction: '3º Passo: Some as centenas: 1 (vai 1) + 3 + 2 = 6 centenas.',
                  focusColumn: 'C',
                  expectedResultDigit: 6,
                  hint: '1 + 3 + 2 = 6.',
                  errorExplanation: '1 + 3 + 2 = 6.'
                }
              ],
              totalResult: 633
            }
          }
        },
        {
          id: 't2-u2-s3',
          type: 'guided_practice',
          title: 'Prática Interativa no Caderno: 158 + 264',
          content: 'Agora é a sua vez de preencher a conta armada no caderno quadriculado!',
          interactiveNotebook: {
            operation: {
              op1: 158,
              op2: 264,
              operator: '+',
              alignmentTarget: {
                op1Columns: { C: 1, D: 5, U: 8 },
                op2Columns: { C: 2, D: 6, U: 4 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Unidades: Quanto é 8 + 4?',
                  focusColumn: 'U',
                  expectedCarry: { D: 1 },
                  expectedResultDigit: 2,
                  hint: '8 + 4 = 12. Deixe o 2 e suba 1 na coluna D.',
                  errorExplanation: '8 + 4 = 12. O algarismo das unidades é 2 e vai 1 dezena.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Dezenas: Some 1 + 5 + 6.',
                  focusColumn: 'D',
                  expectedCarry: { C: 1 },
                  expectedResultDigit: 2,
                  hint: '1 + 5 + 6 = 12 dezenas. Fica 2 e sobe 1 na centena.',
                  errorExplanation: '1 + 5 = 6. 6 + 6 = 12. Coloque 2 e suba 1.'
                },
                {
                  stepIndex: 3,
                  instruction: 'Centenas: Some 1 + 1 + 2.',
                  focusColumn: 'C',
                  expectedResultDigit: 4,
                  hint: '1 + 1 + 2 = 4.',
                  errorExplanation: '1 + 1 + 2 = 4 centenas.'
                }
              ],
              totalResult: 422
            },
            requireCarryInputs: true
          }
        },
        {
          id: 't2-u2-s4',
          type: 'contextualized_problem',
          title: 'Problema: Colecionadores de Figurinhas',
          content: 'Lucas tinha 168 figurinhas e ganhou 75 figurinhas do seu tio. Com quantas figurinhas Lucas ficou?',
          wordProblem: {
            story: 'Lucas tinha 168 figurinhas e ganhou mais 75 figurinhas.',
            question: 'Com quantas figurinhas Lucas ficou no total?',
            suggestedStrategy: 'Arme no caderno: 168 + 75. Atenção ao alinhar o 75 (7 na dezena, 5 na unidade)!',
            operationType: '+',
            op1: 168,
            op2: 75,
            expectedAnswer: 243,
            unitName: 'figurinhas',
            stepExplanation: '8 + 5 = 13 (vai 1). 1 + 6 + 7 = 14 (vai 1). 1 + 1 = 2. Total: 243 figurinhas!'
          }
        },
        {
          id: 't2-u2-s5',
          type: 'final_challenge',
          title: 'Desafio da Soma com Milhares',
          content: 'Calcule mentalmente ou no caderno: 1.250 + 350.',
          quiz: {
            question: 'Quanto é 1.250 + 350?',
            options: ['1.600', '1.500', '1.700', '4.750'],
            correctIndex: 0,
            explanationOnSuccess: 'Perfeito! 250 + 350 = 600. Com 1.000, dá 1.600!',
            explanationOnError: 'Dica: 50 + 50 = 100. 200 + 300 = 500. 500 + 100 = 600. Com o milhar = 1.600.',
            hint: 'Some primeiro as centenas e dezenas: 250 + 350.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't2-challenge',
    title: 'Desafio do Mestre da Adição',
    description: 'Arme e resolva somas de 3 parcelas ou com reagrupamento duplo!',
    xpReward: 70,
    steps: [
      {
        id: 't2-c-s1',
        type: 'final_challenge',
        title: 'Desafio dos 3 Amigos',
        content: 'Na feira de ciências da escola, a turma A recolheu 245 tampinhas, a turma B recolheu 180 e a turma C recolheu 95. Quantas tampinhas foram recolhidas?',
        quiz: {
          question: '245 + 180 + 95 = ?',
          options: ['520 tampinhas', '510 tampinhas', '500 tampinhas', '420 tampinhas'],
          correctIndex: 0,
          explanationOnSuccess: 'Maravilha! 245 + 180 = 425. 425 + 95 = 520 tampinhas ao todo!',
          explanationOnError: 'Unidades: 5 + 0 + 5 = 10 (vai 1). Dezenas: 1 + 4 + 8 + 9 = 22 (vai 2). Centenas: 2 + 2 + 1 = 5. Total = 520!',
          hint: 'Some primeiro 5 + 0 + 5 nas unidades.'
        }
      }
    ]
  }
};

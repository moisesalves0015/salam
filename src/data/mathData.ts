import { Track } from '../types';

export const track1: Track = {
  id: 'trilha-1',
  subjectId: 'matematica',
  number: 1,
  title: 'Conhecendo os Números',
  description: 'Sistema de numeração decimal, valor posicional e decomposição.',
  color: 'emerald',
  badgeName: 'Guardião dos Números',
  badgeIcon: 'Award',
  units: [
    {
      id: 't1-u1',
      trackId: 'trilha-1',
      number: 1,
      title: 'Unidade e Dezena',
      shortDesc: 'Aprenda como grupos de 10 formam uma dezena!',
      icon: 'Layers',
      xpReward: 30,
      steps: [
        {
          id: 't1-u1-s1',
          type: 'objective',
          title: 'Nosso Objetivo de Hoje',
          content: 'Entender que cada 10 cubinhos (unidades) formam 1 barra (dezena), e como organizar isso na casinha das ordens.',
          mascotTip: 'Oi, campeão! Na Matemática, quando juntamos 10 coisas, elas ganham um nome especial: DEZENA!'
        },
        {
          id: 't1-u1-s2',
          type: 'explanation',
          title: 'O Poder do Grupo de 10',
          content: 'No nosso sistema decimal, nunca deixamos mais de 9 unidades soltas. Quando temos 10 cubinhos, trocamos por 1 barra da dezena! O número 24, por exemplo, tem 2 dezenas (20) e 4 unidades (4).',
          placeValueExample: {
            number: 24,
            decomposition: '20 + 4',
            blocks: { thousands: 0, hundreds: 0, tens: 2, units: 4 },
            explanation: '2 barras de dezena valem 20, mais 4 cubinhos soltos valem 4.'
          }
        },
        {
          id: 't1-u1-s3',
          type: 'notebook_demo',
          title: 'Como Organizar no Caderno',
          content: 'No caderno, cada algarismo mora em uma coluna. A coluna da direita é a Unidade (U) e a coluna ao lado é a Dezena (D). Nunca misture as casinhas!',
          notebookGuide: {
            title: 'Casinha D e U',
            tips: [
              'Desenhe duas colunas: D (Dezena) e U (Unidade)',
              'No número 37: o 3 vai na coluna D e o 7 vai na coluna U',
              'O 3 vale 30 e o 7 vale 7!'
            ],
            operation: {
              op1: 37,
              op2: 0,
              operator: '+',
              alignmentTarget: {
                op1Columns: { D: 3, U: 7 },
                op2Columns: { D: 0, U: 0 }
              },
              steps: [],
              totalResult: 37
            }
          }
        },
        {
          id: 't1-u1-s4',
          type: 'guided_practice',
          title: 'Prática Guiada: Qual é o Número?',
          content: 'Se você tem 4 dezenas e 8 unidades, que número você formou?',
          quiz: {
            question: '4 Dezenas + 8 Unidades é igual a:',
            options: ['48', '84', '408', '12'],
            correctIndex: 0,
            explanationOnSuccess: 'Excelente! 4 dezenas valem 40, mais 8 unidades dá 48 certinho!',
            explanationOnError: 'Lembre-se: 4 dezenas valem 40. Somando com 8 unidades: 40 + 8 = 48.',
            hint: 'A dezena vem na frente: 4 dezenas = 40.'
          }
        },
        {
          id: 't1-u1-s5',
          type: 'contextualized_problem',
          title: 'Desafio do Dia a Dia',
          content: 'A professora Clara comprou 3 pacotes com 10 lápis cada e mais 5 lápis avulsos. Quantos lápis ela comprou no total?',
          wordProblem: {
            story: 'A professora Clara comprou 3 pacotes de 10 lápis e mais 5 lápis soltos.',
            question: 'Quantos lápis a professora comprou ao todo?',
            suggestedStrategy: '3 pacotes de 10 = 3 dezenas = 30. Mais 5 lápis avulsos = 5 unidades.',
            operationType: '+',
            op1: 30,
            op2: 5,
            expectedAnswer: 35,
            unitName: 'lápis',
            stepExplanation: '3 dezenas (30) + 5 unidades (5) = 35 lápis!'
          }
        },
        {
          id: 't1-u1-s6',
          type: 'final_challenge',
          title: 'Desafio da Unidade!',
          content: 'No número 76, qual é o valor do algarismo 7?',
          quiz: {
            question: 'O algarismo 7 está na casinha da Dezena. Quanto ele vale de verdade?',
            options: ['7', '70', '700', '14'],
            correctIndex: 1,
            explanationOnSuccess: 'Sensacional! Por estar na casinha da dezena, o 7 vale 70 unidades!',
            explanationOnError: 'Atenção: como o 7 está na casa da dezena, ele representa 7 grupos de 10, ou seja, 70!',
            hint: 'Multiplique 7 por 10 porque ele está na coluna D.'
          }
        }
      ]
    },
    {
      id: 't1-u2',
      trackId: 'trilha-1',
      number: 2,
      title: 'Centena',
      shortDesc: 'Juntando 10 dezenas formamos a grande placa de 100!',
      icon: 'Square',
      xpReward: 35,
      steps: [
        {
          id: 't1-u2-s1',
          type: 'objective',
          title: 'Objetivo: Conhecer a Centena (C)',
          content: 'Aprender que 10 barras de dezena formam 1 placa de 100 (Centena), ocupando a 3ª ordem da direita para a esquerda: C - D - U.',
          mascotTip: 'Quando chegamos a 99 e somamos 1, nasce a casinha da Centena: 100!'
        },
        {
          id: 't1-u2-s2',
          type: 'explanation',
          title: 'A Centena em Ação',
          content: 'O número 352 é composto por 3 Centenas (300), 5 Dezenas (50) e 2 Unidades (2). Três placas, cinco barras e dois cubinhos!',
          placeValueExample: {
            number: 352,
            decomposition: '300 + 50 + 2',
            blocks: { thousands: 0, hundreds: 3, tens: 5, units: 2 },
            explanation: '3 centenas = 300, 5 dezenas = 50, 2 unidades = 2.'
          }
        },
        {
          id: 't1-u2-s3',
          type: 'guided_practice',
          title: 'Treino de Centenas',
          content: 'Quantas dezenas são necessárias para formar 1 centena inteira?',
          quiz: {
            question: 'Quantas barrinhas de 10 formam uma placa de 100?',
            options: ['5 barrinhas', '10 barrinhas', '100 barrinhas', '20 barrinhas'],
            correctIndex: 1,
            explanationOnSuccess: 'Perfeito! 10 dezenas = 10 × 10 = 100 unidades = 1 Centena!',
            explanationOnError: 'Lembre-se: conte de 10 em 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100! São 10 dezenas.',
            hint: 'Conte de 10 em 10 até chegar a 100.'
          }
        }
      ]
    },
    {
      id: 't1-u3',
      trackId: 'trilha-1',
      number: 3,
      title: 'Unidade de Milhar',
      shortDesc: 'Descubra os números de 4 algarismos até 9.999!',
      icon: 'Box',
      xpReward: 40,
      steps: [
        {
          id: 't1-u3-s1',
          type: 'objective',
          title: 'Objetivo: Conhecer a Unidade de Milhar (UM)',
          content: 'Dominar números de 4 algarismos: Milhares (UM), Centenas (C), Dezenas (D) e Unidades (U).',
          mascotTip: '10 placas de 100 formam o grande cubão de 1.000!'
        },
        {
          id: 't1-u3-s2',
          type: 'explanation',
          title: 'O Bloco do Milhar',
          content: 'No número 1.485, o 1 vale 1.000 (UM), o 4 vale 400 (C), o 8 vale 80 (D) e o 5 vale 5 (U). Usamos um pontinho para separar o milhar.',
          placeValueExample: {
            number: 1485,
            decomposition: '1.000 + 400 + 80 + 5',
            blocks: { thousands: 1, hundreds: 4, tens: 8, units: 5 },
            explanation: '1 cubão de 1000, 4 placas de 100, 8 barras de 10 e 5 cubinhos!'
          }
        },
        {
          id: 't1-u3-s3',
          type: 'guided_practice',
          title: 'Qual é o Valor do 3?',
          content: 'No número 3.250, o algarismo 3 está na ordem da Unidade de Milhar. Qual é o seu valor posicional?',
          quiz: {
            question: 'Em 3.250, quanto vale o algarismo 3?',
            options: ['30', '300', '3.000', '3'],
            correctIndex: 2,
            explanationOnSuccess: 'Isso aí! O 3 na casa do milhar vale 3.000!',
            explanationOnError: 'O 3 está na 4ª ordem (UM), então vale 3 × 1.000 = 3.000.',
            hint: 'A casa do milhar acrescenta três zeros.'
          }
        }
      ]
    },
    {
      id: 't1-u4',
      trackId: 'trilha-1',
      number: 4,
      title: 'Compondo e Decompondo',
      shortDesc: 'Desmonte e monte números como peças de lego matemático!',
      icon: 'Puzzle',
      xpReward: 40,
      steps: [
        {
          id: 't1-u4-s1',
          type: 'objective',
          title: 'Objetivo: Composição e Decomposição',
          content: 'Entender que 2.000 + 500 + 30 + 4 forma o número 2.534, e saber desmontar qualquer número.',
          mascotTip: 'Decompor é como desmontar um brinquedo para ver todas as peças que formam ele!'
        },
        {
          id: 't1-u4-s2',
          type: 'guided_practice',
          title: 'Desafio de Composição',
          content: 'Juntando 5 centenas + 7 dezenas + 3 unidades, qual número formamos?',
          quiz: {
            question: '500 + 70 + 3 = ?',
            options: ['573', '5.073', '5703', '537'],
            correctIndex: 0,
            explanationOnSuccess: 'Correto! 5 centenas (500) + 7 dezenas (70) + 3 unidades (3) = 573.',
            explanationOnError: 'Veja: 500 + 70 = 570. Mais 3 = 573.',
            hint: 'Coloque 5 na centena, 7 na dezena e 3 na unidade.'
          }
        },
        {
          id: 't1-u4-s3',
          type: 'final_challenge',
          title: 'Decompondo 4.189',
          content: 'Como fica a decomposição correta de 4.189?',
          quiz: {
            question: 'Qual é a decomposição em ordens de 4.189?',
            options: [
              '4.000 + 100 + 80 + 9',
              '400 + 100 + 80 + 9',
              '4.000 + 10 + 80 + 9',
              '4.100 + 89'
            ],
            correctIndex: 0,
            explanationOnSuccess: 'Brilhante! 4.000 + 100 + 80 + 9 é a decomposição completa pelas ordens!',
            explanationOnError: 'O 4 vale 4.000, o 1 vale 100, o 8 vale 80 e o 9 vale 9.',
            hint: 'Olhe o valor de cada casinha: UM, C, D, U.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't1-challenge',
    title: 'Grande Desafio dos Números',
    description: 'Mostre que você domina unidades, dezenas, centenas e milhares!',
    xpReward: 60,
    steps: [
      {
        id: 't1-c-s1',
        type: 'final_challenge',
        title: 'Desafio Final 1: Qual número é maior?',
        content: 'Observe os números 3.421 e 3.419. Qual é o maior e por quê?',
        quiz: {
          question: 'Entre 3.421 e 3.419, qual é o maior?',
          options: [
            '3.421, porque tem 2 dezenas contra 1 dezena',
            '3.419, porque 9 é maior que 1',
            'São iguais',
            '3.419, porque a centena é diferente'
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Sensacional! Como os milhares e as centenas são iguais, comparamos as dezenas: 2 dezenas (20) ganha de 1 dezena (10)!',
          explanationOnError: 'Atenção: compare da esquerda para a direita. Milhar igual (3=3), centena igual (4=4). Na dezena: 2 é maior que 1!',
          hint: 'Compare as dezenas de cada número.'
        }
      }
    ]
  }
};

import { Track } from '../../types.ts';

export const track5: Track = {
  id: 'trilha-5',
  subjectId: 'matematica',
  number: 5,
  title: 'Divisão e a Conta da Chave',
  description: 'Repartir em partes iguais, o algoritmo da chave no caderno, quociente e resto!',
  color: 'rose',
  badgeName: 'Mestre da Divisão',
  badgeIcon: 'PieChart',
  units: [
    {
      id: 't5-u1',
      trackId: 'trilha-5',
      number: 1,
      title: 'Repartir e a Relação com a Multiplicação',
      shortDesc: 'A divisão é a operação inversa da multiplicação! Quem sabe a tabuada, sabe dividir.',
      icon: 'Share2',
      xpReward: 35,
      steps: [
        {
          id: 't5-u1-s1',
          type: 'objective',
          title: 'Objetivo: O que é Dividir?',
          content: 'Entender que dividir significa repartir uma quantidade em partes exatamente iguais ou descobrir quantos grupos cabem.',
          mascotTip: 'Se 3 × 8 = 24, então 24 dividido por 3 só pode ser 8! A multiplicação é a melhor amiga da divisão!'
        },
        {
          id: 't5-u1-s2',
          type: 'guided_practice',
          title: 'A Chave da Tabuada',
          content: 'Se temos 35 balas e queremos dividir igualmente entre 5 amigos, quantas balas cada um ganha?',
          quiz: {
            question: '35 ÷ 5 = ? (Pense: 5 vezes quanto dá 35?)',
            options: ['7 balas cada', '6 balas cada', '8 balas cada', '5 balas cada'],
            correctIndex: 0,
            explanationOnSuccess: 'Certíssimo! Porque 5 × 7 = 35! Cada amigo ganha 7 balas.',
            explanationOnError: 'Lembre da tabuada do 5: 5 × 5 = 25, 5 × 6 = 30, 5 × 7 = 35!',
            hint: 'Qual número multiplicado por 5 dá 35?'
          }
        }
      ]
    },
    {
      id: 't5-u2',
      trackId: 'trilha-5',
      number: 2,
      title: 'O Algoritmo da Chave no Caderno',
      shortDesc: 'Dividendo, divisor, quociente e resto: como desenhar e resolver a chave!',
      icon: 'CornerDownRight',
      xpReward: 50,
      steps: [
        {
          id: 't5-u2-s1',
          type: 'objective',
          title: 'Os 4 Personagens da Chave',
          content: 'Na conta armada da divisão, temos 4 nomes importantes:\n1. Dividendo (o total que vamos repartir, fica fora da chave)\n2. Divisor (em quantas partes vamos repartir, fica dentro da chave)\n3. Quociente (o resultado, fica embaixo da chave)\n4. Resto (o que sobra, fica lá embaixo)',
          mascotTip: 'A chave parece uma cadeira onde o divisor senta confortavelmente!'
        },
        {
          id: 't5-u2-s2',
          type: 'notebook_demo',
          title: 'Exemplo: 84 ÷ 4 no Caderno',
          content: 'Veja como resolver 84 ÷ 4 passo a passo na chave:',
          notebookGuide: {
            title: '84 ÷ 4 na Chave',
            tips: [
              '1º: Olhe a maior ordem: 8 dezenas divididas por 4 = 2 no quociente.',
              '2º: Multiplique de volta: 2 × 4 = 8. Subtraia: 8 - 8 = 0.',
              '3º: "Abaixe" a unidade 4 ao lado do 0.',
              '4º: Divida 4 ÷ 4 = 1 no quociente.',
              '5º: 1 × 4 = 4. Subtraia: 4 - 4 = 0 de resto!',
              'Resultado (quociente) = 21, resto 0!'
            ],
            operation: {
              op1: 84,
              op2: 4,
              operator: '÷',
              alignmentTarget: {
                op1Columns: { D: 8, U: 4 },
                op2Columns: { U: 4 }
              },
              steps: [
                {
                  stepIndex: 1,
                  instruction: 'Divida 8 dezenas por 4. Quantas vezes o 4 cabe no 8?',
                  focusColumn: 'quotient',
                  expectedResultDigit: 2,
                  hint: '4 × 2 = 8.',
                  errorExplanation: '8 ÷ 4 = 2. Coloque 2 no quociente.'
                },
                {
                  stepIndex: 2,
                  instruction: 'Abaixe o 4 das unidades. Divida 4 por 4.',
                  focusColumn: 'quotient',
                  expectedResultDigit: 1,
                  hint: '4 ÷ 4 = 1.',
                  errorExplanation: '4 ÷ 4 = 1. Coloque 1 ao lado do 2 no quociente.'
                }
              ],
              totalResult: 21,
              remainder: 0
            }
          }
        },
        {
          id: 't5-u2-s3',
          type: 'contextualized_problem',
          title: 'Problema com Resto: Bolinhas de Gude',
          content: 'Mariana tem 23 bolinhas de gude e quer guardar em 4 saquinhos com quantidades iguais. Quantas bolinhas ficam em cada saquinho e quantas sobram?',
          wordProblem: {
            story: 'Mariana tem 23 bolinhas e 4 saquinhos iguais.',
            question: 'Quantas bolinhas cabem em cada saquinho e qual é o resto?',
            suggestedStrategy: 'Pense na tabuada do 4: 4 × 5 = 20. Para chegar a 23, faltam 3!',
            operationType: '÷',
            op1: 23,
            op2: 4,
            expectedAnswer: 5,
            unitName: 'bolinhas (sobrando 3)',
            stepExplanation: '23 ÷ 4 = 5 com resto 3. Cada saquinho recebe 5 bolinhas e sobram 3 bolinhas!'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't5-challenge',
    title: 'Desafio do Mestre da Divisão',
    description: 'Resolva 96 ÷ 3 no caderno e confira fazendo a operação inversa!',
    xpReward: 85,
    steps: [
      {
        id: 't5-c-s1',
        type: 'final_challenge',
        title: 'Desafio: 96 dividido por 3',
        content: 'Um fazendeiro colheu 96 laranjas e embalou em caixas com 3 laranjas cada. Quantas caixas completas ele formou?',
        quiz: {
          question: '96 ÷ 3 = ?',
          options: ['32 caixas', '30 caixas', '28 caixas', '36 caixas'],
          correctIndex: 0,
          explanationOnSuccess: 'Parabéns! 90 ÷ 3 = 30 e 6 ÷ 3 = 2. 30 + 2 = 32 caixas exatas!',
          explanationOnError: 'Divida em duas partes: 9 dezenas por 3 = 3 dezenas (30). 6 unidades por 3 = 2 unidades. 30 + 2 = 32.',
          hint: 'Divida primeiro o 9 e depois o 6 por 3.'
        }
      }
    ]
  }
};

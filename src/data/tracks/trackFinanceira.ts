import { Track } from '../../types.ts';

export const trackFinanceira: Track = {
  id: 'trilha-fin-1',
  subjectId: 'financeira',
  number: 1,
  title: 'Dinheiro, Escolhas e o Valor das Coisas',
  description: 'Conheça as cédulas e moedas do Real (R$), aprenda a planejar gastos, diferenciar necessidade de desejo e conferir o troco certo.',
  objective: 'Reconhecer o sistema monetário brasileiro, resolver problemas de compra, venda e troco, e desenvolver noções de consumo consciente e poupança.',
  bnccSkills: [
    'EF04MA25: Resolver e elaborar problemas que envolvam situações de compra e venda e formas de pagamento, utilizando termos como troco e desconto.',
    'Tema Transversal: Educação Financeira — Planejamento pessoal, consumo consciente e valorização do trabalho.'
  ],
  color: 'amber',
  badgeName: 'Poupador Consciente',
  badgeIcon: 'Coins',
  units: [
    {
      id: 't-fin-u1',
      trackId: 'trilha-fin-1',
      number: 1,
      title: 'Nosso Dinheiro: Cédulas e Moedas do Real',
      shortDesc: 'Aprenda a identificar e somar valores em reais e centavos!',
      icon: 'Banknote',
      xpReward: 35,
      steps: [
        {
          id: 'fin-u1-s1',
          type: 'objective',
          title: 'O Que é o Real (R$)?',
          content: 'O dinheiro serve como meio de troca para pagar pelo trabalho das pessoas, comprar alimentos, brinquedos, roupas e serviços. No Brasil, a nossa moeda oficial é o REAL (R$).',
          mascotTip: 'Teco economista: Dinheiro não nasce em árvore nem sai da parede do banco de graça! Ele é fruto do trabalho e esforço da sua família.'
        },
        {
          id: 'fin-u1-s2',
          type: 'explanation',
          title: 'As Cédulas e Moedas que Usamos',
          content: '• Cédulas (notas de papel/polímero): R$ 2, R$ 5, R$ 10, R$ 20, R$ 50, R$ 100 e R$ 200.\n• Moedas de metal: 5 centavos, 10 centavos, 25 centavos, 50 centavos e 1 Real.\n\nLembre-se: 100 centavos valem exatamente 1 Real!',
          conceptCard: {
            title: 'Equivalências Divertidas do Real',
            subtitle: 'Como compor valores de diferentes formas',
            points: [
              { label: 'Duas de 50', text: 'R$ 50 + R$ 50 = 1 nota de R$ 100!' },
              { label: 'Cinco de 2', text: '5 notas de R$ 2 = 1 nota de R$ 10!' },
              { label: 'Quatro de 25 centavos', text: '4 moedas de 25 centavos = 1 moeda de R$ 1,00!' }
            ]
          }
        },
        {
          id: 'fin-u1-s3',
          type: 'guided_practice',
          title: 'Prática: Somando Valores no Bolso',
          content: 'Vamos somar o dinheiro que Lucas guardou no seu cofrinho de porquinho.',
          quiz: {
            question: 'Lucas tem duas cédulas de R$ 20, uma cédula de R$ 10 e três moedas de R$ 1. Quanto ele tem no total?',
            options: [
              'R$ 35,00',
              'R$ 53,00',
              'R$ 48,00',
              'R$ 60,00'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Conta perfeita! R$ 20 + R$ 20 = R$ 40. Mais R$ 10 = R$ 50. Mais R$ 3 de moedas = R$ 53,00!',
            explanationOnError: 'Faça por etapas: 2 notas de 20 dá 40. Com mais 10 dá 50. Agora some as 3 moedas de 1 real: 50 + 3 = 53!',
            hint: 'Some primeiro as cédulas: 20 + 20 + 10 = 50. Depois as moedas: 1 + 1 + 1 = 3.'
          }
        }
      ]
    },
    {
      id: 't-fin-u2',
      trackId: 'trilha-fin-1',
      number: 2,
      title: 'Necessidade vs Desejo e o Troco Certo',
      shortDesc: 'Aprenda a fazer compras inteligentes e nunca errar o troco!',
      icon: 'Receipt',
      xpReward: 40,
      steps: [
        {
          id: 'fin-u2-s1',
          type: 'objective',
          title: 'Comprar com Consciência',
          content: 'Antes de abrir a carteira, todo consumidor inteligente se pergunta: "Eu realmente preciso disso agora, ou é apenas uma vontade passageira?". Saber diferenciar necessidade de desejo evita desperdícios!',
          mascotTip: 'Dica do Teco: Necessidade é o que você precisa para viver bem (comida, saúde, material escolar). Desejo é o que seria legal ter, mas pode esperar (mais um brinquedo, figurinhas extras).'
        },
        {
          id: 'fin-u2-s2',
          type: 'explanation',
          title: 'Como Calcular o Troco no Caderno',
          content: 'Troco é a diferença entre o dinheiro que você entregou ao vendedor e o preço do produto:\n\nTROCO = (Dinheiro que entreguei) - (Preço da compra)\n\nSe você comprou um livro de R$ 28 e pagou com uma nota de R$ 50, a conta no caderno é 50 - 28 = 22 reais de troco!',
          notebookGuide: {
            title: 'Subtração do Troco no Caderno',
            tips: [
              'Coloque o valor que você deu em cima (Minuendo: R$ 50)',
              'Coloque o preço da compra embaixo (Subtraendo: R$ 28)',
              'Faça o empréstimo da dezena (o 0 vira 10 e o 5 vira 4)',
              'Resultado do troco correto: R$ 22'
            ],
            operation: {
              op1: 50,
              op2: 28,
              operator: '-',
              alignmentTarget: {
                op1Columns: { D: 5, U: 0 },
                op2Columns: { D: 2, U: 8 }
              },
              totalResult: 22,
              steps: [
                {
                  stepIndex: 0,
                  instruction: 'Na coluna da Unidade (U): não dá para tirar 8 de 0. Peça 1 dezena emprestada ao 5.',
                  focusColumn: 'U',
                  expectedBorrow: { D: { scratched: 5, newValue: 4 } },
                  expectedResultDigit: 2,
                  hint: '10 menos 8 é igual a 2.',
                  errorExplanation: '10 - 8 = 2.'
                },
                {
                  stepIndex: 1,
                  instruction: 'Na coluna da Dezena (D): o 5 virou 4. Faça 4 - 2.',
                  focusColumn: 'D',
                  expectedResultDigit: 2,
                  hint: '4 menos 2 é igual a 2.',
                  errorExplanation: '4 - 2 = 2 dezenas.'
                }
              ]
            }
          }
        },
        {
          id: 'fin-u2-s3',
          type: 'independent_exercise',
          title: 'Exercício: A Compra na Papelaria',
          content: 'Mariana comprou um estojo escolar por R$ 14,00 e uma caixa de lápis por R$ 16,00. Ela pagou com uma cédula de R$ 50,00.',
          quiz: {
            question: 'Quanto Mariana gastou no total e quanto ela deve receber de troco?',
            options: [
              'Gastou R$ 30,00 e seu troco é R$ 20,00.',
              'Gastou R$ 25,00 e seu troco é R$ 25,00.',
              'Gastou R$ 35,00 e seu troco é R$ 15,00.',
              'Gastou R$ 30,00 e não teve troco nenhum.'
            ],
            correctIndex: 0,
            explanationOnSuccess: 'Cálculo impecável! Gastos: 14 + 16 = 30 reais. Troco: 50 - 30 = 20 reais!',
            explanationOnError: 'Primeiro some o que ela comprou: 14 + 16 = 30. Depois diminua do dinheiro pago: 50 - 30 = 20.',
            hint: 'Some 14 + 16 para ver o total da compra.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-fin-1',
    title: 'O Desafio da Feirinha Consciente',
    description: 'Planeje o orçamento de um lanche saudável da turma sem estourar o limite de gastos e poupando o que sobrar!',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-fin-s1',
        type: 'objective',
        title: 'Desafio do Planejamento Financeiro',
        content: 'A turma arrecadou R$ 60,00 para montar uma mesa de piquenique saudável no parque. Eles querem comprar frutas frescas, água de coco e pãezinhos integrais, tentando economizar o máximo possível para guardar na poupança da classe.'
      },
      {
        id: 'desafio-fin-s2',
        type: 'final_challenge',
        title: 'Decisão de Compra Inteligente',
        content: 'Na quitanda A, a cesta de frutas sai por R$ 22,00. Na quitanda B, as mesmas frutas saem por R$ 17,00. O restante do lanche custa R$ 23,00.',
        quiz: {
          question: 'Se a turma escolher a quitanda mais barata (B), quanto gastará no lanche todo e quanto sobrará dos R$ 60,00 para o cofrinho?',
          options: [
            'Gastará R$ 40,00 no total e sobrarão R$ 20,00 para poupar.',
            'Gastará R$ 50,00 e sobrarão apenas R$ 10,00.',
            'Gastará todos os R$ 60,00 sem troco.',
            'Gastará R$ 35,00 e sobrarão R$ 25,00.'
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Parabéns, Futuro Administrador! Gastando R$ 17 na quitanda B + R$ 23 no restante = R$ 40,00 de gasto. Dos R$ 60,00, sobraram R$ 20,00 direitinho para o cofrinho!',
          explanationOnError: 'Some 17 + 23 = 40 reais de custo total. Em seguida, subtraia 60 - 40 para achar a economia de 20 reais.',
          hint: '17 + 23 = 40. 60 - 40 = ?'
        }
      }
    ]
  }
};

import { Track } from '../../types.ts';

export const track6: Track = {
  id: 'trilha-6',
  subjectId: 'matematica',
  number: 6,
  title: 'Resolvendo Problemas como um Detetive',
  description: 'Descubra os dados, desvende a pergunta, escolha a operação certa e dê a resposta completa!',
  color: 'indigo',
  badgeName: 'Detetive Matemático',
  badgeIcon: 'Search',
  units: [
    {
      id: 't6-u1',
      trackId: 'trilha-6',
      number: 1,
      title: 'O Método dos 5 Passos do Detetive',
      shortDesc: '1. Ler com calma | 2. Circular dados | 3. Sublinhar a pergunta | 4. Calcular | 5. Responder!',
      icon: 'HelpCircle',
      xpReward: 40,
      steps: [
        {
          id: 't6-u1-s1',
          type: 'objective',
          title: 'Como Não Ter Medo de Enunciados Longos',
          content: 'Todo problema de matemática conta uma historinha. O segredo é saber separar o que é informação e o que é a pergunta!',
          mascotTip: 'Pegue sua lupa imaginária! Primeiro passo: o que o problema está me pedindo para descobrir?'
        },
        {
          id: 't6-u1-s2',
          type: 'guided_practice',
          title: 'Qual Operação Usar?',
          content: 'Palavras-chave que ajudam a decidir a operação:\n• Juntar, acrescentar, total = Adição (+)\n• Tirar, a mais, a menos, diferença, sobrou = Subtração (-)\n• Cada um tem a mesma quantia, dobro, triplo, vezes = Multiplicação (×)\n• Repartir igualmente, distribuir = Divisão (÷)',
          quiz: {
            question: 'Se um problema pergunta "Quantos reais Pedro tem a mais que Ana?", qual operação devemos fazer?',
            options: [
              'Subtração (-) para achar a diferença entre os dois valores',
              'Adição (+) para juntar o dinheiro dos dois',
              'Multiplicação (×)',
              'Divisão (÷)'
            ],
            correctIndex: 0,
            explanationOnSuccess: 'Exato! "A mais" ou "a menos" quando comparamos duas pessoas significa encontrar a diferença, logo é uma subtração!',
            explanationOnError: 'Cuidado! A expressão "a mais que" é uma pegadinha clássica: ela compara duas quantidades, portanto usamos subtração para ver a diferença!',
            hint: 'Queremos saber a diferença entre os dois.'
          }
        },
        {
          id: 't6-u1-s3',
          type: 'contextualized_problem',
          title: 'Problema de Duas Etapas: O Passeio da Escola',
          content: 'Em um passeio de ônibus, havia 45 alunos. No primeiro ponto, desceram 12 alunos e subiram 8 novos alunos. Quantos alunos seguiram viagem no ônibus?',
          wordProblem: {
            story: 'Havia 45 alunos. Desceram 12 e depois subiram 8.',
            question: 'Quantos alunos continuaram a viagem?',
            suggestedStrategy: 'Etapa 1: 45 - 12 (quem desceu). Etapa 2: Somar os 8 que subiram!',
            operationType: '+',
            op1: 33,
            op2: 8,
            expectedAnswer: 41,
            unitName: 'alunos',
            stepExplanation: '1ª etapa: 45 - 12 = 33 alunos. 2ª etapa: 33 + 8 = 41 alunos no ônibus!'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 't6-challenge',
    title: 'Desafio do Grande Detetive',
    description: 'Resolva um enigma comercial com troco e compras combinadas!',
    xpReward: 100,
    steps: [
      {
        id: 't6-c-s1',
        type: 'final_challenge',
        title: 'O Desafio do Supermercado',
        content: 'Sofia foi ao mercado com uma nota de R$ 50,00. Comprou 3 caixas de suco por R$ 8,00 cada e 1 pacote de biscoito por R$ 6,00. Quanto Sofia recebeu de troco?',
        quiz: {
          question: 'Quanto sobrou de troco para Sofia?',
          options: ['R$ 20,00', 'R$ 24,00', 'R$ 16,00', 'R$ 30,00'],
          correctIndex: 0,
          explanationOnSuccess: 'Sensacional! 3 × 8 = 24. 24 + 6 = 30 gastos. 50 - 30 = R$ 20,00 de troco certinho!',
          explanationOnError: 'Passo 1: 3 sucos a R$ 8 = R$ 24. Passo 2: Mais R$ 6 do biscoito = R$ 30 no total. Passo 3: Troco = 50 - 30 = R$ 20.',
          hint: 'Calcule primeiro quanto custaram os sucos (3 × 8).'
        }
      }
    ]
  }
};

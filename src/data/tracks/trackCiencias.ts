import { Track } from '../../types.ts';

export const trackCiencias: Track = {
  id: 'trilha-cien-1',
  subjectId: 'ciencias',
  number: 1,
  title: 'Cadeias Alimentares e Vida na Terra',
  description: 'Compreenda o fluxo de energia dos seres vivos: produtores, consumidores, decompositores e o equilíbrio da natureza.',
  objective: 'Analisar e construir cadeias alimentares simples, identificando a posição de plantas, animais herbívoros, carnívoros e microrganismos decompositores.',
  bnccSkills: [
    'EF04CI04: Analisar e construir cadeias alimentares simples, reconhecendo a posição ocupada pelos seres vivos.',
    'EF04CI05: Descrever e destacar semelhanças e diferenças entre o ciclo da matéria e o fluxo de energia.',
    'EF04CI06: Relacionar a participação de fungos e bactérias na reciclagem da matéria orgânica.'
  ],
  color: 'emerald',
  badgeName: 'Biólogo da Natureza',
  badgeIcon: 'Leaf',
  units: [
    {
      id: 't-cien-u1',
      trackId: 'trilha-cien-1',
      number: 1,
      title: 'Produtores e a Energia do Sol',
      shortDesc: 'Descubra como as plantas produzem seu próprio alimento com luz solar!',
      icon: 'Sun',
      xpReward: 35,
      steps: [
        {
          id: 'cien-u1-s1',
          type: 'objective',
          title: 'O Começo de Toda Vida',
          content: 'Você sabia que quase toda a energia que move os animais do planeta Terra vem do Sol? Hoje você vai entender por que os vegetais são chamados de PRODUTORES.',
          mascotTip: 'Teco pergunta: Nós, humanos, conseguimos fabricar comida dentro do nosso corpo só tomando banho de sol? Claro que não! Mas as plantas conseguem!'
        },
        {
          id: 'cien-u1-s2',
          type: 'explanation',
          title: 'A Fábrica Verde: Fotossíntese',
          content: 'As plantas, árvores, algas e capim são seres autotróficos (produtores). Elas usam a luz do Sol, água do solo e o gás carbônico do ar para fabricar glicose (seu alimento) e liberam oxigênio para nós respirarmos!',
          conceptCard: {
            title: 'Ingredientes da Fotossíntese',
            subtitle: 'Como o produtor gera alimento na natureza',
            points: [
              { label: 'Luz Solar', text: 'Fornece a energia necessária para a transformação.', iconEmoji: '☀️' },
              { label: 'Água e Sais', text: 'Absorvidos do solo pelas raízes da planta.', iconEmoji: '💧' },
              { label: 'Gás Carbônico', text: 'Capturado do ar através de microporos nas folhas.', iconEmoji: '🍃' },
              { label: 'Glicose e Oxigênio', text: 'Alimento nutritivo da planta + ar puro que respiramos!', iconEmoji: '🌱' }
            ]
          }
        },
        {
          id: 'cien-u1-s3',
          type: 'guided_practice',
          title: 'Prática: Quem é o Produtor?',
          content: 'Analise os seres vivos a seguir e encontre quem ocupa a primeira posição na cadeia alimentar.',
          quiz: {
            question: 'Em uma floresta, qual dos seguintes seres vivos é um PRODUTOR de alimento?',
            options: [
              'O gafanhoto saltador.',
              'A árvore de ipê amarelo.',
              'O sapo-cururu que caça insetos.',
              'A serpente cascavel.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Correto! O ipê amarelo é uma planta que realiza fotossíntese, produzindo seu próprio alimento e servindo de base para os outros seres.',
            explanationOnError: 'Lembre-se: produtores são as plantas e vegetais que fazem fotossíntese, não os animais que precisam comer outros seres.',
            hint: 'Procure o ser vivo que tem folhas e raízes.'
          }
        }
      ]
    },
    {
      id: 't-cien-u2',
      trackId: 'trilha-cien-1',
      number: 2,
      title: 'Consumidores e Decompositores',
      shortDesc: 'Herbívoros, carnívoros e os mestres da reciclagem natural!',
      icon: 'Activity',
      xpReward: 40,
      steps: [
        {
          id: 'cien-u2-s1',
          type: 'objective',
          title: 'Quem Come Quem na Natureza?',
          content: 'Animais não fabricam seu alimento: eles precisam consumir outros seres vivos! E quando uma folha cai ou um animal morre, quem limpa a Terra? Os DECOMPOSITORES!',
          mascotTip: 'Dica do Teco: A seta numa cadeia alimentar significa "serve de alimento para". Então: Capim ➔ Vaca significa que o capim serve de alimento para a vaca!'
        },
        {
          id: 'cien-u2-s2',
          type: 'explanation',
          title: 'Os Elos da Cadeia Alimentar',
          content: '• Consumidor Primário: Come plantas (herbívoro). Ex: lagarta, coelho, vaca.\n• Consumidor Secundário: Come o herbívoro (carnívoro). Ex: pássaro, sapo.\n• Consumidor Terciário: Predador do carnívoro. Ex: gavião, onça.\n• Decompositores: Fungos e bactérias que transformam restos em nutrientes para o solo!',
          conceptCard: {
            title: 'O Trabalho Invisível dos Decompositores',
            subtitle: 'Sem eles, o planeta ficaria soterrado de folhas secas e matéria morta!',
            points: [
              { label: 'Fungos (Cogumelos)', text: 'Decompõem troncos e folhas secas com enzimas especiais.' },
              { label: 'Bactérias do Solo', text: 'Transformam a matéria orgânica em adubo rico em sais minerais.' },
              { label: 'Ciclo Fechado', text: 'Os nutrientes voltam para as raízes das plantas, recomeçando a vida!' }
            ]
          }
        },
        {
          id: 'cien-u2-s3',
          type: 'guided_practice',
          title: 'Prática: Montando a Sequência Correta',
          content: 'Coloque os seres vivos na ordem em que a energia passa de um para o outro.',
          quiz: {
            question: 'Qual é a ordem correta desta cadeia alimentar simples?',
            options: [
              'Gavião ➔ Planta ➔ Cobra ➔ Sapo',
              'Planta de milho ➔ Gafanhoto ➔ Sapo ➔ Serpente',
              'Sapo ➔ Gafanhoto ➔ Serpente ➔ Planta',
              'Serpente ➔ Planta ➔ Gafanhoto ➔ Sapo'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Excelente! A planta de milho (produtor) é comida pelo gafanhoto (consumidor primário), que é comido pelo sapo (secundário), que é comido pela serpente (terciário)!',
            explanationOnError: 'Toda cadeia alimentar terrestre começa pelo produtor (a planta verde) e segue na direção de quem se alimenta dele.',
            hint: 'A sequência sempre começa com o vegetal (Planta de milho).'
          }
        },
        {
          id: 'cien-u2-s4',
          type: 'independent_exercise',
          title: 'O Papel dos Microrganismos',
          content: 'Vamos avaliar a importância da decomposição.',
          quiz: {
            question: 'O que aconteceria com uma floresta se todos os fungos e bactérias decompositores desaparecessem?',
            options: [
              'As plantas cresceriam dez vezes mais rápido e sem parar.',
              'Os animais não teriam predadores e ficariam felizes.',
              'A matéria morta se acumularia no solo e faltariam nutrientes minerais para as plantas.',
              'A água dos rios evaporaria completamente.'
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Perfeito! Os decompositores são os recicladores da natureza. Sem eles, o solo fica pobre e a matéria orgânica não se renova.',
            explanationOnError: 'Pense no papel de reciclagem: se ninguém decompõe os restos mortos, o que acontece com o solo e o chão da floresta?',
            hint: 'Eles fazem a reciclagem dos nutrientes que adubam a terra.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-cien-1',
    title: 'O Guardião do Ecossistema da Lagoa',
    description: 'Resolva a investigação ecológica da lagoa equilibrada e mostre seu domínio sobre as cadeias alimentares.',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-cien-s1',
        type: 'objective',
        title: 'Desafio Ecológico da Lagoa Serena',
        content: 'Em uma lagoa limpa vivem algas aquáticas, peixinhos que comem algas, garças que pescam peixinhos e bactérias na lama do fundo. Um dia, poluidores jogaram um produto que exterminou as algas verdes!',
        mascotTip: 'Dica do Teco: Mexer em um elo da cadeia alimentar afeta todos os outros seres daquele ambiente!'
      },
      {
        id: 'desafio-cien-s2',
        type: 'final_challenge',
        title: 'Impacto no Equilíbrio Ambiental',
        content: 'Se as algas (produtores) sumirem da lagoa, o que acontecerá a curto prazo com os peixinhos e com as garças?',
        quiz: {
          question: 'Qual será a consequência do sumiço das algas?',
          options: [
            'Os peixinhos ficarão sem alimento e diminuirão, e as garças também terão que buscar comida em outro lugar.',
            'As garças começarão a fazer fotossíntese para sobreviver.',
            'Os peixinhos se transformarão em carnívoros ferozes.',
            'Nada mudará porque os animais não dependem de plantas aquáticas.'
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Certíssimo! Como os produtores sustentam a base da cadeia, o sumiço das algas afeta diretamente os peixes herbívoros e, em seguida, as garças que deles se alimentam.',
          explanationOnError: 'Lembre-se: os peixinhos comem as algas. Sem algas, os peixes passam fome e morrem, deixando as garças sem peixes para pescar.',
          hint: 'Pense em efeito dominó: sem alimento na base, o que ocorre no topo?'
        }
      }
    ]
  }
};

import { Track } from '../../types.ts';

export const trackHistoria: Track = {
  id: 'trilha-hist-1',
  subjectId: 'historia',
  number: 1,
  title: 'Fontes Históricas e as Marcas do Tempo',
  description: 'Descubra como os historiadores viajam no tempo através de fotos, objetos, relatos orais e documentos do passado.',
  objective: 'Reconhecer a história como construção a partir de fontes históricas variadas, identificando permanências e mudanças no tempo e no espaço.',
  bnccSkills: [
    'EF04HI01: Reconhecer a história como resultado da ação de homens e mulheres no tempo e no espaço.',
    'EF04HI02: Identificar mudanças e permanências ao longo do tempo em diferentes aspectos sociais.',
    'EF04HI03: Identificar as transformações ocorridas na cidade e no campo ao longo do tempo por meio de fontes históricas.'
  ],
  color: 'amber',
  badgeName: 'Historiador Mirim',
  badgeIcon: 'Compass',
  units: [
    {
      id: 't-hist-u1',
      trackId: 'trilha-hist-1',
      number: 1,
      title: 'O Que São Fontes Históricas?',
      shortDesc: 'As pistas que as pessoas do passado deixaram para nós!',
      icon: 'FolderSearch',
      xpReward: 35,
      steps: [
        {
          id: 'hist-u1-s1',
          type: 'objective',
          title: 'Detetives do Passado',
          content: 'Como nós podemos saber como viviam as pessoas há 100, 500 ou 1.000 anos se não existiam máquinas do tempo? Nós usamos FONTES HISTÓRICAS!',
          mascotTip: 'Teco diz: Todo objeto, foto antiga ou história que seu avô conta é uma fonte histórica preciosa!'
        },
        {
          id: 'hist-u1-s2',
          type: 'explanation',
          title: 'Os Quatro Tipos de Fontes',
          content: 'Os historiadores classificam as pistas em quatro grupos principais:\n• Escritas: Cartas, diários, jornais, certidões de nascimento, leis antigas.\n• Visuais: Fotografias antigas, pinturas em quadros, mapas desenhados à mão.\n• Materiais: Moedas antigas, roupas de época, brinquedos de madeira, ferramentas.\n• Orais: Entrevistas com idosos, cantigas de roda, histórias contadas pelos povos indígenas.',
          conceptCard: {
            title: 'Museu das Fontes',
            subtitle: 'Exemplos de pistas históricas do cotidiano',
            points: [
              { label: 'Fonte Escrita', text: 'O boletim escolar da sua bisavó guardado numa gaveta.', iconEmoji: '📜' },
              { label: 'Fonte Material', text: 'Um ferro de passar roupa a carvão feito de ferro fundido.', iconEmoji: '🏺' },
              { label: 'Fonte Visual', text: 'Uma foto em preto e branco da praça da cidade em 1940.', iconEmoji: '📷' },
              { label: 'Fonte Oral', text: 'Seu avô contando como era brincar na rua sem luz elétrica.', iconEmoji: '🗣️' }
            ]
          }
        },
        {
          id: 'hist-u1-s3',
          type: 'guided_practice',
          title: 'Prática: Classificando a Pista',
          content: 'Vamos testar seu olho clínico de historiador!',
          quiz: {
            question: 'Uma entrevista gravada em áudio com uma moradora de 90 anos sobre a fundação do bairro é uma fonte histórica de que tipo?',
            options: [
              'Fonte Oral, pois transmite a memória através da fala e relato.',
              'Fonte Material de pedra.',
              'Fonte Puramente Escrita de dicionário.',
              'Não é uma fonte histórica, pois não está em um museu.'
            ],
            correctIndex: 0,
            explanationOnSuccess: 'Excelente! Depoimentos falados, memórias contadas e entrevistas gravadas são clássicas FONTES ORAIS de imenso valor histórico.',
            explanationOnError: 'A gravação registra a voz e a memória falada da pessoa. Por isso, trata-se de uma fonte oral.',
            hint: 'A fala e o relato por voz são fontes orais.'
          }
        }
      ]
    },
    {
      id: 't-hist-u2',
      trackId: 'trilha-hist-1',
      number: 2,
      title: 'Mudanças e Permanências no Tempo',
      shortDesc: 'O que se transformou e o que continua igual na sua comunidade?',
      icon: 'Clock',
      xpReward: 40,
      steps: [
        {
          id: 'hist-u2-s1',
          type: 'objective',
          title: 'O Rio do Tempo',
          content: 'Com o passar dos anos, algumas coisas mudam muito rápido (como os celulares e os carros), enquanto outras permanecem (como o traçado de uma praça histórica ou uma festa tradicional).',
          mascotTip: 'Dica do Teco: Quando olhar para uma foto antiga da sua cidade, repare no que desapareceu e no que ainda está de pé!'
        },
        {
          id: 'hist-u2-s2',
          type: 'explanation',
          title: 'Permanência vs Mudança',
          content: '• Mudança: Transformação que acontece com o tempo. Exemplo: Ruas que eram de terra batida agora são asfaltadas; bondes puxados a cavalo foram substituídos por ônibus elétricos.\n• Permanência: Algo que continua existindo ou sendo praticado. Exemplo: A igreja matriz construída há dois séculos continua no centro da praça; as crianças ainda brincam de amarelinha.',
          readingPassage: {
            title: 'A Padaria do Seu Manoel',
            author: 'Memória Local',
            genre: 'Relato Histórico',
            text: 'Em 1950, a Padaria Central entregava pães quentinhos em carroças de madeira puxadas por cavalos. Hoje, em 2026, as entregas são feitas por motoboys e pedidos pelo aplicativo no celular. Porém, a receita do pão de queijo da bisavó e o carinho no atendimento continuam exatamente os mesmos!'
          }
        },
        {
          id: 'hist-u2-s3',
          type: 'independent_exercise',
          title: 'Exercício: Identificando Permanências',
          content: 'Analise o relato da Padaria Central.',
          quiz: {
            question: 'No texto da Padaria do Seu Manoel, o que representa uma PERMANÊNCIA ao longo das décadas?',
            options: [
              'O uso de carroças de madeira com cavalos na rua.',
              'Os pedidos feitos por aplicativo no smartphone moderno.',
              'A receita tradicional do pão de queijo e a dedicação ao cliente.',
              'A ausência total de veículos a motor.'
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Muito bem! As tecnologias de entrega mudaram (carroça ➔ moto/celular), mas o sabor da receita e a tradição permaneceram no tempo.',
            explanationOnError: 'Preste atenção: permanência é aquilo que NÃO mudou com os anos. A receita continua a mesma de gerações atrás!',
            hint: 'O que resistiu ao tempo e continuou sendo feito até hoje?'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-hist-1',
    title: 'A Cápsula do Tempo da Escola',
    description: 'Ajude os alunos a montar uma cápsula do tempo para que crianças do futuro conheçam a nossa época!',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-hist-s1',
        type: 'objective',
        title: 'Missão do Arquivista do Tempo',
        content: 'Os alunos do 4º ano decidiram enterrar uma caixa de aço (cápsula do tempo) para ser aberta somente daqui a 50 anos, em 2076! Eles precisam selecionar fontes históricas autênticas da nossa época.'
      },
      {
        id: 'desafio-hist-s2',
        type: 'final_challenge',
        title: 'Escolha das Fontes para o Futuro',
        content: 'Quais itens formam um conjunto rico de fontes para os estudantes de 2076 entenderem o nosso tempo?',
        quiz: {
          question: 'Qual dos grupos abaixo reúne fontes históricas diversificadas (escrita, visual, material e relato)?',
          options: [
            'Apenas 5 folhas em branco de sulfite sem nada escrito.',
            'Um caderno de lições da turma, uma foto da classe com o professor, uma moeda atual e uma gravação das vozes das crianças cantando o hino.',
            'Três pedras comuns colhidas no chão do jardim.',
            'Um copo descartável de plástico amassado.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Parabéns, Historiador! Esse conjunto traz fonte escrita (caderno), visual (foto), material (moeda) e oral (áudio), permitindo uma visão completa e emocionante do nosso tempo.',
          explanationOnError: 'Uma cápsula do tempo deve conter registros verdadeiros e variados da cultura, cotidiano e pessoas da época.',
          hint: 'Escolha a opção que tem fotos, escritos, moedas e gravações reais.'
        }
      }
    ]
  }
};

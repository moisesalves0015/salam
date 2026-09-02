import { Student, ClassMetrics, Mission, CardItem, AchievementItem, InterventionRecord } from '../types';

export const INITIAL_CARDS: CardItem[] = [
  {
    id: 'card-guardiao-divisao',
    name: 'Guardião da Divisão',
    category: 'personagens',
    description: 'Você mostrou que entende como dividir formando grupos iguais.',
    subject: 'Matemática',
    rarity: 'epico',
    icon: '÷',
    formulaOrQuote: '12 ÷ 3 = 4 grupos iguais',
    unlocked: true,
    unlockedAt: 'Hoje'
  },
  {
    id: 'card-mestre-numeros',
    name: 'Mestre dos Números',
    category: 'conhecimento',
    description: 'Domínio de composição, decomposição e valor posicional.',
    subject: 'Matemática',
    rarity: 'raro',
    icon: '123',
    formulaOrQuote: 'Composição de centenas, dezenas e unidades',
    unlocked: true,
    unlockedAt: 'Ontem'
  },
  {
    id: 'card-robo-multiplicador',
    name: 'Robô Multiplicador',
    category: 'personagens',
    description: 'Multiplica com agilidade e compreende a adição de parcelas iguais.',
    subject: 'Matemática',
    rarity: 'raro',
    icon: '⚙️',
    formulaOrQuote: '4 × 6 = 24',
    unlocked: true,
    unlockedAt: '3 dias atrás'
  },
  {
    id: 'card-coruja-leitura',
    name: 'Coruja da Leitura',
    category: 'personagens',
    description: 'Fluência na leitura e busca atenta por pistas no texto.',
    subject: 'Língua Portuguesa',
    rarity: 'lendario',
    icon: '🦉',
    formulaOrQuote: 'Compreender é enxergar além das linhas',
    unlocked: true,
    unlockedAt: 'Semana passada'
  },
  {
    id: 'card-mestre-escrita',
    name: 'Mestre da Escrita',
    category: 'conhecimento',
    description: 'Produção com coerência, pontuação e clareza de ideias.',
    subject: 'Língua Portuguesa',
    rarity: 'raro',
    icon: '✍️',
    formulaOrQuote: 'Ideia clara + estrutura + revisão',
    unlocked: true,
    unlockedAt: 'Semana passada'
  },
  {
    id: 'card-persistencia-ouro',
    name: 'Persistência de Ouro',
    category: 'conquista',
    description: 'Revisou 5 erros e descobriu caminhos diferentes sem desistir!',
    rarity: 'epico',
    icon: '⭐',
    formulaOrQuote: 'O erro é uma pista para aprender',
    unlocked: true,
    unlockedAt: '4 dias atrás'
  },
  {
    id: 'card-desafio-coletivo',
    name: 'Desafio Coletivo da Semana',
    category: 'especiais',
    description: 'Participação ativa na resolução colaborativa com a turma.',
    rarity: 'lendario',
    icon: '🏆',
    formulaOrQuote: 'Juntos exploramos territórios maiores',
    unlocked: false
  },
  {
    id: 'card-dragao-divisao',
    name: 'Dragão da Divisão Complexa',
    category: 'personagens',
    description: 'Pronto para aplicar divisão em situações-problema com resto.',
    subject: 'Matemática',
    rarity: 'lendario',
    icon: '🐉',
    formulaOrQuote: 'Transferência em novos cenários',
    unlocked: false
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Primeiro Passo do Explorador',
    description: 'Concluiu o diagnóstico inicial e iniciou sua trilha.',
    category: 'evolucao',
    icon: 'compass',
    color: '#6366f1',
    unlocked: true,
    unlockedAt: 'Sem. 14',
    xpReward: 50
  },
  {
    id: 'ach-2',
    title: 'Mestre da Revisão',
    description: 'Revisou um desafio com erro e compreendeu o raciocínio.',
    category: 'persistencia',
    icon: 'refresh-cw',
    color: '#ec4899',
    unlocked: true,
    unlockedAt: 'Ontem',
    xpReward: 30
  },
  {
    id: 'ach-3',
    title: 'Guardião dos Grupos',
    description: 'Compreendeu divisão com objetos concretos e representação visual.',
    category: 'dominio',
    icon: 'shield',
    color: '#8b5cf6',
    unlocked: true,
    unlockedAt: 'Hoje',
    xpReward: 40
  },
  {
    id: 'ach-4',
    title: 'Sequência Flamejante (4 Dias)',
    description: 'Estudou com regularidade durante 4 dias seguidos na semana.',
    category: 'persistencia',
    icon: 'flame',
    color: '#f59e0b',
    unlocked: true,
    unlockedAt: 'Hoje',
    xpReward: 25
  },
  {
    id: 'ach-5',
    title: 'Explorador da Natureza',
    description: 'Concluiu a primeira etapa da Ilha das Ciências.',
    category: 'evolucao',
    icon: 'flask-conical',
    color: '#10b981',
    unlocked: true,
    unlockedAt: 'Semana passada',
    xpReward: 35
  },
  {
    id: 'ach-6',
    title: 'Companheiro Solidário',
    description: 'Explicou um raciocínio matemático para um colega em grupo.',
    category: 'colaboracao',
    icon: 'users',
    color: '#3b82f6',
    unlocked: true,
    unlockedAt: 'Sem. 17',
    xpReward: 50
  },
  {
    id: 'ach-7',
    title: 'Mestre da Divisão (Transferência)',
    description: 'Resolveu um problema contextualizado inédito aplicando divisão.',
    category: 'dominio',
    icon: 'award',
    color: '#f59e0b',
    unlocked: false,
    xpReward: 100
  },
  {
    id: 'ach-8',
    title: 'Leitor Voraz',
    description: 'Completou 5 leituras guiadas sem interrupções.',
    category: 'evolucao',
    icon: 'book-open',
    color: '#38bdf8',
    unlocked: true,
    unlockedAt: 'Sem. 16',
    xpReward: 40
  }
];

export const INITIAL_MISSION: Mission = {
  id: 'missao-02-grupos',
  title: 'O desafio dos grupos',
  subject: 'Matemática',
  trailName: 'Trilha dos Números • Reino da Matemática',
  primaryAbility: 'Divisão por agrupamento',
  difficulty: 'Média',
  status: 'Em andamento',
  progress: 60,
  objective: 'Compreender divisão como formação de grupos iguais.',
  estimatedMinutes: 15,
  xpReward: 50,
  steps: [
    {
      type: 'explorar',
      title: 'Explorar',
      subtitle: 'Entenda o desafio com exemplos práticos',
      content: 'Imagine que temos 12 estrelas mágicas e precisamos guardá-las em 3 baús de tesouro. Para que ninguém fique com ciúmes, cada baú precisa ter exatamente a mesma quantidade de estrelas.',
      question: 'O que significa dividir 12 em 3 partes iguais?',
      interactiveData: {
        totalItems: 12,
        targetGroups: 3,
        itemsPerGroup: 4,
        itemName: 'estrelas',
        itemEmoji: '⭐'
      }
    },
    {
      type: 'tentar',
      title: 'Tentar',
      subtitle: 'Faça com atenção e forme os grupos',
      content: 'Agora é sua vez de ser o Guardião! Distribua 12 maçãs igualmente entre 3 cestas de piquenique.',
      question: 'Quantas maçãs vão ficar em cada uma das 3 cestas?',
      options: [
        { text: '3 maçãs em cada cesta', correct: false, feedback: 'Com 3 em cada cesta teríamos 3 × 3 = 9 maçãs no total. Ainda sobram maçãs!' },
        { text: '4 maçãs em cada cesta', correct: true, feedback: 'Perfeito! 4 + 4 + 4 = 12 maçãs. Grupos iguaizinhos!' },
        { text: '5 maçãs em cada cesta', correct: false, feedback: 'Com 5 em cada cesta precisaríamos de 15 maçãs, mas temos só 12.' },
        { text: '6 maçãs em cada cesta', correct: false, feedback: '6 + 6 já dá 12 em apenas 2 cestas, mas temos 3 cestas!' }
      ]
    },
    {
      type: 'revisar',
      title: 'Revisar',
      subtitle: 'Veja o que você aprendeu com a estratégia',
      content: 'Perceba como a multiplicação e a divisão são grandes amigas: se 3 × 4 = 12, então 12 ÷ 3 = 4! Formar grupos iguais é o grande segredo da divisão.',
      question: 'Se tivéssemos 15 estrelas para dividir em 3 baús iguais, quantas estrelas iriam para cada baú?',
      options: [
        { text: '4 estrelas', correct: false, feedback: '4 × 3 = 12, faltam 3 para chegar a 15.' },
        { text: '5 estrelas', correct: true, feedback: 'Sensacional! 3 grupos de 5 formam exatamente 15 (3 × 5 = 15).' },
        { text: '6 estrelas', correct: false, feedback: '3 grupos de 6 precisariam de 18 estrelas.' }
      ]
    },
    {
      type: 'desafiar',
      title: 'Desafiar (Transferência)',
      subtitle: 'Aplique em uma situação do mundo real',
      content: 'A escola recebeu 24 livros novos para a biblioteca e quer distribuí-los igualmente entre 6 mesas de leitura. Quantos livros cada mesa receberá?',
      contextProblem: {
        scenario: 'A escola recebeu 24 livros para distribuir igualmente entre 6 mesas.',
        total: 24,
        divisor: 6,
        question: 'Quantos livros cada mesa receberá?',
        expectedAnswer: 4,
        explanationPrompt: 'Como você pensou para chegar nesta resposta?'
      },
      options: [
        { text: '3 livros por mesa (pois 6 × 3 = 18)', correct: false, feedback: 'Sobram livros sem distribuir!' },
        { text: '4 livros por mesa (pois 6 × 4 = 24)', correct: true, feedback: 'Excelente transferência! Todas as 6 mesas receberão exatamente 4 livros.' },
        { text: '5 livros por mesa (pois 6 × 5 = 30)', correct: false, feedback: 'Precisaríamos de 30 livros, mas a escola tem 24.' }
      ]
    },
    {
      type: 'refletir',
      title: 'Refletir',
      subtitle: 'Você melhorou depois da revisão!',
      content: 'Revisar e refletir faz parte da jornada de um verdadeiro explorador do conhecimento.',
      reflectionPrompt: 'O que te ajudou mais a entender a divisão hoje? (Ex: desenhar grupos, contar tampinhas ou lembrar da tabuada)'
    }
  ]
};

export const INITIAL_MISSION_DIVISAO = INITIAL_MISSION;

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'aluno-joao',
    name: 'João',
    avatar: '👦',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'intervencao',
    statusAlertText: 'Divisão — dificuldade persistente. Últimas 3 missões com baixo desempenho.',
    level: 12,
    currentXp: 1840,
    nextLevelXp: 2500,
    streakDays: 4,
    weekDaysActive: [
      { day: 'S', active: true },
      { day: 'T', active: true },
      { day: 'Q', active: true },
      { day: 'Q', active: true, isToday: true },
      { day: 'S', active: false },
      { day: 'S', active: false },
      { day: 'D', active: false }
    ],
    trailProgress: {
      portugues: 80,
      matematica: 60,
      ciencias: 40
    },
    abilities: [
      {
        id: 'ab-mat-adicao',
        name: 'Adição',
        subject: 'Matemática',
        state: 'dominada',
        score: 90,
        attempts: 14,
        revisions: 2,
        interventions: 0,
        autonomy: 95,
        evidence: {
          precision: 'dominada',
          autonomy: 'dominada',
          consistency: 'dominada',
          explanation: 'dominada',
          contextualSituation: 'dominada'
        }
      },
      {
        id: 'ab-mat-subtracao',
        name: 'Subtração',
        subject: 'Matemática',
        state: 'consolidando',
        score: 75,
        attempts: 12,
        revisions: 4,
        interventions: 1,
        autonomy: 80,
        evidence: {
          precision: 'dominada',
          autonomy: 'consolidando',
          consistency: 'consolidando',
          explanation: 'consolidando',
          contextualSituation: 'consolidando'
        }
      },
      {
        id: 'ab-mat-multiplicacao',
        name: 'Multiplicação',
        subject: 'Matemática',
        state: 'em_desenvolvimento',
        score: 60,
        attempts: 15,
        revisions: 6,
        interventions: 2,
        autonomy: 65,
        evidence: {
          precision: 'consolidando',
          autonomy: 'em_desenvolvimento',
          consistency: 'em_desenvolvimento',
          explanation: 'consolidando',
          contextualSituation: 'em_desenvolvimento'
        }
      },
      {
        id: 'ab-mat-divisao',
        name: 'Divisão',
        subject: 'Matemática',
        state: 'nao_desenvolvida',
        score: 25,
        attempts: 18,
        revisions: 7,
        interventions: 3,
        autonomy: 62,
        evidence: {
          precision: 'em_desenvolvimento',
          autonomy: 'em_desenvolvimento',
          consistency: 'consolidando',
          explanation: 'dominada',
          contextualSituation: 'nao_demonstrada'
        }
      },
      {
        id: 'ab-mat-problemas',
        name: 'Problemas',
        subject: 'Matemática',
        state: 'em_desenvolvimento',
        score: 45,
        attempts: 9,
        revisions: 5,
        interventions: 2,
        autonomy: 50,
        evidence: {
          precision: 'em_desenvolvimento',
          autonomy: 'em_desenvolvimento',
          consistency: 'em_desenvolvimento',
          explanation: 'em_desenvolvimento',
          contextualSituation: 'nao_demonstrada'
        }
      }
    ],
    currentMission: {
      id: 'missao-02-grupos',
      title: 'Dividindo com estratégia',
      primaryAbility: 'Divisão',
      difficulty: 'Média',
      status: 'Em andamento',
      progress: 60
    },
    cards: INITIAL_CARDS,
    achievements: INITIAL_ACHIEVEMENTS,
    interventions: [
      {
        id: 'int-joao-1',
        studentId: 'aluno-joao',
        studentName: 'João',
        ability: 'Divisão por agrupamento',
        subject: 'Matemática',
        date: 'Hoje',
        time: '14:00',
        title: 'Reforço em pequenos grupos',
        strategy: 'Uso de tampinhas e formação de grupos iguais com material concreto',
        initialAttemptError: 'Errou ao determinar o número de grupos por tentativa puramente mental sem apoio visual.',
        interventionApplied: 'Trabalho prático com 24 tampinhas divididas fisicamente em 4 e 6 copos.',
        newAttemptResult: 'Compreendeu e acertou 3 novos agrupamentos explicando o passo a passo.',
        nextStep: 'Aplicar divisão em problema contextualizado da biblioteca escolar.',
        status: 'agendada'
      }
    ],
    pedagogicalNotes: 'João tem ótimo raciocínio visual quando utiliza representações gráficas ou material concreto. A transição para o algoritmo formal precisa ser mediada com situações do cotidiano.',
    adaptations: ['Tempo adicional para raciocínio', 'Suporte com material manipulável (tampinhas e fichas)', 'Representação gráfica dos enunciados'],
    diagnosticCompleted: true,
    historyLog: [
      { date: 'Hoje', action: 'Missão iniciada', detail: 'Iniciou a missão "O desafio dos grupos"', xpEarned: 10 },
      { date: 'Ontem', action: 'Revisão concluída', detail: 'Revisou divisão com apoio visual', xpEarned: 15 },
      { date: '25/08', action: 'Conquista desbloqueada', detail: 'Guardião dos Grupos', xpEarned: 40 }
    ]
  },
  {
    id: 'aluno-maria',
    name: 'Maria',
    avatar: '👧',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'atencao',
    statusAlertText: 'Interpretação — progresso lento. Evolução abaixo do esperado nas últimas 2 semanas.',
    level: 11,
    currentXp: 1620,
    nextLevelXp: 2200,
    streakDays: 3,
    weekDaysActive: [
      { day: 'S', active: true },
      { day: 'T', active: true },
      { day: 'Q', active: true },
      { day: 'Q', active: false },
      { day: 'S', active: false },
      { day: 'S', active: false },
      { day: 'D', active: false }
    ],
    trailProgress: {
      portugues: 55,
      matematica: 75,
      ciencias: 65
    },
    abilities: [
      {
        id: 'ab-por-leitura',
        name: 'Leitura e Fluência',
        subject: 'Língua Portuguesa',
        state: 'consolidando',
        score: 70,
        attempts: 11,
        revisions: 3,
        interventions: 1,
        autonomy: 75,
        evidence: {
          precision: 'consolidando',
          autonomy: 'consolidando',
          consistency: 'consolidando',
          explanation: 'consolidando',
          contextualSituation: 'consolidando'
        }
      },
      {
        id: 'ab-por-interpretacao',
        name: 'Interpretação de texto',
        subject: 'Língua Portuguesa',
        state: 'em_desenvolvimento',
        score: 40,
        attempts: 16,
        revisions: 8,
        interventions: 3,
        autonomy: 50,
        evidence: {
          precision: 'em_desenvolvimento',
          autonomy: 'em_desenvolvimento',
          consistency: 'em_desenvolvimento',
          explanation: 'em_desenvolvimento',
          contextualSituation: 'nao_demonstrada'
        }
      },
      {
        id: 'ab-mat-adicao',
        name: 'Adição e Subtração',
        subject: 'Matemática',
        state: 'dominada',
        score: 88,
        attempts: 10,
        revisions: 1,
        interventions: 0,
        autonomy: 90,
        evidence: {
          precision: 'dominada',
          autonomy: 'dominada',
          consistency: 'dominada',
          explanation: 'dominada',
          contextualSituation: 'dominada'
        }
      }
    ],
    currentMission: {
      id: 'missao-maria-texto',
      title: 'A ideia principal do texto',
      primaryAbility: 'Interpretação de texto',
      difficulty: 'Média',
      status: 'Em andamento',
      progress: 40
    },
    cards: INITIAL_CARDS.slice(0, 4),
    achievements: INITIAL_ACHIEVEMENTS.slice(0, 4),
    interventions: [
      {
        id: 'int-maria-1',
        studentId: 'aluno-maria',
        studentName: 'Maria',
        ability: 'Interpretação de texto',
        subject: 'Língua Portuguesa',
        date: 'Amanhã',
        time: '09:30',
        title: 'Leitura guiada e perguntas chave',
        strategy: 'Técnica de marcação de palavras-chave e inferência de parágrafos curtos',
        initialAttemptError: 'Dificuldade em identificar a ideia central separando-a de detalhes secundários.',
        interventionApplied: 'Leitura dialogada com perguntas orientadoras.',
        nextStep: 'Texto com tirinhas e fábulas com moral explícita.',
        status: 'agendada'
      }
    ],
    pedagogicalNotes: 'Maria lê com boa velocidade, mas precisa de suporte na etapa de reflexão profunda para sintetizar a tese do autor.',
    adaptations: ['Textos com espaçamento aumentado', 'Sublinhamento de palavras-chave guiado'],
    diagnosticCompleted: true,
    historyLog: [
      { date: 'Ontem', action: 'Leitura realizada', detail: 'Leu fábula e respondeu perguntas de compreensão', xpEarned: 20 }
    ]
  },
  {
    id: 'aluno-pedro',
    name: 'Pedro',
    avatar: '🧒',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'pronto_avancar',
    statusAlertText: 'Pronto para avançar nas trilhas. Desempenho consistente e alta conclusão de missões.',
    level: 15,
    currentXp: 2890,
    nextLevelXp: 3500,
    streakDays: 5,
    weekDaysActive: [
      { day: 'S', active: true },
      { day: 'T', active: true },
      { day: 'Q', active: true },
      { day: 'Q', active: true, isToday: true },
      { day: 'S', active: true },
      { day: 'S', active: false },
      { day: 'D', active: false }
    ],
    trailProgress: {
      portugues: 92,
      matematica: 95,
      ciencias: 88
    },
    abilities: [
      {
        id: 'ab-pedro-mat',
        name: 'Operações e Problemas',
        subject: 'Matemática',
        state: 'transferencia',
        score: 98,
        attempts: 20,
        revisions: 1,
        interventions: 0,
        autonomy: 98,
        evidence: {
          precision: 'dominada',
          autonomy: 'dominada',
          consistency: 'dominada',
          explanation: 'dominada',
          contextualSituation: 'dominada'
        }
      }
    ],
    currentMission: {
      id: 'missao-pedro-desafios',
      title: 'Desafios matemáticos',
      primaryAbility: 'Problemas',
      difficulty: 'Difícil',
      status: 'Concluída',
      progress: 100
    },
    cards: INITIAL_CARDS,
    achievements: INITIAL_ACHIEVEMENTS,
    interventions: [
      {
        id: 'int-pedro-1',
        studentId: 'aluno-pedro',
        studentName: 'Pedro',
        ability: 'Desafios matemáticos de ampliação',
        subject: 'Matemática',
        date: 'Sexta',
        time: '10:00',
        title: 'Atividades de ampliação e tutoria',
        strategy: 'Desafios da Olimpíada de Matemática e atuação como monitor colaborador',
        interventionApplied: 'Propor problemas de lógica aberta e propor que Pedro crie desafios para o mural da sala.',
        nextStep: 'Trilha avançada de frações e geometria.',
        status: 'agendada'
      }
    ],
    pedagogicalNotes: 'Pedro demonstra domínio consolidado e grande interesse em problemas complexos.',
    adaptations: ['Atividades de enriquecimento curricular'],
    diagnosticCompleted: true,
    historyLog: [
      { date: 'Hoje', action: 'Missão concluída', detail: 'Finalizou "Desafios matemáticos" com 100% de acerto', xpEarned: 50 }
    ]
  },
  {
    id: 'aluno-ana',
    name: 'Ana',
    avatar: '👧',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'evoluindo_bem',
    statusAlertText: 'Evoluindo bem nas trilhas de Português e Ciências.',
    level: 13,
    currentXp: 2100,
    nextLevelXp: 2800,
    streakDays: 4,
    weekDaysActive: [
      { day: 'S', active: true },
      { day: 'T', active: true },
      { day: 'Q', active: true },
      { day: 'Q', active: true, isToday: true },
      { day: 'S', active: false },
      { day: 'S', active: false },
      { day: 'D', active: false }
    ],
    trailProgress: {
      portugues: 85,
      matematica: 70,
      ciencias: 80
    },
    abilities: [],
    currentMission: {
      id: 'missao-ana-mult',
      title: 'Multiplicação no dia a dia',
      primaryAbility: 'Multiplicação',
      difficulty: 'Média',
      status: 'Em andamento',
      progress: 75
    },
    cards: INITIAL_CARDS.slice(0, 5),
    achievements: INITIAL_ACHIEVEMENTS.slice(0, 5),
    interventions: [],
    pedagogicalNotes: 'Ana é participativa e tem mostrado grande persistência.',
    adaptations: [],
    diagnosticCompleted: true,
    historyLog: []
  },
  {
    id: 'aluno-lucas',
    name: 'Lucas',
    avatar: '👦',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'evoluindo_bem',
    statusAlertText: 'Superou a etapa de fluência na leitura.',
    level: 12,
    currentXp: 1950,
    nextLevelXp: 2500,
    streakDays: 3,
    weekDaysActive: [
      { day: 'S', active: true },
      { day: 'T', active: true },
      { day: 'Q', active: true },
      { day: 'Q', active: false },
      { day: 'S', active: false },
      { day: 'S', active: false },
      { day: 'D', active: false }
    ],
    trailProgress: {
      portugues: 78,
      matematica: 65,
      ciencias: 70
    },
    abilities: [],
    currentMission: {
      id: 'missao-lucas-leitura',
      title: 'Leitura e fluência guiada',
      primaryAbility: 'Fluência',
      difficulty: 'Fácil',
      status: 'Concluída',
      progress: 100
    },
    cards: INITIAL_CARDS.slice(0, 4),
    achievements: INITIAL_ACHIEVEMENTS.slice(0, 4),
    interventions: [],
    pedagogicalNotes: 'Boa resposta às atividades com leitura em duplas.',
    adaptations: [],
    diagnosticCompleted: true,
    historyLog: []
  }
];

export const INITIAL_CLASS_METRICS: ClassMetrics = {
  totalStudents: 32,
  evolvingWell: 18,
  evolvingWellPercent: 56,
  needsAttention: 9,
  needsAttentionPercent: 28,
  needsIntervention: 5,
  needsInterventionPercent: 16,
  readyToAdvance: 4,
  averageMissionProgressPercent: 72,
  activeTrailsCount: 4,
  completedMissionsMonth: 128,
  completedMissionsMonthGrowth: 18,
  classEngagementPercent: 72,
  classWeeklyGoalPercent: 70,
  progressByWeek: [
    { week: 'Sem. 14', averageProgress: 38 },
    { week: 'Sem. 15', averageProgress: 45 },
    { week: 'Sem. 16', averageProgress: 52 },
    { week: 'Sem. 17', averageProgress: 62 },
    { week: 'Sem. 18', averageProgress: 72 }
  ]
};

export const RECOMMENDED_RESOURCES = [
  {
    id: 'rec-1',
    title: 'Kit de Fichas Táteis e Tampinhas',
    category: 'Material Concreto',
    desc: 'Atividade prática de divisão e agrupamento físico para duplas.',
    icon: 'shapes'
  },
  {
    id: 'rec-2',
    title: 'Tirinhas e Fábulas com Pistas Gráficas',
    category: 'Língua Portuguesa',
    desc: 'Textos com perguntas guiadas para alunos com atenção em interpretação.',
    icon: 'book-open'
  },
  {
    id: 'rec-3',
    title: 'Álbum de Cards Colecionáveis para Impressão',
    category: 'Gamificação Pedagógica',
    desc: 'Folhas prontas para imprimir cards físicos e carimbos de conquista.',
    icon: 'printer'
  },
  {
    id: 'rec-4',
    title: 'Guia de Intervenções e Protocolos Docentes',
    category: 'Apoio ao Professor',
    desc: 'Sugestões pedagógicas para transformar erros em pistas de aprendizagem.',
    icon: 'file-text'
  }
];

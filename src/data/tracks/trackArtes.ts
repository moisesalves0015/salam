import { Track } from '../../types.ts';

export const trackArtes: Track = {
  id: 'trilha-art-1',
  subjectId: 'artes',
  number: 1,
  title: 'Cores, Linhas e Olhares da Arte',
  description: 'Descubra a magia das artes visuais: o ponto, as linhas retas e curvas, o círculo cromático das cores e as manifestações culturais.',
  objective: 'Identificar e explorar os elementos constitutivos das artes visuais (ponto, linha, forma, cor) e apreciar produções artísticas diversas.',
  bnccSkills: [
    'EF04AR01: Identificar e apreciar formas distintas das artes visuais tradicionais e contemporâneas.',
    'EF04AR02: Explorar e reconhecer elementos constitutivos das artes visuais (ponto, linha, forma, cor, espaço, movimento).',
    'EF04AR04: Experimentar diferentes formas de expressão artística (desenho, pintura, colagem, escultura).'
  ],
  color: 'rose',
  badgeName: 'Artista Criativo',
  badgeIcon: 'Palette',
  units: [
    {
      id: 't-art-u1',
      trackId: 'trilha-art-1',
      number: 1,
      title: 'Ponto, Linha e Forma',
      shortDesc: 'Como todo grande desenho começa a partir de um simples toque!',
      icon: 'PenTool',
      xpReward: 35,
      steps: [
        {
          id: 'art-u1-s1',
          type: 'objective',
          title: 'Os Blocos de Construção da Arte',
          content: 'Sabia que até a obra mais famosa do mundo começou com um simples ponto? Hoje você vai descobrir como os artistas usam pontos, linhas retas, onduladas e formas geométricas para expressar emoções.',
          mascotTip: 'Teco artista: Uma linha nada mais é do que um ponto que saiu para passear no papel!'
        },
        {
          id: 'art-u1-s2',
          type: 'explanation',
          title: 'A Dança das Linhas',
          content: '• Linhas Retas Verticais: Transmitem firmeza, força e altura (como árvores ou prédios imponentes).\n• Linhas Horizontais: Lembram tranquilidade, descanso e paz (como o horizonte do mar calmo).\n• Linhas Onduladas e Curvas: Transmitem movimento, vento, dança e leveza.\n• Linhas Quebradas (Zigue-zague): Passam sensação de agitação, energia elétrica ou perigo.',
          conceptCard: {
            title: 'Gramática Visual',
            subtitle: 'Sentimentos que as linhas despertam em quem olha',
            points: [
              { label: 'Ponto', text: 'O menor elemento visual; vários pontos juntos criam texturas (pontilhismo).' },
              { label: 'Linha Curva', text: 'Cria sensação de suavidade e ondas do mar.' },
              { label: 'Forma Geométrica', text: 'Quadrados, círculos e triângulos organizam o olhar do espectador.' }
            ]
          }
        },
        {
          id: 'art-u1-s3',
          type: 'guided_practice',
          title: 'Prática: Emoção das Linhas',
          content: 'Se um pintor quer retratar uma tempestade furiosa em alto-mar com ventos fortes, raios e ondas revoltas, que tipos de linhas ele deve priorizar?',
          quiz: {
            question: 'Quais linhas melhor transmitem a energia violenta de uma tempestade com raios?',
            options: [
              'Linhas horizontais perfeitamente retas e paradas.',
              'Linhas em zigue-zague agitadas e curvas revoltas de grande amplitude.',
              'Apenas pontos bem espaçados e suaves.',
              'Nenhuma linha, apenas uma folha em branco.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Exato! O zigue-zague expressa os relâmpagos e a agitação elétrica, enquanto as curvas revoltas mostram a força das ondas e do vento!',
            explanationOnError: 'Linhas retas e horizontais passam calma. Para uma tempestade de raios e mar bravo, precisamos de zigue-zague e ondas energéticas.',
            hint: 'Pense no formato do raio riscando o céu.'
          }
        }
      ]
    },
    {
      id: 't-art-u2',
      trackId: 'trilha-art-1',
      number: 2,
      title: 'A Magia das Cores: Primárias e Secundárias',
      shortDesc: 'Aprenda a misturar tintas e criar novas cores incríveis!',
      icon: 'Pipette',
      xpReward: 40,
      steps: [
        {
          id: 'art-u2-s1',
          type: 'objective',
          title: 'O Laboratório do Pintor',
          content: 'Com apenas 3 cores puras na sua paleta, você é capaz de inventar quase todas as cores do arco-íris! Vamos aprender a alquimia das cores primárias e secundárias.',
          mascotTip: 'Dica do Teco: Cores Primárias são as cores mães: Vermelho, Amarelo e Azul. Elas não nascem de mistura nenhuma!'
        },
        {
          id: 'art-u2-s2',
          type: 'explanation',
          title: 'A Mistura das Cores Secundárias',
          content: 'Quando juntamos duas cores primárias em partes iguais, nasce uma cor secundária:\n\n• Amarelo + Azul = VERDE 🍃\n• Amarelo + Vermelho = LARANJA 🍊\n• Azul + Vermelho = ROXO (ou Violeta) 🍇\n\nAlém disso, temos as Cores Quentes (amarelo, laranja, vermelho que lembram sol e calor) e as Cores Frias (azul, verde, roxo que lembram água, gelo e mata).',
          conceptCard: {
            title: 'Roda das Cores (Círculo Cromático)',
            subtitle: 'A harmonia visual indispensável em qualquer pintura',
            points: [
              { label: 'Primárias', text: 'Vermelho, Amarelo e Azul (puras e originais).' },
              { label: 'Secundárias', text: 'Verde, Laranja e Roxo (geradas por misturas).' },
              { label: 'Cores Quentes', text: 'Passam vibração, energia, alegria e proximidade.' },
              { label: 'Cores Frias', text: 'Passam tranquilidade, mistério, serenidade e frescor.' }
            ]
          }
        },
        {
          id: 'art-u2-s3',
          type: 'independent_exercise',
          title: 'Exercício: A Mistura de Tintas',
          content: 'Você está no ateliê e precisa pintar a copa verde de uma grande árvore, mas seu potinho de tinta verde acabou!',
          quiz: {
            question: 'Quais duas tintas primárias você deve misturar no pratinho para produzir a cor verde?',
            options: [
              'Vermelho com Amarelo.',
              'Azul com Amarelo.',
              'Vermelho com Preto.',
              'Azul com Vermelho.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Perfeito! Azul misturado com Amarelo dá a cor Verde da natureza!',
            explanationOnError: 'Lembre-se da receita mágica: o Amarelo solar com o Azul das águas se combinam para criar o Verde das folhas.',
            hint: 'Amarelo + Azul = Verde.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-art-1',
    title: 'A Grande Exposição da Galeria de Arte',
    description: 'Analise a obra de arte colorida, identifique as escolhas do artista e ganhe o crachá de Curador de Arte!',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-art-s1',
        type: 'objective',
        title: 'Desafio do Curador Mirim',
        content: 'Um famoso quadro brasileiro retrata uma festa junina à noite no Nordeste, com fogueira crepitante vermelha e alaranjada, bandeirinhas coloridas e um céu azul escuro estrelado.'
      },
      {
        id: 'desafio-art-s2',
        type: 'final_challenge',
        title: 'Contraste entre Cores Quentes e Frias',
        content: 'Por que o artista escolheu colocar o fogo em tons de vermelho e amarelo contra o céu azul escuro da noite?',
        quiz: {
          question: 'Qual é o efeito do contraste entre as cores quentes da fogueira e a cor fria da noite?',
          options: [
            'Faz a fogueira parecer apagada e invisível.',
            'Cria um contraste visual marcante que faz a chama do fogo se destacar e brilhar intensamente.',
            'Estraga a pintura porque cores quentes e frias nunca devem aparecer na mesma tela.',
            'Faz o céu parecer de dia em vez de noite.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Brilhante olhar de artista! O contraste entre o fundo frio (azul escuro) e o primeiro plano quente (amarelo e vermelho) atrai o olhar e dá vida ao calor da fogueira!',
          explanationOnError: 'Cores quentes sobre fundo frio criam grande luminosidade e destaque para o elemento principal.',
          hint: 'O fogo salta aos olhos quando o fundo é escuro e frio.'
        }
      }
    ]
  }
};

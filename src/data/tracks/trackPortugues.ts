import { Track } from '../../types.ts';

export const trackPortugues: Track = {
  id: 'trilha-port-1',
  subjectId: 'portugues',
  number: 1,
  title: 'Leitura, Interpretação e Detetives do Texto',
  description: 'Descubra pistas no texto, localize informações, decifre personagens e compreenda o sentido real das palavras.',
  objective: 'Desenvolver a leitura autônoma, a localização de dados explícitos, a inferência de sentidos implícitos e a ampliação de vocabulário no 4º ano.',
  bnccSkills: [
    'EF04LP01: Localizar informações explícitas em textos.',
    'EF04LP03: Inferir o sentido de palavras ou expressões com base no contexto.',
    'EF04LP09: Identificar a ideia central e detalhes relevantes em narrativas.',
    'EF04LP14: Recuperar relações entre partes de um texto e deduzir intenções do narrador.'
  ],
  color: 'blue',
  badgeName: 'Mestre da Leitura e Compreensão',
  badgeIcon: 'BookOpen',
  units: [
    {
      id: 't-port-u1',
      trackId: 'trilha-port-1',
      number: 1,
      title: 'Informações Explícitas no Texto',
      shortDesc: 'Aprenda a encontrar dados que o texto diz com todas as letras!',
      icon: 'Search',
      xpReward: 35,
      steps: [
        {
          id: 'port-u1-s1',
          type: 'objective',
          title: 'Objetivo do Detetive Textual',
          content: 'Hoje você vai aprender a ler com atenção para localizar "informações explícitas" — aquelas que estão escritas clarinhas no texto, prontas para serem encontradas!',
          mascotTip: 'Dica do Teco: Ler não é só juntar letras! É como uma caça ao tesouro onde as respostas estão escondidas bem diante dos seus olhos.'
        },
        {
          id: 'port-u1-s2',
          type: 'explanation',
          title: 'O Que é uma Informação Explícita?',
          content: 'Uma informação explícita é aquela que o autor declara de forma direta. Se o texto diz "A bicicleta de Mariana era amarela", e alguém pergunta qual a cor da bicicleta, a resposta está exata ali: amarela!',
          readingPassage: {
            title: 'O Encontro no Parque das Águas',
            author: 'Profa. Helena Prado',
            genre: 'Narrativa Curta',
            text: 'Em uma manhã ensolarada de sábado, o garoto Leo e seu cachorro Fumaça foram ao Parque das Águas. Fumaça era um cãozinho peludo de cor cinza que adorava correr atrás de folhas secas. Perto do lago azul, Leo encontrou sua amiga Clara, que segurava uma pipa colorida em forma de estrela.',
            glossary: [
              { word: 'Ensolarada', meaning: 'Com muito sol brilhando e céu limpo.' },
              { word: 'Peludo', meaning: 'Que tem muitos pelos macios.' }
            ]
          }
        },
        {
          id: 'port-u1-s3',
          type: 'worked_example',
          title: 'Exemplo Resolvido de Localização',
          content: 'Veja como o Teco busca a resposta no texto:\n\nPergunta: "Qual é o nome do cachorro de Leo e qual é a sua cor?"\n\nPasso 1: Volto ao texto e procuro as palavras "cachorro" ou "cãozinho".\nPasso 2: Encontro: "o garoto Leo e seu cachorro Fumaça... cor cinza".\nResposta pronta: O cachorro se chama Fumaça e sua cor é cinza.',
          mascotTip: 'Não tente adivinhar da sua cabeça. Sempre coloque o dedinho na linha do texto e confira!'
        },
        {
          id: 'port-u1-s4',
          type: 'guided_practice',
          title: 'Prática Guiada: Onde os Fatos Acontecem?',
          content: 'Releia o trecho de "O Encontro no Parque das Águas" e responda com precisão.',
          quiz: {
            question: 'Em que dia da semana e em qual local Leo e Fumaça passeavam?',
            options: [
              'Numa tarde de domingo, na praia ensolarada.',
              'Numa manhã de sábado, no Parque das Águas.',
              'Numa noite de sexta-feira, na pracinha do bairro.',
              'Numa manhã de terça-feira, no quintal de casa.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Perfeito! O texto diz explicitamente: "Em uma manhã ensolarada de sábado... foram ao Parque das Águas".',
            explanationOnError: 'Volte ao início do texto: repare na frase "Em uma manhã ensolarada de sábado, o garoto Leo e seu cachorro Fumaça foram ao Parque das Águas".',
            hint: 'Procure as palavras "manhã" e "Parque" logo na primeira frase.'
          }
        },
        {
          id: 'port-u1-s5',
          type: 'independent_exercise',
          title: 'Exercício: Identificando os Objetos',
          content: 'Vamos verificar outro detalhe importante da história de Leo e Clara.',
          quiz: {
            question: 'Qual objeto Clara segurava perto do lago azul?',
            options: [
              'Uma bola vermelha de futebol.',
              'Uma cesta cheia de maçãs.',
              'Uma pipa colorida em forma de estrela.',
              'Um livro de histórias de mistério.'
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Correto! O texto afirma com exatidão: "segurava uma pipa colorida em forma de estrela".',
            explanationOnError: 'Olhe a última linha do texto: "Clara, que segurava uma pipa colorida em forma de estrela".',
            hint: 'A resposta está junto do nome da amiga Clara.'
          }
        },
        {
          id: 'port-u1-s6',
          type: 'notebook_demo',
          title: 'Como Registrar a Resposta no Caderno',
          content: 'No caderno escolar, evite respostas curtas de uma palavra só como "pipa". Escreva respostas completas, iniciando com letra maiúscula e terminando com ponto final!',
          writtenPrompt: {
            question: 'Escreva no caderno uma resposta completa: "O que o cãozinho Fumaça gostava de fazer no parque?"',
            linesNeeded: 2,
            suggestedAnswer: 'O cãozinho Fumaça adorava correr atrás de folhas secas no parque.',
            guideline: 'Comece com "O cãozinho Fumaça..." e inclua a ação contada no texto.'
          }
        }
      ]
    },
    {
      id: 't-port-u2',
      trackId: 'trilha-port-1',
      number: 2,
      title: 'Inferência e Pistas Subentendidas',
      shortDesc: 'Aprenda a ler nas entrelinhas e descobrir o que o autor não disse diretamente!',
      icon: 'Eye',
      xpReward: 40,
      steps: [
        {
          id: 'port-u2-s1',
          type: 'objective',
          title: 'O Superpoder da Inferência',
          content: 'Às vezes o autor não conta tudo de mão beijada. Ele deixa pistas para você juntar com o que já sabe do mundo. Isso se chama INFERÊNCIA!',
          mascotTip: 'Exemplo do Teco: Se alguém entra na sala sacudindo um guarda-chuva molhado, você infere que está chovendo lá fora, mesmo que ninguém fale nada!'
        },
        {
          id: 'port-u2-s2',
          type: 'explanation',
          title: 'Lendo com Olhar Atento',
          content: 'Para fazer uma boa inferência, nós combinamos:\n(Pista do Texto) + (Nosso Conhecimento de Vida) = (Conclusão Inteligente).',
          readingPassage: {
            title: 'O Sumiço da Chave Dourada',
            author: 'Conto Popular Adaptado',
            genre: 'Mistério Infantojuvenil',
            text: 'Dona Benta procurava a chave por todos os cantos. Olhou debaixo das almofadas, afastou as cortinas e até mexeu na cesta de costura. De repente, ouviu um tilintar metálico vindo debaixo da mesa da sala. Ao abaixar-se, viu apenas um rabo felpudo listrado desaparecendo ligeiro pela porta da cozinha.',
            glossary: [
              { word: 'Tilintar', meaning: 'Som agudo e repetido de peças de metal batendo uma na outra.' },
              { word: 'Felpudo', meaning: 'Cheio de pelos compridos e macios.' }
            ]
          }
        },
        {
          id: 'port-u2-s3',
          type: 'guided_practice',
          title: 'Prática Guiada: Quem Pegou a Chave?',
          content: 'O texto não fala o nome do animal diretamente. Mas quem será que tinha aquele rabo listrado e brincava com objetos brilhantes?',
          quiz: {
            question: 'Com base nas pistas do texto ("tilintar", "rabo felpudo listrado", fugir ligeiro), quem provavelmente pegou a chave?',
            options: [
              'Um passarinho que voava pela janela.',
              'Um gato da casa que estava brincando.',
              'O carteiro que bateu na porta da frente.',
              'O vento forte da tempestade.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Excelente dedução! O rabo felpudo listrado fugindo pela cozinha e brincando com a chave tilintando são pistas clássicas de um gatinho travesso!',
            explanationOnError: 'Pense: que tipo de animal de estimação tem rabo felpudo listrado, fica debaixo da mesa e anda pela cozinha?',
            hint: 'Pense em animais comuns de uma casa com pelos e rabo comprido.'
          }
        },
        {
          id: 'port-u2-s4',
          type: 'independent_exercise',
          title: 'Sentimentos dos Personagens',
          content: 'Como as atitudes mostram o que a pessoa está sentindo?',
          quiz: {
            question: 'No início da história, ao revirar almofadas e cestas de costura, Dona Benta provavelmente estava:',
            options: [
              'Alegre e descansada porque estava de férias.',
              'Preocupada ou ansiosa para encontrar a chave.',
              'Com muito sono e querendo dormir.',
              'Brava com uma visita que acabara de chegar.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Isso mesmo! Quem procura algo revirando todos os cantos da casa demonstra preocupação e pressa.',
            explanationOnError: 'Quem perde algo importante e procura por todo canto não está calmo ou com sono, mas sim preocupado.',
            hint: 'Como você se sente quando perde algo importante na hora de sair?'
          }
        }
      ]
    },
    {
      id: 't-port-u3',
      trackId: 'trilha-port-1',
      number: 3,
      title: 'Significado das Palavras no Contexto',
      shortDesc: 'Descubra como o sentido de uma palavra muda dependendo da frase!',
      icon: 'Sparkles',
      xpReward: 40,
      steps: [
        {
          id: 'port-u3-s1',
          type: 'objective',
          title: 'O Segredo do Contexto',
          content: 'No português, uma mesma palavra pode ter significados totalmente diferentes! A palavra "manga" pode ser a fruta doce ou a manga da camisa. Hoje aprenderemos a descobrir o sentido lendo a frase inteira.',
          mascotTip: 'Dica do Teco: Quando encontrar uma palavra estranha, não se desespere! Olhe as vizinhas dela (a frase toda) e o significado vai aparecer.'
        },
        {
          id: 'port-u3-s2',
          type: 'explanation',
          title: 'Palavras com Múltiplos Sentidos',
          content: 'Observe os dois exemplos:\n1. "O passarinho pousou no galho com uma pena na asa." (Pena = pluma de ave).\n2. "Fiquei com pena do cachorrinho abandonado na chuva." (Pena = compaixão, tristeza).\nO CONTEXTO (as outras palavras) é quem decide o sentido real!',
          conceptCard: {
            title: 'Caixa de Ferramentas do Vocabulário',
            subtitle: 'Como decifrar palavras desconhecidas',
            points: [
              { label: 'Substituição', text: 'Troque a palavra por outra parecida e veja se a frase ainda faz sentido.' },
              { label: 'Pista dos Sentidos', text: 'A palavra expressa cor, ação, som ou sentimento?' },
              { label: 'Uso do Dicionário', text: 'Consulte o dicionário e escolha o verbete que melhor combina com a situação.' }
            ]
          }
        },
        {
          id: 'port-u3-s3',
          type: 'guided_practice',
          title: 'Prática: O Que Significa a Palavra?',
          content: 'Leia com atenção a frase a seguir:\n\n"O professor elogiou a turma por manter a calma durante a prova, dizendo que todos demonstraram muita firmeza."',
          quiz: {
            question: 'Na frase acima, a palavra "firmeza" tem o sentido de:',
            options: [
              'Dureza de uma pedra pesada.',
              'Segurança, controle e tranquilidade.',
              'Grossura de uma corda de navio.',
              'Pressa e correria para terminar logo.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Muito bem! "Demonstrar firmeza" em um momento de prova significa ter confiança, equilíbrio e segurança emocional.',
            explanationOnError: 'Lembre-se: a frase fala sobre manter a calma. Firmeza aqui está ligada a tranquilidade e segurança, não a algo rígido como pedra.',
            hint: 'A frase elogia os alunos por manterem a calma.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-port-1',
    title: 'O Grande Desafio do Texto Enigmático',
    description: 'Coloque em prática tudo o que aprendeu: leia o conto misterioso, localize fatos, deduza intenções e decifre palavras no contexto!',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-port-s1',
        type: 'objective',
        title: 'Missão Final da Trilha',
        content: 'Você chegou ao Desafio Final da Trilha de Língua Portuguesa! Leia com atenção a história da "Árvore dos Segredos" e mostre que você é um leitor de 4º ano nota 10.',
        readingPassage: {
          title: 'A Árvore dos Segredos',
          author: 'Clarice Peixoto',
          genre: 'Fábula Contemporânea',
          text: 'No centro da praça da pequena vila de Monte Alto erguia-se uma jaqueira centenária. Os moradores mais antigos diziam que ela guardava a história de todas as famílias do lugar. Certo dia, um vento impetuoso soprou do sul, derrubando uma pequena caixa de madeira talhada que ficava escondida num oco do tronco. Thiago, um menino curioso de 9 anos, foi o primeiro a correr até lá. Dentro da caixinha havia uma carta amarelada e um desenho de um mapa antigo com uma cruz dourada na colina verdejante.',
          glossary: [
            { word: 'Centenária', meaning: 'Que tem cem anos ou mais de existência.' },
            { word: 'Impetuoso', meaning: 'Muito forte, veloz e violento.' },
            { word: 'Verdejante', meaning: 'Coberta de verde, plantas vivas e saudáveis.' }
          ]
        }
      },
      {
        id: 'desafio-port-s2',
        type: 'final_challenge',
        title: 'Desafio 1: Localização Precisa',
        content: 'Qual objeto caiu do tronco da jaqueira durante o vento forte?',
        quiz: {
          question: 'O que Thiago encontrou quando abriu a caixa de madeira talhada?',
          options: [
            'Um punhado de moedas de prata e um anel.',
            'Uma carta amarelada e um mapa com uma cruz dourada.',
            'Apenas sementes velhas da própria árvore.',
            'Um relógio de bolso quebrado pelo tempo.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Excelente! O texto traz a informação explícita: "Dentro da caixinha havia uma carta amarelada e um desenho de um mapa antigo com uma cruz dourada".',
          explanationOnError: 'Releia a última frase da narrativa: "Dentro da caixinha havia...".',
          hint: 'A resposta está no finzinho da história.'
        }
      },
      {
        id: 'desafio-port-s3',
        type: 'final_challenge',
        title: 'Desafio 2: Inferência sobre a Jaqueira',
        content: 'Por que os moradores consideravam a jaqueira tão especial para a vila?',
        quiz: {
          question: 'O que torna a jaqueira uma testemunha viva da história de Monte Alto?',
          options: [
            'Ela era a árvore mais nova plantada pelo prefeito no ano passado.',
            'Por ser centenária, ela presenciou o crescimento de várias gerações de famílias.',
            'Ela dava frutos de ouro que enriqueciam toda a vila.',
            'Ela falava com as crianças durante a madrugada.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Brilhante! "Centenária" significa que vive há mais de um século, por isso acompanhou avós, pais e netos ao longo do tempo.',
          explanationOnError: 'Lembre-se do significado da palavra "centenária": uma árvore com mais de 100 anos viveu junto com várias gerações de moradores.',
          hint: 'Pense em quanto tempo dura 100 anos em uma cidade pequena.'
        }
      }
    ]
  }
};

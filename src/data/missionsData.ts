/**
 * Banco de Missões Expandido — Sala de Missões
 * Trilhas: Matemática | Língua Portuguesa | Ciências | Cultura
 * Modalidades: individual | dupla | grupo | impresso
 * Fluxo: explorar → tentar → errar → revisar → dominar → avançar
 */

import { Mission } from '../types';

// ============================================================
// TRILHA DE MATEMÁTICA — Reino dos Números
// ============================================================
export const MISSIONS_MATEMATICA: Mission[] = [
  {
    id: 'mat-01',
    title: 'Vila dos Números — Conhecendo o Sistema Decimal',
    subject: 'Matemática',
    trailName: 'Reino da Matemática',
    primaryAbility: 'Sistema de Numeração Decimal',
    difficulty: 'Fácil',
    status: 'Disponível',
    progress: 0,
    objective: 'Compreender a organização do sistema decimal identificando unidades, dezenas e centenas.',
    estimatedMinutes: 12,
    xpReward: 50,
    coinsReward: 25,
    steps: [
      {
        type: 'explorar',
        title: 'O Mapa dos Números',
        subtitle: 'Explorando a Vila dos Números',
        content: 'No Reino dos Números, cada casa tem um endereço especial. O número 347 quer dizer: 3 casas de centenas, 4 casas de dezenas e 7 casas de unidades. É como um mapa do tesouro!',
        question: 'Você já percebeu que cada algarismo de um número tem uma posição especial?'
      },
      {
        type: 'tentar',
        title: 'Desafio da Composição',
        subtitle: 'Forme o número correto!',
        content: 'Observe as peças do número abaixo e escolha qual número elas formam.',
        question: '2 centenas + 5 dezenas + 8 unidades = ?',
        options: [
          { text: '258', correct: true, feedback: 'Exato! 2 centenas (200) + 5 dezenas (50) + 8 unidades (8) = 258. Você encontrou o tesouro!' },
          { text: '285', correct: false, feedback: 'Quase! Atenção à ordem: centenas primeiro, depois dezenas, depois unidades. Tente de novo!' },
          { text: '852', correct: false, feedback: 'Não desta vez! Lembre: centenas ficam no início, depois dezenas, depois unidades.' },
          { text: '528', correct: false, feedback: 'Cuidado com a ordem! Centenas são os maiores grupos, depois dezenas, depois unidades.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Revisão Rápida',
        subtitle: 'Consolidando o aprendizado',
        content: 'O sistema decimal funciona assim: cada posição vale 10 vezes mais que a anterior. Por isso dizemos que é um sistema de base 10. Unidades (1), Dezenas (10), Centenas (100), Milhares (1000).',
        reflectionPrompt: 'Pense em exemplos do seu dia a dia: a sua idade, o número da sua casa, o total de páginas do seu livro favorito. Todos esses números seguem esse mesmo sistema!'
      },
      {
        type: 'desafiar',
        title: 'Missão: O Enigma do Cofre',
        subtitle: 'Aplique o que aprendeu!',
        content: 'Para abrir o cofre do tesouro, você precisa resolver o enigma.',
        contextProblem: {
          scenario: 'O cofre do castelo tem uma combinação misteriosa. O número é formado por 4 centenas, 0 dezenas e 7 unidades.',
          total: 407,
          divisor: 1,
          question: 'Qual é a combinação do cofre?',
          expectedAnswer: 407,
          explanationPrompt: 'Como você chegou a esse número? Explique passo a passo.'
        }
      },
      {
        type: 'refletir',
        title: 'Reflexão do Explorador',
        subtitle: 'O que aprendi hoje?',
        content: 'Você completou a primeira etapa do Reino dos Números!',
        reflectionPrompt: 'O que ficou mais claro para você sobre os números? Tem alguma dúvida que ainda quer resolver com seu professor?'
      }
    ]
  },
  {
    id: 'mat-02',
    title: 'O Desafio da Adição — Cálculo Mental',
    subject: 'Matemática',
    trailName: 'Reino da Matemática',
    primaryAbility: 'Adição com reagrupamento',
    difficulty: 'Fácil',
    status: 'Bloqueada',
    progress: 0,
    objective: 'Calcular adições com reagrupamento usando raciocínio mental e representação posicional.',
    estimatedMinutes: 15,
    xpReward: 60,
    coinsReward: 30,
    steps: [
      {
        type: 'explorar',
        title: 'Juntando Tesouros',
        subtitle: 'A arte de somar',
        content: 'Somar é juntar! Na vila dos exploradores, quando dois grupos se encontram, formam um grupo maior. Mas atenção: quando chegam 10 unidades no mesmo lugar, elas se transformam em 1 dezena — é o reagrupamento!',
        question: 'Já percebeu quando somar "passa de 10" em alguma posição?'
      },
      {
        type: 'tentar',
        title: 'Missão: Juntar os Grupos',
        subtitle: 'Calcule a soma!',
        content: 'Dois grupos de aventureiros se encontraram na floresta.',
        question: '47 + 35 = ?',
        options: [
          { text: '82', correct: true, feedback: 'Perfeito! 7 + 5 = 12 (escreve 2 e leva 1) e 4 + 3 + 1 = 8. Total: 82!' },
          { text: '72', correct: false, feedback: 'Esqueceu de reagrupar! 7 + 5 = 12 — o 1 vai para as dezenas.' },
          { text: '83', correct: false, feedback: 'Quase! Revise o reagrupamento das unidades.' },
          { text: '712', correct: false, feedback: 'Atenção! 7 + 5 = 12, mas escrevemos 2 e "levamos" 1 para as dezenas.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Técnica do Reagrupamento',
        subtitle: 'Entendendo o processo',
        content: 'Quando a soma em qualquer posição passa de 9, o excedente vai para a próxima posição. É como encher uma caixa: quando passa de 10 unidades, você troca por 1 dezena e guarda o resto.',
        reflectionPrompt: 'Tente somar 68 + 27 mentalmente usando o reagrupamento. Quais são as etapas?'
      },
      {
        type: 'desafiar',
        title: 'Problema do Mercado',
        subtitle: 'Matemática no dia a dia',
        content: 'Contexto do mundo real!',
        contextProblem: {
          scenario: 'Na feira da escola, a turma vendeu 158 brigadeiros pela manhã e 275 pela tarde. Quantos brigadeiros foram vendidos no total?',
          total: 433,
          divisor: 1,
          question: 'Qual foi o total de brigadeiros vendidos?',
          expectedAnswer: 433,
          explanationPrompt: 'Explique como você chegou à resposta.'
        }
      },
      {
        type: 'refletir',
        title: 'Missão Concluída!',
        subtitle: 'Você somou com maestria',
        content: 'Você aprendeu a fazer adições com reagrupamento — uma habilidade que usamos todo dia!',
        reflectionPrompt: 'Cite 2 situações da sua vida real onde você usa a adição.'
      }
    ]
  },
  {
    id: 'mat-05',
    title: 'O Desafio da Divisão — Repartindo em Grupos Iguais',
    subject: 'Matemática',
    trailName: 'Reino da Matemática',
    primaryAbility: 'Divisão por agrupamento',
    difficulty: 'Média',
    status: 'Em andamento',
    progress: 60,
    objective: 'Compreender divisão como formação de grupos iguais e repartição equitativa.',
    estimatedMinutes: 20,
    xpReward: 75,
    coinsReward: 40,
    steps: [
      {
        type: 'explorar',
        title: 'O Grande Banquete',
        subtitle: 'Dividir é repartir com justiça',
        content: 'O rei do Reino dos Números organizou um banquete. Ele tem 24 maçãs e quer distribuir igualmente entre 4 cavaleiros. Como fazer isso? É exatamente isso que a divisão resolve!',
        question: 'Você sabe a diferença entre dividir e multiplicar?',
        interactiveData: {
          totalItems: 24,
          targetGroups: 4,
          itemsPerGroup: 6,
          itemName: 'maçãs',
          itemEmoji: '🍎'
        }
      },
      {
        type: 'tentar',
        title: 'Missão: Distribuição Justa',
        subtitle: 'Qual é cada parte?',
        content: 'No acampamento dos exploradores, 36 lanches precisam ser divididos igualmente entre 6 grupos.',
        question: 'Quantos lanches cada grupo recebe?',
        options: [
          { text: '6 lanches', correct: true, feedback: 'Exato! 36 ÷ 6 = 6. Cada grupo recebe 6 lanches. A divisão foi justa!' },
          { text: '5 lanches', correct: false, feedback: 'Quase! 5 × 6 = 30, faltaram 6 lanches. Tente de novo!' },
          { text: '7 lanches', correct: false, feedback: 'Ficaria sobrando! 7 × 6 = 42, são mais do que temos. Pense melhor!' },
          { text: '4 lanches', correct: false, feedback: 'Ficaria sobrando muita coisa! 4 × 6 = 24, não é suficiente.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Como a Divisão Funciona',
        subtitle: 'O processo passo a passo',
        content: 'Divisão = repartição igual. Para calcular 36 ÷ 6, pensamos: "Que número multiplicado por 6 dá 36?" A resposta é 6, porque 6 × 6 = 36. Divisão e multiplicação são operações inversas!',
        reflectionPrompt: 'Tente resolver 48 ÷ 8 usando a ideia de grupos iguais. Quantos grupos de 8 cabem em 48?'
      },
      {
        type: 'desafiar',
        title: 'Desafio: A Competição de Robótica',
        subtitle: 'Problema de divisão no contexto real',
        content: 'Situação-problema!',
        contextProblem: {
          scenario: 'Na gincana de robótica, 72 estudantes precisam formar equipes iguais de 9 integrantes cada. Quantas equipes serão formadas?',
          total: 72,
          divisor: 9,
          question: 'Quantas equipes serão formadas?',
          expectedAnswer: 8,
          explanationPrompt: 'Explique como você pensou para resolver esse problema.'
        }
      },
      {
        type: 'refletir',
        title: 'Dominando a Divisão!',
        subtitle: 'Missão quase concluída',
        content: 'Você aprendeu um dos conceitos fundamentais da Matemática!',
        reflectionPrompt: 'Cite um momento da sua vida onde você precisou dividir algo igualmente. Como resolveu?'
      }
    ]
  },
  {
    id: 'mat-06',
    title: 'Situações-Problema — Aplicação no Cotidiano',
    subject: 'Matemática',
    trailName: 'Reino da Matemática',
    primaryAbility: 'Resolução de problemas',
    difficulty: 'Difícil',
    status: 'Bloqueada',
    progress: 0,
    objective: 'Aplicar as quatro operações em situações-problema do cotidiano com autonomia.',
    estimatedMinutes: 25,
    xpReward: 100,
    coinsReward: 50,
    steps: [
      {
        type: 'explorar',
        title: 'Matemática na Vida Real',
        subtitle: 'Problemas para resolver',
        content: 'Na vida real, os problemas não chegam prontos com uma operação indicada. Precisamos ler, entender e escolher a operação certa. Esse é o verdadeiro poder da Matemática!',
        question: 'Você sabe que tipo de situação exige cada operação matemática?'
      },
      {
        type: 'tentar',
        title: 'O Mercado de Frutas',
        subtitle: 'Escolha a operação certa!',
        content: 'Leia o problema com atenção antes de responder.',
        question: 'A escola comprou 12 caixas de laranja com 24 laranjas cada. Quantas laranjas no total?',
        options: [
          { text: '288 laranjas', correct: true, feedback: 'Correto! 12 × 24 = 288. Você identificou que é uma situação de multiplicação!' },
          { text: '36 laranjas', correct: false, feedback: 'Não é adição nesse caso! Precisamos saber o total de 12 grupos de 24.' },
          { text: '2 laranjas', correct: false, feedback: 'Não é divisão! Queremos o total, não as partes.' },
          { text: '12 laranjas', correct: false, feedback: 'Revise o problema. Temos 12 caixas, cada uma com 24 laranjas.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Como Identificar a Operação',
        subtitle: 'Palavras que ajudam',
        content: 'Palavras-chave: "no total" / "ao todo" → adição ou multiplicação. "A diferença" / "quantos a mais" → subtração. "Dividir igualmente" / "cada parte" → divisão. "Grupos iguais de" → multiplicação.',
        reflectionPrompt: 'Crie o seu próprio problema de multiplicação usando algo que você conhece na escola.'
      },
      {
        type: 'desafiar',
        title: 'Desafio do Campeonato',
        subtitle: 'Problema completo!',
        content: 'Situação real complexa.',
        contextProblem: {
          scenario: 'No campeonato de jogos, participaram 144 estudantes. Eles se dividiram em equipes de 8. Cada equipe que venceu 3 jogos ganhou 25 moedas. Se 7 equipes venceram 3 jogos, quantas moedas foram distribuídas?',
          total: 175,
          divisor: 1,
          question: 'Quantas moedas foram distribuídas no total?',
          expectedAnswer: 175,
          explanationPrompt: 'Resolva passo a passo e explique cada etapa.'
        }
      },
      {
        type: 'refletir',
        title: 'Explorador das Operações!',
        subtitle: 'Trilha de Matemática Concluída!',
        content: 'Você percorreu toda a trilha de Matemática e está pronto para novas aventuras!',
        reflectionPrompt: 'O que foi mais difícil? O que ficou mais claro? Compartilhe com seu professor!'
      }
    ]
  }
];

// ============================================================
// TRILHA DE LÍNGUA PORTUGUESA — Jornada da Língua
// ============================================================
export const MISSIONS_PORTUGUES: Mission[] = [
  {
    id: 'por-01',
    title: 'Território das Palavras — Sons e Letras',
    subject: 'Língua Portuguesa',
    trailName: 'Jornada da Língua',
    primaryAbility: 'Relação fonema-grafema',
    difficulty: 'Fácil',
    status: 'Disponível',
    progress: 0,
    objective: 'Compreender a relação entre sons e letras no sistema de escrita do português.',
    estimatedMinutes: 12,
    xpReward: 50,
    coinsReward: 25,
    steps: [
      {
        type: 'explorar',
        title: 'O Mapa das Palavras',
        subtitle: 'Sons que viram letras',
        content: 'A língua portuguesa tem 26 letras, mas mais de 30 sons diferentes! Isso acontece porque algumas letras podem representar sons diferentes dependendo do contexto. É como um código secreto que, uma vez descoberto, abre o mundo da leitura!',
        question: 'Você já notou que a letra "s" pode ter sons diferentes em "sapo", "rosa" e "pássaro"?'
      },
      {
        type: 'tentar',
        title: 'Decifrando o Código',
        subtitle: 'Sons do S',
        content: 'Observe as palavras e identifique o som do "s" em cada uma.',
        question: 'Em qual palavra o "s" tem som de "z"?',
        options: [
          { text: 'mesa', correct: true, feedback: 'Correto! Na palavra "mesa", o "s" entre vogais tem som de "z". Você decifrou o código!' },
          { text: 'sapato', correct: false, feedback: 'Nesse caso, o "s" no início da palavra tem som forte de "ss". Tente outra opção!' },
          { text: 'passo', correct: false, feedback: 'O "ss" tem sempre som forte. Procure o "s" entre duas vogais!' },
          { text: 'estrela', correct: false, feedback: 'O "s" aqui está com consoante, não entre vogais. Tente de novo!' }
        ]
      },
      {
        type: 'revisar',
        title: 'Regra do S entre Vogais',
        subtitle: 'Consolidando a regra',
        content: 'S entre duas vogais soa como Z: "mesa", "casinha", "camisa". S no início ou com consoante soa forte: "sapo", "festa". Esse é um dos padrões da nossa língua!',
        reflectionPrompt: 'Pense em 3 palavras com "s" que você usa no dia a dia. Qual é o som em cada uma?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Escritor em Formação',
        subtitle: 'Aplicando o conhecimento',
        content: 'Use o que aprendeu!',
        contextProblem: {
          scenario: 'Escreva corretamente: A (casinha / caZinha) da (rOsa / rosa) tem (azas / asas) de borboleta pintadas na porta.',
          total: 3,
          divisor: 1,
          question: 'Quantas palavras você escreveu corretamente das 3 destacadas?',
          expectedAnswer: 3,
          explanationPrompt: 'Explique por que escolheu cada grafia.'
        }
      },
      {
        type: 'refletir',
        title: 'Explorador das Palavras!',
        subtitle: 'Você aprendeu sobre sons e letras',
        content: 'Compreender os padrões da língua é a chave para ler e escrever com mais segurança!',
        reflectionPrompt: 'O que você descobriu sobre a língua portuguesa que não sabia antes?'
      }
    ]
  },
  {
    id: 'por-04',
    title: 'A Ideia Principal — Inferências e Mensagem Central',
    subject: 'Língua Portuguesa',
    trailName: 'Jornada da Língua',
    primaryAbility: 'Inferência e ideia central',
    difficulty: 'Média',
    status: 'Disponível',
    progress: 0,
    objective: 'Identificar a ideia central de textos e realizar inferências a partir das pistas do texto.',
    estimatedMinutes: 18,
    xpReward: 70,
    coinsReward: 35,
    steps: [
      {
        type: 'explorar',
        title: 'Além das Palavras',
        subtitle: 'O que o texto não diz mas sugere',
        content: 'Inferir é descobrir o que o texto sugere sem dizer diretamente. É como encontrar pistas em uma história de detetive! O autor deixa sinais, e o leitor experiente os reconhece.',
        question: 'Quando você lê, tenta imaginar além do que está escrito?'
      },
      {
        type: 'tentar',
        title: 'Missão: Detetive do Texto',
        subtitle: 'Leia e descubra a mensagem!',
        content: 'Leia o trecho: "As ruas estavam molhadas. As pessoas andavam com guarda-chuvas. As crianças usavam botas coloridas e pulavam em poças."',
        question: 'O texto não menciona diretamente a chuva. Mas o que podemos inferir?',
        options: [
          { text: 'Estava chovendo', correct: true, feedback: 'Exato! As pistas (ruas molhadas, guarda-chuvas, botas) revelam que está chovendo. Você leu como um detetive!' },
          { text: 'Era de manhã', correct: false, feedback: 'O texto não dá pistas sobre o horário. Foque nas informações que ele realmente oferece.' },
          { text: 'Havia uma festa', correct: false, feedback: 'As pistas apontam para outro contexto. Observe: ruas molhadas, guarda-chuvas, botas.' },
          { text: 'As crianças estavam brincando na escola', correct: false, feedback: 'Parte certa (brincando), mas o local não fica claro. A inferência mais forte é sobre o clima.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Como Fazer Inferências',
        subtitle: 'O processo de leitura profunda',
        content: 'Para inferir: 1. Leia com atenção. 2. Identifique as pistas do texto. 3. Use seu conhecimento de mundo. 4. Conecte as pistas para concluir. Lembrete: a inferência deve sempre ser apoiada pelo texto, não inventada!',
        reflectionPrompt: 'Pense em um texto que você leu recentemente. Havia algo que você precisou inferir?'
      },
      {
        type: 'desafiar',
        title: 'Mensagem Central',
        subtitle: 'Qual é a ideia principal?',
        content: 'Leia: "João chegou na aula sem fazer a tarefa pelo terceiro dia seguido. A professora perguntou o motivo. Ele olhou para o chão e não respondeu."',
        contextProblem: {
          scenario: 'A mensagem central desse trecho é sobre um conflito entre aluno e professora relacionado à responsabilidade e comunicação.',
          total: 1,
          divisor: 1,
          question: 'Qual sentimento João provavelmente estava sentindo?',
          expectedAnswer: 1,
          explanationPrompt: 'Use evidências do texto para explicar a resposta.'
        }
      },
      {
        type: 'refletir',
        title: 'Leitor Explorador!',
        subtitle: 'Você aprendeu a ler nas entrelinhas',
        content: 'A inferência é uma das habilidades mais importantes de um bom leitor. Com ela, você vai muito além das palavras!',
        reflectionPrompt: 'O que é mais desafiante para você na leitura? Onde quer melhorar?'
      }
    ]
  }
];

// ============================================================
// TRILHA DE CIÊNCIAS — Ilha das Ciências
// ============================================================
export const MISSIONS_CIENCIAS: Mission[] = [
  {
    id: 'cie-01',
    title: 'Ilha da Observação — Seres Vivos',
    subject: 'Ciências',
    trailName: 'Ilha das Ciências',
    primaryAbility: 'Observação e classificação',
    difficulty: 'Fácil',
    status: 'Disponível',
    progress: 0,
    objective: 'Identificar e classificar seres vivos observando suas características e funções.',
    estimatedMinutes: 15,
    xpReward: 50,
    coinsReward: 25,
    steps: [
      {
        type: 'explorar',
        title: 'O Grande Inventário da Vida',
        subtitle: 'O que é um ser vivo?',
        content: 'A Ilha das Ciências está cheia de criaturas! Mas nem tudo que existe é ser vivo. Um ser vivo nasce, cresce, se alimenta, reproduz e morre. Uma pedra não faz nada disso!',
        question: 'Você sabe o que diferencia um ser vivo de um objeto inanimado?'
      },
      {
        type: 'tentar',
        title: 'Missão: Catalogar os Seres',
        subtitle: 'É ser vivo ou não?',
        content: 'O cientista explorador precisa separar os itens corretamente.',
        question: 'Qual das opções lista APENAS seres vivos?',
        options: [
          { text: 'Planta, fungo, bactéria, inseto', correct: true, feedback: 'Correto! Todos possuem características de ser vivo: nascem, crescem, se reproduzem e morrem.' },
          { text: 'Pedra, árvore, peixe, cogumelo', correct: false, feedback: 'A pedra não é ser vivo! Ela não nasce, não cresce e não se reproduz.' },
          { text: 'Água, areia, vírus, cacto', correct: false, feedback: 'Água e areia não são seres vivos. Sobre vírus: há discussão científica, mas cacto é vivo!' },
          { text: 'Sol, chuva, planta, terra', correct: false, feedback: 'Sol e chuva não são seres vivos — são fenômenos naturais.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Características dos Seres Vivos',
        subtitle: 'Revisão científica',
        content: 'Seres vivos: nascem, crescem, se alimentam, respiram, reproduzem, respondem ao ambiente e morrem. Podem ser classificados em 5 reinos: Animais, Plantas, Fungos, Protistas e Moneras (bactérias).',
        reflectionPrompt: 'Quais seres vivos você consegue observar agora mesmo ao seu redor?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Relatório do Cientista',
        subtitle: 'Observar e registrar',
        content: 'Toda descoberta científica começa com a observação!',
        contextProblem: {
          scenario: 'Um cientista encontrou 4 organismos numa expedição: um fungo, uma alga, um grilo e uma pedra. Ele quer classificar apenas os seres vivos. Quantos ele vai listar?',
          total: 3,
          divisor: 1,
          question: 'Quantos organismos são seres vivos?',
          expectedAnswer: 3,
          explanationPrompt: 'Quais 3 são seres vivos? Por que a pedra não é?'
        }
      },
      {
        type: 'refletir',
        title: 'Cientista em Formação!',
        subtitle: 'Missão de observação concluída',
        content: 'A observação é a primeira etapa do método científico. Você deu um grande passo!',
        reflectionPrompt: 'O que mais te surpreende sobre os seres vivos? Há algo que você ainda quer entender melhor?'
      }
    ]
  },
  {
    id: 'cie-02',
    title: 'Ciclos da Água e do Solo — Transformações',
    subject: 'Ciências',
    trailName: 'Ilha das Ciências',
    primaryAbility: 'Ciclos naturais',
    difficulty: 'Média',
    status: 'Disponível',
    progress: 0,
    objective: 'Compreender os ciclos da água e do solo como processos fundamentais para a vida.',
    estimatedMinutes: 18,
    xpReward: 60,
    coinsReward: 30,
    steps: [
      {
        type: 'explorar',
        title: 'A Viagem da Gotinha',
        subtitle: 'O ciclo da água na natureza',
        content: 'A água nunca para! Ela evapora dos rios e oceanos, sobe para o céu como vapor, forma nuvens, cai como chuva ou neve, e volta para os rios. É uma viagem infinita que garante a vida no planeta!',
        question: 'Você já se perguntou de onde vem a chuva e para onde vai?'
      },
      {
        type: 'tentar',
        title: 'Missão: Ordenar o Ciclo',
        subtitle: 'Qual é a ordem correta?',
        content: 'As etapas do ciclo da água foram embaralhadas. Coloque na ordem correta.',
        question: 'Qual é a sequência correta do ciclo da água?',
        options: [
          { text: 'Evaporação → Condensação → Precipitação → Infiltração', correct: true, feedback: 'Perfeito! A água evapora, vira nuvem (condensação), cai como chuva (precipitação) e infiltra no solo. Ciclo completo!' },
          { text: 'Chuva → Evaporação → Infiltração → Nuvem', correct: false, feedback: 'Quase! A evaporação acontece antes da chuva, não depois. Revise a sequência!' },
          { text: 'Condensação → Precipitação → Evaporação → Solo', correct: false, feedback: 'A condensação não é o primeiro passo! A água precisa evaporar primeiro.' },
          { text: 'Solo → Nuvem → Chuva → Rio', correct: false, feedback: 'Faltou a evaporação! É ela que leva a água do solo para as nuvens.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Por Que o Ciclo é Importante?',
        subtitle: 'Conexão com a vida',
        content: 'Sem o ciclo da água, o planeta secaria. A água doce dos rios (que bebemos) vem das chuvas. As chuvas vêm da evaporação dos oceanos. Por isso, preservar os oceanos, florestas e rios é preservar nossa própria vida!',
        reflectionPrompt: 'O que aconteceria se as florestas fossem destruídas e o ciclo da água fosse interrompido?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Guardião da Água',
        subtitle: 'Ciência para a vida',
        content: 'Problema científico real!',
        contextProblem: {
          scenario: 'Uma cidade cortou todas as árvores ao redor dos rios para construir casas. Depois disso, as chuvas diminuíram, o rio secou e faltou água. O que causou esse problema?',
          total: 1,
          divisor: 1,
          question: 'Qual etapa do ciclo da água foi mais afetada pelo desmatamento?',
          expectedAnswer: 1,
          explanationPrompt: 'Explique a relação entre desmatamento e ciclo da água.'
        }
      },
      {
        type: 'refletir',
        title: 'Explorador Ambiental!',
        subtitle: 'Você entendeu o ciclo da água',
        content: 'Agora você entende por que a preservação ambiental é também uma questão de sobrevivência!',
        reflectionPrompt: 'O que você pode fazer no dia a dia para ajudar a preservar o ciclo da água?'
      }
    ]
  }
];

// ============================================================
// TRILHA CULTURAL — Mundo da Cultura
// ============================================================
export const MISSIONS_CULTURA: Mission[] = [
  {
    id: 'cul-01',
    title: 'Vozes do Brasil — Literatura e Diversidade',
    subject: 'Língua Portuguesa',
    trailName: 'Mundo da Cultura',
    primaryAbility: 'Apreciação literária e diversidade',
    difficulty: 'Fácil',
    status: 'Disponível',
    progress: 0,
    objective: 'Conhecer e apreciar expressões literárias da diversidade cultural brasileira.',
    estimatedMinutes: 15,
    xpReward: 55,
    coinsReward: 30,
    steps: [
      {
        type: 'explorar',
        title: 'O Brasil que Conta Histórias',
        subtitle: 'Literatura e identidade cultural',
        content: 'O Brasil é um país de muitas histórias! Do cordel nordestino às lendas amazônicas, dos contos africanos aos causos gaúchos — cada região tem sua forma única de narrar o mundo. Essas histórias são parte de quem somos!',
        question: 'Você conhece alguma história, lenda ou conto típico da sua região?'
      },
      {
        type: 'tentar',
        title: 'Missão: Raízes Culturais',
        subtitle: 'Conectando cultura e história',
        content: 'Leia o trecho de cordel: "A história do Brasil é feita de muitos braços, de muitas mãos, de muitos povos que se juntaram para construir uma só nação."',
        question: 'Esse trecho de cordel fala sobre:',
        options: [
          { text: 'A formação diversa e multicultural do povo brasileiro', correct: true, feedback: 'Exato! O cordel celebra a diversidade de povos que formaram o Brasil: indígenas, africanos, europeus, asiáticos e muitos outros.' },
          { text: 'Apenas a história dos portugueses no Brasil', correct: false, feedback: 'O cordel fala de "muitos povos", não apenas um. A formação do Brasil é muito mais diversa!' },
          { text: 'A construção de casas no Brasil', correct: false, feedback: '"Muitos braços e mãos" é uma metáfora — significa a contribuição de diferentes pessoas e culturas.' },
          { text: 'Uma notícia sobre a política brasileira', correct: false, feedback: 'O cordel é um gênero poético que conta histórias e valores culturais. Esse trecho celebra a diversidade do povo.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Patrimônio Cultural Brasileiro',
        subtitle: 'Nossas raízes',
        content: 'O Brasil é formado por pelo menos 3 grandes raízes: os Povos Indígenas (primeiros habitantes), os Africanos (trazidos forçadamente e que resistiram e criaram rica cultura) e os Europeus (colonizadores). Soma-se a isso a imigração asiática, árabe e de outras regiões. Essa mistura cria a cultura brasileira única!',
        reflectionPrompt: 'Você consegue identificar, na sua família ou comunidade, alguma tradição que vem de uma dessas raízes culturais?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Contador de Histórias',
        subtitle: 'Criação literária',
        content: 'Agora é a sua vez de criar!',
        contextProblem: {
          scenario: 'Escreva 3 frases contando uma lenda, história ou tradição da sua cidade, família ou cultura. Pode ser algo que sua avó conta, uma celebração local, ou uma história que você ouviu.',
          total: 3,
          divisor: 1,
          question: 'Quantas frases você conseguiu escrever sobre a sua própria cultura?',
          expectedAnswer: 3,
          explanationPrompt: 'Compartilhe sua história! Cada história é única e valiosa.'
        }
      },
      {
        type: 'refletir',
        title: 'Explorador Cultural!',
        subtitle: 'Você descobriu raízes importantes',
        content: 'Conhecer a história e a cultura do nosso povo é parte de saber quem somos. Você deu um passo importante nessa jornada!',
        reflectionPrompt: 'O que você aprendeu sobre o Brasil hoje que não sabia antes? Isso mudou alguma coisa na forma como você se vê?'
      }
    ]
  },
  {
    id: 'cul-02',
    title: 'Ritmos do Brasil — Música e Expressão',
    subject: 'Língua Portuguesa',
    trailName: 'Mundo da Cultura',
    primaryAbility: 'Apreciação musical e expressão artística',
    difficulty: 'Fácil',
    status: 'Disponível',
    progress: 0,
    objective: 'Explorar a diversidade musical brasileira como forma de expressão e identidade cultural.',
    estimatedMinutes: 12,
    xpReward: 50,
    coinsReward: 25,
    steps: [
      {
        type: 'explorar',
        title: 'O Brasil que Canta',
        subtitle: 'Música como linguagem universal',
        content: 'O Brasil tem uma das músicas mais diversas do mundo: samba, forró, baião, maracatu, sertanejo, MPB, bossa nova, funk, rap, axé... Cada ritmo carrega a história de um povo, de uma região, de uma época.',
        question: 'Qual ritmo ou estilo musical da sua região você conhece ou aprecia?'
      },
      {
        type: 'tentar',
        title: 'Missão: Conectando Ritmo e Região',
        subtitle: 'Cada ritmo tem uma origem',
        content: 'Os ritmos musicais brasileiros têm origens regionais e culturais específicas.',
        question: 'O forró é um ritmo tipicamente associado a qual região do Brasil?',
        options: [
          { text: 'Nordeste', correct: true, feedback: 'Correto! O forró surgiu no Nordeste brasileiro, misturando influências europeias, indígenas e africanas. É parte da identidade nordestina!' },
          { text: 'Sudeste', correct: false, feedback: 'O Sudeste é mais conhecido pelo samba (Rio de Janeiro) e pela MPB. O forró tem raízes nordestinas.' },
          { text: 'Sul', correct: false, feedback: 'O Sul é mais associado à música gauchesca e às influências europeias de imigração. O forró vem do Nordeste.' },
          { text: 'Norte', correct: false, feedback: 'O Norte tem ritmos próprios como o carimbó e o tecnobrega. O forró tem origem nordestina.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Mapa Musical do Brasil',
        subtitle: 'Riqueza de ritmos',
        content: 'Norte: carimbó, lambada. Nordeste: forró, maracatu, frevo, baião, axé. Centro-Oeste: modas de viola, funk cerradense. Sudeste: samba, bossa nova, funk carioca, MPB. Sul: gauchesca, catira, música de imigrantes. Cada ritmo conta uma história!',
        reflectionPrompt: 'Escolha um ritmo que você não conhecia antes. O que te chamou atenção nele?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Compositor em Formação',
        subtitle: 'Expressão criativa',
        content: 'A música é expressão! Agora é sua vez.',
        contextProblem: {
          scenario: 'Crie uma quadrinha (4 versos rimados) sobre algo que você gosta da sua cidade, escola ou vida. Pode ser qualquer tema — o importante é rimar e expressar algo verdadeiro!',
          total: 4,
          divisor: 1,
          question: 'Quantos versos você conseguiu criar?',
          expectedAnswer: 4,
          explanationPrompt: 'Compartilhe sua quadrinha! A expressão é parte da sua cultura.'
        }
      },
      {
        type: 'refletir',
        title: 'Artista Cultural!',
        subtitle: 'Você explorou a música brasileira',
        content: 'A música é uma das formas mais poderosas de expressar emoções, contar histórias e conectar pessoas. Você faz parte dessa tradição!',
        reflectionPrompt: 'Que música ou ritmo mais representa você neste momento da sua vida? Por quê?'
      }
    ]
  },
  {
    id: 'cul-03',
    title: 'Cidadãos do Mundo — Direitos e Responsabilidades',
    subject: 'Língua Portuguesa',
    trailName: 'Mundo da Cultura',
    primaryAbility: 'Cidadania e pensamento crítico',
    difficulty: 'Média',
    status: 'Disponível',
    progress: 0,
    objective: 'Compreender direitos e responsabilidades cidadãs e desenvolver pensamento crítico sobre a convivência social.',
    estimatedMinutes: 20,
    xpReward: 70,
    coinsReward: 35,
    steps: [
      {
        type: 'explorar',
        title: 'O Que é Ser Cidadão?',
        subtitle: 'Direitos e responsabilidades',
        content: 'Todo ser humano nasce com direitos — à vida, à educação, à saúde, à liberdade, à cultura. Mas com direitos vêm responsabilidades: respeitar os outros, cuidar dos espaços públicos, participar da comunidade. Ser cidadão é exercer isso tudo!',
        question: 'Você já pensou que vai a escola também é exercer um direito e uma responsabilidade?'
      },
      {
        type: 'tentar',
        title: 'Missão: Direito ou Responsabilidade?',
        subtitle: 'Compreendendo a cidadania',
        content: 'Pense cuidadosamente sobre cada situação.',
        question: '"Receber uma educação de qualidade" é um:',
        options: [
          { text: 'Direito garantido pela Constituição Brasileira', correct: true, feedback: 'Correto! A educação é um direito de todos, garantido pela Constituição de 1988 e pelo Estatuto da Criança e do Adolescente (ECA).' },
          { text: 'Favor que a escola faz ao aluno', correct: false, feedback: 'Não é favor — é um direito! A escola e o Estado têm obrigação de oferecer educação de qualidade.' },
          { text: 'Responsabilidade apenas da família', correct: false, feedback: 'A família tem papel importante, mas a educação é responsabilidade compartilhada: família, escola E Estado.' },
          { text: 'Uma conquista que precisa ser merecida', correct: false, feedback: 'Todo cidadão já nasce com esse direito. Ele não precisa ser merecido — é garantido a todos.' }
        ]
      },
      {
        type: 'revisar',
        title: 'Direitos das Crianças',
        subtitle: 'O ECA e a Constituição',
        content: 'O Estatuto da Criança e do Adolescente (ECA) garante: direito à vida, à saúde, à alimentação, à educação, ao lazer, à profissionalização, à cultura, à dignidade, ao respeito, à liberdade e à convivência familiar. Esses não são favores — são direitos!',
        reflectionPrompt: 'Qual direito da criança você acha mais importante? Por quê? Você conhece crianças que não têm esse direito garantido?'
      },
      {
        type: 'desafiar',
        title: 'Missão: Carta ao Futuro',
        subtitle: 'Pensamento crítico em ação',
        content: 'Cidadania ativa!',
        contextProblem: {
          scenario: 'Imagine que você é um líder da sua turma. Você percebe que 5 colegas chegam sem material escolar toda semana. O que você pode fazer como cidadão ativo para ajudar a resolver essa situação?',
          total: 3,
          divisor: 1,
          question: 'Liste 3 ações concretas que você poderia tomar como cidadão ativo',
          expectedAnswer: 3,
          explanationPrompt: 'Descreva cada ação e como ela ajudaria seus colegas.'
        }
      },
      {
        type: 'refletir',
        title: 'Cidadão Explorador!',
        subtitle: 'Você aprendeu sobre cidadania',
        content: 'Cidadania não é só votar quando crescer — é agir com responsabilidade hoje, respeitar as pessoas, cuidar dos espaços e lutar pelos direitos de todos!',
        reflectionPrompt: 'O que você pode fazer já, agora, como estudante do 4º ou 5º ano, para ser um cidadão mais ativo na sua comunidade?'
      }
    ]
  }
];

// ============================================================
// BANCO COMPLETO DE MISSÕES (todas as trilhas)
// ============================================================
export const ALL_MISSIONS: Mission[] = [
  ...MISSIONS_MATEMATICA,
  ...MISSIONS_PORTUGUES,
  ...MISSIONS_CIENCIAS,
  ...MISSIONS_CULTURA
];

// Helper: buscar missão por ID
export const getMissionById = (id: string): Mission | undefined =>
  ALL_MISSIONS.find(m => m.id === id);

// Helper: buscar missões por trilha
export const getMissionsByTrail = (trailName: string): Mission[] =>
  ALL_MISSIONS.filter(m => m.trailName === trailName);

// Helper: buscar missões por matéria
export const getMissionsBySubject = (subject: string): Mission[] =>
  ALL_MISSIONS.filter(m => m.subject === subject);

// Trilha completa de Matemática com ordem e status
export const MATEMATICA_TRAIL_FULL = MISSIONS_MATEMATICA.map((m, i) => ({
  ...m,
  order: i + 1
}));

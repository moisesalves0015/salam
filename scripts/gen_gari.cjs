const fs = require('fs');

const track = {
  id: 'gari-mission',
  subjectId: 'matematica',
  number: 8,
  title: 'Um dia no trabalho com um gari',
  description: 'Uma jornada interativa completa baseada no PDF de Área e Perímetro, acompanhando um gari homem em seu dia a dia urbano.',
  objective: 'Medir, estimar e calcular área e perímetro, interpretar gráficos, calcular probabilidade e reconhecer padrões no contexto da limpeza urbana.',
  bnccSkills: [
    'EF04MA20 - Medir, estimar e comparar grandezas', 
    'EF04MA21 - Área e perímetro em malha', 
    'EF04MA26 - Probabilidade e eventos aleatórios', 
    'EF04MA09 - Frações', 
    'EF04MA27 - Leitura de gráficos'
  ],
  color: 'emerald',
  badgeName: 'Especialista em Logística Urbana',
  badgeIcon: 'MapIcon',
  units: []
};

// ... Helper to generate steps
function createUnit(number, title, shortDesc, icon, activities) {
  const steps = [];
  activities.forEach((act, idx) => {
    // A - B: Cena e Fala
    steps.push({
      id: `u${number}-a${idx}-intro`,
      type: 'dialogue',
      title: act.title,
      content: act.cena,
      mascotTip: act.fala
    });
    
    // C - D: Explicação Pedagógica (Agora com Demos Exclusivos e Muito Texto)
    if (act.explicacao) {
      steps.push({
        id: `u${number}-a${idx}-exp`,
        type: 'explanation',
        title: 'Entendendo a Matemática',
        content: act.explicacao,
        conceptCard: {
          title: 'Conceito Fundamental',
          subtitle: act.title,
          points: [
            { 
              label: 'Como Funciona?', 
              text: act.detalhePedagogico || act.explicacao, 
              iconName: 'BookOpen' 
            },
            { 
              label: 'Exemplo Prático', 
              text: act.microexemplo || 'Analise a ilustração ao lado com cuidado.', 
              iconName: 'Lightbulb' 
            }
          ]
        },
        // Injeta a demonstração pedagógica apenas na explicação
        gariInteraction: act.demoInteraction
      });
    }
    
    // E - G: Interação e Feedback (A verdadeira ação do aluno)
    const practiceStep = {
      id: `u${number}-a${idx}-practice`,
      type: 'independent_exercise',
      title: 'Sua vez de agir!',
      content: act.comando,
      mascotTip: 'Agora é com você. Mostre o que aprendeu!',
      quiz: act.quiz,
      gariInteraction: act.interaction // A ferramenta em que ele joga de verdade
    };

    if (act.dragAndDrop) practiceStep.dragAndDrop = act.dragAndDrop;
    if (act.writtenPrompt) practiceStep.writtenPrompt = act.writtenPrompt;
    
    steps.push(practiceStep);
    
    // H - I: Transição
    steps.push({
      id: `u${number}-a${idx}-trans`,
      type: 'dialogue',
      title: 'Bom trabalho!',
      content: act.transicao,
      mascotTip: 'Isso aí! Vamos avançar para o próximo desafio do dia.'
    });
  });

  return {
    id: `gari-c${number}`,
    trackId: 'gari-mission',
    number: number,
    title: `Capítulo ${number}: ${title}`,
    shortDesc: shortDesc,
    icon: icon,
    xpReward: 150,
    steps: steps
  };
}

track.units.push(createUnit(1, 'O Que é um Trajeto na Malha?', 'Planejando o percurso do gari', 'MapIcon', [
  {
    title: 'Atividade 1 — Descrever o caminho',
    cena: 'O aluno encontra o gari na base de limpeza. O gari espalha um grande mapa do bairro em cima da mesa. As ruas parecem uma malha quadriculada.',
    fala: 'Bom dia! Hoje você vai acompanhar meu trabalho. Antes de sairmos, precisamos entender o que é um trajeto neste mapa. Vamos aprender?',
    explicacao: 'Um trajeto é o caminho que percorremos de um ponto a outro. Imagine que você está andando pela calçada e chega numa esquina. Na malha, cada segmento do quadradinho é uma quadra (ou quarteirão).',
    detalhePedagogico: 'Para descrever um caminho perfeitamente, precisamos de duas coisas: a DIREÇÃO (direita, esquerda, cima, baixo) e a QUANTIDADE (quantas quadras andamos).',
    microexemplo: 'Se eu for da padaria até a praça, conto cada "lado" de quadradinho que passo. Se eu passo por 3 lados subindo, digo: "Avance 3 quadras para cima".',
    demoInteraction: { type: 'demo-path' },
    comando: 'Agora é a sua vez. Descreva o caminho do gari clicando na malha interativa. Siga a rota planejada marcando 6 quarteirões.',
    interaction: { type: 'path-draw', data: { target: 6 } },
    quiz: {
      question: 'Se o gari percorreu 2 quadras para a direita, qual é a próxima direção?',
      options: ['Esquerda', 'Para cima', 'Direita', 'Para baixo'],
      correctIndex: 1,
      explanationOnSuccess: 'Exato! Você acompanhou o mapa visualmente e notou a mudança de direção.',
      explanationOnError: 'Ao desenhar a linha, preste atenção no movimento vertical após andar para a direita.',
      hint: 'O traçado faz uma curva subindo em direção ao topo.'
    },
    transicao: 'Sensacional! Entender trajetos é essencial não só para garis, mas para entregadores, motoristas e pedestres.'
  },
  {
    title: 'Atividade 2 — Estimar e medir',
    cena: 'O gari pega uma trena (fita métrica gigante). Ele aponta para o primeiro trecho.',
    fala: 'Às vezes não temos a fita na mão. Você consegue "estimar" quantos metros tem aquele muro antes de medirmos?',
    explicacao: 'Estimar é o ato de prever uma medida baseando-se no que já conhecemos. Não é chutar! É olhar e comparar.',
    detalhePedagogico: 'Depois da estimativa, usamos a ferramenta real (régua, fita métrica, trena) para obter a MEDIDA EXATA. A diferença mostra o quão treinado está o seu "olho matemático".',
    microexemplo: 'Eu estimo que essa vassoura tenha 1 metro de altura. Quando pego a trena, descubro que ela tem 1m e 20cm. Minha estimativa foi boa!',
    demoInteraction: { type: 'demo-path' },
    comando: 'Utilize a Régua Interativa para cobrir exatamente o objeto e encontrar a medida.',
    interaction: { type: 'measure', data: { expectedCm: 10 } },
    writtenPrompt: {
      question: 'Explique com suas palavras a diferença entre ESTIMAR uma medida e MEDIR usando um instrumento.',
      linesNeeded: 2,
      suggestedAnswer: 'Estimar é tentar prever o valor usando a lógica visual. Medir é usar a régua para achar o tamanho com exatidão.',
      guideline: 'A palavra-chave é "exatidão".'
    },
    transicao: 'Viu como a trena não mente? Estimativas guiam, ferramentas confirmam!'
  }
]));

track.units.push(createUnit(2, 'A Diferença Entre Perímetro e Área', 'Área como medida de superfície', 'Square', [
  {
    title: 'Atividade 3 e 4 — O que é Área?',
    cena: 'Vocês chegam a uma grande praça dividida em canteiros de diferentes formatos.',
    fala: 'A praça é gigante! Eu preciso saber a ÁREA para calcular quanto tempo vou demorar varrendo o centro dela.',
    explicacao: 'A Área é a quantidade de superfície plana que existe DENTRO do contorno de uma figura.',
    detalhePedagogico: 'O mais fascinante é que figuras com formatos totalmente diferentes podem ter a mesma área. Uma quadra comprida e um pátio quadrado podem ter os mesmos 100 m².',
    microexemplo: 'Um canteiro no formato "2x3" abriga 6 quadrados. Uma faixa estreita no formato "1x6" também abriga 6 quadrados. Ambas as áreas são iguais a 6!',
    demoInteraction: { type: 'demo-area' },
    comando: 'Pinte as regiões da praça e conte os canteiros.',
    interaction: { type: 'paint', data: { totalRegions: 15, paintedRegions: 6 } },
    dragAndDrop: {
      title: 'Formas Diferentes, Áreas Iguais',
      instruction: 'Arraste os formatos para as categorias baseando-se apenas na quantidade de quadrados internos.',
      items: [
        { id: 'i1', content: 'Retângulo 3x2' },
        { id: 'i2', content: 'Linha Reta 1x6' },
        { id: 'i3', content: 'Quadrado 2x2' },
        { id: 'i4', content: 'Tirinha 1x4' }
      ],
      categories: [
        { id: 'c1', title: 'Tem 6 quadradinhos de Área' },
        { id: 'c2', title: 'Tem 4 quadradinhos de Área' }
      ],
      correctMapping: { 'i1': 'c1', 'i2': 'c1', 'i3': 'c2', 'i4': 'c2' },
      successMessage: 'Genial! A forma não importa se a quantidade de espaço interno for a mesma.'
    },
    transicao: 'Compreender a área nos ajuda a saber a quantidade de grama que precisamos comprar!'
  },
  {
    title: 'Atividade 5 — Investigando o m²',
    cena: 'O gari entra na escola municipal ao lado da praça para ajudar na montagem de um evento de reciclagem.',
    fala: 'Para organizar as mesas, é importante saber a área da sala. Quando o espaço é grande, não usamos centímetros.',
    explicacao: 'Em espaços grandes como salas, calçadas ou ruas, usamos o Metro Quadrado (m²). Um m² é o espaço de um quadrado de 1 metro de lado.',
    detalhePedagogico: 'Sempre preste atenção na unidade de medida. Medir o tamanho de uma folha de caderno pede cm², mas medir a sala de aula pede m².',
    microexemplo: 'Se o chão da sala cabem 30 quadrados de 1m x 1m, a área é de 30 m².',
    demoInteraction: { type: 'demo-area' },
    comando: 'Qual é a unidade certa e qual o valor da área para espaços grandes?',
    quiz: {
      question: 'Sabendo que a sala comporta exatos 30 quadrados de piso (onde cada piso mede 1m de lado), qual é a área da sala?',
      options: ['30 metros', '30 cm²', '30 m²', '30 m³'],
      correctIndex: 2,
      explanationOnSuccess: 'Isso! Se os quadrados têm 1 metro de lado, estamos medindo em metros quadrados (m²).',
      explanationOnError: 'Preste atenção na unidade! Se o quadrado tem 1 metro, a área é medida em m².',
      hint: 'A unidade usada para áreas com base no metro leva "²".'
    },
    transicao: 'Excelente, já sabemos calcular as grandes áreas onde vamos trabalhar!'
  }
]));

track.units.push(createUnit(3, 'Área, perímetro e probabilidade', 'Retângulos e Sorteios', 'Dice5', [
  {
    title: 'Atividade 6 e 7 — Área vs Perímetro',
    cena: 'Agora, o gari precisa isolar um pedaço da calçada com fita amarela e preta.',
    fala: 'Mas espere! A área é o chão... e o contorno externo, como chamamos? Isso é o perímetro!',
    explicacao: 'O Perímetro é a medida apenas da borda. Imagine uma formiga caminhando pelas linhas externas do retângulo. O caminho completo é o perímetro.',
    detalhePedagogico: 'Para encontrar o perímetro de qualquer figura com lados retos, a regra é uma só: SOMAR TODOS OS LADOS.',
    microexemplo: 'Se o canteiro mede 4 metros por 2 metros, o perímetro será 4 + 2 + 4 + 2 = 12 metros de fita.',
    demoInteraction: { type: 'demo-perimeter' },
    comando: 'Sabendo dessa diferença crucial, resolva o problema da área vs perímetro.',
    quiz: {
      question: 'Num espaço com forma de retângulo medindo 6m × 3m, a área é de:',
      options: ['18 m', '9 m²', '18 m²', '12 m²'],
      correctIndex: 2,
      explanationOnSuccess: 'Correto! 6 × 3 = 18 m². A unidade m² confirma que é área.',
      explanationOnError: 'Multiplique as duas medidas e escolha a alternativa com m².',
      hint: '6 x 3 e olhe a unidade de área.'
    },
    transicao: 'Agora que cercamos o local, como decidimos qual tarefa vem primeiro? Sorteio!'
  },
  {
    title: 'Atividade 8 e 9 — Combinando dois dados',
    cena: 'O gari senta no banco e tira dois dados do bolso.',
    fala: 'Vamos lançar dois dados para decidir a ordem das tarefas da equipe. Quantas combinações podemos ter?',
    explicacao: 'O dado 1 tem 6 opções. O dado 2 também tem 6 opções. O total de combinações é 6 × 6 = 36.',
    detalhePedagogico: 'A probabilidade compara o que queremos (Casos Favoráveis) com o total. Se queremos duas faces iguais (1,1; 2,2...), temos 6 casos favoráveis.',
    microexemplo: 'A probabilidade se escreve como Casos Favoráveis / Total de Casos. 6 chances em 36 = 6/36.',
    demoInteraction: { type: 'demo-prob' },
    comando: 'Determine a probabilidade observando a explicação.',
    quiz: {
      question: 'Observando os dados, a probabilidade de cair com números iguais (duplas) é de:',
      options: ['6/36 ou 1/6', '12/36 ou 1/3', '1/36', '6/6'],
      correctIndex: 0,
      explanationOnSuccess: 'Brilhante! Você percebeu que as 6 duplas representam 6 casos favoráveis num total de 36.',
      explanationOnError: 'O total é 36. As duplas são 6 casos.',
      hint: '6 casos em 36 possíveis.'
    },
    transicao: 'Legal! O sorteio foi justo e o trabalho pode continuar.'
  }
]));

track.units.push(createUnit(4, 'Eventos cotidianos e Coleta', 'Análise de objetos e roletas', 'Recycle', [
  {
    title: 'Atividade 18 — Roleta de tarefas',
    cena: 'Para engajar os moradores, o gari instalou uma roleta de brindes e tarefas sustentáveis.',
    fala: 'Olha a roleta! Quanto mais espaços uma tarefa tiver na roda, maior é a chance de ela sair no sorteio.',
    explicacao: 'Probabilidade visual: as fatias da roleta representam a chance diretamente.',
    detalhePedagogico: 'Não precisa de cálculo complexo. Se a cor azul domina a roleta (3 partes) e a amarela só tem 1 parte, a probabilidade do azul é o triplo.',
    microexemplo: 'Se a roleta tem 4 fatias azuis e 1 vermelha, é muito mais provável sair azul.',
    demoInteraction: { type: 'demo-prob' },
    comando: 'Gire a Roleta Interativa e veja a probabilidade em ação.',
    interaction: { type: 'roulette', data: {} },
    quiz: {
      question: 'Se a roleta oferece 3 chances para varrer, 1 para lavar e 2 para pintar, qual tarefa o gari tem MAIOR probabilidade de fazer?',
      options: ['Varrer', 'Lavar', 'Pintar', 'Nenhuma, é tudo igual'],
      correctIndex: 0,
      explanationOnSuccess: 'Isso! "Varrer" tem mais chances porque domina os espaços da roleta.',
      explanationOnError: 'A opção com o maior número de chances é a mais provável.',
      hint: 'O número 3 é maior que 1 e 2.'
    },
    transicao: 'Você aprendeu probabilidade só olhando a roleta! E os materiais recicláveis?'
  },
  {
    title: 'Atividade 19 e 20 — Sacola de Recicláveis',
    cena: 'O gari mostra uma sacola cheia de materiais que os moradores entregaram: garrafas de plástico, vidro e papel.',
    fala: 'Vou retirar um material aleatoriamente. Qual é a chance de eu puxar um plástico?',
    explicacao: 'A contagem é simples: conte os plásticos (casos favoráveis) e divida pelo total de itens na sacola (casos possíveis).',
    detalhePedagogico: 'Sempre que a pergunta for "Por que é mais provável?", a resposta será baseada na quantidade. Maior quantidade significa maior probabilidade.',
    microexemplo: 'Se há 5 plásticos em 20 itens, a chance é 5 em 20.',
    demoInteraction: { type: 'demo-prob' },
    comando: 'Sabendo que há 5 plásticos, 3 papéis e 2 vidros na sacola, determine a probabilidade.',
    writtenPrompt: {
      question: 'Explique por que é mais provável o gari puxar um plástico do que um vidro dessa sacola.',
      linesNeeded: 2,
      suggestedAnswer: 'Porque tem 5 plásticos e apenas 2 vidros. Como tem mais plástico, a chance de pegar ele é maior.',
      guideline: 'Foque em qual material tem a maior quantidade.'
    },
    transicao: 'Você é um ótimo assistente. Vamos registrar esses dados.'
  }
]));

track.units.push(createUnit(5, 'Frações e toneladas', 'Matemática e meio ambiente', 'PieChart', [
  {
    title: 'Atividade 24 — As Frações na pausa para a pizza',
    cena: 'Durante uma pausa, a equipe de limpeza dividiu uma pizza em 10 fatias. Sobrou 1.',
    fala: 'O que sobra também é importante registrar, ainda mais quando falamos de resíduos orgânicos e frações!',
    explicacao: 'Uma pizza dividida em 10 partes tem o denominador 10. A fatia que sobrou é 1 parte de 10.',
    detalhePedagogico: 'Podemos escrever isso de duas formas: Fração (1/10) ou Número Decimal (0,1). Ambas significam "um décimo" do total.',
    microexemplo: '2 fatias de 10 seriam 2/10 ou 0,2.',
    demoInteraction: { type: 'demo-area' },
    comando: 'Selecione a representação correta dessa sobra.',
    quiz: {
      question: 'Se sobrou 1 fatia de uma pizza cortada em 10, qual é a fração e sua representação em decimal?',
      options: ['1/1 e 1,0', '1/10 e 0,1', '10/10 e 1,0', '10/1 e 10,0'],
      correctIndex: 1,
      explanationOnSuccess: 'Brilhante! 1 sobre 10 é igual a 0,1 décimos.',
      explanationOnError: 'Lembre-se: o total (10) vai embaixo na fração. 1/10 equivale a 0,1.',
      hint: 'O total de fatias fica no denominador.'
    },
    transicao: 'Pizza de lado, vamos para pesos pesados e levinhos.'
  },
  {
    title: 'Atividade 25, 26 e 27 — Gramas e Toneladas',
    cena: 'O gari exibe um gráfico anual de garrafas PET do Brasil (em toneladas) e depois aponta para uma formiga na calçada.',
    fala: 'No nosso trabalho medimos de tudo! O lixo pesado da cidade e a vida minúscula das calçadas.',
    explicacao: 'A unidade deve combinar com o peso. Usamos miligrama (mg) para coisas microscópicas, grama (g) para objetos leves, quilo (kg) para lixo comum e Tonelada (t) para muito peso.',
    detalhePedagogico: 'A Tonelada equivale a 1.000 quilos. É a unidade usada para medir a carga do caminhão de lixo inteiro!',
    microexemplo: 'Para transformar 3 toneladas em kg, fazemos 3 × 1.000 = 3.000 kg.',
    demoInteraction: { type: 'demo-perimeter' },
    comando: 'Assinale a unidade certa para cada objeto.',
    dragAndDrop: {
      title: 'Cada peso em seu lugar',
      instruction: 'Arraste a medida correta para o objeto certo.',
      items: [
        { id: 'i1', content: 'Peso de uma Formiga' },
        { id: 'i2', content: 'Peso da Coleta de PET (Caminhão Inteiro)' }
      ],
      categories: [
        { id: 'c1', title: 'Medido em Miligramas (mg)' },
        { id: 'c2', title: 'Medido em Toneladas (t)' }
      ],
      correctMapping: { 'i1': 'c1', 'i2': 'c2' },
      successMessage: 'Incrível! Você compreendeu as diferentes escalas de peso.'
    },
    transicao: 'Ótimo trabalho! O sol está se pondo, vamos voltar para a base para os desafios finais.'
  }
]));

track.units.push(createUnit(6, 'Raciocínio Lógico e Padrões', 'Desafios Finais', 'Award', [
  {
    title: 'Atividade 28 — O Padrão das Placas',
    cena: 'No caminho de volta, vocês reparam que as placas "Separar, Reduzir, Reutilizar e Reciclar" se repetem nos postes.',
    fala: 'Veja, é um ciclo de 4 placas que se repete a rua toda! Você consegue descobrir qual será a 27ª placa lá no fim da avenida?',
    explicacao: 'Quando uma sequência se repete infinitamente, usamos a divisão para descobrir qualquer posição.',
    detalhePedagogico: 'Divida a posição que você quer (27) pelo tamanho do ciclo (4 placas). O resto da divisão indica a resposta exata!',
    microexemplo: 'Se fossem só 3 placas e eu quisesse a 5ª, faria 5÷3, resto 2. Então é a placa nº 2!',
    demoInteraction: { type: 'demo-path' },
    comando: 'O ciclo é de 4. A posição procurada é a 27ª.',
    quiz: {
      question: 'Dividindo 27 por 4, qual é o resto e qual figura isso representa?',
      options: [
        'Resto 1 (Separar)',
        'Resto 2 (Reduzir)',
        'Resto 3 (Reutilizar)',
        'Resto 0 (Reciclar)'
      ],
      correctIndex: 2,
      explanationOnSuccess: 'Mestre da divisão! 27 dividido por 4 dá 6 blocos inteiros, sobrando 3. A placa é Reutilizar.',
      explanationOnError: 'Faça a conta: 4 × 6 = 24. Faltam quantos para chegar no 27? Esse é o resto.',
      hint: 'A tabuada do 4 passa pelo 24. A diferença de 27 para 24 é o resto.'
    },
    transicao: 'A mente está afiada! Última tarefa do dia no galpão.'
  },
  {
    title: 'Atividade 29 — Laboratório 3D do Gari',
    cena: 'Dentro do galpão da base, o gari brinca com blocos conectores para bolar a arrumação das caixas grandes.',
    fala: 'Eu tenho blocos formados por 2 cubos grudados cada um. Não posso cortá-los. Qual estrutura é impossível montar se eu tiver 4 blocos?',
    explicacao: 'Você não pode montar estruturas que tenham espaços ímpares pendurados ou pontas sozinhas se suas peças originais são "gêmeas" (grudadas de 2 em 2).',
    detalhePedagogico: 'O raciocínio espacial permite visualizar que peças inquebráveis de tamanho PAR não conseguem formar volumes de tamanho ÍMPAR sem sobras.',
    microexemplo: 'Uma torre de 3 cubinhos é impossível de fazer usando bloquinhos de 2.',
    demoInteraction: { type: 'demo-area' },
    comando: 'Interaja com os blocos no Laboratório 3D para entender o espaço.',
    interaction: { type: 'cubes', data: { count: 8 } },
    writtenPrompt: {
      question: 'Explique por que uma escada com degraus de tamanho "1 cubo" não pode ser construída se o gari só tem blocos rígidos de "2 cubos".',
      linesNeeded: 2,
      suggestedAnswer: 'Porque o bloco não pode ser partido. Onde precisa só de 1 cubo, o bloco de 2 cubos não encaixa ou vai sobrar uma ponta flutuando.',
      guideline: 'Mencione que a peça é de tamanho par e não pode ser cortada.'
    },
    transicao: 'O galpão está organizado. É hora de fechar o expediente!'
  }
]));

track.units.push(createUnit(7, 'O Grande Resumo do Expediente', 'Fim do dia', 'Star', [
  {
    title: 'O Fim do Expediente',
    cena: 'O gari e o aluno sentam no banco da base de limpeza. A cidade está organizada, as ruas medidas e o lixo pesado devidamente convertido em toneladas e probabilidades.',
    fala: 'Terminamos! Hoje você ajudou a planejar uma rota, mediu distâncias com a régua, calculou áreas, analisou as roletas, leu gráficos enormes e reconheceu padrões nas placas.',
    explicacao: 'A matemática não serve só para resolver continhas em um papel. Ela serve para o nosso dia a dia, desde como organizar as ruas de uma cidade inteira, até calcular a logística pesada que um gari faz.',
    detalhePedagogico: 'Cada atividade que fizemos hoje é um pedaço real da logística urbana que mantém a cidade funcionando. A geometria (área/perímetro), a estatística (probabilidade) e a matemática básica (medidas/frações) são as ferramentas silenciosas de uma cidade limpa.',
    microexemplo: 'Lembre-se: cuidar da cidade é responsabilidade de todos nós, e a matemática é nossa maior ferramenta!',
    demoInteraction: { type: 'demo-path' },
    comando: 'Reflita sobre o que vivemos hoje. Missão Concluída!',
    quiz: {
      question: 'Qual dessas afirmações melhor resume o que você aprendeu com o gari hoje?',
      options: [
        'A matemática é feita de atividades chatas e sem sentido prático.',
        'O trabalho do gari é apenas varrer a rua.',
        'O trabalho do gari envolve muito planejamento, áreas, unidades de medida e a matemática é essencial para a limpeza e organização da cidade.',
        'Probabilidade e gráfico só servem para brincadeiras de escola.'
      ],
      correctIndex: 2,
      explanationOnSuccess: 'Parabéns! Você captou a essência do nosso projeto. O Gari é um especialista urbano e a matemática mora nas ruas.',
      explanationOnError: 'Tente pensar em como o Gari usou as contas hoje. Não foi só para a escola, foi para trabalhar.',
      hint: 'O foco principal dessa trilha foi valorizar a matemática no trabalho real.'
    },
    transicao: 'Expediente encerrado. Você ganhou a medalha "Especialista em Logística Urbana"!'
  }
]));

const fileContent = `import { Track } from '../../types';\n\nexport const trackGari: Track = ${JSON.stringify(track, null, 2)};\n`;
fs.writeFileSync('src/data/tracks/trackGari.ts', fileContent, 'utf-8');
console.log('Successfully generated complete and pedagogical trackGari.ts');

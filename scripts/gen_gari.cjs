const fs = require('fs');

const track = {
  id: 'gari-mission',
  subjectId: 'matematica',
  number: 8,
  title: 'Um dia no trabalho com um gari',
  description: 'Uma jornada interativa completa baseada no PDF de Área e Perímetro, acompanhando um gari homem em seu dia a dia urbano.',
  objective: 'Aprender, na prática, como medir áreas e perímetros, calcular probabilidade e reconhecer padrões no trabalho essencial do gari.',
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
      mascotTip: 'Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor.'
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
    detalhePedagogico: 'Para descrever um caminho perfeitamente, precisamos de duas coisas: a DIREÇÃO (direita, esquerda, cima, baixo) e a QUANTIDADE (quantas quadras andamos). Não adianta dizer "vá para a direita" sem dizer por quantos quarteirões!',
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
    explicacao: 'Estimar é o ato de prever uma medida baseando-se no que já conhecemos. Não é chutar! É olhar e comparar. Por exemplo, se sei que meu passo tem quase 1 metro, e dei 10 passos, estimo que o muro tenha 10 metros.',
    detalhePedagogico: 'Depois da estimativa, usamos a ferramenta real (régua, fita métrica, trena) para obter a MEDIDA EXATA. A diferença entre a sua estimativa e a medida exata mostra o quão treinado está o seu "olho matemático".',
    microexemplo: 'Eu estimo que essa vassoura tenha 1 metro de altura. Quando pego a trena, descubro que ela tem 1m e 20cm. Minha estimativa foi boa!',
    demoInteraction: { type: 'demo-path' }, // Reusing visual
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
    explicacao: 'A Área é a quantidade de superfície plana que existe DENTRO do contorno de uma figura. Se a gente quadricular a praça, calcular a área é o mesmo que contar quantos quadrados preenchem o chão.',
    detalhePedagogico: 'O mais fascinante é que figuras com formatos totalmente diferentes podem ter a mesma área. Uma quadra de esporte comprida e um pátio quadrado podem ter os mesmos 100 metros quadrados (m²) de área!',
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
    title: 'Atividade 6 e 7 — E o Perímetro?',
    cena: 'Agora, o gari precisa isolar um pedaço da calçada com fita amarela e preta.',
    fala: 'Mas espere! A área é o chão... e o contorno externo, como chamamos? Isso é o perímetro!',
    explicacao: 'O Perímetro é a medida apenas da borda. Imagine uma formiga caminhando pelas linhas externas do retângulo. O caminho completo que ela fizer até voltar ao início é o perímetro.',
    detalhePedagogico: 'Para encontrar o perímetro de qualquer figura com lados retos, a regra é uma só: SOMAR TODOS OS LADOS. Num retângulo, você sempre terá 4 lados para somar (comprimento + largura + comprimento + largura).',
    microexemplo: 'Se o canteiro mede 4 metros por 2 metros, o perímetro será 4 + 2 + 4 + 2 = 12 metros de fita isolante necessários.',
    demoInteraction: { type: 'demo-perimeter' },
    comando: 'Sabendo dessa diferença crucial, resolva o problema da área vs perímetro do nosso espaço 6x3.',
    interaction: { type: 'path-draw', data: { target: 12 } },
    quiz: {
      question: 'Num retângulo com 6m de comprimento e 3m de largura, qual o valor correto da Área e por quê?',
      options: [
        '18 m², porque Área = Comprimento × Largura',
        '18 m, porque o Perímetro = 6 + 3',
        '36 m², porque é o dobro de 18',
        '12 m, porque eu sumei os lados.'
      ],
      correctIndex: 0,
      explanationOnSuccess: 'Irretocável! Área multiplica (6x3), Perímetro soma os lados (6+3+6+3). E a unidade da área carrega o ² (m²)!',
      explanationOnError: 'Lembre-se da explicação: Área usa multiplicação (6 vezes 3) e o símbolo "²".',
      hint: 'A área é o recheio: 6 vezes 3.'
    },
    transicao: 'Você aprendeu os dois conceitos mais fortes da Geometria do dia a dia!'
  }
]));

track.units.push(createUnit(3, 'Como Funciona a Probabilidade?', 'Eventos Aleatórios', 'PlayCircle', [
  {
    title: 'Atividade 8 — Compreendendo a Chance (Probabilidade)',
    cena: 'Para engajar os moradores, a subprefeitura montou uma roleta gigante de prêmios ecológicos.',
    fala: 'Muita gente acha que "sorte" não tem regra matemática. Mas tem sim! O nome disso é probabilidade.',
    explicacao: 'A probabilidade mede a "chance" matemática de algo acontecer. Nós calculamos isso contando os "Casos que queremos" e dividindo por "Tudo que é possível".',
    detalhePedagogico: 'Pense numa sacola de doces. Se você tem 1 bala vermelha e 4 verdes, o total é 5. A chance de tirar uma vermelha de olhos vendados é apenas 1 em 5. A probabilidade nunca mente sobre quem está em maior quantidade!',
    microexemplo: 'Se você jogar uma moeda (Cara ou Coroa), o total é 2. A chance de sair Cara é 1 em 2. Ou seja, metade das vezes!',
    demoInteraction: { type: 'demo-prob' },
    comando: 'Gire a Roleta Interativa de Sorteios. A roleta tem 3 partes azuis (Varrer), 2 rosas (Pintar) e 1 amarela (Lavar).',
    interaction: { type: 'roulette', data: {} },
    quiz: {
      question: 'Ao girar a roleta descrita (3 azuis, 2 rosas, 1 amarela), qual a probabilidade matemática de cair no amarelo (Lavar)?',
      options: [
        '1 chance em 6',
        '1 chance em 3',
        '3 chances em 6',
        '6 chances em 6'
      ],
      correctIndex: 0,
      explanationOnSuccess: 'Exato! A fatia amarela é apenas 1. O total de fatias é 6. A chance é rigorosamente 1/6 (um sexto).',
      explanationOnError: 'Conte o total de fatias (3 + 2 + 1). Depois verifique quantas dessas fatias são amarelas.',
      hint: 'Amarela é apenas uma fatia no total de 6.'
    },
    transicao: 'O mais bacana da probabilidade é prever as tendências sem precisar advinhar.'
  },
  {
    title: 'Atividade 29 — Laboratório de Visão 3D e Cubos',
    cena: 'Dentro do galpão da base, o gari brinca com blocos conectores, aqueles blocos parecidos com tijolinhos.',
    fala: 'A matemática também estuda o espaço 3D (tridimensional). O cérebro precisa imaginar coisas escondidas.',
    explicacao: 'Quando construímos algo usando blocos duplos rígidos (peças formadas por 2 cubos colados, inquebráveis), somos obrigados a preencher o espaço em pares.',
    detalhePedagogico: 'O raciocínio espacial permite que os arquitetos, engenheiros ou garis projetem como caixas caberão num caminhão. Se você tem apenas blocos de tamanho 2, nunca conseguirá construir algo que tenha espaços apertados tamanho 1 ou pontas flutuantes de 1 cubo.',
    microexemplo: 'Uma torre alta pode ser feita empilhando os blocos de 2. Mas uma pirâmide fina de topo pontiagudo com 1 bloquinho solitário é impossível com essas peças.',
    demoInteraction: { type: 'demo-area' }, // Using area demo as stand-in illustration
    comando: 'Arraste o Visualizador 3D para entender como a rotação expõe faces ocultas do objeto. Depois justifique.',
    interaction: { type: 'cubes', data: { count: 8 } },
    writtenPrompt: {
      question: 'A partir do que o Gari ensinou sobre espaço, por que é importante visualizar os objetos 3D girando antes de guardar caixas num caminhão?',
      linesNeeded: 2,
      suggestedAnswer: 'Porque caixas têm profundidade, e se não considerarmos todas as faces, a carga não vai se encaixar direito ou vai ficar com pontas penduradas.',
      guideline: 'Fale sobre como os blocos precisam se encaixar sem deixar "buracos" soltos de tamanho errado.'
    },
    transicao: 'Com a visão espacial treinada, nenhuma caixa ficará sobrando no galpão!'
  }
]));

const fileContent = `import { Track } from '../../types';\n\nexport const trackGari: Track = ${JSON.stringify(track, null, 2)};\n`;
fs.writeFileSync('src/data/tracks/trackGari.ts', fileContent, 'utf-8');
console.log('Successfully generated extremely pedagogical trackGari.ts');

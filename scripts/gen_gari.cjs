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
    
    // C - D: Explicação
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
              label: 'O que observar?', 
              text: act.explicacao, 
              iconName: 'Info' 
            },
            { 
              label: 'Exemplo Prático', 
              text: act.microexemplo || 'Aplique essa lógica no próximo desafio.', 
              iconName: 'Lightbulb' 
            }
          ]
        },
        // ADD VISUAL INTERACTION TO EXPLANATION AS WELL
        gariInteraction: act.interaction
      });
    }
    
    // E - G: Interação e Feedback
    const practiceStep = {
      id: `u${number}-a${idx}-practice`,
      type: 'independent_exercise',
      title: 'Sua vez de agir!',
      content: act.comando,
      mascotTip: 'Vamos lá, mostre o que você sabe!',
      quiz: act.quiz,
      gariInteraction: act.interaction
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

track.units.push(createUnit(1, 'Planejando o percurso na malha', 'Área e perímetro: o percurso do gari', 'MapIcon', [
  {
    title: 'Atividade 1 — Descrever o caminho',
    cena: 'O aluno encontra o gari na base de limpeza. O gari espalha um grande mapa do bairro em cima da mesa. As ruas parecem uma malha quadriculada.',
    fala: 'Bom dia! Hoje você vai acompanhar meu trabalho. Antes de sairmos, precisamos planejar o percurso. Cada deslocamento nesse mapa representa uma quadra. Vamos ler o caminho juntos?',
    explicacao: 'Uma quadra é representada por um lado do quadradinho. Para descobrir o caminho, começamos no ponto inicial, contamos cada lado percorrido e anotamos a direção antes da próxima mudança.',
    microexemplo: 'Para contar a distância, começo no ponto de partida e observo quantos lados percorro. Por exemplo: 1 para cima, 2 para a direita.',
    comando: 'Descreva o caminho do gari clicando na malha interativa. Forme o caminho que o gari deve seguir!',
    interaction: { type: 'path-draw', data: { perimeter: 24 } },
    quiz: {
      question: 'Se o gari percorreu 2 quadras para a direita, qual é a próxima direção?',
      options: ['Esquerda', 'Para cima', 'Direita', 'Para baixo'],
      correctIndex: 1,
      explanationOnSuccess: 'Exato! Você acompanhou o mapa perfeitamente e contou os segmentos na direção certa.',
      explanationOnError: 'Volte ao ponto da última mudança e observe a linha subindo.',
      hint: 'Olhe a linha se movendo para o topo da tela.'
    },
    transicao: 'Muito bem! Agora que sabemos ler o mapa de quadras, vamos aprender a medir as distâncias com precisão.'
  },
  {
    title: 'Atividade 2 — Estimar e medir',
    cena: 'O gari pega seus instrumentos de medição. Ele aponta para um canteiro no mapa.',
    fala: 'Os lados dos quadradinhos têm o mesmo tamanho. Você consegue estimar quantos centímetros cada lado apresenta? E usando a régua, fica mais fácil?',
    explicacao: 'Estimar é pensar num valor aproximado observando o tamanho. Medir é usar um instrumento para encontrar o número exato. A distância total é a soma dos pedaços medidos.',
    microexemplo: 'Se estimamos 2 cm por trecho e temos 5 trechos, nossa estimativa total será 10 cm. Depois, a régua dirá a verdade!',
    comando: 'Utilize a Régua Interativa para conferir o tamanho do objeto.',
    interaction: { type: 'measure', data: { expectedCm: 10 } },
    writtenPrompt: {
      question: 'Explique com suas palavras a diferença entre ESTIMAR uma medida e MEDIR com uma régua.',
      linesNeeded: 2,
      suggestedAnswer: 'Estimar é adivinhar o tamanho olhando, e medir é usar a régua para achar o tamanho exato.',
      guideline: 'Use as palavras "adivinhar" e "exato".'
    },
    transicao: 'O caminho está planejado e medido. Está na hora de pegar os equipamentos e ir para a praça!'
  }
]));

track.units.push(createUnit(2, 'Medindo espaços da cidade', 'Área como medida de superfície', 'Square', [
  {
    title: 'Atividade 3 — Pintar e contar regiões',
    cena: 'Vocês chegam a uma grande praça dividida em canteiros de diferentes formatos (retangulares, esticados, quadrados).',
    fala: 'Agora vamos descobrir quanto espaço existe em cada região da praça. Cada quadradinho é uma unidade de área.',
    explicacao: 'Área é o espaço que fica dentro da figura. Se duas figuras diferentes cobrirem a mesma quantidade de quadradinhos, elas têm a MESMA área!',
    microexemplo: 'Um canteiro 2x3 (6 quadrados) tem a mesma área de um canteiro comprido de 1x6 (6 quadrados).',
    comando: 'Pinte as regiões da praça e conte quantas unidades preenchem cada canteiro.',
    interaction: { type: 'paint', data: { totalRegions: 15, paintedRegions: 6 } },
    dragAndDrop: {
      title: 'Combine as áreas iguais',
      instruction: 'Arraste os formatos para as categorias que possuem a mesma área.',
      items: [
        { id: 'i1', content: 'Retângulo 3x2' },
        { id: 'i2', content: 'Fila reta 1x6' },
        { id: 'i3', content: 'Quadrado 2x2' },
        { id: 'i4', content: 'Tirinha 1x4' }
      ],
      categories: [
        { id: 'c1', title: 'Área = 6 quadrados' },
        { id: 'c2', title: 'Área = 4 quadrados' }
      ],
      correctMapping: { 'i1': 'c1', 'i2': 'c1', 'i3': 'c2', 'i4': 'c2' },
      successMessage: 'Perfeito! Figuras diferentes podem sim ter a mesma área.'
    },
    transicao: 'Entendeu? O formato muda, mas o espaço que ocupa pode ser o mesmo.'
  },
  {
    title: 'Atividade 4 e 5 — Investigando o m²',
    cena: 'O gari entra na escola municipal ao lado da praça para ajudar na montagem de um evento de reciclagem.',
    fala: 'Para organizar as mesas de reciclagem, é importante saber a área da sala. Quando o espaço é grande, não contamos centímetros.',
    explicacao: 'Em espaços grandes como salas, calçadas ou ruas, usamos o Metro Quadrado (m²). Um m² é o espaço ocupado por um quadrado de 1 metro de lado.',
    microexemplo: 'Se o chão da sala cabem 30 quadrados de 1m x 1m, a área é de 30 m².',
    comando: 'Qual é a unidade certa e qual o valor da área para espaços grandes?',
    interaction: { type: 'paint', data: { totalRegions: 30, paintedRegions: 10 } },
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
    cena: 'O gari precisa cercar uma área retangular com fita amarela de segurança.',
    fala: 'Se eu for passar a fita ao redor do espaço, preciso do PERÍMETRO. Se eu quiser saber o chão que vamos varrer, preciso da ÁREA. Não confunda!',
    explicacao: 'Perímetro é o contorno (soma de todos os lados). Área é a superfície (espaço interno, comprimento × largura).',
    microexemplo: 'Um retângulo de 6 m por 3 m. Área = 6 × 3 = 18 m². Perímetro = 6+3+6+3 = 18 m.',
    comando: 'Use o mapa para traçar o contorno (perímetro) da área de segurança.',
    interaction: { type: 'path-draw', data: { perimeter: 18 } },
    quiz: {
      question: 'A área desse espaço de 6m × 3m é de:',
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
    explicacao: 'O dado 1 tem 6 opções. O dado 2 também tem 6 opções. O total de combinações é 6 × 6 = 36. A chance de sair dois números iguais (ex: 3 e 3) acontece 6 vezes.',
    microexemplo: 'A probabilidade se escreve como Casos Favoráveis / Total de Casos. 6 chances em 36 = 6/36.',
    comando: 'Determine a probabilidade e, se possível, sua forma simplificada.',
    interaction: { type: 'roulette', data: {} },
    quiz: {
      question: 'Observando os dados, a probabilidade de cair com números iguais (duplas) é de:',
      options: ['6/36 ou 1/6', '12/36 ou 1/3', '1/36', '6/6'],
      correctIndex: 0,
      explanationOnSuccess: 'Brilhante! Você percebeu que as 6 duplas representam 6 casos favoráveis num total de 36.',
      explanationOnError: 'O total é 36. As duplas são (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). São 6 casos.',
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
    explicacao: 'Probabilidade visual: as fatias da roleta representam a chance.',
    microexemplo: 'Se a roleta tem 4 fatias azuis e 1 vermelha, é muito mais provável sair azul.',
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
    microexemplo: 'Se há 5 plásticos em 20 itens, a chance é 5 em 20.',
    comando: 'Sabendo que há 5 plásticos, 3 papéis e 2 vidros na sacola, determine a probabilidade.',
    interaction: { type: 'roulette', data: {} },
    writtenPrompt: {
      question: 'Explique por que é mais provável o gari puxar um plástico do que um vidro dessa sacola.',
      linesNeeded: 2,
      suggestedAnswer: 'Porque tem 5 pedaços de plástico e apenas 2 de vidro. Como tem mais plástico, a chance de pegar ele é maior.',
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
    explicacao: 'Uma pizza dividida em 10 partes tem o denominador 10. A fatia que sobrou é 1 parte de 10. Em número decimal, isso se escreve 0,1 (um décimo).',
    microexemplo: '2 fatias de 10 seriam 2/10 ou 0,2.',
    comando: 'Selecione a representação correta dessa sobra.',
    interaction: { type: 'paint', data: { totalRegions: 10, paintedRegions: 1 } },
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
    explicacao: 'A unidade deve combinar com o peso. Usamos miligrama (mg) para a formiga, grama (g) para um lápis, quilo (kg) para lixo comum e Tonelada (t) para o caminhão inteiro! (1 t = 1.000 kg).',
    microexemplo: 'Para transformar 3 toneladas em kg, fazemos 3 × 1.000 = 3.000 kg.',
    comando: 'Assinale a unidade certa para a formiga e faça a conversão do gráfico do PET (26 t).',
    interaction: { type: 'measure', data: { expectedCm: 10 } },
    dragAndDrop: {
      title: 'Cada peso em seu lugar',
      instruction: 'Arraste a medida correta para o objeto certo.',
      items: [
        { id: 'i1', content: 'Peso de uma Formiga' },
        { id: 'i2', content: 'Peso da Coleta de PET Nacional (2017)' }
      ],
      categories: [
        { id: 'c1', title: '3 mg (miligramas)' },
        { id: 'c2', title: '26.000 kg (26 toneladas)' }
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
    explicacao: 'Divida a posição que você quer pelo tamanho do ciclo. O resto da divisão indica a resposta exata!',
    microexemplo: 'Se fossem só 3 placas e eu quisesse a 5ª, faria 5÷3, resto 2. Então é a placa nº 2!',
    comando: 'O ciclo é de 4. A posição procurada é a 27ª.',
    interaction: { type: 'path-draw', data: { perimeter: 4 } },
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
    fala: 'Eu tenho blocos formados por 2 cubos grudados cada um. Não posso cortá-los. Qual estrutura é impossível montar se eu tiver 4 blocos (8 cubinhos totais)?',
    explicacao: 'Você não pode montar estruturas que tenham espaços ímpares pendurados ou pontas sozinhas se suas peças originais são "gêmeas" (grudadas de 2 em 2).',
    microexemplo: 'Uma torre de 3 cubinhos é impossível com bloquinhos de 2.',
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
    microexemplo: 'Lembre-se: cuidar da cidade é responsabilidade de todos nós, e a matemática é nossa maior ferramenta!',
    comando: 'Reflita sobre o que vivemos hoje. Missão Concluída!',
    interaction: { type: 'paint', data: { totalRegions: 6, paintedRegions: 6 } },
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
console.log('Successfully generated extremely rich trackGari.ts');

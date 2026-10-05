const fs = require('fs');

const track = {
  id: 'gari-mission',
  subjectId: 'matematica',
  number: 8,
  title: 'Um dia no trabalho com um gari',
  description: 'Uma jornada interativa completa baseada no PDF de ├ürea e Per├¡metro, acompanhando um gari homem em seu dia a dia urbano.',
  objective: 'Medir, estimar e calcular ├írea e per├¡metro, interpretar gr├íficos, calcular probabilidade e reconhecer padr├Áes no contexto da limpeza urbana.',
  bnccSkills: [
    'EF04MA20 - Medir, estimar e comparar grandezas', 
    'EF04MA21 - ├ürea e per├¡metro em malha', 
    'EF04MA26 - Probabilidade e eventos aleat├│rios', 
    'EF04MA09 - Fra├º├Áes', 
    'EF04MA27 - Leitura de gr├íficos'
  ],
  color: 'emerald',
  badgeName: 'Especialista em Log├¡stica Urbana',
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
    
    // C - D: Explica├º├úo
    if (act.explicacao) {
      steps.push({
        id: `u${number}-a${idx}-exp`,
        type: 'explanation',
        title: 'Entendendo a Matem├ítica',
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
              label: 'Exemplo Pr├ítico', 
              text: act.microexemplo || 'Aplique essa l├│gica no pr├│ximo desafio.', 
              iconName: 'Lightbulb' 
            }
          ]
        }
      });
    }
    
    // E - G: Intera├º├úo e Feedback
    const practiceStep = {
      id: `u${number}-a${idx}-practice`,
      type: 'independent_exercise',
      title: 'Sua vez de agir!',
      content: act.comando,
      mascotTip: 'Vamos l├í, mostre o que voc├¬ sabe!',
      quiz: act.quiz,
      gariInteraction: act.interaction
    };

    // Add extra rich interactions
    if (act.dragAndDrop) practiceStep.dragAndDrop = act.dragAndDrop;
    if (act.writtenPrompt) practiceStep.writtenPrompt = act.writtenPrompt;
    
    steps.push(practiceStep);
    
    // H - I: Transi├º├úo
    steps.push({
      id: `u${number}-a${idx}-trans`,
      type: 'dialogue',
      title: 'Bom trabalho!',
      content: act.transicao,
      mascotTip: 'Isso a├¡! Vamos avan├ºar para o pr├│ximo desafio do dia.'
    });
  });

  return {
    id: `gari-c${number}`,
    trackId: 'gari-mission',
    number: number,
    title: `Cap├¡tulo ${number}: ${title}`,
    shortDesc: shortDesc,
    icon: icon,
    xpReward: 150,
    steps: steps
  };
}

track.units.push(createUnit(1, 'Planejando o percurso na malha', '├ürea e per├¡metro: o percurso do gari', 'MapIcon', [
  {
    title: 'Atividade 1 ÔÇö Descrever o caminho',
    cena: 'O aluno encontra o gari na base de limpeza. O gari espalha um grande mapa do bairro em cima da mesa. As ruas parecem uma malha quadriculada.',
    fala: 'Bom dia! Hoje voc├¬ vai acompanhar meu trabalho. Antes de sairmos, precisamos planejar o percurso. Cada deslocamento nesse mapa representa uma quadra. Vamos ler o caminho juntos?',
    explicacao: 'Uma quadra ├® representada por um lado do quadradinho. Para descobrir o caminho, come├ºamos no ponto inicial, contamos cada lado percorrido e anotamos a dire├º├úo antes da pr├│xima mudan├ºa.',
    microexemplo: 'Para contar a dist├óncia, come├ºo no ponto de partida e observo quantos lados percorro. Por exemplo: 1 para cima, 2 para a direita.',
    comando: 'Descreva o caminho do gari clicando na malha interativa. Forme o caminho que o gari deve seguir!',
    interaction: { type: 'path-draw', data: { perimeter: 24 } },
    quiz: {
      question: 'Se o gari percorreu 2 quadras para a direita, qual ├® a pr├│xima dire├º├úo?',
      options: ['Esquerda', 'Para cima', 'Direita', 'Para baixo'],
      correctIndex: 1,
      explanationOnSuccess: 'Exato! Voc├¬ acompanhou o mapa perfeitamente e contou os segmentos na dire├º├úo certa.',
      explanationOnError: 'Volte ao ponto da ├║ltima mudan├ºa e observe a linha subindo.',
      hint: 'Olhe a linha se movendo para o topo da tela.'
    },
    transicao: 'Muito bem! Agora que sabemos ler o mapa de quadras, vamos aprender a medir as dist├óncias com precis├úo.'
  },
  {
    title: 'Atividade 2 ÔÇö Estimar e medir',
    cena: 'O gari pega seus instrumentos de medi├º├úo. Ele aponta para um canteiro no mapa.',
    fala: 'Os lados dos quadradinhos t├¬m o mesmo tamanho. Voc├¬ consegue estimar quantos cent├¡metros cada lado apresenta? E usando a r├®gua, fica mais f├ícil?',
    explicacao: 'Estimar ├® pensar num valor aproximado observando o tamanho. Medir ├® usar um instrumento para encontrar o n├║mero exato. A dist├óncia total ├® a soma dos peda├ºos medidos.',
    microexemplo: 'Se estimamos 2 cm por trecho e temos 5 trechos, nossa estimativa total ser├í 10 cm. Depois, a r├®gua dir├í a verdade!',
    comando: 'Utilize a R├®gua Interativa para conferir o tamanho do objeto.',
    interaction: { type: 'measure', data: { expectedCm: 10 } },
    writtenPrompt: {
      question: 'Explique com suas palavras a diferen├ºa entre ESTIMAR uma medida e MEDIR com uma r├®gua.',
      linesNeeded: 2,
      suggestedAnswer: 'Estimar ├® adivinhar o tamanho olhando, e medir ├® usar a r├®gua para achar o tamanho exato.',
      guideline: 'Use as palavras "adivinhar" e "exato".'
    },
    transicao: 'O caminho est├í planejado e medido. Est├í na hora de pegar os equipamentos e ir para a pra├ºa!'
  }
]));

track.units.push(createUnit(2, 'Medindo espa├ºos da cidade', '├ürea como medida de superf├¡cie', 'Square', [
  {
    title: 'Atividade 3 ÔÇö Pintar e contar regi├Áes',
    cena: 'Voc├¬s chegam a uma grande pra├ºa dividida em canteiros de diferentes formatos (retangulares, esticados, quadrados).',
    fala: 'Agora vamos descobrir quanto espa├ºo existe em cada regi├úo da pra├ºa. Cada quadradinho ├® uma unidade de ├írea.',
    explicacao: '├ürea ├® o espa├ºo que fica dentro da figura. Se duas figuras diferentes cobrirem a mesma quantidade de quadradinhos, elas t├¬m a MESMA ├írea!',
    microexemplo: 'Um canteiro 2x3 (6 quadrados) tem a mesma ├írea de um canteiro comprido de 1x6 (6 quadrados).',
    comando: 'Pinte as regi├Áes da pra├ºa e conte quantas unidades preenchem cada canteiro.',
    interaction: { type: 'paint', data: { totalRegions: 10, paintedRegions: 4 } },
    dragAndDrop: {
      title: 'Combine as ├íreas iguais',
      instruction: 'Arraste os formatos para as categorias que possuem a mesma ├írea.',
      items: [
        { id: 'i1', content: 'Ret├óngulo 3x2' },
        { id: 'i2', content: 'Fila reta 1x6' },
        { id: 'i3', content: 'Quadrado 2x2' },
        { id: 'i4', content: 'Tirinha 1x4' }
      ],
      categories: [
        { id: 'c1', title: '├ürea = 6 quadrados' },
        { id: 'c2', title: '├ürea = 4 quadrados' }
      ],
      correctMapping: { 'i1': 'c1', 'i2': 'c1', 'i3': 'c2', 'i4': 'c2' },
      successMessage: 'Perfeito! Figuras diferentes podem sim ter a mesma ├írea.'
    },
    transicao: 'Entendeu? O formato muda, mas o espa├ºo que ocupa pode ser o mesmo.'
  },
  {
    title: 'Atividade 4 e 5 ÔÇö Investigando o m┬▓',
    cena: 'O gari entra na escola municipal ao lado da pra├ºa para ajudar na montagem de um evento de reciclagem.',
    fala: 'Para organizar as mesas de reciclagem, ├® importante saber a ├írea da sala. Quando o espa├ºo ├® grande, n├úo contamos cent├¡metros.',
    explicacao: 'Em espa├ºos grandes como salas, cal├ºadas ou ruas, usamos o Metro Quadrado (m┬▓). Um m┬▓ ├® o espa├ºo ocupado por um quadrado de 1 metro de lado.',
    microexemplo: 'Se o ch├úo da sala cabem 30 quadrados de 1m x 1m, a ├írea ├® de 30 m┬▓.',
    comando: 'Qual ├® a unidade certa e qual o valor da ├írea para espa├ºos grandes?',
    quiz: {
      question: 'Sabendo que a sala comporta exatos 30 quadrados de piso (onde cada piso mede 1m de lado), qual ├® a ├írea da sala?',
      options: ['30 metros', '30 cm┬▓', '30 m┬▓', '30 m┬│'],
      correctIndex: 2,
      explanationOnSuccess: 'Isso! Se os quadrados t├¬m 1 metro de lado, estamos medindo em metros quadrados (m┬▓).',
      explanationOnError: 'Preste aten├º├úo na unidade! Se o quadrado tem 1 metro, a ├írea ├® medida em m┬▓.',
      hint: 'A unidade usada para ├íreas com base no metro leva "┬▓".'
    },
    transicao: 'Excelente, j├í sabemos calcular as grandes ├íreas onde vamos trabalhar!'
  }
]));

track.units.push(createUnit(3, '├ürea, per├¡metro e probabilidade', 'Ret├óngulos e Sorteios', 'Dice5', [
  {
    title: 'Atividade 6 e 7 ÔÇö ├ürea vs Per├¡metro',
    cena: 'O gari precisa cercar uma ├írea retangular com fita amarela de seguran├ºa.',
    fala: 'Se eu for passar a fita ao redor do espa├ºo, preciso do PER├ìMETRO. Se eu quiser saber o ch├úo que vamos varrer, preciso da ├üREA. N├úo confunda!',
    explicacao: 'Per├¡metro ├® o contorno (soma de todos os lados). ├ürea ├® a superf├¡cie (espa├ºo interno, comprimento ├ù largura).',
    microexemplo: 'Um ret├óngulo de 6 m por 3 m. ├ürea = 6 ├ù 3 = 18 m┬▓. Per├¡metro = 6+3+6+3 = 18 m.',
    comando: 'Se um espa├ºo tem forma de ret├óngulo medindo 6 m de comprimento por 3 m de largura:',
    quiz: {
      question: 'A ├írea desse espa├ºo de 6m ├ù 3m ├® de:',
      options: ['18 m', '9 m┬▓', '18 m┬▓', '12 m┬▓'],
      correctIndex: 2,
      explanationOnSuccess: 'Correto! 6 ├ù 3 = 18 m┬▓. A unidade m┬▓ confirma que ├® ├írea.',
      explanationOnError: 'Multiplique as duas medidas e escolha a alternativa com m┬▓.',
      hint: '6 x 3 e olhe a unidade de ├írea.'
    },
    transicao: 'Agora que cercamos o local, como decidimos qual tarefa vem primeiro? Sorteio!'
  },
  {
    title: 'Atividade 8 e 9 ÔÇö Combinando dois dados',
    cena: 'O gari senta no banco e tira dois dados do bolso.',
    fala: 'Vamos lan├ºar dois dados para decidir a ordem das tarefas da equipe. Quantas combina├º├Áes podemos ter?',
    explicacao: 'O dado 1 tem 6 op├º├Áes. O dado 2 tamb├®m tem 6 op├º├Áes. O total de combina├º├Áes ├® 6 ├ù 6 = 36. A chance de sair dois n├║meros iguais (ex: 3 e 3) acontece 6 vezes.',
    microexemplo: 'A probabilidade se escreve como Casos Favor├íveis / Total de Casos. 6 chances em 36 = 6/36.',
    comando: 'Determine a probabilidade e, se poss├¡vel, sua forma simplificada.',
    quiz: {
      question: 'Observando os dados, a probabilidade de cair com n├║meros iguais (duplas) ├® de:',
      options: ['6/36 ou 1/6', '12/36 ou 1/3', '1/36', '6/6'],
      correctIndex: 0,
      explanationOnSuccess: 'Brilhante! Voc├¬ percebeu que as 6 duplas representam 6 casos favor├íveis num total de 36.',
      explanationOnError: 'O total ├® 36. As duplas s├úo (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). S├úo 6 casos.',
      hint: '6 casos em 36 poss├¡veis.'
    },
    transicao: 'Legal! O sorteio foi justo e o trabalho pode continuar.'
  }
]));

track.units.push(createUnit(4, 'Eventos cotidianos e Coleta', 'An├ílise de objetos e roletas', 'Recycle', [
  {
    title: 'Atividade 18 ÔÇö Roleta de tarefas',
    cena: 'Para engajar os moradores, o gari instalou uma roleta de brindes e tarefas sustent├íveis.',
    fala: 'Olha a roleta! Quanto mais espa├ºos uma tarefa tiver na roda, maior ├® a chance de ela sair no sorteio.',
    explicacao: 'Probabilidade visual: as fatias da roleta representam a chance.',
    microexemplo: 'Se a roleta tem 4 fatias azuis e 1 vermelha, ├® muito mais prov├ível sair azul.',
    comando: 'Gire a Roleta Interativa e veja a probabilidade em a├º├úo.',
    interaction: { type: 'roulette', data: {} },
    quiz: {
      question: 'Se a roleta oferece 3 chances para varrer, 1 para lavar e 2 para pintar, qual tarefa o gari tem MAIOR probabilidade de fazer?',
      options: ['Varrer', 'Lavar', 'Pintar', 'Nenhuma, ├® tudo igual'],
      correctIndex: 0,
      explanationOnSuccess: 'Isso! "Varrer" tem mais chances porque domina os espa├ºos da roleta.',
      explanationOnError: 'A op├º├úo com o maior n├║mero de chances ├® a mais prov├ível.',
      hint: 'O n├║mero 3 ├® maior que 1 e 2.'
    },
    transicao: 'Voc├¬ aprendeu probabilidade s├│ olhando a roleta! E os materiais recicl├íveis?'
  },
  {
    title: 'Atividade 19 e 20 ÔÇö Sacola de Recicl├íveis',
    cena: 'O gari mostra uma sacola cheia de materiais que os moradores entregaram: garrafas de pl├ístico, vidro e papel.',
    fala: 'Vou retirar um material aleatoriamente. Qual ├® a chance de eu puxar um pl├ístico?',
    explicacao: 'A contagem ├® simples: conte os pl├ísticos (casos favor├íveis) e divida pelo total de itens na sacola (casos poss├¡veis).',
    microexemplo: 'Se h├í 5 pl├ísticos em 20 itens, a chance ├® 5 em 20.',
    comando: 'Sabendo que h├í 5 pl├ísticos, 3 pap├®is e 2 vidros na sacola, determine a probabilidade.',
    writtenPrompt: {
      question: 'Explique por que ├® mais prov├ível o gari puxar um pl├ístico do que um vidro dessa sacola.',
      linesNeeded: 2,
      suggestedAnswer: 'Porque tem 5 peda├ºos de pl├ístico e apenas 2 de vidro. Como tem mais pl├ístico, a chance de pegar ele ├® maior.',
      guideline: 'Foque em qual material tem a maior quantidade.'
    },
    transicao: 'Voc├¬ ├® um ├│timo assistente. Vamos registrar esses dados.'
  }
]));

track.units.push(createUnit(5, 'Fra├º├Áes e toneladas', 'Matem├ítica e meio ambiente', 'PieChart', [
  {
    title: 'Atividade 24 ÔÇö As Fra├º├Áes na pausa para a pizza',
    cena: 'Durante uma pausa, a equipe de limpeza dividiu uma pizza em 10 fatias. Sobrou 1.',
    fala: 'O que sobra tamb├®m ├® importante registrar, ainda mais quando falamos de res├¡duos org├ónicos e fra├º├Áes!',
    explicacao: 'Uma pizza dividida em 10 partes tem o denominador 10. A fatia que sobrou ├® 1 parte de 10. Em n├║mero decimal, isso se escreve 0,1 (um d├®cimo).',
    microexemplo: '2 fatias de 10 seriam 2/10 ou 0,2.',
    comando: 'Selecione a representa├º├úo correta dessa sobra.',
    quiz: {
      question: 'Se sobrou 1 fatia de uma pizza cortada em 10, qual ├® a fra├º├úo e sua representa├º├úo em decimal?',
      options: ['1/1 e 1,0', '1/10 e 0,1', '10/10 e 1,0', '10/1 e 10,0'],
      correctIndex: 1,
      explanationOnSuccess: 'Brilhante! 1 sobre 10 ├® igual a 0,1 d├®cimos.',
      explanationOnError: 'Lembre-se: o total (10) vai embaixo na fra├º├úo. 1/10 equivale a 0,1.',
      hint: 'O total de fatias fica no denominador.'
    },
    transicao: 'Pizza de lado, vamos para pesos pesados e levinhos.'
  },
  {
    title: 'Atividade 25, 26 e 27 ÔÇö Gramas e Toneladas',
    cena: 'O gari exibe um gr├ífico anual de garrafas PET do Brasil (em toneladas) e depois aponta para uma formiga na cal├ºada.',
    fala: 'No nosso trabalho medimos de tudo! O lixo pesado da cidade e a vida min├║scula das cal├ºadas.',
    explicacao: 'A unidade deve combinar com o peso. Usamos miligrama (mg) para a formiga, grama (g) para um l├ípis, quilo (kg) para lixo comum e Tonelada (t) para o caminh├úo inteiro! (1 t = 1.000 kg).',
    microexemplo: 'Para transformar 3 toneladas em kg, fazemos 3 ├ù 1.000 = 3.000 kg.',
    comando: 'Assinale a unidade certa para a formiga e fa├ºa a convers├úo do gr├ífico do PET (26 t).',
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
      successMessage: 'Incr├¡vel! Voc├¬ compreendeu as diferentes escalas de peso.'
    },
    transicao: '├ôtimo trabalho! O sol est├í se pondo, vamos voltar para a base para os desafios finais.'
  }
]));

track.units.push(createUnit(6, 'Racioc├¡nio L├│gico e Padr├Áes', 'Desafios Finais', 'Award', [
  {
    title: 'Atividade 28 ÔÇö O Padr├úo das Placas',
    cena: 'No caminho de volta, voc├¬s reparam que as placas "Separar, Reduzir, Reutilizar e Reciclar" se repetem nos postes.',
    fala: 'Veja, ├® um ciclo de 4 placas que se repete a rua toda! Voc├¬ consegue descobrir qual ser├í a 27┬¬ placa l├í no fim da avenida?',
    explicacao: 'Divida a posi├º├úo que voc├¬ quer pelo tamanho do ciclo. O resto da divis├úo indica a resposta exata!',
    microexemplo: 'Se fossem s├│ 3 placas e eu quisesse a 5┬¬, faria 5├À3, resto 2. Ent├úo ├® a placa n┬║ 2!',
    comando: 'O ciclo ├® de 4. A posi├º├úo procurada ├® a 27┬¬.',
    quiz: {
      question: 'Dividindo 27 por 4, qual ├® o resto e qual figura isso representa?',
      options: [
        'Resto 1 (Separar)',
        'Resto 2 (Reduzir)',
        'Resto 3 (Reutilizar)',
        'Resto 0 (Reciclar)'
      ],
      correctIndex: 2,
      explanationOnSuccess: 'Mestre da divis├úo! 27 dividido por 4 d├í 6 blocos inteiros, sobrando 3. A placa ├® Reutilizar.',
      explanationOnError: 'Fa├ºa a conta: 4 ├ù 6 = 24. Faltam quantos para chegar no 27? Esse ├® o resto.',
      hint: 'A tabuada do 4 passa pelo 24. A diferen├ºa de 27 para 24 ├® o resto.'
    },
    transicao: 'A mente est├í afiada! ├Ültima tarefa do dia no galp├úo.'
  },
  {
    title: 'Atividade 29 ÔÇö Laborat├│rio 3D do Gari',
    cena: 'Dentro do galp├úo da base, o gari brinca com blocos conectores para bolar a arruma├º├úo das caixas grandes.',
    fala: 'Eu tenho blocos formados por 2 cubos grudados cada um. N├úo posso cort├í-los. Qual estrutura ├® imposs├¡vel montar se eu tiver 4 blocos (8 cubinhos totais)?',
    explicacao: 'Voc├¬ n├úo pode montar estruturas que tenham espa├ºos ├¡mpares pendurados ou pontas sozinhas se suas pe├ºas originais s├úo "g├¬meas" (grudadas de 2 em 2).',
    microexemplo: 'Uma torre de 3 cubinhos ├® imposs├¡vel com bloquinhos de 2.',
    comando: 'Interaja com os blocos no Laborat├│rio 3D para entender o espa├ºo.',
    interaction: { type: 'cubes', data: { count: 8 } },
    writtenPrompt: {
      question: 'Explique por que uma escada com degraus de tamanho "1 cubo" n├úo pode ser constru├¡da se o gari s├│ tem blocos r├¡gidos de "2 cubos".',
      linesNeeded: 2,
      suggestedAnswer: 'Porque o bloco n├úo pode ser partido. Onde precisa s├│ de 1 cubo, o bloco de 2 cubos n├úo encaixa ou vai sobrar uma ponta flutuando.',
      guideline: 'Mencione que a pe├ºa ├® de tamanho par e n├úo pode ser cortada.'
    },
    transicao: 'O galp├úo est├í organizado. ├ë hora de fechar o expediente!'
  }
]));

track.units.push(createUnit(7, 'O Grande Resumo do Expediente', 'Fim do dia', 'Star', [
  {
    title: 'O Fim do Expediente',
    cena: 'O gari e o aluno sentam no banco da base de limpeza. A cidade est├í organizada, as ruas medidas e o lixo pesado devidamente convertido em toneladas e probabilidades.',
    fala: 'Terminamos! Hoje voc├¬ ajudou a planejar uma rota, mediu dist├óncias com a r├®gua, calculou ├íreas, analisou as roletas, leu gr├íficos enormes e reconheceu padr├Áes nas placas.',
    explicacao: 'A matem├ítica n├úo serve s├│ para resolver continhas em um papel. Ela serve para o nosso dia a dia, desde como organizar as ruas de uma cidade inteira, at├® calcular a log├¡stica pesada que um gari faz.',
    microexemplo: 'Lembre-se: cuidar da cidade ├® responsabilidade de todos n├│s, e a matem├ítica ├® nossa maior ferramenta!',
    comando: 'Reflita sobre o que vivemos hoje. Miss├úo Conclu├¡da!',
    quiz: {
      question: 'Qual dessas afirma├º├Áes melhor resume o que voc├¬ aprendeu com o gari hoje?',
      options: [
        'A matem├ítica ├® feita de atividades chatas e sem sentido pr├ítico.',
        'O trabalho do gari ├® apenas varrer a rua.',
        'O trabalho do gari envolve muito planejamento, ├íreas, unidades de medida e a matem├ítica ├® essencial para a limpeza e organiza├º├úo da cidade.',
        'Probabilidade e gr├ífico s├│ servem para brincadeiras de escola.'
      ],
      correctIndex: 2,
      explanationOnSuccess: 'Parab├®ns! Voc├¬ captou a ess├¬ncia do nosso projeto. O Gari ├® um especialista urbano e a matem├ítica mora nas ruas.',
      explanationOnError: 'Tente pensar em como o Gari usou as contas hoje. N├úo foi s├│ para a escola, foi para trabalhar.',
      hint: 'O foco principal dessa trilha foi valorizar a matem├ítica no trabalho real.'
    },
    transicao: 'Expediente encerrado. Voc├¬ ganhou a medalha "Especialista em Log├¡stica Urbana"!'
  }
]));

const fileContent = `import { Track } from '../../types';\n\nexport const trackGari: Track = ${JSON.stringify(track, null, 2)};\n`;
fs.writeFileSync('src/data/tracks/trackGari.ts', fileContent, 'utf-8');
console.log('Successfully generated extremely rich trackGari.ts');

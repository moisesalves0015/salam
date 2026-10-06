module.exports = [
  // FASE 1
  {
    title: 'O mapa da rota',
    shortDesc: 'Planejamento da varrição',
    icon: 'MapIcon',
    activities: [
      {
        title: 'Atividade 1 — Descrever o caminho',
        cena: 'O gari espalha um mapa quadriculado na mesa. "Hoje a nossa rota vai ser desenhada passo a passo!"',
        fala: 'Cada segmento do quadrado é uma quadra. Para onde vamos?',
        explicacao: 'Um trajeto precisa de quantidade e direção. Contamos os lados percorridos na malha.',
        detalhePedagogico: 'A direção (direita, cima) muda a cada esquina. Conte apenas os lados, não os vértices.',
        microexemplo: 'Se passamos por 3 lados subindo, avançamos 3 quadras para cima.',
        demoInteraction: { type: 'demo-path' },
        comando: 'Siga a rota planejada marcando 6 quarteirões.',
        interaction: { type: 'path-draw', data: { target: 6 } },
        quiz: {
          question: 'Após 2 quadras para a direita, a linha no mapa começou a subir. Qual a direção?',
          options: ['Cima', 'Baixo', 'Esquerda', 'Direita'],
          correctIndex: 0,
          explanationOnSuccess: 'Exato! A direção vertical indica "para cima".',
          explanationOnError: 'Se a linha vai em direção ao topo da página, a direção é cima.',
          hint: 'Topo da página.'
        },
        transicao: 'O primeiro trajeto está mapeado! Agora precisamos medir as distâncias com mais cuidado.'
      }
    ]
  },
  // FASE 2
  {
    title: 'Estimativa e régua',
    shortDesc: 'Instrumentos de medida',
    icon: 'Ruler',
    activities: [
      {
        title: 'Atividade 2 — A régua do Gari',
        cena: 'O gari saca uma trena do cinto e olha para um canteiro.',
        fala: 'Sem a régua, quanto você acha que mede o lado desse canteirinho? Estime!',
        explicacao: 'Estimar é tentar chegar próximo ao valor real com base na intuição.',
        detalhePedagogico: 'Depois usamos o instrumento (régua) para achar a medida exata. O perímetro total é a soma dessas medidas.',
        microexemplo: 'Se eu estimo 1m, mas a trena marca 1,2m, minha estimativa foi boa!',
        demoInteraction: { type: 'demo-path' },
        comando: 'Use a régua para achar o valor real e depois some as distâncias.',
        interaction: { type: 'measure', data: { expectedCm: 10 } },
        writtenPrompt: {
          question: 'Explique a diferença entre ESTIMAR e MEDIR COM RÉGUA.',
          linesNeeded: 2,
          suggestedAnswer: 'Estimar é dar um palpite visual. Medir é achar o número exato com a régua.',
          guideline: 'Destaque que medir dá exatidão.'
        },
        transicao: 'Medidas anotadas! A trena não mente nunca.'
      }
    ]
  },
  // FASE 3
  {
    title: 'Regiões coloridas da praça',
    shortDesc: 'Contagem de superfície',
    icon: 'Square',
    activities: [
      {
        title: 'Atividade 3 — Pintando a área',
        cena: 'A praça central é dividida em canteiros de formatos exóticos.',
        fala: 'O contorno já sabemos, mas quanto de grama cabe aqui dentro?',
        explicacao: 'Área é a quantidade de superfície interna de uma figura.',
        detalhePedagogico: 'Figuras de formatos diferentes podem ter exatamente a mesma área se possuírem a mesma quantidade de quadrados.',
        microexemplo: 'Um retângulo 2x3 e outro 1x6 têm a mesma área (6 quadradinhos).',
        demoInteraction: { type: 'demo-area' },
        comando: 'Pinte a região central e conte.',
        interaction: { type: 'paint', data: { totalRegions: 15, paintedRegions: 6 } },
        dragAndDrop: {
          title: 'Áreas iguais',
          instruction: 'Agrupe as figuras que têm a mesma área.',
          items: [{ id: 'i1', content: 'Retângulo 3x2' }, { id: 'i2', content: 'Linha 1x6' }, { id: 'i3', content: 'Quadrado 2x2' }],
          categories: [{ id: 'c1', title: 'Área 6' }, { id: 'c2', title: 'Área 4' }],
          correctMapping: { 'i1': 'c1', 'i2': 'c1', 'i3': 'c2' },
          successMessage: 'Perfeito! Formato diferente, mesmo espaço.'
        },
        transicao: 'Isso é muito útil para calcular quanta água o caminhão pipa vai usar.'
      }
    ]
  },
  // FASE 4
  {
    title: 'O m² da sala de aula',
    shortDesc: 'Unidades grandes',
    icon: 'Maximize',
    activities: [
      {
        title: 'Atividade 4 — O tamanho das coisas',
        cena: 'O gari entra na escola para ajudar a arrastar as mesas de reciclagem.',
        fala: 'Aqui dentro a gente não mede em centímetros. Vamos usar o Metro!',
        explicacao: 'Em espaços grandes usamos o Metro Quadrado (m²), que é um quadrado de 1m por 1m.',
        detalhePedagogico: 'Se a área do piso for coberta por 30 desses quadrados de 1 metro, a área total é 30 m².',
        microexemplo: 'Um tapete pequeno usa cm². O chão do pátio usa m².',
        demoInteraction: { type: 'demo-area' },
        comando: 'Observe o chão da sala.',
        quiz: {
          question: 'Se cabem 30 quadrados de 1m de lado no chão, qual a área da sala?',
          options: ['30 cm²', '30 m²', '30 metros', '3 m²'],
          correctIndex: 1,
          explanationOnSuccess: 'M² é a unidade oficial para áreas de salas e terrenos!',
          explanationOnError: 'Lembre-se da unidade quadrada do metro.',
          hint: 'Quadrado de 1 metro = m².'
        },
        transicao: 'Sabendo o tamanho exato, as lixeiras vão caber direitinho.'
      }
    ]
  },
  // FASE 5
  {
    title: 'Retângulo 6 m × 3 m',
    shortDesc: 'Multiplicação de Área',
    icon: 'RectangleHorizontal',
    activities: [
      {
        title: 'Atividade 5 — Área do isolamento',
        cena: 'O gari estende a faixa em uma área retangular de asfalto recém pintado.',
        fala: 'A área mede 6 metros de comprimento por 3 metros de largura. E agora?',
        explicacao: 'A área de um retângulo é calculada multiplicando o comprimento pela largura.',
        detalhePedagogico: 'Multiplicar 6 por 3 significa que temos 3 fileiras de 6 quadrados de 1m².',
        microexemplo: '6 vezes 3 é igual a 18.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Qual a área de um retângulo de 6m por 3m?',
        quiz: {
          question: 'A área desse espaço de 6m × 3m é de:',
          options: ['18 m', '9 m²', '18 m²', '12 m²'],
          correctIndex: 2,
          explanationOnSuccess: 'Correto! 6 × 3 = 18 m².',
          explanationOnError: 'Multiplique as medidas.',
          hint: '6 x 3.'
        },
        transicao: 'Matemática rápida! A fita vai cobrir o lugar certinho.'
      }
    ]
  },
  // FASE 6
  {
    title: 'Área e perímetro das regiões',
    shortDesc: 'Contorno vs Superfície',
    icon: 'Scaling',
    activities: [
      {
        title: 'Atividade 6 — A diferença definitiva',
        cena: 'O gari coloca a fita na borda e depois varre o meio.',
        fala: 'A fita preta fica na borda (Perímetro). A vassoura passa no chão (Área).',
        explicacao: 'Perímetro soma os lados externos. Área conta o espaço de dentro.',
        detalhePedagogico: 'Nunca confunda! Para perímetro somamos (ex: 2+3+2+3). Para área multiplicamos (2x3).',
        microexemplo: 'O contorno é a linha. A área é o miolo.',
        demoInteraction: { type: 'demo-perimeter' },
        comando: 'Separe o que é Perímetro do que é Área.',
        dragAndDrop: {
          title: 'Classifique a tarefa',
          instruction: 'Arraste para a categoria correta.',
          items: [{ id: 'i1', content: 'Contorno da cerca' }, { id: 'i2', content: 'Grama do chão' }],
          categories: [{ id: 'c1', title: 'Perímetro' }, { id: 'c2', title: 'Área' }],
          correctMapping: { 'i1': 'c1', 'i2': 'c2' },
          successMessage: 'Você não vai mais se confundir com isso!'
        },
        transicao: 'Trabalho físico feito. Vamos decidir as tarefas de amanhã por sorteio.'
      }
    ]
  },
  // FASE 7
  {
    title: 'Dois dados e combinações',
    shortDesc: 'Probabilidade de pares',
    icon: 'Dices',
    activities: [
      {
        title: 'Atividade 7 — Probabilidade e dados',
        cena: 'O gari senta num caixote, puxa 2 dados e brinca com a equipe.',
        fala: 'Vamos lançar dois dados. O total de combinações é 36. Quantas duplas de números iguais existem?',
        explicacao: 'A probabilidade compara os Casos Favoráveis com o Total de Casos (36).',
        detalhePedagogico: 'Os casos favoráveis de duplas são (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). São 6 chances em 36.',
        microexemplo: 'A probabilidade é 6/36, que simplificando dá 1/6.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Determine a probabilidade na tabela.',
        quiz: {
          question: 'A probabilidade de cair com números iguais (duplas) em dois dados é de:',
          options: ['6/36 ou 1/6', '12/36 ou 1/3', '1/36', '36/36'],
          correctIndex: 0,
          explanationOnSuccess: 'Incrível! Há 6 combinações de duplas.',
          explanationOnError: 'Há 6 duplas possíveis num total de 36.',
          hint: '6/36'
        },
        transicao: 'Dados guardados, mas e a tabela de áreas?'
      }
    ]
  },
  // FASE 8
  {
    title: 'Retângulo com 10 quadradinhos',
    shortDesc: 'Leitura na malha',
    icon: 'Grid',
    activities: [
      {
        title: 'Atividade 8 — Contando lados',
        cena: 'No galpão, uma grande prateleira tem o formato de um retângulo feito de 10 quadradinhos (5x2).',
        fala: 'Olhando para este retângulo de caixas, qual é o comprimento e a largura?',
        explicacao: 'Comprimento é o número de quadradinhos na base. Largura é a altura lateral.',
        detalhePedagogico: 'Se a base tem 5 quadradinhos e a altura tem 2, a área é 10. Mas o perímetro é 5+2+5+2 = 14.',
        microexemplo: 'Base = 5, Lado = 2. Perímetro = 14.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Para um retângulo de 5 por 2, qual é o seu perímetro e área?',
        quiz: {
          question: 'Se o retângulo tem base 5 e altura 2, seu perímetro e área são, respectivamente:',
          options: ['10 e 10', '14 e 10', '10 e 14', '7 e 10'],
          correctIndex: 1,
          explanationOnSuccess: 'Exato! Perímetro é a soma 5+2+5+2=14, e Área é 5x2=10.',
          explanationOnError: 'O perímetro é a soma de TODOS os quatro lados. A área é a multiplicação.',
          hint: 'Perímetro: 5+2+5+2. Área: 5x2.'
        },
        transicao: 'Você enxerga geometria em qualquer lugar.'
      }
    ]
  },
  // FASE 9
  {
    title: 'Comparação de duas figuras',
    shortDesc: 'Qual é maior?',
    icon: 'Scale',
    activities: [
      {
        title: 'Atividade 9 — Ilusão de ótica',
        cena: 'O gari aponta para dois canteiros na calçada. Um é comprido, o outro é gordo.',
        fala: 'O comprido parece maior, né? Mas a matemática não se deixa enganar pela aparência.',
        explicacao: 'Para saber qual figura tem MAIOR área, você deve contar o número de quadradinhos de cada uma.',
        detalhePedagogico: 'A Figura 1 pode ter 12 quadradinhos agrupados em um quadrado grosso, e a Figura 2 pode ter 14 esticados. A Figura 2 vence.',
        microexemplo: 'Conte sempre os tijolinhos da área interna.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Como temos certeza de qual figura possui maior área?',
        quiz: {
          question: 'Como se determina com precisão a maior área entre duas figuras em uma malha?',
          options: [
            'Olhando qual é mais comprida.',
            'Contando e comparando o número total de quadradinhos internos de cada figura.',
            'Medindo apenas a altura.',
            'Somando os lados.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Correto! A contagem da superfície interna é o método mais preciso.',
          explanationOnError: 'Não confie na aparência. O espaço ocupado se revela contando o interior.',
          hint: 'Área tem a ver com os quadradinhos de dentro.'
        },
        transicao: 'O gari confia apenas na matemática exata.'
      }
    ]
  },
  // FASE 10
  {
    title: 'Quadrado 5cm e Retângulo 7x3',
    shortDesc: 'Comparação avançada',
    icon: 'PenTool',
    activities: [
      {
        title: 'Atividade 10 — O desafio do desenho',
        cena: 'Ele desenha no chão de giz: um quadrado de 5cm de lado e um retângulo de 7cm por 3cm.',
        fala: 'Os formatos são diferentes, os lados também. Mas vamos comparar a área e o perímetro deles!',
        explicacao: 'Quadrado: Área = 5x5=25, Perímetro = 5x4=20. Retângulo: Área = 7x3=21, Perímetro = 7+3+7+3=20.',
        detalhePedagogico: 'Eles podem ter perímetros iguais (ambos 20cm), mas áreas diferentes (25cm² e 21cm²).',
        microexemplo: 'Quadrado (5,5) -> P=20, A=25. Retângulo (7,3) -> P=20, A=21.',
        demoInteraction: { type: 'demo-perimeter' },
        comando: 'Compare as duas figuras matemáticas desenhadas pelo gari.',
        dragAndDrop: {
          title: 'Resultados cruzados',
          instruction: 'Arraste os valores para as categorias certas.',
          items: [{ id: 'i1', content: '25 cm²' }, { id: 'i2', content: '20 cm' }, { id: 'i3', content: '21 cm²' }],
          categories: [{ id: 'c1', title: 'Área do Quadrado 5x5' }, { id: 'c2', title: 'Perímetro (dos dois!)' }, { id: 'c3', title: 'Área do Retângulo 7x3' }],
          correctMapping: { 'i1': 'c1', 'i2': 'c2', 'i3': 'c3' },
          successMessage: 'Percebeu como o formato quadrangular maximiza a área com o mesmo contorno?'
        },
        transicao: 'Desenhar formas é a melhor maneira de visualizar cálculos complexos.'
      }
    ]
  },
  // FASE 11
  {
    title: 'Maior contorno',
    shortDesc: 'Caminho mais longo',
    icon: 'Milestone',
    activities: [
      {
        title: 'Atividade 11 — Cinco figuras',
        cena: 'Há 5 poças d\'água diferentes na rua. O gari precisa cercar a maior.',
        fala: 'A que der a volta mais demorada é a que tem o maior contorno, ou seja, maior perímetro.',
        explicacao: 'Para achar o maior perímetro numa malha cheia de curvas e degraus, é preciso somar absolutamente todos os lados de contato com o exterior.',
        detalhePedagogico: 'Não se apresse. Figuras parecendo estrelas ou com muitos degraus costumam ter os maiores perímetros, pois ziguezagueiam muito.',
        microexemplo: 'Uma cruz tem área pequena, mas um perímetro enorme.',
        demoInteraction: { type: 'demo-path' },
        comando: 'Para achar a figura com o maior contorno, o que você deve focar?',
        writtenPrompt: {
          question: 'Para encontrar o maior CONTORNO, por que contar as pontas em zigue-zague é importante?',
          linesNeeded: 2,
          suggestedAnswer: 'Porque o zigue-zague aumenta a quantidade de linhas na borda, aumentando o perímetro.',
          guideline: 'O contorno é o caminho pela borda, cada curva adiciona tamanho.'
        },
        transicao: 'Excelente observação espacial!'
      }
    ]
  },
  // FASE 12
  {
    title: 'Figura composta colorida',
    shortDesc: 'Decompondo áreas',
    icon: 'Puzzle',
    activities: [
      {
        title: 'Atividade 12 — Blocos lógicos',
        cena: 'A praça nova tem uma pintura com partes azuis, amarelas e rosas, formando mosaicos.',
        fala: 'Essa figura enorme é composta por peças menores. Se a parte azul vale 15 quadrados e a amarela 8...',
        explicacao: 'Em figuras complexas compostas por retângulos diferentes, a área total é a soma das áreas parciais.',
        detalhePedagogico: 'A área Azul = 15. A Amarela = 8. Se elas se juntam, não se sobrepõem, logo a área da nova figura seria 15 + 8 = 23.',
        microexemplo: 'Isso se chama Conservação de Área e Decomposição de Figuras.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Resolva a decomposição da figura.',
        quiz: {
          question: 'Se a figura composta for formada exatamente pela parte azul (15) e a amarela (8), qual sua área total?',
          options: ['15', '8', '23', '7'],
          correctIndex: 2,
          explanationOnSuccess: 'Correto! 15 + 8 = 23. Somamos as áreas das partes.',
          explanationOnError: 'A área total é a soma de todos os quadradinhos de cada cor.',
          hint: '15 mais 8.'
        },
        transicao: 'Esse mosaico foi calculado sem estresse!'
      }
    ]
  }
];

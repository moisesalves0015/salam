import { Track } from '../../types';

export const trackGari: Track = {
  id: 'gari-mission',
  subjectId: 'matematica',
  title: 'Área e Perímetro',
  subtitle: 'Um dia de trabalho com um gari',
  description: 'Trilha lúdica sobre área, perímetro, frações, volume e probabilidade acompanhando o dia a dia de um gari trabalhador.',
  objective: 'Aplicar conceitos de área, perímetro, frações e probabilidade em cenários reais.',
  bnccSkills: ['Matemática do 4º e 5º ano'],
  theme: {
    primary: 'from-amber-600 to-orange-500',
    secondary: 'from-yellow-500 to-amber-500',
    accent: 'bg-amber-400',
    background: 'bg-[#10213f]',
    cardBg: 'bg-[#1a2b54]',
    textMain: 'text-amber-50',
    textMuted: 'text-amber-200/60',
  },
  worldName: 'CIEP',
  units: [
    {
      id: 'gari-unit-1',
      trackId: 'gari-mission',
      number: 1,
      title: "O mapa e a rota",
      shortDesc: "Planejamento da varrição",
      icon: 'MapIcon',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-1-1-a',
          type: 'objective',
          title: "Descrever o caminho",
          content: "O gari espalha um mapa quadriculado na mesa. \"Hoje a nossa rota vai ser desenhada passo a passo!\"",
          mascotTip: "Cada segmento do quadrado é uma quadra. Para onde vamos?",
        },
        {
          id: 'step-1-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Um trajeto precisa de quantidade e direção. Contamos os lados percorridos na malha.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "A direção (direita, cima) muda a cada esquina. Conte apenas os lados, não os vértices.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se passamos por 3 lados subindo, avançamos 3 quadras para cima.",
            interaction: { type: 'demo-path', data: {} }
          },
        },
        {
          id: 'step-1-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Siga a rota planejada marcando 6 quarteirões.",
          gariInteraction: { type: 'path-draw', data: {"target":6} },
          notebookGuide: {
            tips: ["O primeiro trajeto está mapeado! Agora precisamos medir as distâncias com mais cuidado."],
            showBorders: false
          }
        },
        {
          id: 'step-1-2-a',
          type: 'objective',
          title: "A régua do Gari",
          content: "O gari saca uma trena do cinto e olha para um canteiro.",
          mascotTip: "Sem a régua, quanto você acha que mede o lado desse canteirinho? Estime!",
        },
        {
          id: 'step-1-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Estimar é tentar chegar próximo ao valor real com base na intuição.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Depois usamos o instrumento (régua) para achar a medida exata. O perímetro total é a soma dessas medidas.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se eu estimo 1m, mas a trena marca 1,2m, minha estimativa foi boa!",
            interaction: { type: 'demo-path', data: {} }
          },
        },
        {
          id: 'step-1-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Use a régua para achar o valor real e depois some as distâncias.",
          gariInteraction: { type: 'measure', data: {} },
          notebookGuide: {
            tips: ["Medidas anotadas! A trena não mente nunca."],
            showBorders: false
          }
        },
        {
          id: 'step-1-3-a',
          type: 'objective',
          title: "Pintando a área",
          content: "A praça central é dividida em canteiros de formatos exóticos.",
          mascotTip: "O contorno já sabemos, mas quanto de grama cabe aqui dentro?",
        },
        {
          id: 'step-1-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Área é a quantidade de superfície interna de uma figura.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Figuras de formatos diferentes podem ter exatamente a mesma área se possuírem a mesma quantidade de quadrados.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Um retângulo 2x3 e outro 1x6 têm a mesma área (6 quadradinhos).",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-1-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Pinte a região central e conte.",
          gariInteraction: { type: 'paint', data: {"target":12} },
          notebookGuide: {
            tips: ["Isso é muito útil para calcular quanta água o caminhão pipa vai usar."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-2',
      trackId: 'gari-mission',
      number: 2,
      title: "O m² da praça",
      shortDesc: "Unidades grandes",
      icon: 'Maximize',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-2-1-a',
          type: 'objective',
          title: "O tamanho das coisas",
          content: "O gari entra na escola para ajudar a arrastar as mesas de reciclagem.",
          mascotTip: "Aqui dentro a gente não mede em centímetros. Vamos usar o Metro!",
        },
        {
          id: 'step-2-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Em espaços grandes usamos o Metro Quadrado (m²), que é um quadrado de 1m por 1m.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Se a área do piso for coberta por 30 desses quadrados de 1 metro, a área total é 30 m².", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Um tapete pequeno usa cm². O chão do pátio usa m².",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-2-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Observe o chão da sala.",
          gariInteraction: { type: 'area-perimeter-toggle', data: {} },
          notebookGuide: {
            tips: ["Sabendo o tamanho exato, as lixeiras vão caber direitinho."],
            showBorders: false
          }
        },
        {
          id: 'step-2-2-a',
          type: 'objective',
          title: "Área do isolamento",
          content: "O gari estende a faixa em uma área retangular de asfalto recém pintado.",
          mascotTip: "A área mede 6 metros de comprimento por 3 metros de largura. E agora?",
        },
        {
          id: 'step-2-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A área de um retângulo é calculada multiplicando o comprimento pela largura.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Multiplicar 6 por 3 significa que temos 3 fileiras de 6 quadrados de 1m².", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "6 vezes 3 é igual a 18.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-2-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Qual a área de um retângulo de 6m por 3m?",
          gariInteraction: { type: 'grid-compare', data: {"target1":18,"target2":18} },
          notebookGuide: {
            tips: ["Matemática rápida! A fita vai cobrir o lugar certinho."],
            showBorders: false
          }
        },
        {
          id: 'step-2-3-a',
          type: 'objective',
          title: "A diferença definitiva",
          content: "O gari coloca a fita na borda e depois varre o meio.",
          mascotTip: "A fita preta fica na borda (Perímetro). A vassoura passa no chão (Área).",
        },
        {
          id: 'step-2-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Perímetro soma os lados externos. Área conta o espaço de dentro.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Nunca confunda! Para perímetro somamos (ex: 2+3+2+3). Para área multiplicamos (2x3).", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "O contorno é a linha. A área é o miolo.",
            interaction: { type: 'demo-perimeter', data: {} }
          },
        },
        {
          id: 'step-2-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Separe o que é Perímetro do que é Área.",
          gariInteraction: { type: 'area-perimeter-toggle', data: {} },
          notebookGuide: {
            tips: ["Trabalho físico feito. Vamos decidir as tarefas de amanhã por sorteio."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-3',
      trackId: 'gari-mission',
      number: 3,
      title: "Comparando figuras",
      shortDesc: "Retângulos e formatos",
      icon: 'Grid',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-3-1-a',
          type: 'objective',
          title: "Probabilidade e dados",
          content: "O gari senta num caixote, puxa 2 dados e brinca com a equipe.",
          mascotTip: "Vamos lançar dois dados. O total de combinações é 36. Quantas duplas de números iguais existem?",
        },
        {
          id: 'step-3-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A probabilidade compara os Casos Favoráveis com o Total de Casos (36).",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Os casos favoráveis de duplas são (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). São 6 chances em 36.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "A probabilidade é 6/36, que simplificando dá 1/6.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-3-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Determine a probabilidade na tabela.",
          gariInteraction: { type: 'dice', data: {} },
          notebookGuide: {
            tips: ["Dados guardados, mas e a tabela de áreas?"],
            showBorders: false
          }
        },
        {
          id: 'step-3-2-a',
          type: 'objective',
          title: "Contando lados",
          content: "No galpão, uma grande prateleira tem o formato de um retângulo feito de 10 quadradinhos (5x2).",
          mascotTip: "Olhando para este retângulo de caixas, qual é o comprimento e a largura?",
        },
        {
          id: 'step-3-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Comprimento é o número de quadradinhos na base. Largura é a altura lateral.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Se a base tem 5 quadradinhos e a altura tem 2, a área é 10. Mas o perímetro é 5+2+5+2 = 14.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Base = 5, Lado = 2. Perímetro = 14.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-3-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Para um retângulo de 5 por 2, qual é o seu perímetro e área?",
          gariInteraction: { type: 'path-draw', data: {} },
          notebookGuide: {
            tips: ["Você enxerga geometria em qualquer lugar."],
            showBorders: false
          }
        },
        {
          id: 'step-3-3-a',
          type: 'objective',
          title: "Ilusão de ótica",
          content: "O gari aponta para dois canteiros na calçada. Um é comprido, o outro é gordo.",
          mascotTip: "O comprido parece maior, né? Mas a matemática não se deixa enganar pela aparência.",
        },
        {
          id: 'step-3-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Para saber qual figura tem MAIOR área, você deve contar o número de quadradinhos de cada uma.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "A Figura 1 pode ter 12 quadradinhos agrupados em um quadrado grosso, e a Figura 2 pode ter 14 esticados. A Figura 2 vence.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Conte sempre os tijolinhos da área interna.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-3-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Como temos certeza de qual figura possui maior área?",
          gariInteraction: { type: 'grid-compare', data: {"target1":25,"target2":21} },
          notebookGuide: {
            tips: ["O gari confia apenas na matemática exata."],
            showBorders: false
          }
        },
        {
          id: 'step-3-4-a',
          type: 'objective',
          title: "O desafio do desenho",
          content: "Ele desenha no chão de giz: um quadrado de 5cm de lado e um retângulo de 7cm por 3cm.",
          mascotTip: "Os formatos são diferentes, os lados também. Mas vamos comparar a área e o perímetro deles!",
        },
        {
          id: 'step-3-4-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Quadrado: Área = 5x5=25, Perímetro = 5x4=20. Retângulo: Área = 7x3=21, Perímetro = 7+3+7+3=20.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Eles podem ter perímetros iguais (ambos 20cm), mas áreas diferentes (25cm² e 21cm²).", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Quadrado (5,5) -> P=20, A=25. Retângulo (7,3) -> P=20, A=21.",
            interaction: { type: 'demo-perimeter', data: {} }
          },
        },
        {
          id: 'step-3-4-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Compare as duas figuras matemáticas desenhadas pelo gari.",
          gariInteraction: { type: 'paint', data: {} },
          notebookGuide: {
            tips: ["Desenhar formas é a melhor maneira de visualizar cálculos complexos."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-4',
      trackId: 'gari-mission',
      number: 4,
      title: "Mosaicos e contornos",
      shortDesc: "Formas complexas",
      icon: 'Puzzle',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-4-1-a',
          type: 'objective',
          title: "Cinco figuras",
          content: "Há 5 poças d'água diferentes na rua. O gari precisa cercar a maior.",
          mascotTip: "A que der a volta mais demorada é a que tem o maior contorno, ou seja, maior perímetro.",
        },
        {
          id: 'step-4-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Para achar o maior perímetro numa malha cheia de curvas e degraus, é preciso somar absolutamente todos os lados de contato com o exterior.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Não se apresse. Figuras parecendo estrelas ou com muitos degraus costumam ter os maiores perímetros, pois ziguezagueiam muito.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Uma cruz tem área pequena, mas um perímetro enorme.",
            interaction: { type: 'demo-path', data: {} }
          },
        },
        {
          id: 'step-4-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Para achar a figura com o maior contorno, o que você deve focar?",
          gariInteraction: { type: 'paint', data: {} },
          notebookGuide: {
            tips: ["Excelente observação espacial!"],
            showBorders: false
          }
        },
        {
          id: 'step-4-2-a',
          type: 'objective',
          title: "Blocos lógicos",
          content: "A praça nova tem uma pintura com partes azuis, amarelas e rosas, formando mosaicos.",
          mascotTip: "Essa figura enorme é composta por peças menores. Se a parte azul vale 15 quadrados e a amarela 8...",
        },
        {
          id: 'step-4-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Em figuras complexas compostas por retângulos diferentes, a área total é a soma das áreas parciais.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "A área Azul = 15. A Amarela = 8. Se elas se juntam, não se sobrepõem, logo a área da nova figura seria 15 + 8 = 23.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Isso se chama Conservação de Área e Decomposição de Figuras.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-4-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Resolva a decomposição da figura.",
          gariInteraction: { type: 'paint', data: {} },
          notebookGuide: {
            tips: ["Esse mosaico foi calculado sem estresse!"],
            showBorders: false
          }
        },
        {
          id: 'step-4-3-a',
          type: 'objective',
          title: "Montando o que sobrou",
          content: "O gari encontra restos de um cartaz de festa junina, recortados em formato de triângulos e quadrados menores.",
          mascotTip: "Se eu juntar esses triângulos pontilhados, formo quadrados do mesmo tamanho do centro!",
        },
        {
          id: 'step-4-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Quando cortamos formas geométricas pelas diagonais, as metades podem ser reagrupadas.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Dois triângulos retângulos idênticos formam um quadrado. Conte as partes inteiras e some as frações que formam inteiros.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se há 4 quadrados inteiros e 4 metades (triângulos), o total são 4 + 2 = 6 quadrados.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-4-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Observe as partes cortadas e conte o total equivalente de quadrados.",
          gariInteraction: { type: 'roulette', data: {} },
          notebookGuide: {
            tips: ["A geometria ajuda até na hora de limpar papéis picados."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-5',
      trackId: 'gari-mission',
      number: 5,
      title: "Sorteios no turno",
      shortDesc: "Roletas e balões",
      icon: 'Target',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-5-1-a',
          type: 'objective',
          title: "A roleta do turno",
          content: "Na garagem, o chefe puxa uma roleta de madeira. Nela estão pintadas as tarefas do dia.",
          mascotTip: "A roleta tem setores coloridos de tamanhos diferentes. Aonde a seta vai parar?",
        },
        {
          id: 'step-5-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A chance de sorteio é proporcional à quantidade de setores com a mesma tarefa.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Se a tarefa de \"varrer\" ocupa 3 setores, e a de \"lavar\" apenas 1, a maior chance é varrer.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "A área maior na roleta domina o sorteio.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-5-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Gire a roleta e analise a chance.",
          gariInteraction: { type: 'roulette', data: {} },
          notebookGuide: {
            tips: ["O sorteio foi feito! Que os jogos comecem."],
            showBorders: false
          }
        },
        {
          id: 'step-5-2-a',
          type: 'objective',
          title: "Limpando a festa",
          content: "Houve uma festa na praça. Sobraram muitos balões estourados e murchos pelo chão.",
          mascotTip: "Tem balão azul, amarelo e vermelho. Qual a chance de eu recolher um vermelho de olhos fechados?",
        },
        {
          id: 'step-5-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A probabilidade é a divisão do número de balões daquela cor pelo total de balões no chão.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Se temos 10 balões no total e 3 vermelhos, a chance é \"3 em 10\".", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Frações e probabilidades são amigas inseparáveis.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-5-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Analise os balões que o gari está juntando.",
          gariInteraction: { type: 'roulette', data: {} },
          notebookGuide: {
            tips: ["Tudo limpo, e a probabilidade confirmada."],
            showBorders: false
          }
        },
        {
          id: 'step-5-3-a',
          type: 'objective',
          title: "O saco de recicláveis",
          content: "O gari carrega um saco opaco de materiais recicláveis: latinhas, papel e plástico.",
          mascotTip: "Sem olhar, vou puxar um material. Qual tem mais chance de sair?",
        },
        {
          id: 'step-5-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A probabilidade se baseia na contagem de cada tipo dentro do saco.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "A categoria com a maior quantidade (frequência) dentro da sacola é a que tem maior probabilidade de ser retirada aleatoriamente.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se há 20 latinhas e 5 papéis, é quase certo puxar uma latinha.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-5-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Identifique o evento mais provável no saco do gari.",
          gariInteraction: { type: 'fraction-pie', data: {} },
          notebookGuide: {
            tips: ["Reciclar exige separar bem os materiais."],
            showBorders: false
          }
        },
        {
          id: 'step-5-4-a',
          type: 'objective',
          title: "Número 7 no sorteio",
          content: "No intervalo, o gari vê crianças brincando com fichas numeradas de 1 a 10.",
          mascotTip: "Em um dado normal, a chance de sair o número 5 é 1 em 6. Mas e nesse sorteio de 1 a 10, qual a chance de puxar o 7?",
        },
        {
          id: 'step-5-4-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Para calcular a chance de um evento, contamos quantos resultados favoráveis existem e dividimos pelo total.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Apenas uma ficha tem o número 7 (um caso favorável). O total de fichas é 10. A chance é 1/10.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Chance = Favoráveis / Possíveis.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-5-4-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Calcule a chance do número 7.",
          gariInteraction: { type: 'fraction-pie', data: {"slices":10,"target":5} },
          notebookGuide: {
            tips: ["As crianças aplaudem a aula de estatística improvisada."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-6',
      trackId: 'gari-mission',
      number: 6,
      title: "Estatística da coleta",
      shortDesc: "Frações e massas",
      icon: 'PieChart',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-6-1-a',
          type: 'objective',
          title: "Registro da coleta",
          content: "Fim do dia. O gari precisa registrar quantos sacos de cada cor ele recolheu na planilha.",
          mascotTip: "Recolhi 20 azuis, 12 vermelhos, 10 amarelos e 5 verdes. Qual foi o total?",
        },
        {
          id: 'step-6-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "A soma das frequências individuais dá o tamanho total da nossa amostra estatística.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Soma total = 20 + 12 + 10 + 5 = 47. Se eu sorteasse um saco desses 47, a chance do verde seria 5/47.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "O total é o denominador.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-6-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Ajude a calcular o total e a fração.",
          gariInteraction: { type: 'bar-chart', data: {"categories":["Papel","Plástico","Vidro","Metal"],"targets":[20,12,10,5]} },
          notebookGuide: {
            tips: ["Planilha preenchida com sucesso."],
            showBorders: false
          }
        },
        {
          id: 'step-6-2-a',
          type: 'objective',
          title: "O lanche da equipe",
          content: "A equipe pediu uma pizza gigante de 10 pedaços para dividir na hora do lanche.",
          mascotTip: "Se eu comer um pedaço de 10, eu comi a fração 1/10. E como escrevemos isso em decimal?",
        },
        {
          id: 'step-6-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Uma fração decimal com denominador 10 pode ser escrita com uma casa após a vírgula.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "A fração 1/10 corresponde a um décimo, que se escreve 0,1. Se sobrar uma fatia, sobra 0,1.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "1/10 = 0,1. 5/10 = 0,5.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-6-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Faça a conversão da fatia que sobrou.",
          gariInteraction: { type: 'bar-chart', data: {} },
          notebookGuide: {
            tips: ["Depois do lanche, de volta ao trabalho pesado."],
            showBorders: false
          }
        },
        {
          id: 'step-6-3-a',
          type: 'objective',
          title: "Formiga ou caminhão?",
          content: "O gari encontra uma formiguinha carregando uma folha perto do caminhão de lixo.",
          mascotTip: "Olha o peso desse caminhão... e o peso dessa formiga! Tudo tem sua unidade.",
        },
        {
          id: 'step-6-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Usamos miligrama (mg) para coisas ínfimas, grama (g) para médias, e quilograma (kg) para pesadas.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Uma formiga pesa em torno de 3 miligramas (mg), não 3 kg.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "1 kg = 1000 g. 1 g = 1000 mg.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-6-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Selecione a unidade correta para uma formiga.",
          gariInteraction: { type: 'fraction-pie', data: {} },
          notebookGuide: {
            tips: ["Até os menores seres da natureza têm sua matemática."],
            showBorders: false
          }
        },
        {
          id: 'step-6-4-a',
          type: 'objective',
          title: "Relatório anual",
          content: "No painel da empresa, há um gráfico de barras das garrafas PET recicladas de 2014 a 2018.",
          mascotTip: "Em 2017 recolhemos 26 toneladas de PET. Mas o gerente quer esse número em quilogramas!",
        },
        {
          id: 'step-6-4-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Uma tonelada (t) é igual a mil quilogramas (kg).",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Para transformar 26 toneladas em quilos, multiplicamos 26 por 1.000.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "26 x 1000 = 26.000 kg.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-6-4-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Faça a conversão do gráfico.",
          gariInteraction: { type: 'bar-chart', data: {"categories":["Seg","Ter","Qua","Qui"],"targets":[15,10,20,5]} },
          notebookGuide: {
            tips: ["Números impressionantes! E a reciclagem salva a cidade."],
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-7',
      trackId: 'gari-mission',
      number: 7,
      title: "A revisão final",
      shortDesc: "Padrões e 3D",
      icon: 'CheckSquare',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-7-1-a',
          type: 'objective',
          title: "Os cones na avenida",
          content: "Para isolar uma rua, o gari organizou cones e placas em uma fila padronizada: Cone, Placa, Placa, Pneu...",
          mascotTip: "Esse padrão se repete a cada 4 objetos. Se eu continuar assim, qual objeto vai ficar na posição 27?",
        },
        {
          id: 'step-7-1-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Em um padrão repetitivo (ciclo de 4), dividimos a posição desejada pelo tamanho do ciclo.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "27 dividido por 4 dá 6 ciclos completos (24) e sobram 3. O resto (3) indica que o objeto é o terceiro da sequência básica.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Posição 27 -> Resto 3. É o terceiro elemento.",
            interaction: { type: 'demo-prob', data: {} }
          },
        },
        {
          id: 'step-7-1-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Encontre o resto da divisão de 27 por 4 e responda.",
          gariInteraction: { type: 'cubes', data: {} },
          notebookGuide: {
            tips: ["Com matemática, a gente prevê o futuro dos cones."],
            showBorders: false
          }
        },
        {
          id: 'step-7-2-a',
          type: 'objective',
          title: "A sucata volumétrica",
          content: "Ele acha 4 pedaços idênticos de isopor. Cada pedaço é formado por 2 cubinhos colados (como um paralelepípedo).",
          mascotTip: "Esses blocos têm volume. Se eu juntar os 4, terei uma estrutura com 8 cubinhos. Será que eu posso montar qualquer forma?",
        },
        {
          id: 'step-7-2-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Com 4 blocos de 2, você só pode montar estruturas cujas metades ou partes possam ser divididas por blocos retos de 2.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Estruturas com pontas isoladas de 1 cubinho são impossíveis de formar com blocos inteiros de 2.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Você não quebra o bloco!",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-7-2-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Identifique a estrutura impossível.",
          gariInteraction: { type: 'paint', data: {"target":24} },
          notebookGuide: {
            tips: ["O caminhão vai amassar tudo isso de qualquer jeito."],
            showBorders: false
          }
        },
        {
          id: 'step-7-3-a',
          type: 'objective',
          title: "A pintura no fim do dia",
          content: "O gari termina o turno olhando para a parede pintada do refeitório. A figura sobre a malha de tijolos tem partes pintadas inteiras e metades.",
          mascotTip: "Pra encerrar o expediente: vamos aplicar a mesma regra de juntar os triângulos para descobrir a área colorida final.",
        },
        {
          id: 'step-7-3-b',
          type: 'explanation',
          title: 'Entendendo: ' + "Conceitos",
          content: "Conte os quadrados preenchidos por completo. Depois junte os triângulos formando pares de 1 unidade inteira.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Dica de Ouro', text: "Se a figura tiver 12 quadrados inteiros e 4 metades, a área total pintada será 14 unidades quadradas.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "12 inteiros + (4 metades = 2 inteiros) = 14.",
            interaction: { type: 'demo-area', data: {} }
          },
        },
        {
          id: 'step-7-3-c',
          type: 'challenge',
          title: 'Mão na Massa!',
          content: "Para contar a área final, qual é a alternativa correta se o total contado for 14?",
          gariInteraction: { type: 'paint', data: {} },
          notebookGuide: {
            tips: ["O expediente do Gari chega ao fim. E com ele, toda essa imersão na matemática do dia a dia!"],
            showBorders: false
          }
        }
      ]
    }
  ]
};
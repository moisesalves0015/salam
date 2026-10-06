import { Track } from '../../types';

export const trackGari: Track = {
  id: 'gari-mission',
  title: 'Área e Perímetro',
  subtitle: 'Um dia de trabalho com um gari',
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
      number: 1,
      title: "O mapa e a rota",
      shortDesc: "Planejamento da varrição",
      icon: 'MapIcon',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-1-1',
          title: "Atividade 1 — Descrever o caminho",
          mascotTip: "O gari espalha um mapa quadriculado na mesa. \"Hoje a nossa rota vai ser desenhada passo a passo!\"",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Cada segmento do quadrado é uma quadra. Para onde vamos?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Um trajeto precisa de quantidade e direção. Contamos os lados percorridos na malha.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "A direção (direita, cima) muda a cada esquina. Conte apenas os lados, não os vértices.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se passamos por 3 lados subindo, avançamos 3 quadras para cima.",
            interaction: { type: 'demo-path', data: {} }
          },
          gariInteraction: {
            type: 'path-draw',
            data: {"target":6}
          },
          notebookGuide: {
            tips: ["O primeiro trajeto está mapeado! Agora precisamos medir as distâncias com mais cuidado."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-1-2',
          title: "Atividade 2 — A régua do Gari",
          mascotTip: "O gari saca uma trena do cinto e olha para um canteiro.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Sem a régua, quanto você acha que mede o lado desse canteirinho? Estime!\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Estimar é tentar chegar próximo ao valor real com base na intuição.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Depois usamos o instrumento (régua) para achar a medida exata. O perímetro total é a soma dessas medidas.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se eu estimo 1m, mas a trena marca 1,2m, minha estimativa foi boa!",
            interaction: { type: 'demo-path', data: {} }
          },
          gariInteraction: {
            type: 'measure',
            data: {"expectedCm":10}
          },
          notebookGuide: {
            tips: ["Medidas anotadas! A trena não mente nunca."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-1-3',
          title: "Atividade 3 — Pintando a área",
          mascotTip: "A praça central é dividida em canteiros de formatos exóticos.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"O contorno já sabemos, mas quanto de grama cabe aqui dentro?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Área é a quantidade de superfície interna de uma figura.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Figuras de formatos diferentes podem ter exatamente a mesma área se possuírem a mesma quantidade de quadrados.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Um retângulo 2x3 e outro 1x6 têm a mesma área (6 quadradinhos).",
            interaction: { type: 'demo-area', data: {} }
          },
          gariInteraction: {
            type: 'paint',
            data: {"totalRegions":15,"paintedRegions":6}
          },
          notebookGuide: {
            tips: ["Isso é muito útil para calcular quanta água o caminhão pipa vai usar."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-2',
      number: 2,
      title: "O m² da praça",
      shortDesc: "Unidades grandes",
      icon: 'Maximize',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-2-1',
          title: "Atividade 4 — O tamanho das coisas",
          mascotTip: "O gari entra na escola para ajudar a arrastar as mesas de reciclagem.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Aqui dentro a gente não mede em centímetros. Vamos usar o Metro!\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Em espaços grandes usamos o Metro Quadrado (m²), que é um quadrado de 1m por 1m.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Se a área do piso for coberta por 30 desses quadrados de 1 metro, a área total é 30 m².", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Um tapete pequeno usa cm². O chão do pátio usa m².",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Se cabem 30 quadrados de 1m de lado no chão, qual a área da sala?",
            options: ["30 cm²","30 m²","30 metros","3 m²"],
            correctIndex: 1,
            explanationOnSuccess: "M² é a unidade oficial para áreas de salas e terrenos!",
            explanationOnError: "Lembre-se da unidade quadrada do metro."
          },
          notebookGuide: {
            tips: ["Sabendo o tamanho exato, as lixeiras vão caber direitinho."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-2-2',
          title: "Atividade 5 — Área do isolamento",
          mascotTip: "O gari estende a faixa em uma área retangular de asfalto recém pintado.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"A área mede 6 metros de comprimento por 3 metros de largura. E agora?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A área de um retângulo é calculada multiplicando o comprimento pela largura.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Multiplicar 6 por 3 significa que temos 3 fileiras de 6 quadrados de 1m².", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "6 vezes 3 é igual a 18.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "A área desse espaço de 6m × 3m é de:",
            options: ["18 m","9 m²","18 m²","12 m²"],
            correctIndex: 2,
            explanationOnSuccess: "Correto! 6 × 3 = 18 m².",
            explanationOnError: "Multiplique as medidas."
          },
          notebookGuide: {
            tips: ["Matemática rápida! A fita vai cobrir o lugar certinho."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-2-3',
          title: "Atividade 6 — A diferença definitiva",
          mascotTip: "O gari coloca a fita na borda e depois varre o meio.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"A fita preta fica na borda (Perímetro). A vassoura passa no chão (Área).\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Perímetro soma os lados externos. Área conta o espaço de dentro.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Nunca confunda! Para perímetro somamos (ex: 2+3+2+3). Para área multiplicamos (2x3).", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "O contorno é a linha. A área é o miolo.",
            interaction: { type: 'demo-perimeter', data: {} }
          },
          dragAndDrop: {
            title: "Classifique a tarefa",
            instruction: "Arraste para a categoria correta.",
            items: [{"id":"i1","content":"Contorno da cerca"},{"id":"i2","content":"Grama do chão"}],
            categories: [{"id":"c1","title":"Perímetro"},{"id":"c2","title":"Área"}],
            correctMapping: {"i1":"c1","i2":"c2"},
            successMessage: "Você não vai mais se confundir com isso!"
          },
          notebookGuide: {
            tips: ["Trabalho físico feito. Vamos decidir as tarefas de amanhã por sorteio."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-3',
      number: 3,
      title: "Comparando figuras",
      shortDesc: "Retângulos e formatos",
      icon: 'Grid',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-3-1',
          title: "Atividade 7 — Probabilidade e dados",
          mascotTip: "O gari senta num caixote, puxa 2 dados e brinca com a equipe.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Vamos lançar dois dados. O total de combinações é 36. Quantas duplas de números iguais existem?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A probabilidade compara os Casos Favoráveis com o Total de Casos (36).", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Os casos favoráveis de duplas são (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). São 6 chances em 36.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "A probabilidade é 6/36, que simplificando dá 1/6.",
            interaction: { type: 'demo-prob', data: {} }
          },
          quiz: {
            question: "A probabilidade de cair com números iguais (duplas) em dois dados é de:",
            options: ["6/36 ou 1/6","12/36 ou 1/3","1/36","36/36"],
            correctIndex: 0,
            explanationOnSuccess: "Incrível! Há 6 combinações de duplas.",
            explanationOnError: "Há 6 duplas possíveis num total de 36."
          },
          notebookGuide: {
            tips: ["Dados guardados, mas e a tabela de áreas?"],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-3-2',
          title: "Atividade 8 — Contando lados",
          mascotTip: "No galpão, uma grande prateleira tem o formato de um retângulo feito de 10 quadradinhos (5x2).",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Olhando para este retângulo de caixas, qual é o comprimento e a largura?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Comprimento é o número de quadradinhos na base. Largura é a altura lateral.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Se a base tem 5 quadradinhos e a altura tem 2, a área é 10. Mas o perímetro é 5+2+5+2 = 14.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Base = 5, Lado = 2. Perímetro = 14.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Se o retângulo tem base 5 e altura 2, seu perímetro e área são, respectivamente:",
            options: ["10 e 10","14 e 10","10 e 14","7 e 10"],
            correctIndex: 1,
            explanationOnSuccess: "Exato! Perímetro é a soma 5+2+5+2=14, e Área é 5x2=10.",
            explanationOnError: "O perímetro é a soma de TODOS os quatro lados. A área é a multiplicação."
          },
          notebookGuide: {
            tips: ["Você enxerga geometria em qualquer lugar."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-3-3',
          title: "Atividade 9 — Ilusão de ótica",
          mascotTip: "O gari aponta para dois canteiros na calçada. Um é comprido, o outro é gordo.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"O comprido parece maior, né? Mas a matemática não se deixa enganar pela aparência.\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Para saber qual figura tem MAIOR área, você deve contar o número de quadradinhos de cada uma.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "A Figura 1 pode ter 12 quadradinhos agrupados em um quadrado grosso, e a Figura 2 pode ter 14 esticados. A Figura 2 vence.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Conte sempre os tijolinhos da área interna.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Como se determina com precisão a maior área entre duas figuras em uma malha?",
            options: ["Olhando qual é mais comprida.","Contando e comparando o número total de quadradinhos internos de cada figura.","Medindo apenas a altura.","Somando os lados."],
            correctIndex: 1,
            explanationOnSuccess: "Correto! A contagem da superfície interna é o método mais preciso.",
            explanationOnError: "Não confie na aparência. O espaço ocupado se revela contando o interior."
          },
          notebookGuide: {
            tips: ["O gari confia apenas na matemática exata."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-3-4',
          title: "Atividade 10 — O desafio do desenho",
          mascotTip: "Ele desenha no chão de giz: um quadrado de 5cm de lado e um retângulo de 7cm por 3cm.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Os formatos são diferentes, os lados também. Mas vamos comparar a área e o perímetro deles!\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Quadrado: Área = 5x5=25, Perímetro = 5x4=20. Retângulo: Área = 7x3=21, Perímetro = 7+3+7+3=20.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Eles podem ter perímetros iguais (ambos 20cm), mas áreas diferentes (25cm² e 21cm²).", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Quadrado (5,5) -> P=20, A=25. Retângulo (7,3) -> P=20, A=21.",
            interaction: { type: 'demo-perimeter', data: {} }
          },
          dragAndDrop: {
            title: "Resultados cruzados",
            instruction: "Arraste os valores para as categorias certas.",
            items: [{"id":"i1","content":"25 cm²"},{"id":"i2","content":"20 cm"},{"id":"i3","content":"21 cm²"}],
            categories: [{"id":"c1","title":"Área do Quadrado 5x5"},{"id":"c2","title":"Perímetro (dos dois!)"},{"id":"c3","title":"Área do Retângulo 7x3"}],
            correctMapping: {"i1":"c1","i2":"c2","i3":"c3"},
            successMessage: "Percebeu como o formato quadrangular maximiza a área com o mesmo contorno?"
          },
          notebookGuide: {
            tips: ["Desenhar formas é a melhor maneira de visualizar cálculos complexos."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-4',
      number: 4,
      title: "Mosaicos e contornos",
      shortDesc: "Formas complexas",
      icon: 'Puzzle',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-4-1',
          title: "Atividade 11 — Cinco figuras",
          mascotTip: "Há 5 poças d'água diferentes na rua. O gari precisa cercar a maior.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"A que der a volta mais demorada é a que tem o maior contorno, ou seja, maior perímetro.\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Para achar o maior perímetro numa malha cheia de curvas e degraus, é preciso somar absolutamente todos os lados de contato com o exterior.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Não se apresse. Figuras parecendo estrelas ou com muitos degraus costumam ter os maiores perímetros, pois ziguezagueiam muito.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Uma cruz tem área pequena, mas um perímetro enorme.",
            interaction: { type: 'demo-path', data: {} }
          },
          writtenPrompt: {
            question: "Para encontrar o maior CONTORNO, por que contar as pontas em zigue-zague é importante?",
            linesNeeded: 2,
            suggestedAnswer: "Porque o zigue-zague aumenta a quantidade de linhas na borda, aumentando o perímetro.",
            guideline: "O contorno é o caminho pela borda, cada curva adiciona tamanho."
          },
          notebookGuide: {
            tips: ["Excelente observação espacial!"],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-4-2',
          title: "Atividade 12 — Blocos lógicos",
          mascotTip: "A praça nova tem uma pintura com partes azuis, amarelas e rosas, formando mosaicos.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Essa figura enorme é composta por peças menores. Se a parte azul vale 15 quadrados e a amarela 8...\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Em figuras complexas compostas por retângulos diferentes, a área total é a soma das áreas parciais.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "A área Azul = 15. A Amarela = 8. Se elas se juntam, não se sobrepõem, logo a área da nova figura seria 15 + 8 = 23.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Isso se chama Conservação de Área e Decomposição de Figuras.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Se a figura composta for formada exatamente pela parte azul (15) e a amarela (8), qual sua área total?",
            options: ["15","8","23","7"],
            correctIndex: 2,
            explanationOnSuccess: "Correto! 15 + 8 = 23. Somamos as áreas das partes.",
            explanationOnError: "A área total é a soma de todos os quadradinhos de cada cor."
          },
          notebookGuide: {
            tips: ["Esse mosaico foi calculado sem estresse!"],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-4-3',
          title: "Atividade 13 — Montando o que sobrou",
          mascotTip: "O gari encontra restos de um cartaz de festa junina, recortados em formato de triângulos e quadrados menores.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Se eu juntar esses triângulos pontilhados, formo quadrados do mesmo tamanho do centro!\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Quando cortamos formas geométricas pelas diagonais, as metades podem ser reagrupadas.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Dois triângulos retângulos idênticos formam um quadrado. Conte as partes inteiras e some as frações que formam inteiros.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se há 4 quadrados inteiros e 4 metades (triângulos), o total são 4 + 2 = 6 quadrados.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Juntando as pontas (triângulos), qual é a área total equivalente da folha em quadrados?",
            options: ["5","6","7","8"],
            correctIndex: 3,
            explanationOnSuccess: "Exato! Contamos os centrais e juntamos os externos aos pares.",
            explanationOnError: "Lembre-se que cada 2 triângulos formam 1 quadrado inteiro."
          },
          notebookGuide: {
            tips: ["A geometria ajuda até na hora de limpar papéis picados."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-5',
      number: 5,
      title: "Sorteios no turno",
      shortDesc: "Roletas e balões",
      icon: 'Target',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-5-1',
          title: "Atividade 14 — A roleta do turno",
          mascotTip: "Na garagem, o chefe puxa uma roleta de madeira. Nela estão pintadas as tarefas do dia.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"A roleta tem setores coloridos de tamanhos diferentes. Aonde a seta vai parar?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A chance de sorteio é proporcional à quantidade de setores com a mesma tarefa.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Se a tarefa de \"varrer\" ocupa 3 setores, e a de \"lavar\" apenas 1, a maior chance é varrer.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "A área maior na roleta domina o sorteio.",
            interaction: { type: 'demo-prob', data: {} }
          },
          gariInteraction: {
            type: 'roulette',
            data: {"options":["Varrer","Lavar","Varrer","Coletar"]}
          },
          notebookGuide: {
            tips: ["O sorteio foi feito! Que os jogos comecem."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-5-2',
          title: "Atividade 15 — Limpando a festa",
          mascotTip: "Houve uma festa na praça. Sobraram muitos balões estourados e murchos pelo chão.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Tem balão azul, amarelo e vermelho. Qual a chance de eu recolher um vermelho de olhos fechados?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A probabilidade é a divisão do número de balões daquela cor pelo total de balões no chão.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Se temos 10 balões no total e 3 vermelhos, a chance é \"3 em 10\".", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Frações e probabilidades são amigas inseparáveis.",
            interaction: { type: 'demo-prob', data: {} }
          },
          writtenPrompt: {
            question: "Se há 3 balões vermelhos em um total de 10, como você escreve essa chance?",
            linesNeeded: 2,
            suggestedAnswer: "A chance é de 3 em 10, ou a fração 3/10.",
            guideline: "O formato correto é casos favoráveis sobre casos totais."
          },
          notebookGuide: {
            tips: ["Tudo limpo, e a probabilidade confirmada."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-5-3',
          title: "Atividade 16 — O saco de recicláveis",
          mascotTip: "O gari carrega um saco opaco de materiais recicláveis: latinhas, papel e plástico.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Sem olhar, vou puxar um material. Qual tem mais chance de sair?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A probabilidade se baseia na contagem de cada tipo dentro do saco.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "A categoria com a maior quantidade (frequência) dentro da sacola é a que tem maior probabilidade de ser retirada aleatoriamente.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Se há 20 latinhas e 5 papéis, é quase certo puxar uma latinha.",
            interaction: { type: 'demo-prob', data: {} }
          },
          dragAndDrop: {
            title: "Classifique a chance",
            instruction: "Arraste o tipo de material para sua classificação (sabendo que há 20 latinhas, 10 vidros e 5 plásticos).",
            items: [{"id":"i1","content":"Latinhas (20)"},{"id":"i2","content":"Plástico (5)"}],
            categories: [{"id":"c1","title":"Maior Probabilidade"},{"id":"c2","title":"Menor Probabilidade"}],
            correctMapping: {"i1":"c1","i2":"c2"},
            successMessage: "Você compreende perfeitamente a relação de quantidade e chance!"
          },
          notebookGuide: {
            tips: ["Reciclar exige separar bem os materiais."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-5-4',
          title: "Atividade 17 — Número 7 no sorteio",
          mascotTip: "No intervalo, o gari vê crianças brincando com fichas numeradas de 1 a 10.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Em um dado normal, a chance de sair o número 5 é 1 em 6. Mas e nesse sorteio de 1 a 10, qual a chance de puxar o 7?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Para calcular a chance de um evento, contamos quantos resultados favoráveis existem e dividimos pelo total.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Apenas uma ficha tem o número 7 (um caso favorável). O total de fichas é 10. A chance é 1/10.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Chance = Favoráveis / Possíveis.",
            interaction: { type: 'demo-prob', data: {} }
          },
          quiz: {
            question: "Em um sorteio de fichas de 1 a 10, qual é a probabilidade de sair exatamente a ficha com o número 7?",
            options: ["7/10","1/10","1/7","10/10"],
            correctIndex: 1,
            explanationOnSuccess: "Correto! Só há uma ficha \"7\" num total de dez fichas.",
            explanationOnError: "A pergunta não pede 7 fichas, mas sim a ÚNICA ficha que tem o desenho do 7."
          },
          notebookGuide: {
            tips: ["As crianças aplaudem a aula de estatística improvisada."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-6',
      number: 6,
      title: "Estatística da coleta",
      shortDesc: "Frações e massas",
      icon: 'PieChart',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-6-1',
          title: "Atividade 18 — Registro da coleta",
          mascotTip: "Fim do dia. O gari precisa registrar quantos sacos de cada cor ele recolheu na planilha.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Recolhi 20 azuis, 12 vermelhos, 10 amarelos e 5 verdes. Qual foi o total?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 A soma das frequências individuais dá o tamanho total da nossa amostra estatística.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Soma total = 20 + 12 + 10 + 5 = 47. Se eu sorteasse um saco desses 47, a chance do verde seria 5/47.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "O total é o denominador.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Se o total é 47, qual é a probabilidade estatística de se sortear exatamente um dos sacos verdes (foram 5 coletados)?",
            options: ["5/47","20/47","47/5","1/5"],
            correctIndex: 0,
            explanationOnSuccess: "Isso mesmo! 5 sacos verdes dentro de 47.",
            explanationOnError: "A fração se escreve: Quantidade Verde sobre a Quantidade Total."
          },
          notebookGuide: {
            tips: ["Planilha preenchida com sucesso."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-6-2',
          title: "Atividade 19 — O lanche da equipe",
          mascotTip: "A equipe pediu uma pizza gigante de 10 pedaços para dividir na hora do lanche.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Se eu comer um pedaço de 10, eu comi a fração 1/10. E como escrevemos isso em decimal?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Uma fração decimal com denominador 10 pode ser escrita com uma casa após a vírgula.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "A fração 1/10 corresponde a um décimo, que se escreve 0,1. Se sobrar uma fatia, sobra 0,1.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "1/10 = 0,1. 5/10 = 0,5.",
            interaction: { type: 'demo-prob', data: {} }
          },
          quiz: {
            question: "A fatia que sobrou (1/10 da pizza) é representada por qual número decimal?",
            options: ["0,01","1,0","0,1","10,0"],
            correctIndex: 2,
            explanationOnSuccess: "Exato! 1/10 = 0,1.",
            explanationOnError: "Se temos décimos, a vírgula anda uma casa: 0,1."
          },
          notebookGuide: {
            tips: ["Depois do lanche, de volta ao trabalho pesado."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-6-3',
          title: "Atividade 20 — Formiga ou caminhão?",
          mascotTip: "O gari encontra uma formiguinha carregando uma folha perto do caminhão de lixo.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Olha o peso desse caminhão... e o peso dessa formiga! Tudo tem sua unidade.\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Usamos miligrama (mg) para coisas ínfimas, grama (g) para médias, e quilograma (kg) para pesadas.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Uma formiga pesa em torno de 3 miligramas (mg), não 3 kg.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "1 kg = 1000 g. 1 g = 1000 mg.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Qual é a massa mais provável para uma formiga pequena?",
            options: ["3 mg","3 g","3 dag","3 kg"],
            correctIndex: 0,
            explanationOnSuccess: "Correto! mg é a menor unidade.",
            explanationOnError: "A formiga é levíssima. Precisamos da menor unidade possível."
          },
          notebookGuide: {
            tips: ["Até os menores seres da natureza têm sua matemática."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-6-4',
          title: "Atividade 21 — Relatório anual",
          mascotTip: "No painel da empresa, há um gráfico de barras das garrafas PET recicladas de 2014 a 2018.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Em 2017 recolhemos 26 toneladas de PET. Mas o gerente quer esse número em quilogramas!\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Uma tonelada (t) é igual a mil quilogramas (kg).", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Para transformar 26 toneladas em quilos, multiplicamos 26 por 1.000.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "26 x 1000 = 26.000 kg.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Sabendo que 1 tonelada = 1000 kg, 26 toneladas de garrafa PET equivalem a:",
            options: ["2 600 kg","26 000 kg","260 000 kg","2 600 000 kg"],
            correctIndex: 1,
            explanationOnSuccess: "Exatamente! Basta acrescentar três zeros (multiplicar por mil).",
            explanationOnError: "Lembre-se: 26 vezes 1000. Adicione três zeros ao número 26."
          },
          notebookGuide: {
            tips: ["Números impressionantes! E a reciclagem salva a cidade."],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    },
    {
      id: 'gari-unit-7',
      number: 7,
      title: "A revisão final",
      shortDesc: "Padrões e 3D",
      icon: 'CheckSquare',
      xpReward: 50,
      color: 'emerald',
      steps: [
        {
          id: 'step-7-1',
          title: "Atividade 22 — Os cones na avenida",
          mascotTip: "Para isolar uma rua, o gari organizou cones e placas em uma fila padronizada: Cone, Placa, Placa, Pneu...",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Esse padrão se repete a cada 4 objetos. Se eu continuar assim, qual objeto vai ficar na posição 27?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Em um padrão repetitivo (ciclo de 4), dividimos a posição desejada pelo tamanho do ciclo.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "27 dividido por 4 dá 6 ciclos completos (24) e sobram 3. O resto (3) indica que o objeto é o terceiro da sequência básica.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Posição 27 -> Resto 3. É o terceiro elemento.",
            interaction: { type: 'demo-prob', data: {} }
          },
          writtenPrompt: {
            question: "Explique por que saber o \"resto da divisão\" ajuda a descobrir a posição 27.",
            linesNeeded: 2,
            suggestedAnswer: "O resto mostra exatamente qual é o passo da sequência após os ciclos completos terminarem.",
            guideline: "Diga que o resto (3) aponta para o terceiro objeto do ciclo."
          },
          notebookGuide: {
            tips: ["Com matemática, a gente prevê o futuro dos cones."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-7-2',
          title: "Atividade 23 — A sucata volumétrica",
          mascotTip: "Ele acha 4 pedaços idênticos de isopor. Cada pedaço é formado por 2 cubinhos colados (como um paralelepípedo).",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Esses blocos têm volume. Se eu juntar os 4, terei uma estrutura com 8 cubinhos. Será que eu posso montar qualquer forma?\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Com 4 blocos de 2, você só pode montar estruturas cujas metades ou partes possam ser divididas por blocos retos de 2.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Estruturas com pontas isoladas de 1 cubinho são impossíveis de formar com blocos inteiros de 2.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "Você não quebra o bloco!",
            interaction: { type: 'demo-area', data: {} }
          },
          dragAndDrop: {
            title: "Montagem de isopor",
            instruction: "Separe o que PODE e o que NÃO PODE ser montado com 4 peças duplas.",
            items: [{"id":"i1","content":"Cubo 2x2x2"},{"id":"i2","content":"Pirâmide com 1 no topo"}],
            categories: [{"id":"c1","title":"Possível"},{"id":"c2","title":"Impossível"}],
            correctMapping: {"i1":"c1","i2":"c2"},
            successMessage: "Exato! A peça de isopor não se dobra nem se quebra."
          },
          notebookGuide: {
            tips: ["O caminhão vai amassar tudo isso de qualquer jeito."],
            operation: 'addition',
            showBorders: false
          }
        },
        {
          id: 'step-7-3',
          title: "Atividade 24 — A pintura no fim do dia",
          mascotTip: "O gari termina o turno olhando para a parede pintada do refeitório. A figura sobre a malha de tijolos tem partes pintadas inteiras e metades.",
          conceptCard: {
            title: 'No dia a dia do Gari...',
            points: [
              { label: 'Ouvindo o Gari', text: "O gari diz: \"Pra encerrar o expediente: vamos aplicar a mesma regra de juntar os triângulos para descobrir a área colorida final.\"", iconName: 'MessageSquare' },
              { label: 'O Conceito', text: "💡 Conte os quadrados preenchidos por completo. Depois junte os triângulos formando pares de 1 unidade inteira.", iconName: 'Lightbulb' },
              { label: 'Dica de Ouro', text: "Se a figura tiver 12 quadrados inteiros e 4 metades, a área total pintada será 14 unidades quadradas.", iconName: 'Star' }
            ]
          },
          explanation: {
            text: "12 inteiros + (4 metades = 2 inteiros) = 14.",
            interaction: { type: 'demo-area', data: {} }
          },
          quiz: {
            question: "Contando os quadrados pintados da malha (12 inteiros e 4 metades), a área total é:",
            options: ["12","13","14","15"],
            correctIndex: 2,
            explanationOnSuccess: "Exato! 12 inteiros + 2 pares formam 14 de área.",
            explanationOnError: "Lembre-se de juntar as partes triangulares."
          },
          notebookGuide: {
            tips: ["O expediente do Gari chega ao fim. E com ele, toda essa imersão na matemática do dia a dia!"],
            operation: 'addition',
            showBorders: false
          }
        }
      ]
    }
  ]
};
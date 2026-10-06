module.exports = [
  // FASE 13
  {
    title: 'Folha quadrada pontilhada',
    shortDesc: 'Recorte e reagrupamento',
    icon: 'Scissors',
    activities: [
      {
        title: 'Atividade 13 — Montando o que sobrou',
        cena: 'O gari encontra restos de um cartaz de festa junina, recortados em formato de triângulos e quadrados menores.',
        fala: 'Se eu juntar esses triângulos pontilhados, formo quadrados do mesmo tamanho do centro!',
        explicacao: 'Quando cortamos formas geométricas pelas diagonais, as metades podem ser reagrupadas.',
        detalhePedagogico: 'Dois triângulos retângulos idênticos formam um quadrado. Conte as partes inteiras e some as frações que formam inteiros.',
        microexemplo: 'Se há 4 quadrados inteiros e 4 metades (triângulos), o total são 4 + 2 = 6 quadrados.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Observe as partes cortadas e conte o total equivalente de quadrados.',
        quiz: {
          question: 'Juntando as pontas (triângulos), qual é a área total equivalente da folha em quadrados?',
          options: ['5', '6', '7', '8'],
          correctIndex: 3,
          explanationOnSuccess: 'Exato! Contamos os centrais e juntamos os externos aos pares.',
          explanationOnError: 'Lembre-se que cada 2 triângulos formam 1 quadrado inteiro.',
          hint: 'Junte as metades.'
        },
        transicao: 'A geometria ajuda até na hora de limpar papéis picados.'
      }
    ]
  },
  // FASE 14
  {
    title: 'Roleta de tarefas',
    shortDesc: 'Sorteio justo',
    icon: 'Loader2',
    activities: [
      {
        title: 'Atividade 14 — A roleta do turno',
        cena: 'Na garagem, o chefe puxa uma roleta de madeira. Nela estão pintadas as tarefas do dia.',
        fala: 'A roleta tem setores coloridos de tamanhos diferentes. Aonde a seta vai parar?',
        explicacao: 'A chance de sorteio é proporcional à quantidade de setores com a mesma tarefa.',
        detalhePedagogico: 'Se a tarefa de "varrer" ocupa 3 setores, e a de "lavar" apenas 1, a maior chance é varrer.',
        microexemplo: 'A área maior na roleta domina o sorteio.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Gire a roleta e analise a chance.',
        interaction: { type: 'roulette', data: { options: ['Varrer', 'Lavar', 'Varrer', 'Coletar'] } },
        quiz: {
          question: 'Comparando as áreas dos setores na roleta, qual tarefa tem maior chance de sair?',
          options: ['Varrer', 'Lavar', 'Coletar', 'Todas têm a mesma chance'],
          correctIndex: 0,
          explanationOnSuccess: 'Correto! Há mais setores de "Varrer" do que os outros.',
          explanationOnError: 'A tarefa que aparece repetida tem uma fatia maior de probabilidade.',
          hint: 'Qual cor aparece mais vezes?'
        },
        transicao: 'O sorteio foi feito! Que os jogos comecem.'
      }
    ]
  },
  // FASE 15
  {
    title: 'Balões de campanha',
    shortDesc: 'Contagem de casos',
    icon: 'Target',
    activities: [
      {
        title: 'Atividade 15 — Limpando a festa',
        cena: 'Houve uma festa na praça. Sobraram muitos balões estourados e murchos pelo chão.',
        fala: 'Tem balão azul, amarelo e vermelho. Qual a chance de eu recolher um vermelho de olhos fechados?',
        explicacao: 'A probabilidade é a divisão do número de balões daquela cor pelo total de balões no chão.',
        detalhePedagogico: 'Se temos 10 balões no total e 3 vermelhos, a chance é "3 em 10".',
        microexemplo: 'Frações e probabilidades são amigas inseparáveis.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Analise os balões que o gari está juntando.',
        writtenPrompt: {
          question: 'Se há 3 balões vermelhos em um total de 10, como você escreve essa chance?',
          linesNeeded: 2,
          suggestedAnswer: 'A chance é de 3 em 10, ou a fração 3/10.',
          guideline: 'O formato correto é casos favoráveis sobre casos totais.'
        },
        transicao: 'Tudo limpo, e a probabilidade confirmada.'
      }
    ]
  },
  // FASE 16
  {
    title: 'Sacola de materiais',
    shortDesc: 'Tirando às cegas',
    icon: 'Briefcase',
    activities: [
      {
        title: 'Atividade 16 — O saco de recicláveis',
        cena: 'O gari carrega um saco opaco de materiais recicláveis: latinhas, papel e plástico.',
        fala: 'Sem olhar, vou puxar um material. Qual tem mais chance de sair?',
        explicacao: 'A probabilidade se baseia na contagem de cada tipo dentro do saco.',
        detalhePedagogico: 'A categoria com a maior quantidade (frequência) dentro da sacola é a que tem maior probabilidade de ser retirada aleatoriamente.',
        microexemplo: 'Se há 20 latinhas e 5 papéis, é quase certo puxar uma latinha.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Identifique o evento mais provável no saco do gari.',
        dragAndDrop: {
          title: 'Classifique a chance',
          instruction: 'Arraste o tipo de material para sua classificação (sabendo que há 20 latinhas, 10 vidros e 5 plásticos).',
          items: [{ id: 'i1', content: 'Latinhas (20)' }, { id: 'i2', content: 'Plástico (5)' }],
          categories: [{ id: 'c1', title: 'Maior Probabilidade' }, { id: 'c2', title: 'Menor Probabilidade' }],
          correctMapping: { 'i1': 'c1', 'i2': 'c2' },
          successMessage: 'Você compreende perfeitamente a relação de quantidade e chance!'
        },
        transicao: 'Reciclar exige separar bem os materiais.'
      }
    ]
  },
  // FASE 17
  {
    title: 'Dado e sorteio de 1 a 10',
    shortDesc: 'Eventos independentes',
    icon: 'Hash',
    activities: [
      {
        title: 'Atividade 17 — Número 7 no sorteio',
        cena: 'No intervalo, o gari vê crianças brincando com fichas numeradas de 1 a 10.',
        fala: 'Em um dado normal, a chance de sair o número 5 é 1 em 6. Mas e nesse sorteio de 1 a 10, qual a chance de puxar o 7?',
        explicacao: 'Para calcular a chance de um evento, contamos quantos resultados favoráveis existem e dividimos pelo total.',
        detalhePedagogico: 'Apenas uma ficha tem o número 7 (um caso favorável). O total de fichas é 10. A chance é 1/10.',
        microexemplo: 'Chance = Favoráveis / Possíveis.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Calcule a chance do número 7.',
        quiz: {
          question: 'Em um sorteio de fichas de 1 a 10, qual é a probabilidade de sair exatamente a ficha com o número 7?',
          options: ['7/10', '1/10', '1/7', '10/10'],
          correctIndex: 1,
          explanationOnSuccess: 'Correto! Só há uma ficha "7" num total de dez fichas.',
          explanationOnError: 'A pergunta não pede 7 fichas, mas sim a ÚNICA ficha que tem o desenho do 7.',
          hint: 'Quantas fichas têm o número 7 estampado?'
        },
        transicao: 'As crianças aplaudem a aula de estatística improvisada.'
      }
    ]
  },
  // FASE 18
  {
    title: 'Frequências 20, 12, 10 e 5',
    shortDesc: 'Estatística básica',
    icon: 'BarChart2',
    activities: [
      {
        title: 'Atividade 18 — Registro da coleta',
        cena: 'Fim do dia. O gari precisa registrar quantos sacos de cada cor ele recolheu na planilha.',
        fala: 'Recolhi 20 azuis, 12 vermelhos, 10 amarelos e 5 verdes. Qual foi o total?',
        explicacao: 'A soma das frequências individuais dá o tamanho total da nossa amostra estatística.',
        detalhePedagogico: 'Soma total = 20 + 12 + 10 + 5 = 47. Se eu sorteasse um saco desses 47, a chance do verde seria 5/47.',
        microexemplo: 'O total é o denominador.',
        demoInteraction: { type: 'demo-area' }, // just a visual placeholder
        comando: 'Ajude a calcular o total e a fração.',
        quiz: {
          question: 'Se o total é 47, qual é a probabilidade estatística de se sortear exatamente um dos sacos verdes (foram 5 coletados)?',
          options: ['5/47', '20/47', '47/5', '1/5'],
          correctIndex: 0,
          explanationOnSuccess: 'Isso mesmo! 5 sacos verdes dentro de 47.',
          explanationOnError: 'A fração se escreve: Quantidade Verde sobre a Quantidade Total.',
          hint: 'Numerador é 5, denominador é 47.'
        },
        transicao: 'Planilha preenchida com sucesso.'
      }
    ]
  },
  // FASE 19
  {
    title: 'Pizza em dez partes',
    shortDesc: 'Fração e decimal',
    icon: 'PieChart',
    activities: [
      {
        title: 'Atividade 19 — O lanche da equipe',
        cena: 'A equipe pediu uma pizza gigante de 10 pedaços para dividir na hora do lanche.',
        fala: 'Se eu comer um pedaço de 10, eu comi a fração 1/10. E como escrevemos isso em decimal?',
        explicacao: 'Uma fração decimal com denominador 10 pode ser escrita com uma casa após a vírgula.',
        detalhePedagogico: 'A fração 1/10 corresponde a um décimo, que se escreve 0,1. Se sobrar uma fatia, sobra 0,1.',
        microexemplo: '1/10 = 0,1. 5/10 = 0,5.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Faça a conversão da fatia que sobrou.',
        quiz: {
          question: 'A fatia que sobrou (1/10 da pizza) é representada por qual número decimal?',
          options: ['0,01', '1,0', '0,1', '10,0'],
          correctIndex: 2,
          explanationOnSuccess: 'Exato! 1/10 = 0,1.',
          explanationOnError: 'Se temos décimos, a vírgula anda uma casa: 0,1.',
          hint: 'Zero vírgula um.'
        },
        transicao: 'Depois do lanche, de volta ao trabalho pesado.'
      }
    ]
  },
  // FASE 20
  {
    title: 'Medida de massa',
    shortDesc: 'mg, g, kg',
    icon: 'Scale3d',
    activities: [
      {
        title: 'Atividade 20 — Formiga ou caminhão?',
        cena: 'O gari encontra uma formiguinha carregando uma folha perto do caminhão de lixo.',
        fala: 'Olha o peso desse caminhão... e o peso dessa formiga! Tudo tem sua unidade.',
        explicacao: 'Usamos miligrama (mg) para coisas ínfimas, grama (g) para médias, e quilograma (kg) para pesadas.',
        detalhePedagogico: 'Uma formiga pesa em torno de 3 miligramas (mg), não 3 kg.',
        microexemplo: '1 kg = 1000 g. 1 g = 1000 mg.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Selecione a unidade correta para uma formiga.',
        quiz: {
          question: 'Qual é a massa mais provável para uma formiga pequena?',
          options: ['3 mg', '3 g', '3 dag', '3 kg'],
          correctIndex: 0,
          explanationOnSuccess: 'Correto! mg é a menor unidade.',
          explanationOnError: 'A formiga é levíssima. Precisamos da menor unidade possível.',
          hint: 'miligramas.'
        },
        transicao: 'Até os menores seres da natureza têm sua matemática.'
      }
    ]
  },
  // FASE 21
  {
    title: 'Gráfico PET',
    shortDesc: 'Toneladas e quilogramas',
    icon: 'BarChart',
    activities: [
      {
        title: 'Atividade 21 — Relatório anual',
        cena: 'No painel da empresa, há um gráfico de barras das garrafas PET recicladas de 2014 a 2018.',
        fala: 'Em 2017 recolhemos 26 toneladas de PET. Mas o gerente quer esse número em quilogramas!',
        explicacao: 'Uma tonelada (t) é igual a mil quilogramas (kg).',
        detalhePedagogico: 'Para transformar 26 toneladas em quilos, multiplicamos 26 por 1.000.',
        microexemplo: '26 x 1000 = 26.000 kg.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Faça a conversão do gráfico.',
        quiz: {
          question: 'Sabendo que 1 tonelada = 1000 kg, 26 toneladas de garrafa PET equivalem a:',
          options: ['2 600 kg', '26 000 kg', '260 000 kg', '2 600 000 kg'],
          correctIndex: 1,
          explanationOnSuccess: 'Exatamente! Basta acrescentar três zeros (multiplicar por mil).',
          explanationOnError: 'Lembre-se: 26 vezes 1000. Adicione três zeros ao número 26.',
          hint: '26 + 000'
        },
        transicao: 'Números impressionantes! E a reciclagem salva a cidade.'
      }
    ]
  },
  // FASE 22
  {
    title: 'Sequência repetitiva',
    shortDesc: 'Padrões',
    icon: 'Repeat',
    activities: [
      {
        title: 'Atividade 22 — Os cones na avenida',
        cena: 'Para isolar uma rua, o gari organizou cones e placas em uma fila padronizada: Cone, Placa, Placa, Pneu...',
        fala: 'Esse padrão se repete a cada 4 objetos. Se eu continuar assim, qual objeto vai ficar na posição 27?',
        explicacao: 'Em um padrão repetitivo (ciclo de 4), dividimos a posição desejada pelo tamanho do ciclo.',
        detalhePedagogico: '27 dividido por 4 dá 6 ciclos completos (24) e sobram 3. O resto (3) indica que o objeto é o terceiro da sequência básica.',
        microexemplo: 'Posição 27 -> Resto 3. É o terceiro elemento.',
        demoInteraction: { type: 'demo-prob' },
        comando: 'Encontre o resto da divisão de 27 por 4 e responda.',
        writtenPrompt: {
          question: 'Explique por que saber o "resto da divisão" ajuda a descobrir a posição 27.',
          linesNeeded: 2,
          suggestedAnswer: 'O resto mostra exatamente qual é o passo da sequência após os ciclos completos terminarem.',
          guideline: 'Diga que o resto (3) aponta para o terceiro objeto do ciclo.'
        },
        transicao: 'Com matemática, a gente prevê o futuro dos cones.'
      }
    ]
  },
  // FASE 23
  {
    title: 'Blocos de cubinhos',
    shortDesc: 'Raciocínio Espacial',
    icon: 'Box',
    activities: [
      {
        title: 'Atividade 23 — A sucata volumétrica',
        cena: 'Ele acha 4 pedaços idênticos de isopor. Cada pedaço é formado por 2 cubinhos colados (como um paralelepípedo).',
        fala: 'Esses blocos têm volume. Se eu juntar os 4, terei uma estrutura com 8 cubinhos. Será que eu posso montar qualquer forma?',
        explicacao: 'Com 4 blocos de 2, você só pode montar estruturas cujas metades ou partes possam ser divididas por blocos retos de 2.',
        detalhePedagogico: 'Estruturas com pontas isoladas de 1 cubinho são impossíveis de formar com blocos inteiros de 2.',
        microexemplo: 'Você não quebra o bloco!',
        demoInteraction: { type: 'demo-area' },
        comando: 'Identifique a estrutura impossível.',
        dragAndDrop: {
          title: 'Montagem de isopor',
          instruction: 'Separe o que PODE e o que NÃO PODE ser montado com 4 peças duplas.',
          items: [{ id: 'i1', content: 'Cubo 2x2x2' }, { id: 'i2', content: 'Pirâmide com 1 no topo' }],
          categories: [{ id: 'c1', title: 'Possível' }, { id: 'c2', title: 'Impossível' }],
          correctMapping: { 'i1': 'c1', 'i2': 'c2' },
          successMessage: 'Exato! A peça de isopor não se dobra nem se quebra.'
        },
        transicao: 'O caminhão vai amassar tudo isso de qualquer jeito.'
      }
    ]
  },
  // FASE 24
  {
    title: 'Quadrados pintados',
    shortDesc: 'Revisão final',
    icon: 'CheckSquare',
    activities: [
      {
        title: 'Atividade 24 — A pintura no fim do dia',
        cena: 'O gari termina o turno olhando para a parede pintada do refeitório. A figura sobre a malha de tijolos tem partes pintadas inteiras e metades.',
        fala: 'Pra encerrar o expediente: vamos aplicar a mesma regra de juntar os triângulos para descobrir a área colorida final.',
        explicacao: 'Conte os quadrados preenchidos por completo. Depois junte os triângulos formando pares de 1 unidade inteira.',
        detalhePedagogico: 'Se a figura tiver 12 quadrados inteiros e 4 metades, a área total pintada será 14 unidades quadradas.',
        microexemplo: '12 inteiros + (4 metades = 2 inteiros) = 14.',
        demoInteraction: { type: 'demo-area' },
        comando: 'Para contar a área final, qual é a alternativa correta se o total contado for 14?',
        quiz: {
          question: 'Contando os quadrados pintados da malha (12 inteiros e 4 metades), a área total é:',
          options: ['12', '13', '14', '15'],
          correctIndex: 2,
          explanationOnSuccess: 'Exato! 12 inteiros + 2 pares formam 14 de área.',
          explanationOnError: 'Lembre-se de juntar as partes triangulares.',
          hint: '4 metades é igual a 2 inteiros.'
        },
        transicao: 'O expediente do Gari chega ao fim. E com ele, toda essa imersão na matemática do dia a dia!'
      }
    ]
  }
];

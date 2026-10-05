import { Track } from '../../types';

export const trackGari: Track = {
  "id": "gari-mission",
  "subjectId": "matematica",
  "number": 8,
  "title": "Um dia no trabalho com um gari",
  "description": "Uma jornada interativa completa baseada no PDF de Área e Perímetro, acompanhando um gari homem em seu dia a dia urbano.",
  "objective": "Medir, estimar e calcular área e perímetro, interpretar gráficos, calcular probabilidade e reconhecer padrões no contexto da limpeza urbana.",
  "bnccSkills": [
    "EF04MA20 - Medir, estimar e comparar grandezas",
    "EF04MA21 - Área e perímetro em malha",
    "EF04MA26 - Probabilidade e eventos aleatórios",
    "EF04MA09 - Frações",
    "EF04MA27 - Leitura de gráficos"
  ],
  "color": "emerald",
  "badgeName": "Especialista em Logística Urbana",
  "badgeIcon": "MapIcon",
  "units": [
    {
      "id": "gari-c1",
      "trackId": "gari-mission",
      "number": 1,
      "title": "Capítulo 1: O Que é um Trajeto na Malha?",
      "shortDesc": "Planejando o percurso do gari",
      "icon": "MapIcon",
      "xpReward": 150,
      "steps": [
        {
          "id": "u1-a0-intro",
          "type": "dialogue",
          "title": "Atividade 1 — Descrever o caminho",
          "content": "O aluno encontra o gari na base de limpeza. O gari espalha um grande mapa do bairro em cima da mesa. As ruas parecem uma malha quadriculada.",
          "mascotTip": "Bom dia! Hoje você vai acompanhar meu trabalho. Antes de sairmos, precisamos entender o que é um trajeto neste mapa. Vamos aprender?"
        },
        {
          "id": "u1-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Um trajeto é o caminho que percorremos de um ponto a outro. Imagine que você está andando pela calçada e chega numa esquina. Na malha, cada segmento do quadradinho é uma quadra (ou quarteirão).",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 1 — Descrever o caminho",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Para descrever um caminho perfeitamente, precisamos de duas coisas: a DIREÇÃO (direita, esquerda, cima, baixo) e a QUANTIDADE (quantas quadras andamos).",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se eu for da padaria até a praça, conto cada \"lado\" de quadradinho que passo. Se eu passo por 3 lados subindo, digo: \"Avance 3 quadras para cima\".",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-path"
          }
        },
        {
          "id": "u1-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Agora é a sua vez. Descreva o caminho do gari clicando na malha interativa. Siga a rota planejada marcando 6 quarteirões.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Se o gari percorreu 2 quadras para a direita, qual é a próxima direção?",
            "options": [
              "Esquerda",
              "Para cima",
              "Direita",
              "Para baixo"
            ],
            "correctIndex": 1,
            "explanationOnSuccess": "Exato! Você acompanhou o mapa visualmente e notou a mudança de direção.",
            "explanationOnError": "Ao desenhar a linha, preste atenção no movimento vertical após andar para a direita.",
            "hint": "O traçado faz uma curva subindo em direção ao topo."
          },
          "gariInteraction": {
            "type": "path-draw",
            "data": {
              "target": 6
            }
          }
        },
        {
          "id": "u1-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Sensacional! Entender trajetos é essencial não só para garis, mas para entregadores, motoristas e pedestres.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u1-a1-intro",
          "type": "dialogue",
          "title": "Atividade 2 — Estimar e medir",
          "content": "O gari pega uma trena (fita métrica gigante). Ele aponta para o primeiro trecho.",
          "mascotTip": "Às vezes não temos a fita na mão. Você consegue \"estimar\" quantos metros tem aquele muro antes de medirmos?"
        },
        {
          "id": "u1-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Estimar é o ato de prever uma medida baseando-se no que já conhecemos. Não é chutar! É olhar e comparar.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 2 — Estimar e medir",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Depois da estimativa, usamos a ferramenta real (régua, fita métrica, trena) para obter a MEDIDA EXATA. A diferença mostra o quão treinado está o seu \"olho matemático\".",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Eu estimo que essa vassoura tenha 1 metro de altura. Quando pego a trena, descubro que ela tem 1m e 20cm. Minha estimativa foi boa!",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-path"
          }
        },
        {
          "id": "u1-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Utilize a Régua Interativa para cobrir exatamente o objeto e encontrar a medida.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "gariInteraction": {
            "type": "measure",
            "data": {
              "expectedCm": 10
            }
          },
          "writtenPrompt": {
            "question": "Explique com suas palavras a diferença entre ESTIMAR uma medida e MEDIR usando um instrumento.",
            "linesNeeded": 2,
            "suggestedAnswer": "Estimar é tentar prever o valor usando a lógica visual. Medir é usar a régua para achar o tamanho com exatidão.",
            "guideline": "A palavra-chave é \"exatidão\"."
          }
        },
        {
          "id": "u1-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Viu como a trena não mente? Estimativas guiam, ferramentas confirmam!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c2",
      "trackId": "gari-mission",
      "number": 2,
      "title": "Capítulo 2: A Diferença Entre Perímetro e Área",
      "shortDesc": "Área como medida de superfície",
      "icon": "Square",
      "xpReward": 150,
      "steps": [
        {
          "id": "u2-a0-intro",
          "type": "dialogue",
          "title": "Atividade 3 e 4 — O que é Área?",
          "content": "Vocês chegam a uma grande praça dividida em canteiros de diferentes formatos.",
          "mascotTip": "A praça é gigante! Eu preciso saber a ÁREA para calcular quanto tempo vou demorar varrendo o centro dela."
        },
        {
          "id": "u2-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "A Área é a quantidade de superfície plana que existe DENTRO do contorno de uma figura.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 3 e 4 — O que é Área?",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "O mais fascinante é que figuras com formatos totalmente diferentes podem ter a mesma área. Uma quadra comprida e um pátio quadrado podem ter os mesmos 100 m².",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Um canteiro no formato \"2x3\" abriga 6 quadrados. Uma faixa estreita no formato \"1x6\" também abriga 6 quadrados. Ambas as áreas são iguais a 6!",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-area"
          }
        },
        {
          "id": "u2-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Pinte as regiões da praça e conte os canteiros.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "gariInteraction": {
            "type": "paint",
            "data": {
              "totalRegions": 15,
              "paintedRegions": 6
            }
          },
          "dragAndDrop": {
            "title": "Formas Diferentes, Áreas Iguais",
            "instruction": "Arraste os formatos para as categorias baseando-se apenas na quantidade de quadrados internos.",
            "items": [
              {
                "id": "i1",
                "content": "Retângulo 3x2"
              },
              {
                "id": "i2",
                "content": "Linha Reta 1x6"
              },
              {
                "id": "i3",
                "content": "Quadrado 2x2"
              },
              {
                "id": "i4",
                "content": "Tirinha 1x4"
              }
            ],
            "categories": [
              {
                "id": "c1",
                "title": "Tem 6 quadradinhos de Área"
              },
              {
                "id": "c2",
                "title": "Tem 4 quadradinhos de Área"
              }
            ],
            "correctMapping": {
              "i1": "c1",
              "i2": "c1",
              "i3": "c2",
              "i4": "c2"
            },
            "successMessage": "Genial! A forma não importa se a quantidade de espaço interno for a mesma."
          }
        },
        {
          "id": "u2-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Compreender a área nos ajuda a saber a quantidade de grama que precisamos comprar!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u2-a1-intro",
          "type": "dialogue",
          "title": "Atividade 5 — Investigando o m²",
          "content": "O gari entra na escola municipal ao lado da praça para ajudar na montagem de um evento de reciclagem.",
          "mascotTip": "Para organizar as mesas, é importante saber a área da sala. Quando o espaço é grande, não usamos centímetros."
        },
        {
          "id": "u2-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Em espaços grandes como salas, calçadas ou ruas, usamos o Metro Quadrado (m²). Um m² é o espaço de um quadrado de 1 metro de lado.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 5 — Investigando o m²",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Sempre preste atenção na unidade de medida. Medir o tamanho de uma folha de caderno pede cm², mas medir a sala de aula pede m².",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se o chão da sala cabem 30 quadrados de 1m x 1m, a área é de 30 m².",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-area"
          }
        },
        {
          "id": "u2-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Qual é a unidade certa e qual o valor da área para espaços grandes?",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Sabendo que a sala comporta exatos 30 quadrados de piso (onde cada piso mede 1m de lado), qual é a área da sala?",
            "options": [
              "30 metros",
              "30 cm²",
              "30 m²",
              "30 m³"
            ],
            "correctIndex": 2,
            "explanationOnSuccess": "Isso! Se os quadrados têm 1 metro de lado, estamos medindo em metros quadrados (m²).",
            "explanationOnError": "Preste atenção na unidade! Se o quadrado tem 1 metro, a área é medida em m².",
            "hint": "A unidade usada para áreas com base no metro leva \"²\"."
          }
        },
        {
          "id": "u2-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Excelente, já sabemos calcular as grandes áreas onde vamos trabalhar!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c3",
      "trackId": "gari-mission",
      "number": 3,
      "title": "Capítulo 3: Área, perímetro e probabilidade",
      "shortDesc": "Retângulos e Sorteios",
      "icon": "Dice5",
      "xpReward": 150,
      "steps": [
        {
          "id": "u3-a0-intro",
          "type": "dialogue",
          "title": "Atividade 6 e 7 — Área vs Perímetro",
          "content": "Agora, o gari precisa isolar um pedaço da calçada com fita amarela e preta.",
          "mascotTip": "Mas espere! A área é o chão... e o contorno externo, como chamamos? Isso é o perímetro!"
        },
        {
          "id": "u3-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "O Perímetro é a medida apenas da borda. Imagine uma formiga caminhando pelas linhas externas do retângulo. O caminho completo é o perímetro.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 6 e 7 — Área vs Perímetro",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Para encontrar o perímetro de qualquer figura com lados retos, a regra é uma só: SOMAR TODOS OS LADOS.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se o canteiro mede 4 metros por 2 metros, o perímetro será 4 + 2 + 4 + 2 = 12 metros de fita.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-perimeter"
          }
        },
        {
          "id": "u3-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Sabendo dessa diferença crucial, resolva o problema da área vs perímetro.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Num espaço com forma de retângulo medindo 6m × 3m, a área é de:",
            "options": [
              "18 m",
              "9 m²",
              "18 m²",
              "12 m²"
            ],
            "correctIndex": 2,
            "explanationOnSuccess": "Correto! 6 × 3 = 18 m². A unidade m² confirma que é área.",
            "explanationOnError": "Multiplique as duas medidas e escolha a alternativa com m².",
            "hint": "6 x 3 e olhe a unidade de área."
          }
        },
        {
          "id": "u3-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Agora que cercamos o local, como decidimos qual tarefa vem primeiro? Sorteio!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u3-a1-intro",
          "type": "dialogue",
          "title": "Atividade 8 e 9 — Combinando dois dados",
          "content": "O gari senta no banco e tira dois dados do bolso.",
          "mascotTip": "Vamos lançar dois dados para decidir a ordem das tarefas da equipe. Quantas combinações podemos ter?"
        },
        {
          "id": "u3-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "O dado 1 tem 6 opções. O dado 2 também tem 6 opções. O total de combinações é 6 × 6 = 36.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 8 e 9 — Combinando dois dados",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "A probabilidade compara o que queremos (Casos Favoráveis) com o total. Se queremos duas faces iguais (1,1; 2,2...), temos 6 casos favoráveis.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "A probabilidade se escreve como Casos Favoráveis / Total de Casos. 6 chances em 36 = 6/36.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-prob"
          }
        },
        {
          "id": "u3-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Determine a probabilidade observando a explicação.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Observando os dados, a probabilidade de cair com números iguais (duplas) é de:",
            "options": [
              "6/36 ou 1/6",
              "12/36 ou 1/3",
              "1/36",
              "6/6"
            ],
            "correctIndex": 0,
            "explanationOnSuccess": "Brilhante! Você percebeu que as 6 duplas representam 6 casos favoráveis num total de 36.",
            "explanationOnError": "O total é 36. As duplas são 6 casos.",
            "hint": "6 casos em 36 possíveis."
          }
        },
        {
          "id": "u3-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Legal! O sorteio foi justo e o trabalho pode continuar.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c4",
      "trackId": "gari-mission",
      "number": 4,
      "title": "Capítulo 4: Eventos cotidianos e Coleta",
      "shortDesc": "Análise de objetos e roletas",
      "icon": "Recycle",
      "xpReward": 150,
      "steps": [
        {
          "id": "u4-a0-intro",
          "type": "dialogue",
          "title": "Atividade 18 — Roleta de tarefas",
          "content": "Para engajar os moradores, o gari instalou uma roleta de brindes e tarefas sustentáveis.",
          "mascotTip": "Olha a roleta! Quanto mais espaços uma tarefa tiver na roda, maior é a chance de ela sair no sorteio."
        },
        {
          "id": "u4-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Probabilidade visual: as fatias da roleta representam a chance diretamente.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 18 — Roleta de tarefas",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Não precisa de cálculo complexo. Se a cor azul domina a roleta (3 partes) e a amarela só tem 1 parte, a probabilidade do azul é o triplo.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se a roleta tem 4 fatias azuis e 1 vermelha, é muito mais provável sair azul.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-prob"
          }
        },
        {
          "id": "u4-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Gire a Roleta Interativa e veja a probabilidade em ação.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Se a roleta oferece 3 chances para varrer, 1 para lavar e 2 para pintar, qual tarefa o gari tem MAIOR probabilidade de fazer?",
            "options": [
              "Varrer",
              "Lavar",
              "Pintar",
              "Nenhuma, é tudo igual"
            ],
            "correctIndex": 0,
            "explanationOnSuccess": "Isso! \"Varrer\" tem mais chances porque domina os espaços da roleta.",
            "explanationOnError": "A opção com o maior número de chances é a mais provável.",
            "hint": "O número 3 é maior que 1 e 2."
          },
          "gariInteraction": {
            "type": "roulette",
            "data": {}
          }
        },
        {
          "id": "u4-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Você aprendeu probabilidade só olhando a roleta! E os materiais recicláveis?",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u4-a1-intro",
          "type": "dialogue",
          "title": "Atividade 19 e 20 — Sacola de Recicláveis",
          "content": "O gari mostra uma sacola cheia de materiais que os moradores entregaram: garrafas de plástico, vidro e papel.",
          "mascotTip": "Vou retirar um material aleatoriamente. Qual é a chance de eu puxar um plástico?"
        },
        {
          "id": "u4-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "A contagem é simples: conte os plásticos (casos favoráveis) e divida pelo total de itens na sacola (casos possíveis).",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 19 e 20 — Sacola de Recicláveis",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Sempre que a pergunta for \"Por que é mais provável?\", a resposta será baseada na quantidade. Maior quantidade significa maior probabilidade.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se há 5 plásticos em 20 itens, a chance é 5 em 20.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-prob"
          }
        },
        {
          "id": "u4-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Sabendo que há 5 plásticos, 3 papéis e 2 vidros na sacola, determine a probabilidade.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "writtenPrompt": {
            "question": "Explique por que é mais provável o gari puxar um plástico do que um vidro dessa sacola.",
            "linesNeeded": 2,
            "suggestedAnswer": "Porque tem 5 plásticos e apenas 2 vidros. Como tem mais plástico, a chance de pegar ele é maior.",
            "guideline": "Foque em qual material tem a maior quantidade."
          }
        },
        {
          "id": "u4-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Você é um ótimo assistente. Vamos registrar esses dados.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c5",
      "trackId": "gari-mission",
      "number": 5,
      "title": "Capítulo 5: Frações e toneladas",
      "shortDesc": "Matemática e meio ambiente",
      "icon": "PieChart",
      "xpReward": 150,
      "steps": [
        {
          "id": "u5-a0-intro",
          "type": "dialogue",
          "title": "Atividade 24 — As Frações na pausa para a pizza",
          "content": "Durante uma pausa, a equipe de limpeza dividiu uma pizza em 10 fatias. Sobrou 1.",
          "mascotTip": "O que sobra também é importante registrar, ainda mais quando falamos de resíduos orgânicos e frações!"
        },
        {
          "id": "u5-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Uma pizza dividida em 10 partes tem o denominador 10. A fatia que sobrou é 1 parte de 10.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 24 — As Frações na pausa para a pizza",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Podemos escrever isso de duas formas: Fração (1/10) ou Número Decimal (0,1). Ambas significam \"um décimo\" do total.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "2 fatias de 10 seriam 2/10 ou 0,2.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-area"
          }
        },
        {
          "id": "u5-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Selecione a representação correta dessa sobra.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Se sobrou 1 fatia de uma pizza cortada em 10, qual é a fração e sua representação em decimal?",
            "options": [
              "1/1 e 1,0",
              "1/10 e 0,1",
              "10/10 e 1,0",
              "10/1 e 10,0"
            ],
            "correctIndex": 1,
            "explanationOnSuccess": "Brilhante! 1 sobre 10 é igual a 0,1 décimos.",
            "explanationOnError": "Lembre-se: o total (10) vai embaixo na fração. 1/10 equivale a 0,1.",
            "hint": "O total de fatias fica no denominador."
          }
        },
        {
          "id": "u5-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Pizza de lado, vamos para pesos pesados e levinhos.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u5-a1-intro",
          "type": "dialogue",
          "title": "Atividade 25, 26 e 27 — Gramas e Toneladas",
          "content": "O gari exibe um gráfico anual de garrafas PET do Brasil (em toneladas) e depois aponta para uma formiga na calçada.",
          "mascotTip": "No nosso trabalho medimos de tudo! O lixo pesado da cidade e a vida minúscula das calçadas."
        },
        {
          "id": "u5-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "A unidade deve combinar com o peso. Usamos miligrama (mg) para coisas microscópicas, grama (g) para objetos leves, quilo (kg) para lixo comum e Tonelada (t) para muito peso.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 25, 26 e 27 — Gramas e Toneladas",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "A Tonelada equivale a 1.000 quilos. É a unidade usada para medir a carga do caminhão de lixo inteiro!",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Para transformar 3 toneladas em kg, fazemos 3 × 1.000 = 3.000 kg.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-perimeter"
          }
        },
        {
          "id": "u5-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Assinale a unidade certa para cada objeto.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "dragAndDrop": {
            "title": "Cada peso em seu lugar",
            "instruction": "Arraste a medida correta para o objeto certo.",
            "items": [
              {
                "id": "i1",
                "content": "Peso de uma Formiga"
              },
              {
                "id": "i2",
                "content": "Peso da Coleta de PET (Caminhão Inteiro)"
              }
            ],
            "categories": [
              {
                "id": "c1",
                "title": "Medido em Miligramas (mg)"
              },
              {
                "id": "c2",
                "title": "Medido em Toneladas (t)"
              }
            ],
            "correctMapping": {
              "i1": "c1",
              "i2": "c2"
            },
            "successMessage": "Incrível! Você compreendeu as diferentes escalas de peso."
          }
        },
        {
          "id": "u5-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Ótimo trabalho! O sol está se pondo, vamos voltar para a base para os desafios finais.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c6",
      "trackId": "gari-mission",
      "number": 6,
      "title": "Capítulo 6: Raciocínio Lógico e Padrões",
      "shortDesc": "Desafios Finais",
      "icon": "Award",
      "xpReward": 150,
      "steps": [
        {
          "id": "u6-a0-intro",
          "type": "dialogue",
          "title": "Atividade 28 — O Padrão das Placas",
          "content": "No caminho de volta, vocês reparam que as placas \"Separar, Reduzir, Reutilizar e Reciclar\" se repetem nos postes.",
          "mascotTip": "Veja, é um ciclo de 4 placas que se repete a rua toda! Você consegue descobrir qual será a 27ª placa lá no fim da avenida?"
        },
        {
          "id": "u6-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Quando uma sequência se repete infinitamente, usamos a divisão para descobrir qualquer posição.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 28 — O Padrão das Placas",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Divida a posição que você quer (27) pelo tamanho do ciclo (4 placas). O resto da divisão indica a resposta exata!",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se fossem só 3 placas e eu quisesse a 5ª, faria 5÷3, resto 2. Então é a placa nº 2!",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-path"
          }
        },
        {
          "id": "u6-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "O ciclo é de 4. A posição procurada é a 27ª.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Dividindo 27 por 4, qual é o resto e qual figura isso representa?",
            "options": [
              "Resto 1 (Separar)",
              "Resto 2 (Reduzir)",
              "Resto 3 (Reutilizar)",
              "Resto 0 (Reciclar)"
            ],
            "correctIndex": 2,
            "explanationOnSuccess": "Mestre da divisão! 27 dividido por 4 dá 6 blocos inteiros, sobrando 3. A placa é Reutilizar.",
            "explanationOnError": "Faça a conta: 4 × 6 = 24. Faltam quantos para chegar no 27? Esse é o resto.",
            "hint": "A tabuada do 4 passa pelo 24. A diferença de 27 para 24 é o resto."
          }
        },
        {
          "id": "u6-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "A mente está afiada! Última tarefa do dia no galpão.",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        },
        {
          "id": "u6-a1-intro",
          "type": "dialogue",
          "title": "Atividade 29 — Laboratório 3D do Gari",
          "content": "Dentro do galpão da base, o gari brinca com blocos conectores para bolar a arrumação das caixas grandes.",
          "mascotTip": "Eu tenho blocos formados por 2 cubos grudados cada um. Não posso cortá-los. Qual estrutura é impossível montar se eu tiver 4 blocos?"
        },
        {
          "id": "u6-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Você não pode montar estruturas que tenham espaços ímpares pendurados ou pontas sozinhas se suas peças originais são \"gêmeas\" (grudadas de 2 em 2).",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 29 — Laboratório 3D do Gari",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "O raciocínio espacial permite visualizar que peças inquebráveis de tamanho PAR não conseguem formar volumes de tamanho ÍMPAR sem sobras.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Uma torre de 3 cubinhos é impossível de fazer usando bloquinhos de 2.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-area"
          }
        },
        {
          "id": "u6-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Interaja com os blocos no Laboratório 3D para entender o espaço.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "gariInteraction": {
            "type": "cubes",
            "data": {
              "count": 8
            }
          },
          "writtenPrompt": {
            "question": "Explique por que uma escada com degraus de tamanho \"1 cubo\" não pode ser construída se o gari só tem blocos rígidos de \"2 cubos\".",
            "linesNeeded": 2,
            "suggestedAnswer": "Porque o bloco não pode ser partido. Onde precisa só de 1 cubo, o bloco de 2 cubos não encaixa ou vai sobrar uma ponta flutuando.",
            "guideline": "Mencione que a peça é de tamanho par e não pode ser cortada."
          }
        },
        {
          "id": "u6-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "O galpão está organizado. É hora de fechar o expediente!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    },
    {
      "id": "gari-c7",
      "trackId": "gari-mission",
      "number": 7,
      "title": "Capítulo 7: O Grande Resumo do Expediente",
      "shortDesc": "Fim do dia",
      "icon": "Star",
      "xpReward": 150,
      "steps": [
        {
          "id": "u7-a0-intro",
          "type": "dialogue",
          "title": "O Fim do Expediente",
          "content": "O gari e o aluno sentam no banco da base de limpeza. A cidade está organizada, as ruas medidas e o lixo pesado devidamente convertido em toneladas e probabilidades.",
          "mascotTip": "Terminamos! Hoje você ajudou a planejar uma rota, mediu distâncias com a régua, calculou áreas, analisou as roletas, leu gráficos enormes e reconheceu padrões nas placas."
        },
        {
          "id": "u7-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "A matemática não serve só para resolver continhas em um papel. Ela serve para o nosso dia a dia, desde como organizar as ruas de uma cidade inteira, até calcular a logística pesada que um gari faz.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "O Fim do Expediente",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Cada atividade que fizemos hoje é um pedaço real da logística urbana que mantém a cidade funcionando. A geometria (área/perímetro), a estatística (probabilidade) e a matemática básica (medidas/frações) são as ferramentas silenciosas de uma cidade limpa.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Lembre-se: cuidar da cidade é responsabilidade de todos nós, e a matemática é nossa maior ferramenta!",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-path"
          }
        },
        {
          "id": "u7-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Reflita sobre o que vivemos hoje. Missão Concluída!",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Qual dessas afirmações melhor resume o que você aprendeu com o gari hoje?",
            "options": [
              "A matemática é feita de atividades chatas e sem sentido prático.",
              "O trabalho do gari é apenas varrer a rua.",
              "O trabalho do gari envolve muito planejamento, áreas, unidades de medida e a matemática é essencial para a limpeza e organização da cidade.",
              "Probabilidade e gráfico só servem para brincadeiras de escola."
            ],
            "correctIndex": 2,
            "explanationOnSuccess": "Parabéns! Você captou a essência do nosso projeto. O Gari é um especialista urbano e a matemática mora nas ruas.",
            "explanationOnError": "Tente pensar em como o Gari usou as contas hoje. Não foi só para a escola, foi para trabalhar.",
            "hint": "O foco principal dessa trilha foi valorizar a matemática no trabalho real."
          }
        },
        {
          "id": "u7-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Expediente encerrado. Você ganhou a medalha \"Especialista em Logística Urbana\"!",
          "mascotTip": "Isso aí! Vamos avançar para o próximo desafio do dia."
        }
      ]
    }
  ]
};

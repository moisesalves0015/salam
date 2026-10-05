import { Track } from '../../types';

export const trackGari: Track = {
  "id": "gari-mission",
  "subjectId": "matematica",
  "number": 8,
  "title": "Um dia no trabalho com um gari",
  "description": "Uma jornada interativa completa baseada no PDF de Área e Perímetro, acompanhando um gari homem em seu dia a dia urbano.",
  "objective": "Aprender, na prática, como medir áreas e perímetros, calcular probabilidade e reconhecer padrões no trabalho essencial do gari.",
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
                "text": "Para descrever um caminho perfeitamente, precisamos de duas coisas: a DIREÇÃO (direita, esquerda, cima, baixo) e a QUANTIDADE (quantas quadras andamos). Não adianta dizer \"vá para a direita\" sem dizer por quantos quarteirões!",
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
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
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
          "content": "Estimar é o ato de prever uma medida baseando-se no que já conhecemos. Não é chutar! É olhar e comparar. Por exemplo, se sei que meu passo tem quase 1 metro, e dei 10 passos, estimo que o muro tenha 10 metros.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 2 — Estimar e medir",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Depois da estimativa, usamos a ferramenta real (régua, fita métrica, trena) para obter a MEDIDA EXATA. A diferença entre a sua estimativa e a medida exata mostra o quão treinado está o seu \"olho matemático\".",
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
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
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
          "content": "A Área é a quantidade de superfície plana que existe DENTRO do contorno de uma figura. Se a gente quadricular a praça, calcular a área é o mesmo que contar quantos quadrados preenchem o chão.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 3 e 4 — O que é Área?",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "O mais fascinante é que figuras com formatos totalmente diferentes podem ter a mesma área. Uma quadra de esporte comprida e um pátio quadrado podem ter os mesmos 100 metros quadrados (m²) de área!",
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
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
        },
        {
          "id": "u2-a1-intro",
          "type": "dialogue",
          "title": "Atividade 6 e 7 — E o Perímetro?",
          "content": "Agora, o gari precisa isolar um pedaço da calçada com fita amarela e preta.",
          "mascotTip": "Mas espere! A área é o chão... e o contorno externo, como chamamos? Isso é o perímetro!"
        },
        {
          "id": "u2-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "O Perímetro é a medida apenas da borda. Imagine uma formiga caminhando pelas linhas externas do retângulo. O caminho completo que ela fizer até voltar ao início é o perímetro.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 6 e 7 — E o Perímetro?",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Para encontrar o perímetro de qualquer figura com lados retos, a regra é uma só: SOMAR TODOS OS LADOS. Num retângulo, você sempre terá 4 lados para somar (comprimento + largura + comprimento + largura).",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se o canteiro mede 4 metros por 2 metros, o perímetro será 4 + 2 + 4 + 2 = 12 metros de fita isolante necessários.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-perimeter"
          }
        },
        {
          "id": "u2-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Sabendo dessa diferença crucial, resolva o problema da área vs perímetro do nosso espaço 6x3.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Num retângulo com 6m de comprimento e 3m de largura, qual o valor correto da Área e por quê?",
            "options": [
              "18 m², porque Área = Comprimento × Largura",
              "18 m, porque o Perímetro = 6 + 3",
              "36 m², porque é o dobro de 18",
              "12 m, porque eu sumei os lados."
            ],
            "correctIndex": 0,
            "explanationOnSuccess": "Irretocável! Área multiplica (6x3), Perímetro soma os lados (6+3+6+3). E a unidade da área carrega o ² (m²)!",
            "explanationOnError": "Lembre-se da explicação: Área usa multiplicação (6 vezes 3) e o símbolo \"²\".",
            "hint": "A área é o recheio: 6 vezes 3."
          },
          "gariInteraction": {
            "type": "path-draw",
            "data": {
              "target": 12
            }
          }
        },
        {
          "id": "u2-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Você aprendeu os dois conceitos mais fortes da Geometria do dia a dia!",
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
        }
      ]
    },
    {
      "id": "gari-c3",
      "trackId": "gari-mission",
      "number": 3,
      "title": "Capítulo 3: Como Funciona a Probabilidade?",
      "shortDesc": "Eventos Aleatórios",
      "icon": "PlayCircle",
      "xpReward": 150,
      "steps": [
        {
          "id": "u3-a0-intro",
          "type": "dialogue",
          "title": "Atividade 8 — Compreendendo a Chance (Probabilidade)",
          "content": "Para engajar os moradores, a subprefeitura montou uma roleta gigante de prêmios ecológicos.",
          "mascotTip": "Muita gente acha que \"sorte\" não tem regra matemática. Mas tem sim! O nome disso é probabilidade."
        },
        {
          "id": "u3-a0-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "A probabilidade mede a \"chance\" matemática de algo acontecer. Nós calculamos isso contando os \"Casos que queremos\" e dividindo por \"Tudo que é possível\".",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 8 — Compreendendo a Chance (Probabilidade)",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "Pense numa sacola de doces. Se você tem 1 bala vermelha e 4 verdes, o total é 5. A chance de tirar uma vermelha de olhos vendados é apenas 1 em 5. A probabilidade nunca mente sobre quem está em maior quantidade!",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Se você jogar uma moeda (Cara ou Coroa), o total é 2. A chance de sair Cara é 1 em 2. Ou seja, metade das vezes!",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-prob"
          }
        },
        {
          "id": "u3-a0-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Gire a Roleta Interativa de Sorteios. A roleta tem 3 partes azuis (Varrer), 2 rosas (Pintar) e 1 amarela (Lavar).",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "quiz": {
            "question": "Ao girar a roleta descrita (3 azuis, 2 rosas, 1 amarela), qual a probabilidade matemática de cair no amarelo (Lavar)?",
            "options": [
              "1 chance em 6",
              "1 chance em 3",
              "3 chances em 6",
              "6 chances em 6"
            ],
            "correctIndex": 0,
            "explanationOnSuccess": "Exato! A fatia amarela é apenas 1. O total de fatias é 6. A chance é rigorosamente 1/6 (um sexto).",
            "explanationOnError": "Conte o total de fatias (3 + 2 + 1). Depois verifique quantas dessas fatias são amarelas.",
            "hint": "Amarela é apenas uma fatia no total de 6."
          },
          "gariInteraction": {
            "type": "roulette",
            "data": {}
          }
        },
        {
          "id": "u3-a0-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "O mais bacana da probabilidade é prever as tendências sem precisar advinhar.",
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
        },
        {
          "id": "u3-a1-intro",
          "type": "dialogue",
          "title": "Atividade 29 — Laboratório de Visão 3D e Cubos",
          "content": "Dentro do galpão da base, o gari brinca com blocos conectores, aqueles blocos parecidos com tijolinhos.",
          "mascotTip": "A matemática também estuda o espaço 3D (tridimensional). O cérebro precisa imaginar coisas escondidas."
        },
        {
          "id": "u3-a1-exp",
          "type": "explanation",
          "title": "Entendendo a Matemática",
          "content": "Quando construímos algo usando blocos duplos rígidos (peças formadas por 2 cubos colados, inquebráveis), somos obrigados a preencher o espaço em pares.",
          "conceptCard": {
            "title": "Conceito Fundamental",
            "subtitle": "Atividade 29 — Laboratório de Visão 3D e Cubos",
            "points": [
              {
                "label": "Como Funciona?",
                "text": "O raciocínio espacial permite que os arquitetos, engenheiros ou garis projetem como caixas caberão num caminhão. Se você tem apenas blocos de tamanho 2, nunca conseguirá construir algo que tenha espaços apertados tamanho 1 ou pontas flutuantes de 1 cubo.",
                "iconName": "BookOpen"
              },
              {
                "label": "Exemplo Prático",
                "text": "Uma torre alta pode ser feita empilhando os blocos de 2. Mas uma pirâmide fina de topo pontiagudo com 1 bloquinho solitário é impossível com essas peças.",
                "iconName": "Lightbulb"
              }
            ]
          },
          "gariInteraction": {
            "type": "demo-area"
          }
        },
        {
          "id": "u3-a1-practice",
          "type": "independent_exercise",
          "title": "Sua vez de agir!",
          "content": "Arraste o Visualizador 3D para entender como a rotação expõe faces ocultas do objeto. Depois justifique.",
          "mascotTip": "Agora é com você. Mostre o que aprendeu!",
          "gariInteraction": {
            "type": "cubes",
            "data": {
              "count": 8
            }
          },
          "writtenPrompt": {
            "question": "A partir do que o Gari ensinou sobre espaço, por que é importante visualizar os objetos 3D girando antes de guardar caixas num caminhão?",
            "linesNeeded": 2,
            "suggestedAnswer": "Porque caixas têm profundidade, e se não considerarmos todas as faces, a carga não vai se encaixar direito ou vai ficar com pontas penduradas.",
            "guideline": "Fale sobre como os blocos precisam se encaixar sem deixar \"buracos\" soltos de tamanho errado."
          }
        },
        {
          "id": "u3-a1-trans",
          "type": "dialogue",
          "title": "Bom trabalho!",
          "content": "Com a visão espacial treinada, nenhuma caixa ficará sobrando no galpão!",
          "mascotTip": "Isso aí! O aprendizado de hoje ajuda a construir uma cidade melhor."
        }
      ]
    }
  ]
};

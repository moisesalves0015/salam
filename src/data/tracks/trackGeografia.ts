import { Track } from '../../types.ts';

export const trackGeografia: Track = {
  id: 'trilha-geo-1',
  subjectId: 'geografia',
  number: 1,
  title: 'Paisagem, Território e Mapas do Cotidiano',
  description: 'Aprenda a decifrar paisagens naturais e transformadas, usar a rosa dos ventos e ler mapas com legendas e símbolos.',
  objective: 'Reconhecer os elementos naturais e culturais das paisagens, localizar pontos no espaço com os pontos cardeais e interpretar representações cartográficas.',
  bnccSkills: [
    'EF04GE01: Selecionar, em fontes orais e textuais, elementos da cultura de comunidades do campo e da cidade.',
    'EF04GE09: Utilizar direções cardeais na localização de componentes físicos e humanos na paisagem rural e urbana.',
    'EF04GE10: Comparar tipos variados de mapas, identificando suas características, elaboradores, finalidades e símbolos cartográficos.'
  ],
  color: 'indigo',
  badgeName: 'Cartógrafo Explorador',
  badgeIcon: 'MapPin',
  units: [
    {
      id: 't-geo-u1',
      trackId: 'trilha-geo-1',
      number: 1,
      title: 'Paisagem Natural vs Paisagem Cultural',
      shortDesc: 'A natureza criou ou o ser humano construiu?',
      icon: 'Trees',
      xpReward: 35,
      steps: [
        {
          id: 'geo-u1-s1',
          type: 'objective',
          title: 'O Que os Nossos Olhos Veem',
          content: 'Paisagem é tudo aquilo que a nossa vista alcança em um determinado lugar. Sons, cheiros e construções também fazem parte do que sentimos!',
          mascotTip: 'Teco convida: Olhe pela sua janela agora. Você vê mais árvores e morros, ou mais casas, postes e asfalto?'
        },
        {
          id: 'geo-u1-s2',
          type: 'explanation',
          title: 'Dois Tipos de Paisagem',
          content: '• Paisagem Natural: Formada exclusivamente por elementos da natureza, sem modificação humana (rios selvagens, matas virgens, dunas de areia, montanhas de rocha).\n• Paisagem Cultural (Humanizada/Modificada): O ser humano transformou o espaço construindo casas, pontes, plantações, fábricas e rodovias para suas necessidades.',
          conceptCard: {
            title: 'Elementos da Paisagem',
            subtitle: 'Como diferenciar a ação humana dos elementos originais',
            points: [
              { label: 'Elemento Natural', text: 'Rios, cachoeiras, relevo montanhoso, vegetação nativa.', iconEmoji: '🏞️' },
              { label: 'Elemento Cultural', text: 'Prédios, ruas asfaltadas, viadutos, postes de energia.', iconEmoji: '🏙️' },
              { label: 'Paisagem Rural', text: 'Mescla elementos culturais (lavouras, cercas) com ampla área verde.', iconEmoji: '🚜' }
            ]
          }
        },
        {
          id: 'geo-u1-s3',
          type: 'guided_practice',
          title: 'Prática: Identificando a Paisagem',
          content: 'Analise a descrição a seguir: "Uma avenida movimentada com prédios altos espelhados, semáforos piscando e carros em fila".',
          quiz: {
            question: 'Que tipo de paisagem essa descrição representa com clareza?',
            options: [
              'Paisagem Natural Intocada.',
              'Paisagem Cultural Urbana (intensamente transformada pelo ser humano).',
              'Uma floresta equatorial virgem.',
              'Um deserto polar sem presença humana.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Exatamente! Prédios, asfalto, semáforos e trânsito são elementos construídos pela sociedade, caracterizando a paisagem cultural urbana.',
            explanationOnError: 'Pense em quem construiu os prédios e a avenida asfaltada: foram os seres humanos!',
            hint: 'A presença de prédios e trânsito indica a ação do ser humano.'
          }
        }
      ]
    },
    {
      id: 't-geo-u2',
      trackId: 'trilha-geo-1',
      number: 2,
      title: 'Rosa dos Ventos e Leitura de Mapas',
      shortDesc: 'Norte, Sul, Leste, Oeste e como decifrar a legenda de um mapa!',
      icon: 'Compass',
      xpReward: 40,
      steps: [
        {
          id: 'geo-u2-s1',
          type: 'objective',
          title: 'Como Não Se Perder no Mundo',
          content: 'Para navegar pelos oceanos, viajar por estradas ou explorar florestas, a humanidade inventou os PONTOS CARDEAIS e as representações chamadas MAPAS!',
          mascotTip: 'Dica do Sol: Abra os braços! Aponte o braço direito para onde o Sol nasce (Leste - L). À sua esquerda fica o Oeste (O). À sua frente está o Norte (N) e às suas costas o Sul (S)!'
        },
        {
          id: 'geo-u2-s2',
          type: 'explanation',
          title: 'Os Quatro Pontos Cardeais e a Legenda',
          content: '• Norte (N): Em direção ao Polo Norte da Terra.\n• Sul (S): Direção oposta, Polo Sul.\n• Leste (L): Onde o Sol nasce pela manhã.\n• Oeste (O): Onde o Sol se põe no entardecer.\n\nE nos mapas, a LEGENDA é o dicionário de símbolos: um aviãozinho significa aeroporto, uma linha azul indica rio e uma casinha com cruz indica hospital!',
          conceptCard: {
            title: 'Anatomia de um Bom Mapa',
            subtitle: 'Elementos que todo mapa deve ter',
            points: [
              { label: 'Título', text: 'Informa do que trata o mapa (Ex: "Mapa do Bairro").' },
              { label: 'Rosa dos Ventos', text: 'Indica para onde fica o Norte, Sul, Leste e Oeste.' },
              { label: 'Legenda', text: 'Explica o significado das cores, linhas e desenhos.' },
              { label: 'Escala', text: 'Mostra quantas vezes a realidade foi reduzida no papel.' }
            ]
          }
        },
        {
          id: 'geo-u2-s3',
          type: 'independent_exercise',
          title: 'Exercício: Localização com a Rosa dos Ventos',
          content: 'Imagine que na praça central da sua cidade, a escola fica exatamente na direção onde o Sol nasce pela manhã.',
          quiz: {
            question: 'Em relação ao centro da praça, em qual ponto cardeal a escola está localizada?',
            options: [
              'Ao Sul (S).',
              'Ao Leste (L), pois é a direção do nascer do Sol.',
              'Ao Oeste (O), pois é onde a noite começa.',
              'Ao Polo Norte congelado.'
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Corretíssimo! O Leste (ou Oriente) é a direção astronômica em que avistamos o Sol nascer todas as manhãs na Terra!',
            explanationOnError: 'Lembre-se da regra de ouro: o Sol sempre aparece pela manhã no LESTE (L) e se põe no OESTE (O).',
            hint: 'Onde o Sol nasce é sempre o Leste.'
          }
        }
      ]
    }
  ],
  trackChallenge: {
    id: 'desafio-geo-1',
    title: 'A Expedição ao Tesouro da Ilha do Farol',
    description: 'Use a rosa dos ventos e decifre os símbolos do mapa para conduzir a expedição com segurança!',
    xpReward: 80,
    steps: [
      {
        id: 'desafio-geo-s1',
        type: 'objective',
        title: 'Desafio do Navegador Cartógrafo',
        content: 'Você recebeu o mapa de uma ilha desconhecida. No centro da ilha há um vilarejo. O farol fica ao NORTE do vilarejo, a praia dos corais fica a LESTE, a montanha rochosa fica ao OESTE e o cais dos pescadores fica ao SUL.'
      },
      {
        id: 'desafio-geo-s2',
        type: 'final_challenge',
        title: 'Traçando a Rota Segura',
        content: 'Se um barco acabou de atracar no cais dos pescadores (ao SUL) e precisa levar suprimentos para o farol, em qual direção principal ele deve navegar atravessando a ilha em linha reta?',
        quiz: {
          question: 'Para ir do SUL até o farol no topo da ilha, o barco/caminhão deve seguir rumo ao:',
          options: [
            'Leste (onde o Sol nasce).',
            'Norte (N), subindo diretamente em sentido oposto ao Sul.',
            'Oeste (onde o Sol se põe).',
            'Para trás em direção ao oceano aberto.'
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Perfeito, Navegador! O Norte é exatamente a direção oposta ao Sul na rosa dos ventos!',
          explanationOnError: 'Olhe a rosa dos ventos: quem está no Sul precisa caminhar para o NORTE para atravessar até o ponto superior da ilha.',
          hint: 'O oposto do Sul é o Norte.'
        }
      }
    ]
  }
};

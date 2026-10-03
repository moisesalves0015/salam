import { Track } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════
// Trilha 7 — Um Dia com o Eraldo: Números Decimais no Cotidiano
// Personagem: Eraldo — camelô jovem, esperto, que usa a matemática todo dia
// nas ruas para não perder dinheiro e ganhar a confiança dos clientes.
//
// REGRA NARRATIVA: Eraldo encontra problema → conversa → pede ajuda →
//   estudante aprende → aplica → recebe retorno → Eraldo reage → história avança
//
// DESIGN DE ALTERNATIVAS: SEM símbolo ✓ no texto das alternativas.
//   A resposta correta é determinada apenas por correctIndex.
//
// Habilidades BNCC cobertas:
//   EF04MA12 · EF04MA13 · EF04MA14 · EF04MA15 (Números Decimais – 4º Ano)
// ═══════════════════════════════════════════════════════════════════════════

export const trackMatDecimais: Track = {
  id: 'trilha-mat-7',
  subjectId: 'matematica',
  number: 7,
  title: 'Um Dia com o Eraldo',
  description: 'Ajude Eraldo, o camelô mais matemático da rua, a representar decimais, localizar preços na reta numérica, calcular lucros e fazer troco sem errar!',
  objective: 'Compreender números decimais (décimos e centésimos) como partes de um todo, representá-los na reta numérica, operar com adição/subtração e relacioná-los ao sistema monetário.',
  bnccSkills: [
    'EF04MA12 – Reconhecer que as regras do sistema de numeração decimal podem ser estendidas para a representação decimal de um número racional.',
    'EF04MA13 – Reconhecer o número decimal como parte de um todo.',
    'EF04MA14 – Localizar números decimais (até centésimos) na reta numérica.',
    'EF04MA15 – Relacionar décimos e centésimos com a representação do sistema monetário brasileiro.',
  ],
  color: 'emerald',
  badgeName: 'Sócio Oficial do Eraldo',
  badgeIcon: 'ShoppingBag',

  units: [

    // ── FASE 1: A Caixa de Doces na Rua ─────────────────────────────────────
    {
      id: 'tmd-u1',
      trackId: 'trilha-mat-7',
      number: 1,
      title: 'A Caixa de Doces na Rua',
      shortDesc: 'Eraldo estreia sua caixa de 10 espaços e precisa escrever o decimal certo na etiqueta.',
      icon: 'Package',
      xpReward: 50,
      steps: [

        // ── 1. Situação: Eraldo chega com a caixa nova ──────────────────────
        {
          id: 'tmd-u1-s1',
          type: 'objective',
          title: 'Eraldo estreia a caixa nova!',
          content: 'Eraldo acabou de chegar na calçada com uma caixa de doces completamente nova. Ela tem 10 espaços iguais e ele já colocou 2 balas de morango dentro.\n\nO problema: o sistema do mercado pede que a etiqueta de estoque mostre um número com vírgula — e Eraldo nunca aprendeu a escrever assim. Sem a etiqueta certa, ele não consegue registrar a mercadoria.',
          mascotTip: 'Parceiro, chegou a hora! Olha minha caixa aqui: 10 espaços e eu preenchi 2. O sistema pede um número com vírgula na etiqueta. Me ajuda a descobrir qual número escrever?',
        },

        // ── 1.5 Transição: Por que a vírgula existe? ──────────────────────
        {
          id: 'tmd-u1-s1b',
          type: 'dialogue',
          title: 'A vírgula não é bicho-papão!',
          content: 'Antes de preencher a etiqueta, vamos entender por que a vírgula aparece nessa situação.\n\nEraldo tem 1 caixa com 10 espaços iguais. Quando preenchemos apenas uma parte desses espaços, não chegamos a 1 inteiro. Precisamos de um número que represente uma parte — e é exatamente isso que o número decimal faz.\n\nA vírgula separa a parte inteira (caixas completas) da parte decimal (pedaços de uma caixa).',
          mascotTip: 'Boa sacada! Não tenho caixa cheia — tenho só parte de uma. É como fatiar um pão: a vírgula separa as fatias dos pães inteiros.',
        },

        // ── 2. Explicação: De Fração para Decimal ───────────────────────────
        {
          id: 'tmd-u1-s2',
          type: 'explanation',
          title: 'De Fração para Decimal: a lógica da caixa',
          content: 'Cada espaço da caixa é 1 parte de 10 partes iguais — ou seja, um DÉCIMO.',
          conceptCard: {
            title: 'A Caixa do Eraldo = 10 partes iguais',
            subtitle: 'Cada espaço = 1 décimo = 0,1',
            points: [
              {
                label: '2 espaços preenchidos',
                text: '2 de 10 partes ocupadas\nEscrevemos como fração: 2/10\nEscrevemos como decimal: 0,2',
                iconName: 'Package',
              },
              {
                label: 'O que a vírgula separa?',
                text: 'Antes da vírgula → parte INTEIRA (caixas completas)\nDepois da vírgula → parte DECIMAL (pedaços da caixa)\n\n0,2 se lê: "zero inteiros e dois décimos"',
                iconName: 'BarChart',
              },
              {
                label: 'A regra do denominador',
                text: 'Quando o denominador é 10, usamos 1 casa decimal:\n\n2/10 = 0,2\n7/10 = 0,7\n5/10 = 0,5\n\nO número de zeros do denominador diz quantas casas usar!',
                iconName: 'Sparkles',
              },
              {
                label: 'Cuidado com essa troca!',
                text: '2,0 significa DUAS CAIXAS INTEIRAS cheias.\n0,2 significa DOIS DÉCIMOS de uma caixa.\n\nEraldo só tem uma caixa. O número que ele precisa começa com zero antes da vírgula!',
                iconName: 'AlertTriangle',
              },
            ],
          },
          mafsVisualization: { type: 'grid-10', value: 2 },
        },

        // ── 3. Prática Guiada ────────────────────────────────────────────────
        {
          id: 'tmd-u1-s3',
          type: 'guided_practice',
          title: 'Qual número vai na etiqueta?',
          content: 'Eraldo preencheu 2 espaços de uma caixa com 10. Observe a caixa abaixo e escolha o número decimal que representa essa quantidade.',
          customVisual: { type: 'fraction-box-10', data: 2 },
          mascotTip: 'Olha a caixa: tenho 2 espaços com bala e 8 espaços vazios. A parte cheia é 2 de 10. Qual número com vírgula representa isso?',
          quiz: {
            question: 'Qual número decimal representa 2 espaços de 10 preenchidos?',
            options: [
              '2,0 — isso seria duas caixas inteiras',
              '0,2 — zero inteiros e dois décimos',
              '0,7 — sete décimos',
              '1,2 — um inteiro e dois décimos',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Isso mesmo! Você percebeu que a parte inteira é zero (a caixa não está cheia) e os 2 espaços representam 2 décimos. A etiqueta vai mostrar 0,2! Eraldo está aliviado.',
            explanationOnError: 'A caixa não está inteira, então a parte antes da vírgula é zero. Os 2 espaços ocupados representam 2 décimos. O número tem que começar com zero.',
            hint: 'Pergunta chave: a caixa está cheia? Não. Então a parte inteira é zero. Os 2 espaços cheios de 10 formam qual décimo?',
          },
        },

        // ── 3.5 Transição: O movimento aumentou ─────────────────────────────
        {
          id: 'tmd-u1-s3b',
          type: 'dialogue',
          title: 'Movimento na calçada!',
          content: 'A etiqueta ficou certinha e os primeiros clientes já chegaram! Eraldo vendeu algumas balas e a caixa agora está diferente. Antes de registrar o novo estoque, ele precisa analisar quanto ainda tem — e se está acima ou abaixo da metade.',
          mascotTip: 'Vendi três balas e coloquei mais cinco! Agora tenho sete espaços cheios. Mais da metade ou menos? Preciso saber pra decidir se peço mais estoque.',
        },

        // ── 4. Exercício Independente: Mais ou menos que a metade? ──────────
        {
          id: 'tmd-u1-s4',
          type: 'independent_exercise',
          title: 'A caixa com 7 espaços cheios',
          content: 'Eraldo agora tem 7 espaços preenchidos dos 10 disponíveis. Em decimal, isso é 0,7.\n\nA metade exata de 10 espaços seria 5 (que em decimal é 0,5).',
          customVisual: { type: 'fraction-box-10', data: 7 },
          mascotTip: 'Compara: metade da caixa são 5 espaços. Eu tenho 7. O que você acha — passei da metade?',
          quiz: {
            question: 'Com 7 de 10 espaços cheios (ou seja, 0,7 da caixa), o estoque está:',
            options: [
              'Abaixo da metade, porque 7 parece muito',
              'Exatamente na metade, porque 0,7 é um número médio',
              'Acima da metade, porque 7 é maior que 5',
              'Não é possível dizer sem um gráfico',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Você comparou os valores: 7 e 5. Como 7 é maior que 5, o estoque está acima da metade. Eraldo pode ficar tranquilo por agora! Você usou comparação numérica — isso é raciocínio matemático de verdade.',
            explanationOnError: 'A metade de 10 é 5. Agora compare: o estoque tem 7 espaços. 7 é maior ou menor que 5? Quando o número é maior que a metade, ele está acima dela.',
            hint: 'Calcule a metade de 10. Depois compare esse resultado com 7.',
          },
        },

        // ── 5. Desafio Final ─────────────────────────────────────────────────
        {
          id: 'tmd-u1-s5',
          type: 'final_challenge',
          title: 'Etiqueta registrada com sucesso!',
          content: 'Eraldo agora sabe exatamente como escrever cada quantidade da caixa na etiqueta. Nenhum cliente vai confundir mais!\n\nResumo do que você descobriu hoje:\n• 2 de 10 → 2/10 → 0,2 (dois décimos)\n• 7 de 10 → 7/10 → 0,7 (sete décimos)\n• 0,5 é a metade de um inteiro\n• 2,0 significa duas caixas cheias — bem diferente de 0,2!\n\nAmanhã o Eraldo vai precisar medir o pano da barraca. Quer continuar ajudando?',
          mascotTip: 'Valeu demais, parceiro! Agora a etiqueta está certinha. Você me salvou de uma confusão feia com o fornecedor. Amanhã tem mais!',
          writtenPrompt: {
            question: 'Complete com suas palavras: "Em 0,7, o número 7 representa _____ décimos de um inteiro, que é o mesmo que a fração _____."',
            linesNeeded: 2,
            suggestedAnswer: 'Em 0,7, o número 7 representa SETE décimos de um inteiro, que é o mesmo que a fração 7/10.',
            guideline: 'Use as palavras "décimos" e "fração" na resposta.',
          },
        },
      ],
    },

    // ── FASE 2: O Pano de Sol e a Fita Métrica ───────────────────────────────
    {
      id: 'tmd-u2',
      trackId: 'trilha-mat-7',
      number: 2,
      title: 'O Pano de Sol e a Fita Métrica',
      shortDesc: 'Eraldo mede o pano da barraca e localiza os preços na fita métrica.',
      icon: 'Ruler',
      xpReward: 55,
      steps: [

        // ── 1. Situação: Sol forte, pano rasgado ─────────────────────────────
        {
          id: 'tmd-u2-s1',
          type: 'objective',
          title: 'O sol de rachar chegou!',
          content: 'Com o sol forte da manhã, Eraldo precisou esticar o pano xadrez sobre a caixa para proteger os doces. O problema: o pano está rasgado numa parte e ele precisa comprar um retalho para consertar.\n\nPara não comprar tecido a mais nem a menos, Eraldo precisa saber o comprimento exato dos dois lados que estão rasgados. O pano é retangular, com contorno total de 12,40 m. Dois lados já foram medidos: cada um tem 2,90 m.',
          mascotTip: 'O pano tem contorno de 12,40 m. Os dois lados que eu medi somam 5,80 m. Quanto sobra para os outros dois? Sem esse número não sei quanto tecido comprar!',
        },

        // ── 2. Explicação: Subtração com decimais ───────────────────────────
        {
          id: 'tmd-u2-s2',
          type: 'explanation',
          title: 'Subtração com decimais: por que alinhar a vírgula?',
          content: 'Quando subtraímos números decimais, precisamos garantir que estamos tirando décimos de décimos e centésimos de centésimos — não misturando.',
          conceptCard: {
            title: 'Calculando os lados rasgados do pano',
            subtitle: 'A vírgula fica sempre embaixo da vírgula!',
            points: [
              {
                label: 'Passo 1 — Some os dois lados medidos',
                text: 'Dois lados de 2,90 m cada:\n2,90 + 2,90 = 5,80 m no total',
                iconName: 'Plus',
                customVisual: { type: 'vertical-math', data: { top: '2,90', bottom: '2,90', operator: '+', result: '5,80' } }
              },
              {
                label: 'Passo 2 — Subtraia do contorno total',
                text: 'O contorno todo é 12,40 m.\nTirando os 5,80 m que já conhecemos, sobram 6,60 m para os outros dois lados.',
                iconName: 'Minus',
                customVisual: { type: 'vertical-math', data: { top: '12,40', bottom: '5,80', operator: '−', result: '6,60' } }
              },
              {
                label: 'Passo 3 — Divida pelos dois lados',
                text: '6,60 m ÷ 2 = 3,30 m\n\nCada um dos lados rasgados mede 3,30 metros.',
                iconName: 'Ruler',
              },
              {
                label: 'Por que alinhar a vírgula?',
                text: 'Se não alinhamos, corremos o risco de somar décimos com inteiros.\n\nAlinhando a vírgula, somamos:\n• Centésimos com centésimos (coluna da direita)\n• Décimos com décimos (coluna do meio)\n• Inteiros com inteiros (coluna da esquerda)\n\nSe faltar uma casa, complete com zero: 5,8 → 5,80',
                iconName: 'CheckCircle',
              },
            ],
          },
        },

        // ── 2.5 Transição: Mãos à obra ──────────────────────────────────────
        {
          id: 'tmd-u2-s2b',
          type: 'dialogue',
          title: 'Hora de calcular!',
          content: 'O raciocínio foi claro. Agora é com você.\n\nEraldo está esperando o resultado para ir até a loja de tecidos antes de fechar. Se o número estiver errado, ele vai comprar material demais ou de menos — o que causa prejuízo.',
          mascotTip: 'Pode ir devagar. A conta é coluna por coluna, vírgula embaixo de vírgula. Eu confio em você!',
        },

        // ── 3. Prática Guiada: Quanto medem os lados? ───────────────────────
        {
          id: 'tmd-u2-s3',
          type: 'guided_practice',
          title: 'Quanto medem os lados rasgados?',
          content: 'Contorno total: 12,40 m\nDois lados medidos: 2,90 + 2,90 = 5,80 m\n\nQual é o comprimento total dos outros dois lados?',
          quiz: {
            question: 'Qual é o comprimento total dos dois lados rasgados do pano?',
            options: [
              '5,80 m — o mesmo que os outros dois',
              '9,50 m — erro na subtração',
              '6,60 m — o que resta do contorno',
              '3,30 m — já dividi pela metade',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Certíssimo! 12,40 − 5,80 = 6,60 m. Você alinhou a vírgula e fez a subtração coluna por coluna. Eraldo já pode correr até a loja de tecidos! Cada lado rasgado mede 3,30 m.',
            explanationOnError: 'Vamos por partes: temos 12,40 m no total. Dois lados somam 5,80 m. Tire 5,80 de 12,40 alinhando as vírgulas. Qual é o resultado?',
            hint: '12,40 − 5,80: subtrai os centésimos primeiro (0−0), depois os décimos (4−8, vai precisar emprestar do inteiro), depois os inteiros.',
          },
        },

        // ── 3.5 Transição: Da medição para a reta numérica ──────────────────
        {
          id: 'tmd-u2-s3b',
          type: 'dialogue',
          title: 'Pano resolvido! E agora os preços?',
          content: 'Compra do tecido garantida! Eraldo voltou da loja e agora vai organizar os preços dos produtos.\n\nEle quer esticar uma fita métrica no chão da calçada para montar uma linha de preços visual. Mas para isso, ele precisa saber exatamente onde cada valor fica dentro de um metro — usando a divisão em décimos.',
          mascotTip: 'Agora é diferente. Em vez de centímetros, vou usar a fita dividida em 10 partes para marcar os preços. Parece complicado? Você vai ver que não é!',
        },

        // ── 4. Exercício: Reta Numérica ──────────────────────────────────────
        {
          id: 'tmd-u2-s4',
          type: 'independent_exercise',
          title: 'Localizando decimais na fita métrica',
          content: 'Eraldo esticou 1 metro de fita e dividiu em 10 partes iguais. Cada tracinho representa 0,1 metro (um décimo).\n\nEle quer colocar a etiqueta de preço R$ 0,20 exatamente no lugar certo. Em metros, 0,20 é igual a 0,2.',
          conceptCard: {
            title: 'Reta Numérica de Décimos (de 0 a 1)',
            subtitle: 'Cada divisão = 0,1 = 1/10',
            points: [
              {
                label: 'Como encontrar 0,2?',
                text: 'O dígito depois da vírgula indica o tracinho.\n0,2 tem o dígito 2 após a vírgula → 2º tracinho.',
                iconName: 'MapPin',
              },
              {
                label: 'Como encontrar 0,5?',
                text: 'O dígito após a vírgula é 5 → 5º tracinho.\nO 5º tracinho é exatamente o meio da reta!',
                iconName: 'Scale',
              },
              {
                label: 'Como encontrar qualquer décimo?',
                text: 'Olhe o dígito que aparece depois da vírgula.\nEsse número é o tracinho que você procura!\n\n0,3 → 3º tracinho\n0,7 → 7º tracinho\n0,9 → 9º tracinho',
                iconName: 'Target',
              },
              {
                label: 'Atenção: décimos e centésimos!',
                text: 'O 0,2 fica no 2º tracinho de uma divisão em 10.\nO 0,02 precisaria de uma divisão em 100 — é bem menor!\n\n0,2 e 0,02 não ficam no mesmo lugar da reta.',
                iconName: 'Lightbulb',
              },
            ],
          },
          mafsVisualization: { type: 'number-line', value: [0.2, 0.5, 0.7] },
          quiz: {
            question: 'Na fita de 0 a 1 dividida em 10 partes, onde fica o número 0,2?',
            options: [
              'No vigésimo tracinho, porque 0,2 tem um 2',
              'No segundo tracinho, após o zero',
              'No meio da fita, junto com 0,5',
              'Logo antes do número 1',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Exato! 0,2 = 2 décimos = 2º tracinho. Você usou o dígito após a vírgula para encontrar a posição — essa é a estratégia correta. Eraldo colou a etiqueta no lugar certo!',
            explanationOnError: 'Olhe o dígito depois da vírgula em 0,2. Esse dígito é 2. Na fita dividida em 10, isso corresponde ao 2º tracinho após o zero.',
            hint: 'O dígito depois da vírgula em 0,2 é o número 2. Esse é o tracinho que você procura.',
          },
        },

        // ── 5. Desafio Final ─────────────────────────────────────────────────
        {
          id: 'tmd-u2-s5',
          type: 'final_challenge',
          title: 'Décimos e centésimos: o que muda?',
          content: 'Eraldo ficou curioso depois de dividir a fita em 10 partes. "E se eu dividir em 100 partes? Cada pedacinho vai ter qual nome?"\n\n1 metro ÷ 10 partes → cada parte = 0,1 → chamamos de DÉCIMO\n1 metro ÷ 100 partes → cada parte = 0,01 → chamamos de ___?',
          mascotTip: 'Pensa bem: décimo tem 1 zero, centímetro tem "cent" de cem. Faz sentido dar um nome parecido para a parte de 100?',
          quiz: {
            question: 'Cada um dos 100 pedaços iguais de 1 metro se chama:',
            options: [
              'Décimo — porque metade de 10 é 5',
              'Milésimo — 1 de 1.000 partes iguais',
              'Centésimo — 1 de 100 partes iguais',
              'Porcentagem — usado em promoções',
            ],
            correctIndex: 2,
            explanationOnSuccess: '1 ÷ 100 = 0,01 = um centésimo. Você conectou a palavra "cent" (100) com o conceito! Essa mesma lógica vai aparecer na próxima fase — com moedas e centavos.',
            explanationOnError: 'Décimo vem de 10, centésimo vem de 100. Se dividimos por 100, cada parte recebe o nome que vem de "cem". Qual das opções usa essa raiz?',
            hint: '"Cent" significa 100 em latim. Centímetro = 1 de 100 centímetros num metro. Centésimo = 1 de 100 partes iguais.',
          },
        },
      ],
    },

    // ── FASE 3: A Concorrência e os Preços ───────────────────────────────────
    {
      id: 'tmd-u3',
      trackId: 'trilha-mat-7',
      number: 3,
      title: 'A Concorrência e os Preços',
      shortDesc: 'O Zé do carrinho afirma que 0,02 é maior que 0,2. Eraldo precisa provar que está errado usando matemática!',
      icon: 'TrendingUp',
      xpReward: 60,
      steps: [

        // ── 1. Situação: A disputa dos descontos ─────────────────────────────
        {
          id: 'tmd-u3-s1',
          type: 'objective',
          title: 'O Zé criou confusão!',
          content: 'O Zé do carrinho é o concorrente de Eraldo na rua. Hoje de manhã, ele ficou gritando para os clientes:\n\n"Meu desconto é 0,02! O Eraldo dá só 0,2! O meu é maior!"\n\nOs clientes ficaram confusos. Eraldo sabe que o Zé está errado — 0,2 é muito maior que 0,02 — mas ele precisa PROVAR usando uma explicação visual. Do contrário, vai perder clientes.',
          mascotTip: 'Precisamos mostrar para as pessoas por que 0,2 é bem maior que 0,02. Só falar não adianta. Quero um desenho que mostre a diferença de um jeito que todo mundo entenda!',
        },

        // ── 1.5 Transição: A prova visual ───────────────────────────────────
        {
          id: 'tmd-u3-s1b',
          type: 'dialogue',
          title: 'A malha vai resolver tudo',
          content: 'Para mostrar a diferença de forma visual, vamos usar uma malha de 100 quadradinhos. Ela representa 1 inteiro completo.\n\nCada linha da malha tem 10 quadradinhos — que vale 0,1 (um décimo).\nCada quadradinho individual vale 0,01 (um centésimo).\n\nQuando pintar a quantidade de cada desconto nessa malha, a diferença vai ficar óbvia para qualquer cliente!',
          mascotTip: 'Malha de 100 quadradinhos na mão! Vou mostrar para o Zé e para todo mundo quanto cada desconto ocupa de fato.',
        },

        // ── 2. Explicação: Malha de centésimos ──────────────────────────────
        {
          id: 'tmd-u3-s2',
          type: 'explanation',
          title: 'A malha de 100: comparando 0,2 e 0,02',
          content: 'Na malha de 100 quadradinhos, cada linha inteira vale 0,1 (um décimo) e cada quadradinho individual vale 0,01 (um centésimo).',
          conceptCard: {
            title: 'A Malha dos 100 Quadradinhos',
            subtitle: 'Cada linha = 0,1 (décimo) | Cada quadradinho = 0,01 (centésimo)',
            points: [
              {
                label: '0,2 na malha',
                text: '0,2 = 0,20 = 20 centésimos\n\nPintamos 20 quadradinhos — duas linhas inteiras da malha.',
                iconName: 'Square',
              },
              {
                label: '0,02 na malha',
                text: '0,02 = 2 centésimos\n\nPintamos apenas 2 quadradinhos — uma fileirinha pequena.',
                iconName: 'Square',
              },
              {
                label: 'Comparação visual',
                text: '0,20 → 20 quadradinhos pintados\n0,02 → 2 quadradinhos pintados\n\n20 é dez vezes maior que 2!\nO desconto do Eraldo é DEZ VEZES maior que o do Zé.',
                iconName: 'Scale',
              },
              {
                label: 'Por que parece igual mas não é?',
                text: 'Os dois números usam o algarismo 2, mas em posições diferentes:\n\n0,2 → o 2 está na casa dos DÉCIMOS (÷10)\n0,02 → o 2 está na casa dos CENTÉSIMOS (÷100)\n\nA posição do algarismo determina o valor — igual ao sistema de numeração inteiro!',
                iconName: 'Lightbulb',
              },
            ],
          },
          mafsVisualization: { type: 'grid-100', value: 20 },
        },

        // ── 3. Prática Guiada: Quem tem o desconto maior? ───────────────────
        {
          id: 'tmd-u3-s3',
          type: 'guided_practice',
          title: 'Quem dá desconto maior?',
          content: 'Na malha de 100 quadradinhos:\n• Desconto do Eraldo: 0,20 → 20 quadradinhos pintados\n• Desconto do Zé: 0,02 → 2 quadradinhos pintados',
          quiz: {
            question: 'Comparando 0,20 e 0,02, quem dá o desconto maior?',
            options: [
              'O Zé, porque 0,02 tem mais zeros no número',
              'São iguais — os dois têm os algarismos 0 e 2',
              'O Eraldo, porque 0,20 equivale a 20 centésimos',
              'O Zé, porque números menores têm mais precisão',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Provado com a malha! Você converteu os dois para centésimos: 0,20 = 20 centésimos e 0,02 = 2 centésimos. Como 20 é maior que 2, o desconto do Eraldo vence. O Zé ficou sem argumento!',
            explanationOnError: 'Converta os dois para a mesma unidade: centésimos. 0,2 = 0,20 = 20 centésimos. 0,02 = 2 centésimos. Agora compare os números 20 e 2.',
            hint: 'Escreva os dois com 2 casas decimais: 0,20 e 0,02. Agora compare apenas os números após a vírgula: 20 ou 02, qual é maior?',
          },
        },

        // ── 3.5 Transição: Da malha para os preços da rua ───────────────────
        {
          id: 'tmd-u3-s3b',
          type: 'dialogue',
          title: 'A prova está feita!',
          content: 'Os clientes entenderam depois de ver a malha. O Zé ficou envergonhado e voltou para o carrinho dele.\n\nEraldo agradeceu muito, mas agora tem outro problema: ele quer comprar mais produtos para o estoque e notou que o mesmo brinquedo custa preços bem diferentes em três lojas diferentes da rua. Precisa saber qual a diferença entre o mais caro e o mais barato.',
          mascotTip: 'Conseguimos! Agora preciso de ajuda com outra coisa. Vou comprar Pega Vareta para revender, mas o preço varia bastante entre as lojas. Você me ajuda a calcular a diferença?',
        },

        // ── 4. Exercício: Comparando preços ─────────────────────────────────
        {
          id: 'tmd-u3-s4',
          type: 'independent_exercise',
          title: 'Diferença de preço entre as lojas',
          content: 'Eraldo pesquisou o preço do Pega Vareta em três lojas da rua. Qual a diferença de preço entre a mais cara e a mais barata?',
          customVisual: {
            type: 'price-table',
            data: [
              { store: 'Loja A', price: 'R$ 2,40', highlight: true },
              { store: 'Loja B', price: 'R$ 3,80' },
              { store: 'Loja C', price: 'R$ 5,00', highlight: true }
            ]
          },
          mascotTip: 'Para achar a diferença de preço, subtraímos o menor do maior — é a mesma lógica do troco! Qual é a loja mais cara e qual é a mais barata?',
          quiz: {
            question: 'Qual é a diferença de preço entre a Loja C (R$ 5,00) e a Loja A (R$ 2,40)?',
            options: [
              'R$ 7,40 — somei os dois preços em vez de subtrair',
              'R$ 3,40 — calculei coluna por coluna mas errei no empréstimo',
              'R$ 1,60 — confundi os números',
              'R$ 2,60 — resultado da subtração 5,00 − 2,40',
            ],
            correctIndex: 3,
            explanationOnSuccess: 'Boa! R$ 5,00 − R$ 2,40 = R$ 2,60. Você alinhou a vírgula e fez o empréstimo corretamente nos décimos. Quem comprar na Loja A economiza exatamente R$ 2,60 em relação à Loja C.',
            explanationOnError: 'Para achar a diferença, subtraímos o menor do maior. R$ 5,00 − R$ 2,40. Alinhe as vírgulas, subtraia os centésimos (0−0=0), depois os décimos (precisa emprestar!), depois os inteiros.',
            hint: '5,00 − 2,40: nos décimos, 0 é menor que 4, então você vai precisar emprestar 1 do inteiro. Tente assim: 10 décimos − 4 décimos.',
          },
        },

        // ── 5. Desafio Final ─────────────────────────────────────────────────
        {
          id: 'tmd-u3-s5',
          type: 'final_challenge',
          title: 'Eraldo saiu vencedor!',
          content: 'Com a malha de centésimos e a subtração de preços, você ajudou Eraldo a vencer o Zé na disputa e ainda economizou dinheiro na compra dos brinquedos!\n\nO que ficou claro hoje:\n• 0,2 = 0,20 = 20 centésimos\n• 0,02 = 2 centésimos\n• 0,20 > 0,02 (o desconto do Eraldo é 10 vezes maior)\n• Para achar diferença de preço, subtrai-se com vírgula alinhada\n\nNa próxima fase, Eraldo vai fazer as contas do dia na praça.',
          mascotTip: 'Que tarde de trabalho! Você provou que eu tinha razão e ainda me ajudou a encontrar o melhor preço. Amanhã tem mais desafio — o lucro das balas!',
          writtenPrompt: {
            question: 'Por que 0,2 é maior que 0,02? Escreva uma explicação usando a malha de 100 quadradinhos.',
            linesNeeded: 3,
            suggestedAnswer: '0,2 representa 20 quadradinhos pintados na malha de 100 (20 centésimos), enquanto 0,02 representa apenas 2 quadradinhos (2 centésimos). Como 20 é maior que 2, o número 0,2 é maior.',
            guideline: 'Use as palavras "centésimos" e "quadradinhos" na explicação.',
          },
        },
      ],
    },

    // ── FASE 4: O Encontro na Praça e o Lucro ───────────────────────────────
    {
      id: 'tmd-u4',
      trackId: 'trilha-mat-7',
      number: 4,
      title: 'O Encontro na Praça e o Lucro',
      shortDesc: 'Eraldo descansa na praça e depois fecha as contas do dia: lucro e centavos no sistema decimal.',
      icon: 'Coins',
      xpReward: 65,
      steps: [

        // ── 1. Situação: Pausa na praça ──────────────────────────────────────
        {
          id: 'tmd-u4-s1',
          type: 'objective',
          title: 'Pausa para o lanche!',
          content: 'Depois de uma manhã agitada, Eraldo parou na praça para comer. Ele encontrou Ana, uma estudante que sempre compra balas nele.\n\nAna compartilhou um chocolate que tinha. Ela comeu 0,3 (três décimos) do chocolate e deu os outros 0,7 (sete décimos) para Eraldo.\n\nDepois do lanche, Eraldo pegou o caderninho para fechar as contas: cada bala custa R$ 0,80 para ele comprar e ele vende por R$ 1,20. Quanto ele ganha de lucro em cada bala?',
          mascotTip: 'A Ana dividiu o chocolate e eu comi 0,7 dele — mais da metade! Agora preciso fechar as contas do dia. Quanto ganho de lucro por bala?',
        },

        // ── 1.5 Transição: Dinheiro é decimal! ──────────────────────────────
        {
          id: 'tmd-u4-s1b',
          type: 'dialogue',
          title: 'O dinheiro já é decimal!',
          content: 'Antes de calcular o lucro, tem uma descoberta importante:\n\nO sistema monetário brasileiro foi criado usando exatamente a mesma lógica decimal que estamos estudando!\n\nReais são a parte inteira. Centavos são a parte decimal. A vírgula separa os dois. Isso não é coincidência — foi uma escolha para facilitar as contas do comércio.',
          mascotTip: 'Sabe o que é demais? "Centavo" vem de "centésimo"! Eu trabalho com decimais todo dia sem saber! R$ 0,01 é um centésimo de real.',
        },

        // ── 2. Explicação: Dinheiro e decimais ──────────────────────────────
        {
          id: 'tmd-u4-s2',
          type: 'explanation',
          title: 'O Real Brasileiro é um número decimal',
          content: 'Cada valor em reais tem uma parte inteira (os reais) e uma parte decimal (os centavos). São os mesmos décimos e centésimos que já vimos!',
          conceptCard: {
            title: 'R$ Real Brasileiro = Sistema Decimal',
            subtitle: 'Reais = parte inteira | Centavos = parte decimal',
            points: [
              {
                label: '1 Real = 10 décimos = 100 centésimos',
                text: 'A vírgula separa:\n• Parte inteira (reais completos) → à esquerda\n• Parte decimal (centavos) → à direita\n\n"Centavo" vem de "centésimo" — não é coincidência!',
                iconName: 'Banknote',
              },
              {
                label: 'Décimos de real = R$ 0,10',
                text: 'R$ 0,10 = 1 décimo de real = 10 centavos\nR$ 0,20 = 2 décimos de real = 20 centavos\nR$ 0,50 = 5 décimos = metade do real\n\n10 moedas de R$0,10 = R$ 1,00 inteiro',
                iconName: 'Coins',
              },
              {
                label: 'Centésimos de real = R$ 0,01',
                text: 'R$ 0,01 = 1 centésimo = 1 centavo\nR$ 0,25 = 25 centésimos = 25 centavos\n\n100 moedas de R$0,01 = R$ 1,00 inteiro',
                iconName: 'CircleDot',
              },
              {
                label: 'Lucro = Venda − Custo',
                text: 'Eraldo vende por R$ 1,20.\nEraldo compra por R$ 0,80.\n\nAlinhe as vírgulas e calcule:',
                iconName: 'TrendingUp',
                customVisual: { type: 'vertical-math', data: { top: '1,20', bottom: '0,80', operator: '−', result: '???' } }
              },
            ],
          },
          mafsVisualization: {
            type: 'money-breakdown',
            value: 1
          }
        },

        // ── 3. Prática Guiada: Calculando o lucro ───────────────────────────
        {
          id: 'tmd-u4-s3',
          type: 'guided_practice',
          title: 'Qual é o lucro de Eraldo por bala?',
          content: 'Cada bala:\n• Custo (preço que paga): R$ 0,80\n• Venda (preço que cobra): R$ 1,20\n\nLucro = Preço de Venda − Custo',
          customVisual: { type: 'vertical-math', data: { top: '1,20', bottom: '0,80', operator: '−', result: '???' } },
          mascotTip: 'Alinha vírgula embaixo de vírgula e subtrai coluna por coluna. Começa pela direita!',
          quiz: {
            question: 'Qual é o lucro de Eraldo em cada bala vendida?',
            options: [
              'R$ 2,00 — somei os valores em vez de subtrair',
              'R$ 1,20 — esse é só o preço de venda',
              'R$ 0,80 — esse é só o custo',
              'R$ 0,40 — resultado da subtração 1,20 − 0,80',
            ],
            correctIndex: 3,
            explanationOnSuccess: 'R$ 1,20 − R$ 0,80 = R$ 0,40. Você percebeu que precisava emprestar nos décimos (2 − 8 não dá, então vira 12 − 8 = 4). Cada bala rende 40 centavos de lucro para o Eraldo.',
            explanationOnError: 'Lucro é Venda menos Custo. R$ 1,20 − R$ 0,80. Nos décimos: 2 − 8 não dá, então você precisa pegar emprestado do inteiro. Como funciona o empréstimo aí?',
            hint: 'R$ 1,20 − R$ 0,80: centésimos: 0−0=0; décimos: 2−8 não dá, peça emprestado — fica 12−8=4; inteiros: o 1 virou 0, então 0−0=0. Resultado: R$ 0,40.',
          },
        },

        // ── 4. Exercício: Convertendo centavos ──────────────────────────────
        {
          id: 'tmd-u4-s4',
          type: 'independent_exercise',
          title: 'Como se escreve 25 centavos?',
          content: 'Eraldo recebeu algumas moedas de 25 centavos e precisa anotar no caderninho usando notação decimal.\n\n25 centavos = 25 centésimos de 1 real\n\nR$ ___ , ___ ___',
          mascotTip: 'Centavo é centésimo. Então 25 centavos ocupam as 2 casas após a vírgula. A parte inteira (reais completos) é zero.',
          quiz: {
            question: 'Como se escreve 25 centavos em notação decimal com o símbolo R$?',
            options: [
              'R$ 25,00 — isso é vinte e cinco reais inteiros',
              'R$ 2,50 — dois reais e cinquenta centavos',
              'R$ 0,025 — casas decimais a mais',
              'R$ 0,25 — zero reais e vinte e cinco centavos',
            ],
            correctIndex: 3,
            explanationOnSuccess: 'R$ 0,25! Você colocou o 25 nas duas casas decimais (décimos e centésimos) e o zero antes da vírgula porque não há reais inteiros. A vírgula separou certo: 0 reais e 25 centavos.',
            explanationOnError: 'Centavos ocupam as 2 casas após a vírgula. 25 centavos → parte inteira é 0 (nenhum real completo), parte decimal é 25. Como você escreveria: R$ 0, _ _?',
            hint: 'Quantos centavos = 1 real inteiro? 100. Então 25 centavos = 25/100 do real. A parte inteira é zero.',
          },
        },

        // ── 5. Desafio Final ─────────────────────────────────────────────────
        {
          id: 'tmd-u4-s5',
          type: 'final_challenge',
          title: 'Caixa fechada com lucro!',
          content: 'Eraldo fechou as contas e ficou satisfeito. Agora ele sabe exatamente quanto ganha por bala e como escrever qualquer valor em reais usando decimais.\n\nO que ficou claro hoje:\n• R$ 1,00 = 10 décimos = 100 centésimos\n• Centavo = centésimo — mesma coisa!\n• Lucro = Venda − Custo → R$ 1,20 − R$ 0,80 = R$ 0,40\n• 25 centavos = R$ 0,25 (2 casas decimais)\n\nAgora, à tarde, tem uma surpresa: Eraldo foi convidado para a festa da escola!',
          mascotTip: 'Quarenta centavos por bala! Se eu vender 10 balas, já são R$ 4,00. A matemática decimal está no bolso de todo mundo e eu nem sabia disso antes!',
          writtenPrompt: {
            question: 'Se Eraldo vender 5 balas com lucro de R$ 0,40 cada, qual será o lucro total? Mostre o cálculo.',
            linesNeeded: 3,
            suggestedAnswer: 'Lucro total = R$ 0,40 × 5 = R$ 2,00. Ou somando: 0,40 + 0,40 + 0,40 + 0,40 + 0,40 = R$ 2,00.',
            guideline: 'Escreva a multiplicação ou a soma repetida com o resultado em reais e vírgula.',
          },
        },
      ],
    },

    // ── FASE 5: O Portão da Escola e a Festa ────────────────────────────────
    {
      id: 'tmd-u5',
      trackId: 'trilha-mat-7',
      number: 5,
      title: 'O Portão da Escola e a Festa',
      shortDesc: 'Eraldo chega na festa junina, resolve um desafio de caixas e organiza o cardápio de frações e moedas.',
      icon: 'Gift',
      xpReward: 75,
      steps: [

        // ── 1. Situação: Chegada na festa ────────────────────────────────────
        {
          id: 'tmd-u5-s1',
          type: 'objective',
          title: 'Bem-vindo à festa junina!',
          content: 'À tarde, Eraldo recebeu um convite do diretor da escola para vender doces na festa junina. Quando chegou, a escola estava decorada com bandeirinhas e havia muita animação.\n\nO diretor, ao ver que Eraldo era bom com contas, pediu dois favores antes de ele começar a vender:\n1. Calcular a diferença de valor entre duas caixas de presente para o sorteio.\n2. Organizar um cardápio visual que associa frações, decimais e moedas.',
          mascotTip: 'Que festa linda! Mas o diretor me pegou logo na entrada. Dois favores antes de começar a vender. Parceiro, topa me ajudar mais uma vez?',
        },

        // ── 1.5 Transição: Primeiro favor do diretor ─────────────────────────
        {
          id: 'tmd-u5-s1b',
          type: 'dialogue',
          title: 'O primeiro favor: as caixas de presente',
          content: 'O diretor está organizando dois presentes para sortear ao final da festa. Uma caixa dourada e uma caixa prateada. Ele precisa saber exatamente a diferença de valor entre elas — para anunciar ao público de forma correta.\n\nEraldo pegou o caderninho. Agora é só armar a subtração!',
          mascotTip: 'As caixas têm valores com vírgula, mas os centavos são zeros. Essa subtração vai ser direto nos inteiros. Vamos!',
        },

        // ── 2. Prática Guiada: Diferença entre as caixas ──────────────────
        {
          id: 'tmd-u5-s2',
          type: 'guided_practice',
          title: 'Qual a diferença entre as caixas?',
          content: 'O diretor tem dois presentes para sorteio:\n• Caixa Dourada: R$ 177,00\n• Caixa Prateada: R$ 127,00\n\nQual é a diferença de valor entre elas?',
          customVisual: {
            type: 'vertical-math',
            data: { top: '177,00', bottom: '127,00', operator: '−', result: '50,00' }
          },
          mascotTip: 'Os centavos são iguais (ambos têm ,00), então a vírgula não muda nada aqui. Foca nos inteiros: 177 − 127.',
          quiz: {
            question: 'Qual é a diferença de valor entre R$ 177,00 e R$ 127,00?',
            options: [
              'R$ 304,00 — somei os dois em vez de subtrair',
              'R$ 60,00 — erro na casa das dezenas',
              'R$ 65,00 — erro de cálculo',
              'R$ 50,00 — resultado correto da subtração',
            ],
            correctIndex: 3,
            explanationOnSuccess: 'Isso! R$ 177,00 − R$ 127,00 = R$ 50,00. Você percebeu que as casas dos centavos eram iguais e focou nos inteiros. O diretor ficou impressionado com a rapidez!',
            explanationOnError: 'Vamos subtrair coluna por coluna. Os centavos são iguais (,00 − ,00 = 0). Nos inteiros: 177 − 127. Subtrai as unidades, as dezenas e as centenas.',
            hint: '177 − 127: unidades (7−7=0), dezenas (7−2=5), centenas (1−1=0). Resultado: 050 → R$ 50,00.',
          },
        },

        // ── 2.5 Transição: Segundo favor do diretor ──────────────────────────
        {
          id: 'tmd-u5-s2b',
          type: 'dialogue',
          title: 'Primeiro favor resolvido!',
          content: 'O diretor sorriu ao ouvir o resultado e foi correr para fazer o anúncio.\n\nAgora o segundo favor: o cardápio matemático da festa. O diretor criou um cardápio especial onde cada "prato" tem um nome em fração, um preço em decimal e uma moeda equivalente. Mas as etiquetas caíram no chão e precisam ser reorganizadas.',
          mascotTip: 'Esse segundo favor é interessante! O cardápio vai mostrar que fração, decimal e moeda são formas diferentes de falar da mesma quantidade. Isso vai ajudar minha vida toda.',
        },

        // ── 3. Explicação: Cardápio Matemático ──────────────────────────────
        {
          id: 'tmd-u5-s3',
          type: 'explanation',
          title: 'O Cardápio Matemático da Festa',
          content: 'O diretor criou um cardápio onde cada valor pode ser escrito de três formas: como fração, como decimal e como moeda. Todas representam a mesma quantidade.',
          conceptCard: {
            title: 'Cardápio Matemático da Festa',
            subtitle: 'Fração ↔ Decimal ↔ Moeda — três formas, mesma quantidade!',
            points: [
              {
                label: '1/2 → 0,5 → R$ 0,50',
                text: 'Metade de real\n1 real ÷ 2 = 0,5 = 50 centavos\n\nUma moeda de 50 centavos = metade de um real = 5 décimos de real.',
                iconName: 'PieChart',
              },
              {
                label: '1/4 → 0,25 → R$ 0,25',
                text: 'Um quarto de real\n1 real ÷ 4 = 0,25 = 25 centavos\n\nUma moeda de 25 centavos = 1/4 de real = 25 centésimos de real.',
                iconName: 'PieChart',
              },
              {
                label: '1/10 → 0,1 → R$ 0,10',
                text: 'Um décimo de real\n1 real ÷ 10 = 0,1 = 10 centavos\n\nUma moeda de 10 centavos = 1 décimo de real.',
                iconName: 'Hash',
              },
              {
                label: 'A conexão entre os três',
                text: 'Fração    Decimal   Moeda\n1/2    =  0,50   = 50 centavos\n1/4    =  0,25   = 25 centavos\n1/10   =  0,10   = 10 centavos\n1/100  =  0,01   = 1 centavo\n\nTudo representa a mesma quantidade — só muda a forma de escrever.',
                iconName: 'Link',
              },
            ],
          },
        },

        // ── 4. Exercício Interativo: Organizar o cardápio ───────────────────
        {
          id: 'tmd-u5-s4',
          type: 'interactive_drag_drop',
          title: 'Organize as etiquetas do cardápio!',
          content: 'As etiquetas caíram no chão da festa e estão todas misturadas. Ajude Eraldo a organizar cada fração, decimal e moeda na caixa do valor que ela representa.',
          dragAndDrop: {
            title: 'Cardápio Bagunçado da Festa',
            instruction: 'Arraste cada etiqueta para a caixa do valor correto:',
            categories: [
              { id: 'cat-50', title: 'R$ 0,50' },
              { id: 'cat-25', title: 'R$ 0,25' },
              { id: 'cat-10', title: 'R$ 0,10' }
            ],
            items: [
              { id: 'frac-meio', content: '1/2' },
              { id: 'dec-5', content: '0,5' },
              { id: 'coin-50', content: '50 centavos' },
              { id: 'frac-quarto', content: '1/4' },
              { id: 'dec-25', content: '0,25' },
              { id: 'coin-25', content: '25 centavos' },
              { id: 'frac-dez', content: '1/10' },
              { id: 'dec-1', content: '0,10' },
              { id: 'coin-10', content: '10 centavos' }
            ],
            correctMapping: {
              'frac-meio': 'cat-50',
              'dec-5': 'cat-50',
              'coin-50': 'cat-50',
              'frac-quarto': 'cat-25',
              'dec-25': 'cat-25',
              'coin-25': 'cat-25',
              'frac-dez': 'cat-10',
              'dec-1': 'cat-10',
              'coin-10': 'cat-10'
            },
            successMessage: 'Cardápio organizado! Você associou fração, decimal e moeda para cada valor. Essa é a conexão mais importante dos decimais no cotidiano!'
          }
        },

        // ── 5. Desafio Final: Fim do dia com o Eraldo ───────────────────────
        {
          id: 'tmd-u5-s5',
          type: 'final_challenge',
          title: 'Sócio Oficial do Eraldo!',
          content: 'A festa acabou, as etiquetas estão organizadas e o Eraldo fechou o dia com sorriso no rosto!\n\nDo começo ao fim do dia, você ajudou Eraldo a:\n• Fase 1: Escrever decimais nas etiquetas de estoque (décimos)\n• Fase 2: Medir o pano e localizar valores na fita métrica\n• Fase 3: Provar que 0,2 é maior que 0,02 usando centésimos\n• Fase 4: Calcular o lucro e entender que centavo = centésimo\n• Fase 5: Conectar fração, decimal e moeda do sistema brasileiro\n\nEraldo agora faz suas contas com confiança. E tudo isso porque você estava junto!',
          mascotTip: 'Que dia! Do estoque da manhã à festa da escola — e você ao meu lado em tudo. Você é meu sócio oficial. Sem você, eu teria errado várias contas hoje!',
          writtenPrompt: {
            question: 'Escolha uma das cinco fases e explique com suas palavras o que Eraldo aprendeu, qual situação aconteceu e como a matemática decimal apareceu ali.',
            linesNeeded: 4,
            suggestedAnswer: 'Exemplo — Fase 4: Eraldo calculou que ganha R$ 0,40 de lucro por bala (R$ 1,20 − R$ 0,80). Descobriu que "centavo" e "centésimo" são a mesma coisa, e que R$ 0,25 = 25 centésimos = 2 casas decimais.',
            guideline: 'Mencione a situação do Eraldo, o conceito matemático (décimos, centésimos, lucro etc.) e use um número como exemplo.',
          },
        },
      ],
    },
  ],

  // ── DESAFIO FINAL DA TRILHA ──────────────────────────────────────────────
  trackChallenge: {
    id: 'tmd-desafio',
    title: 'Missão Final: O Balanço do Dia',
    description: 'Eraldo precisa fechar o caixa do dia. Resolva 4 desafios que cobrem todas as habilidades da trilha.',
    xpReward: 150,
    steps: [

      // Abertura: Fim do dia, hora de prestar contas
      {
        id: 'tmd-df-s1',
        type: 'objective',
        title: 'Hora de fechar o caixa!',
        content: 'O dia acabou. Eraldo está sentado na calçada com o caderninho e quatro contas para resolver antes de ir para casa.\n\nEle vai testar tudo o que você aprendeu juntos ao longo do dia. Quatro desafios, cada um cobrindo uma habilidade diferente.',
        readingPassage: {
          title: 'Resumo do Dia do Eraldo',
          genre: 'Relatório de vendas',
          text: 'Balas vendidas: 23 unidades\nCusto por bala: R$ 0,80\nPreço de venda: R$ 1,20\nLucro por bala: R$ 0,40\n\nPano xadrez: contorno de 12,40 m\nDois lados medidos: 2,90 m cada\n\nMoedas recebidas na festa: 4 moedas de R$ 0,25\nFração equivalente: 1/4 de real cada',
          glossary: [
            { word: 'Lucro', meaning: 'Diferença entre o preço de venda e o custo. O que sobra para o vendedor.' },
            { word: 'Contorno', meaning: 'Soma de todos os lados de uma figura fechada (o mesmo que perímetro).' },
          ],
        },
      },

      // Desafio 1: Representação Decimal
      {
        id: 'tmd-df-s2',
        type: 'final_challenge',
        title: 'Desafio 1 — Decimal da caixa',
        content: 'A caixa de Eraldo tem 10 espaços. Ao fim do dia, restaram 3 espaços vazios. Quantas partes foram vendidas e como se escreve em decimal?',
        quiz: {
          question: 'Com 3 espaços de 10 vazios, quantas partes (em decimal) foram vendidas?',
          options: [
            '0,3 — três décimos (os espaços que sobraram vazios)',
            '3,0 — três caixas inteiras',
            '0,03 — apenas 3 centésimos',
            '0,7 — sete décimos (os espaços que foram vendidos)',
          ],
          correctIndex: 3,
          explanationOnSuccess: 'Ótimo raciocínio! 10 − 3 = 7 espaços vendidos. 7/10 = 0,7. Você não se confundiu entre os espaços vazios e os vendidos. Eraldo quase esgotou o estoque!',
          explanationOnError: 'Cuidado: 3 espaços são os que SOBRARAM, não os que foram vendidos. Total (10) − Vazios (3) = Vendidos (?). Depois converta para decimal.',
          hint: 'Total de espaços = 10. Espaços que sobraram = 3. Quantos foram vendidos? Depois escreva como décimo.',
        },
      },

      // Desafio 2: Lucro Total
      {
        id: 'tmd-df-s3',
        type: 'final_challenge',
        title: 'Desafio 2 — Lucro total do dia',
        content: 'Eraldo vendeu 23 balas com lucro de R$ 0,40 cada.\n\nEle dividiu assim para facilitar:\n0,40 × 20 = R$ 8,00\n0,40 × 3  = R$ 1,20\nTotal     = R$ ???',
        quiz: {
          question: 'Qual foi o lucro total de Eraldo ao vender 23 balas?',
          options: [
            'R$ 8,40 — somei só 21 balas',
            'R$ 23,40 — confundi lucro com o preço de venda',
            'R$ 9,20 — R$ 8,00 + R$ 1,20',
            'R$ 18,40 — errei a decomposição',
          ],
          correctIndex: 2,
          explanationOnSuccess: 'Perfeito! Você usou a decomposição: 0,40 × 20 = R$ 8,00 e 0,40 × 3 = R$ 1,20. Somando: R$ 9,20 de lucro em um dia só. O Eraldo está comemorando!',
          explanationOnError: 'Use a decomposição do enunciado: some R$ 8,00 + R$ 1,20. Qual é o total?',
          hint: 'Some os dois valores que já estão calculados: R$ 8,00 + R$ 1,20 = ?',
        },
      },

      // Desafio 3: Reta Numérica
      {
        id: 'tmd-df-s4',
        type: 'final_challenge',
        title: 'Desafio 3 — Posição na reta numérica',
        content: 'Eraldo marca o preço de custo (R$ 0,80) e o preço de venda (R$ 1,20) numa reta numérica dividida em décimos.\n\nA reta vai de 0 a 2, com tracinhos a cada 0,1.',
        quiz: {
          question: 'Em qual posição fica R$ 0,80 nessa reta de 0 a 2?',
          options: [
            'No 2º tracinho, porque o número tem um 2',
            'No meio da reta, junto com o 1,00',
            'Além do 2 — fora da reta',
            'No 8º tracinho, após o zero',
          ],
          correctIndex: 3,
          explanationOnSuccess: 'Correto! 0,80 tem o algarismo 8 na casa dos décimos → 8º tracinho depois do zero. Você aplicou a mesma estratégia da fita métrica: olhar o dígito depois da vírgula.',
          explanationOnError: 'Olhe o primeiro algarismo após a vírgula em 0,80. Esse algarismo (8) indica o número do tracinho na reta dividida em décimos.',
          hint: 'O dígito imediatamente após a vírgula em 0,80 é 8. Conte 8 tracinhos a partir do zero.',
        },
      },

      // Desafio 4: Troco e moedas
      {
        id: 'tmd-df-s5',
        type: 'final_challenge',
        title: 'Desafio 4 — O troco da festa',
        content: 'Na festa, uma criança pagou com R$ 1,00 e comprou uma bala por R$ 0,40. Eraldo precisa devolver o troco exato usando as moedas disponíveis.',
        quiz: {
          question: 'Qual é o troco e qual combinação de moedas Eraldo deve usar?',
          options: [
            'R$ 0,40 — devolveu o mesmo preço da bala',
            'R$ 1,40 — somou em vez de subtrair',
            'R$ 0,60 → seis moedas de R$ 0,01 (totalmente correto)',
            'R$ 0,60 → uma moeda de R$ 0,50 e uma de R$ 0,10',
          ],
          correctIndex: 3,
          explanationOnSuccess: 'Brilhante! Troco = R$ 1,00 − R$ 0,40 = R$ 0,60. A combinação mais prática: R$ 0,50 (metade de real = 1/2) + R$ 0,10 (um décimo de real = 1/10) = R$ 0,60. Você conectou decimal, fração e moeda!',
          explanationOnError: 'Troco = Recebido − Preço cobrado. R$ 1,00 − R$ 0,40 = R$ 0,60. Agora, qual combinação de moedas comuns forma exatamente R$ 0,60?',
          hint: 'R$ 1,00 − R$ 0,40 = R$ 0,60. Uma moeda de R$ 0,50 + uma de R$ 0,10 = quanto?',
        },
      },
    ],
  },
};

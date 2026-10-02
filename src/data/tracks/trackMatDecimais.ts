import { Track } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════
// Trilha 7 — Um Dia com o Eraldo: Números Decimais no Cotidiano
// Personagem: Eraldo — camelô jovem, esperto, que usa a matemática todo dia
// nas ruas para não perder dinheiro e ganhar a confiança dos clientes.
//
// Estrutura de cada fase:
//   Situação → Pedido de ajuda → Visualização → Tentativa → Feedback → Conquista
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
        // ── 1. Objetivo / Situação ──────────────────────────────────────────
        {
          id: 'tmd-u1-s1',
          type: 'objective',
          title: 'Eraldo estreia a caixa nova!',
          content: 'Eraldo acabou de montar sua caixa de doces com 10 espaços iguais na calçada. Ele preencheu 2 espaços com balas de morango e precisa escrever na etiqueta qual fração da caixa está ocupada — mas em número com vírgula, porque é assim que o cadastro do mercado pede.',
          mascotTip: '"Fala, parceiro! Tenho 10 espaços na caixa. Preenchi 2 deles. Preciso botar um número com vírgula na etiqueta. Me ajuda?" — Eraldo',
        },

        // ── 2. Explicação Visual ────────────────────────────────────────────
        {
          id: 'tmd-u1-s2',
          type: 'explanation',
          title: 'De Fração para Decimal: a lógica da caixa',
          content: 'Cada espaço da caixa é 1 parte de 10 partes iguais, ou seja, um DÉCIMO.',
          conceptCard: {
            title: '🍬 A Caixa do Eraldo = 10 partes iguais',
            subtitle: 'Cada espaço = 1 décimo = 0,1',
            points: [
              {
                label: '2 espaços preenchidos',
                text: '2 de 10 partes → fração: 2/10\nNúmero decimal: 0,2\n\n[■][■][ ][ ][ ][ ][ ][ ][ ][ ]\n↑ 2 partes pintadas de 10',
                iconName: 'Package',
              },
              {
                label: 'Como ler a vírgula?',
                text: 'Antes da vírgula → partes INTEIRAS\nDepois da vírgula → partes DECIMAIS\n\n0 , 2\n↑   ↑\nInteiro  Décimos\n\n"Zero inteiros e dois décimos."',
                iconName: 'BarChart',
              },
              {
                label: 'Regra de ouro',
                text: 'Denominador 10 → 1 casa decimal\n\n2/10 = 0,2\n7/10 = 0,7\n5/10 = 0,5\n\nO número de zeros do denominador = número de casas!',
                iconName: 'Sparkles',
              },
              {
                label: 'Armadilha!',
                text: 'Cuidado com 2,0 ≠ 0,2\n\n2,0 = duas caixas INTEIRAS\n0,2 = dois décimos de UMA caixa\n\nEraldo só tem UMA caixa! ⚠️',
                iconName: 'AlertTriangle',
              },
            ],
          },
          mafsVisualization: { type: 'grid-10', value: 2 },
        },

        // ── 3. Prática Guiada ───────────────────────────────────────────────
        {
          id: 'tmd-u1-s3',
          type: 'guided_practice',
          title: 'Qual número vai na etiqueta?',
          content: 'Eraldo preencheu 2 espaços de 10 com balas. Qual número decimal representa essa fração da caixa?\n\n[■][■][ ][ ][ ][ ][ ][ ][ ][ ]\n ← 2 cheios →  ← 8 vazios →',
          mascotTip: '"Lembra: o denominador 10 vira 1 casa decimal depois da vírgula. Quantas partes pintei?"',
          quiz: {
            question: 'Qual número decimal representa 2 espaços de 10 preenchidos?',
            options: [
              '2,0 — dois inteiros',
              '0,2 — dois décimos ✓',
              '0,7 — sete décimos',
              '1,2 — um inteiro e dois décimos',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Perfeito! 2/10 = 0,2. O zero antes da vírgula mostra que não há parte inteira, e o 2 depois da vírgula são os dois décimos. A etiqueta vai mostrar 0,2! 🎉',
            explanationOnError: 'Cuidado! O 2,0 significa DUAS CAIXAS INTEIRAS cheias, mas Eraldo só tem uma caixa com 2 espaços ocupados. A parte inteira é zero. Tente novamente!',
            hint: 'Fração com denominador 10: o numerador vai depois da vírgula. 2/10 = 0,_ (qual dígito?)',
          },
        },

        // ── 4. Exercício Independente ───────────────────────────────────────
        {
          id: 'tmd-u1-s4',
          type: 'independent_exercise',
          title: 'Eraldo preenche 7 espaços — mais ou menos que a metade?',
          content: 'Agora Eraldo vendeu 3 balas e preencheu mais 5 espaços. A caixa ficou com 7 partes ocupadas (0,7).\n\n[■][■][■][■][■][■][■][ ][ ][ ]\n ←────── 7 cheios ──────→\n\nA metade da caixa seria 5 partes (0,5).',
          mascotTip: '"Minha caixa tem 10 espaços. A metade são 5. Eu tenho 7. O que você acha?"',
          quiz: {
            question: 'Com 7 de 10 espaços cheios (0,7), a caixa tem mais ou menos que a metade?',
            options: [
              'Menos da metade — porque 7 é grande',
              'Exatamente a metade — porque 0,7 parece médio',
              'Mais da metade — porque 7 > 5 ✓',
              'Impossível dizer sem desenho',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Isso aí! A metade de 10 são 5 partes (0,5). Como 7 > 5, a caixa está MAIS que na metade. Eraldo está quase esgotando o estoque! 🔥',
            explanationOnError: 'A metade de 10 é 5. Compare: 7 e 5 — qual é maior? Quando o preenchido supera a metade, está acima do meio.',
            hint: 'Calcule a metade de 10. Depois compare com 7.',
          },
        },

        // ── 5. Desafio Final ────────────────────────────────────────────────
        {
          id: 'tmd-u1-s5',
          type: 'final_challenge',
          title: 'Badge "Vendedor de Décimos" conquistado!',
          content: 'Eraldo agora entende que cada espaço da caixa é um décimo do total e que 0,2 ≠ 2,0. Você o ajudou a não errar na etiqueta!\n\n🏆 RESUMO DA FASE:\n• 2/10 = 0,2 (dois décimos)\n• 7/10 = 0,7 (sete décimos)\n• 0,5 = metade de 1 inteiro\n• 2,0 = DOIS inteiros (caixa cheia + mais uma!)',
          mascotTip: '"Valeu, parceiro! Agora eu nunca mais confundo 0,2 com 2,0. Amanhã você me ajuda com a fita métrica?" — Eraldo',
          writtenPrompt: {
            question: 'Complete com suas palavras: "Em 0,7, o número 7 representa _____ décimos de um inteiro, o que é equivalente à fração _____."',
            linesNeeded: 2,
            suggestedAnswer: 'Em 0,7, o número 7 representa SETE décimos de um inteiro, equivalente à fração 7/10.',
            guideline: 'Use as palavras "décimos" e "fração" na sua resposta.',
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
      shortDesc: 'Eraldo estende a fita métrica na calçada e precisa marcar os preços corretamente.',
      icon: 'Ruler',
      xpReward: 55,
      steps: [
        // ── 1. Objetivo / Situação ──────────────────────────────────────────
        {
          id: 'tmd-u2-s1',
          type: 'objective',
          title: 'O sol abriu! Hora de esticar o pano.',
          content: 'O sol apareceu e Eraldo esticou o pano xadrez sobre a caixa para não derreter os doces. O pano tem um contorno total de 12,40 m. Dois lados medem 2,90 m cada. Eraldo precisa saber o comprimento dos outros dois lados para comprar mais tecido. Depois, ele vai estender a fita métrica no chão para marcar os preços.',
          mascotTip: '"Dois lados do pano somam 5,80 m. O contorno total é 12,40 m. Quanto sobra para os outros dois lados?" — Eraldo',
        },

        // ── 2. Explicação Visual ────────────────────────────────────────────
        {
          id: 'tmd-u2-s2',
          type: 'explanation',
          title: 'Subtração com Decimais: alinhando a vírgula',
          content: 'Para calcular os outros dois lados, subtraímos o que já conhecemos do total.',
          conceptCard: {
            title: '📏 Calculando os lados restantes do pano',
            subtitle: 'Subtração de decimais: a vírgula fica embaixo da vírgula!',
            points: [
              {
                label: 'Passo 1 — Some os dois lados conhecidos',
                text: '  2,90\n+ 2,90\n──────\n  5,80 m\n\nOs dois lados juntos = 5,80 m',
                iconName: 'Plus',
              },
              {
                label: 'Passo 2 — Subtraia do contorno total',
                text: ' 12,40\n-  5,80\n───────\n   6,60 m\n\nOs outros dois lados = 6,60 m',
                iconName: 'Minus',
              },
              {
                label: 'Cada lado restante',
                text: '6,60 ÷ 2 = 3,30 m\n\nCada um dos lados restantes mede 3,30 metros.',
                iconName: 'Ruler',
              },
              {
                label: 'Regra da vírgula',
                text: 'Na soma e subtração de decimais:\n✓ Alinhe as vírgulas\n✓ Complete com zero se faltar casa\n✓ A vírgula do resultado fica na mesma coluna\n\nEx: 5,8 → escreva 5,80',
                iconName: 'CheckCircle',
              },
            ],
          },
        },

        // ── 3. Prática Guiada ───────────────────────────────────────────────
        {
          id: 'tmd-u2-s3',
          type: 'guided_practice',
          title: 'Quanto medem os lados restantes do pano?',
          content: 'O pano tem contorno de 12,40 m. Dois lados já medidos = 2,90 m cada.\n\n Contorno total: 12,40 m\n Dois lados: 2,90 + 2,90 = 5,80 m\n Restante para os outros dois: 12,40 - 5,80 = ???',
          quiz: {
            question: 'Qual é o comprimento total dos outros dois lados do pano?',
            options: [
              '(A) 5,80 m — igual aos dois primeiros',
              '(B) 3,30 m — a medida de cada lado',
              '(C) 6,60 m — o total dos dois restantes ✓',
              '(D) 9,50 m — soma errada',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Certíssimo! 12,40 − 5,80 = 6,60 m. Cada um dos lados restantes mede 6,60 ÷ 2 = 3,30 m. O pano está salvo! ☀️',
            explanationOnError: 'Subtrai os dois lados que já conhecemos (5,80 m) do total (12,40 m). Lembra de alinhar a vírgula!',
            hint: '12,40 − 5,80 = ? (subtraia coluna a coluna, da direita para esquerda)',
          },
        },

        // ── 4. Exercício com Reta Numérica ──────────────────────────────────
        {
          id: 'tmd-u2-s4',
          type: 'independent_exercise',
          title: 'A fita métrica no chão — localizando decimais!',
          content: 'Eraldo esticou 1 metro de fita no chão e a dividiu em 10 partes iguais. Cada tracinho = 0,1 metro (um décimo).\n\n0────┬────┬────┬────┬────┬────┬────┬────┬────┬────1\n     0,1  0,2  0,3  0,4  0,5  0,6  0,7  0,8  0,9\n\nOnde fica a etiqueta de preço R$ 0,20 (= 0,2 m na fita)?',
          conceptCard: {
            title: '📍 Reta Numérica de Décimos (0 a 1)',
            subtitle: 'Cada divisão = 0,1 = 1/10',
            points: [
              {
                label: 'Posição do 0,2',
                text: '0──|──|──|──|──|──|──|──|──|──1\n         ↑\n        0,2\n\nO 0,2 fica no SEGUNDO tracinho depois do zero.',
                iconName: 'MapPin',
              },
              {
                label: 'Posição do 0,5',
                text: '0──|──|──|──|──|──|──|──|──|──1\n               ↑\n              0,5\n\nO 0,5 fica EXATAMENTE no meio (metade do metro).',
                iconName: 'Scale',
              },
              {
                label: 'Posição do 0,7',
                text: '0──|──|──|──|──|──|──|──|──|──1\n                        ↑\n                       0,7\n\nO 0,7 fica no SÉTIMO tracinho.',
                iconName: 'Target',
              },
              {
                label: 'Como achar qualquer decimal?',
                text: 'Olhe o dígito depois da vírgula.\nEsse número é o tracinho que você procura!\n\n0,3 → 3º tracinho\n0,8 → 8º tracinho\n0,1 → 1º tracinho',
                iconName: 'Search',
              },
            ],
          },
          mafsVisualization: { type: 'number-line', value: [0.2, 0.5, 0.7] },
          quiz: {
            question: 'Na reta de 0 a 1 dividida em 10 partes iguais, o número 0,2 fica no:',
            options: [
              'Vigésimo tracinho (20ª divisão)',
              'Segundo tracinho depois do zero ✓',
              'Meio da reta (5ª divisão)',
              'Logo antes do número 1',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Mandou bem! 0,2 = 2 décimos = 2º tracinho. Eraldo colou a etiqueta no lugar certo da fita! 📍',
            explanationOnError: 'O dígito depois da vírgula indica QUAL tracinho. 0,2 tem o 2 depois da vírgula → 2º tracinho.',
            hint: 'Quantos tracinhos depois do zero? O dígito decimal te diz!',
          },
        },

        // ── 5. Desafio Final ────────────────────────────────────────────────
        {
          id: 'tmd-u2-s5',
          type: 'final_challenge',
          title: 'Décimos e Centésimos — o que muda?',
          content: 'Eraldo quer saber: se ele dividir o 1 metro em 100 partes (bem menores), cada pedacinho se chama como?\n\n1 metro ÷ 10 = 0,1 → chamamos de DÉCIMO\n1 metro ÷ 100 = 0,01 → chamamos de _____?',
          mascotTip: '"Se décimo tem 1 zero, centésimo tem 2 zeros. Faz sentido, né?" — Eraldo 🧠',
          quiz: {
            question: 'Cada um dos 100 pedaços de 1 metro se chama:',
            options: [
              'Décimo (0,1)',
              'Centésimo (0,01) ✓',
              'Milésimo (0,001)',
              'Porcentagem (1%)',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Exato! 1 ÷ 100 = 0,01 = um centésimo. São duas casas depois da vírgula. É a mesma lógica que o centavo no real! R$ 0,01 = 1 centésimo de real. 🏆',
            explanationOnError: 'Décimo = 1 parte de 10 (1 casa decimal). Centésimo = 1 parte de 100 (2 casas decimais). Qual tem 2 casas?',
            hint: 'Cent- = 100. Centímetro é 1 parte de 1 metro. Centésimo é 1 parte de 100.',
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
      shortDesc: 'Outro camelô diz que 0,02 é maior que 0,2. Eraldo precisa provar que está errado!',
      icon: 'TrendingUp',
      xpReward: 60,
      steps: [
        // ── 1. Objetivo / Situação ──────────────────────────────────────────
        {
          id: 'tmd-u3-s1',
          type: 'objective',
          title: 'A disputa dos descontos!',
          content: 'O Zé do carrinho, concorrente de Eraldo, está gritando para os clientes: "Meu desconto de 0,02 é maior que o do Eraldo de 0,2!" Eraldo sabe que isso é errado, mas precisa PROVAR usando desenhos. Depois, ele quer calcular a diferença de preços dos brinquedos nas lojas da rua.',
          mascotTip: '"O Zé tá enganando os clientes! 0,02 é menor que 0,2 — mas como eu mostro isso no desenho?" — Eraldo',
        },

        // ── 2. Visualização com Malha Quadriculada ──────────────────────────
        {
          id: 'tmd-u3-s2',
          type: 'explanation',
          title: 'Malha Quadriculada: 0,2 vs 0,02',
          content: 'Imagine uma malha com 100 quadradinhos (10 × 10). Ela representa 1 inteiro.',
          conceptCard: {
            title: '🔲 A Malha dos 100 Quadradinhos',
            subtitle: 'Cada linha = 0,1 (décimo) | Cada quadradinho = 0,01 (centésimo)',
            points: [
              {
                label: '0,2 pintado na malha',
                text: '████████████████████ ← linha 1 (10 quadrados)\n████████████████████ ← linha 2 (10 quadrados)\n□□□□□□□□□□□□□□□□□□□□\n□□□□□□□□□□□□□□□□□□□□\n... (restante vazio)\n\n20 quadradinhos pintados de 100 = 0,20',
                iconName: 'Square',
              },
              {
                label: '0,02 pintado na malha',
                text: '██ ← apenas 2 quadradinhos!\n□□□□□□□□□□□□□□□□□□□□\n□□□□□□□□□□□□□□□□□□□□\n... (restante vazio)\n\n2 quadradinhos pintados de 100 = 0,02',
                iconName: 'Square',
              },
              {
                label: 'Comparação visual',
                text: '0,20 = 20 quadradinhos\n0,02 =  2 quadradinhos\n\n20 >> 2\n\n0,2 é DEZ VEZES maior que 0,02!\nO Zé estava completamente errado! 😅',
                iconName: 'Scale',
              },
              {
                label: 'Por que confunde?',
                text: 'Os dígitos parecem iguais (0 e 2), mas a POSIÇÃO muda tudo!\n\n0,2 → casa dos décimos (÷10)\n0,02 → casa dos centésimos (÷100)\n\nPosição = valor! Igual ao sistema inteiro.',
                iconName: 'Lightbulb',
              },
            ],
          },
          mafsVisualization: { type: 'grid-100', value: 20 },
        },

        // ── 3. Prática Guiada ───────────────────────────────────────────────
        {
          id: 'tmd-u3-s3',
          type: 'guided_practice',
          title: 'Quem tem desconto maior?',
          content: 'Eraldo dá desconto de R$ 0,20 e o Zé dá R$ 0,02.\n\nNa malha de 100 quadradinhos:\n• 0,20 = 20 quadradinhos pintados\n• 0,02 =  2 quadradinhos pintados',
          quiz: {
            question: 'Quem dá o desconto MAIOR na comparação 0,20 e 0,02?',
            options: [
              'O Zé, porque 0,02 tem mais zeros',
              'São iguais, pois têm os mesmos dígitos',
              'O Eraldo, porque 0,20 = 20 centésimos e 0,02 = 2 centésimos ✓',
              'O Zé, porque 2 centésimos parece mais preciso',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Provado! 0,20 tem 20 centésimos e 0,02 tem só 2. O Eraldo dá desconto 10 vezes maior! O Zé ficou sem argumento 😄',
            explanationOnError: 'Converta tudo para centésimos: 0,2 = 0,20 = 20 centésimos. 0,02 = 2 centésimos. Agora compare!',
            hint: 'Escreva ambos como centésimos (2 casas decimais) e compare: 0,20 vs 0,02',
          },
        },

        // ── 4. Exercício com Subtração ───────────────────────────────────────
        {
          id: 'tmd-u3-s4',
          type: 'independent_exercise',
          title: 'Comparando preços das lojas',
          content: 'Eraldo viu os preços do Pega Vareta em 3 lojas da rua:\n\n┌─────────────┬──────────┐\n│ Loja        │ Preço    │\n├─────────────┼──────────┤\n│ Loja A      │ R$ 2,40  │\n│ Loja B      │ R$ 3,80  │\n│ Loja C      │ R$ 5,00  │\n└─────────────┴──────────┘\n\nQual a diferença entre a Loja C (mais cara) e a Loja A (mais barata)?',
          mascotTip: '"Pra achar diferença de preço, a gente subtrai! É igual ao troco." — Eraldo',
          quiz: {
            question: 'Qual a diferença de preço entre a Loja C (R$ 5,00) e a Loja A (R$ 2,40)?',
            options: [
              'R$ 7,40 — somei os dois preços',
              'R$ 2,60 — subtrai 5,00 − 2,40 ✓',
              'R$ 3,40 — acho que errei a conta',
              'R$ 1,60 — contei errado',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Boa! R$ 5,00 − R$ 2,40 = R$ 2,60. Quem comprar na Loja A economiza exatamente R$ 2,60. Eraldo sempre compra onde é mais barato! 💰',
            explanationOnError: 'Para achar a DIFERENÇA, subtraímos o menor do maior. R$ 5,00 − R$ 2,40. Alinhe as vírgulas: 5,00 − 2,40 = ?',
            hint: '5,00 − 2,40: subtrai os centésimos (0−0), os décimos (0−4, precisa emprestar), depois os inteiros.',
          },
        },

        // ── 5. Desafio Final ────────────────────────────────────────────────
        {
          id: 'tmd-u3-s5',
          type: 'final_challenge',
          title: 'Badge "Calculista da Rua" desbloqueado!',
          content: 'Eraldo derrubou o argumento do Zé com matemática e ainda calculou a diferença de preço! Você provou que posição decimal é tudo.\n\n🏆 RESUMO DA FASE:\n• 0,2 = 2 décimos = 20 centésimos\n• 0,02 = 2 centésimos\n• 0,20 > 0,02 (10 vezes maior!)\n• Diferença de preços = subtração com vírgula alinhada',
          mascotTip: '"Agora o Zé vai ter que repensar a estratégia dele! Valeu, sócio!" — Eraldo',
          writtenPrompt: {
            question: 'Por que 0,2 é maior que 0,02? Explique usando a malha de 100 quadradinhos.',
            linesNeeded: 3,
            suggestedAnswer: '0,2 representa 20 centésimos (20 quadradinhos na malha de 100), enquanto 0,02 representa apenas 2 centésimos (2 quadradinhos). Como 20 > 2, o 0,2 é dez vezes maior.',
            guideline: 'Use as palavras "centésimos" e "quadradinhos" na sua explicação.',
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
      shortDesc: 'Eraldo encontra Ana, divide chocolate e calcula seu lucro real com as balas.',
      icon: 'Coins',
      xpReward: 65,
      steps: [
        // ── 1. Objetivo / Situação ──────────────────────────────────────────
        {
          id: 'tmd-u4-s1',
          type: 'objective',
          title: 'Hora do almoço na praça!',
          content: 'Eraldo parou para almoçar na praça e encontrou Ana. Ela compartilhou um chocolate: comeu 0,3 e sobrou 0,7 para dividir. Depois do lanche, Eraldo foi fechar as contas: ele compra cada bala por R$ 0,80 e vende por R$ 1,20. Qual é o lucro real em cada bala?',
          mascotTip: '"Lucro = preço de venda − preço de custo. Parece fácil, mas você precisa me dizer o valor EXATO." — Eraldo',
        },

        // ── 2. Explicação Visual: Decimais e Dinheiro ────────────────────────
        {
          id: 'tmd-u4-s2',
          type: 'explanation',
          title: 'Décimos, Centésimos e o Dinheiro Brasileiro',
          content: 'O sistema monetário brasileiro foi feito EM CIMA dos decimais. Não é coincidência!',
          conceptCard: {
            title: '💰 R$ Real Brasileiro = Sistema Decimal',
            subtitle: 'Reais = parte inteira | Centavos = parte decimal',
            points: [
              {
                label: '1 Real = 10 décimos = 100 centésimos',
                text: 'R$ 1,00\n  ↑  ↑↑\n  │  └┘ centavos (centésimos)\n  └── reais (inteiros)\n\n"Centavo" vem de "centésimo"!',
                iconName: 'Banknote',
              },
              {
                label: 'Décimos de real = moedas de R$ 0,10',
                text: 'R$ 0,10 = 1 décimo de real\nR$ 0,20 = 2 décimos de real\nR$ 0,50 = 5 décimos = metade do real\n\n10 moedas de R$0,10 = R$ 1,00 inteiro',
                iconName: 'Coins',
              },
              {
                label: 'Centésimos de real = moedas de R$ 0,01',
                text: 'R$ 0,01 = 1 centésimo de real\nR$ 0,05 = 5 centésimos\nR$ 0,25 = 25 centésimos = 1/4 de real\n\n100 moedas de R$0,01 = R$ 1,00 inteiro',
                iconName: 'CircleDot',
              },
              {
                label: 'Lucro = Venda − Custo',
                text: 'Eraldo:\nVende por: R$ 1,20\nCompra por: R$ 0,80\n\nLucro = 1,20 − 0,80 = ???\n\nAlinhe as vírgulas e calcule!',
                iconName: 'TrendingUp',
              },
            ],
          },
        },

        // ── 3. Prática Guiada ───────────────────────────────────────────────
        {
          id: 'tmd-u4-s3',
          type: 'guided_practice',
          title: 'Qual é o lucro real de Eraldo?',
          content: 'Cada bala:\n• Custo: R$ 0,80\n• Venda: R$ 1,20\n\nLucro = Venda − Custo\n       = R$ 1,20 − R$ 0,80\n       = ???',
          mascotTip: '"Alinha a vírgula! 1,20 menos 0,80. Faça coluna por coluna."',
          quiz: {
            question: 'Qual é o lucro de Eraldo em cada bala vendida?',
            options: [
              'R$ 2,00 — somei os valores',
              'R$ 0,40 — lucro real por bala ✓',
              'R$ 1,20 — só o preço de venda',
              'R$ 0,80 — só o custo',
            ],
            correctIndex: 1,
            explanationOnSuccess: 'Certeiro! R$ 1,20 − R$ 0,80 = R$ 0,40. Cada bala rende 40 centavos de lucro para o Eraldo. Não é muito, mas na quantidade faz diferença! 💪',
            explanationOnError: 'Lucro é sempre Venda MENOS Custo. R$ 1,20 − R$ 0,80. Subtrai o menor do maior, coluna por coluna com a vírgula alinhada.',
            hint: 'R$ 1,20 − R$ 0,80: comece pelos centésimos (0−0=0), depois décimos (2−8, precisa emprestar!), depois inteiros.',
          },
        },

        // ── 4. Conversão Decimal ↔ Monetário ─────────────────────────────────
        {
          id: 'tmd-u4-s4',
          type: 'independent_exercise',
          title: 'Como se escreve 25 centavos com vírgula?',
          content: 'Eraldo precisa anotar no caderninho quanto recebeu em moedas de 25 centavos. Como se escreve 25 centavos em notação decimal?\n\n25 centavos = 25 centésimos de 1 real\n\n R$ ___ , ___ ___',
          mascotTip: '"Centavo = centésimo = 2ª casa decimal. Então 25 centavos é quanto em decimal?" — Eraldo',
          quiz: {
            question: 'Como se representa 25 centavos em notação decimal?',
            options: [
              'R$ 25,00 — vinte e cinco reais',
              'R$ 2,50 — dois reais e cinquenta centavos',
              'R$ 0,25 — zero reais e vinte e cinco centavos ✓',
              'R$ 0,025 — errou as casas',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'É isso! R$ 0,25 = zero reais inteiros + 25 centésimos de real (= 25 centavos). A vírgula separa reais de centavos. 🏆',
            explanationOnError: 'Centavos ocupam as 2 casas após a vírgula. 25 centavos = R$ 0,25 (parte inteira = 0 real, parte decimal = 25 centésimos).',
            hint: 'Quantos centavos = 1 real? 100. Então 25 centavos = 25/100 de real = R$ 0,___',
          },
        },

        // ── 5. Desafio Final ────────────────────────────────────────────────
        {
          id: 'tmd-u4-s5',
          type: 'final_challenge',
          title: 'Badge "Contador do Eraldo" conquistado!',
          content: 'Você ajudou Eraldo a entender que o real brasileiro É um sistema decimal, e que calcular lucro é uma subtração com vírgula!\n\n🏆 RESUMO DA FASE:\n• R$ 1,00 = 10 décimos = 100 centésimos\n• Lucro = Venda − Custo\n• R$ 1,20 − R$ 0,80 = R$ 0,40\n• 25 centavos = R$ 0,25 = 25 centésimos',
          mascotTip: '"40 centavos por bala. Se eu vender 10 balas, ganho R$ 4,00! Posso calcular rápido agora." — Eraldo 😄',
          writtenPrompt: {
            question: 'Se Eraldo vender 5 balas com lucro de R$ 0,40 cada, qual será o lucro total? Mostre o cálculo.',
            linesNeeded: 3,
            suggestedAnswer: 'Lucro por bala: R$ 0,40. Total: R$ 0,40 × 5 = R$ 2,00. (Ou somando: 0,40 + 0,40 + 0,40 + 0,40 + 0,40 = R$ 2,00)',
            guideline: 'Escreva a multiplicação ou a soma repetida, mostrando o resultado final com R$ e vírgula.',
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
      shortDesc: 'Eraldo chega na festa, resolve um desafio de caixas de presente e monta o cardápio de frações.',
      icon: 'Gift',
      xpReward: 75,
      steps: [
        // ── 1. Objetivo / Situação ──────────────────────────────────────────
        {
          id: 'tmd-u5-s1',
          type: 'objective',
          title: 'Chegamos na festa! O diretor precisa de ajuda.',
          content: 'Eraldo chegou na festa junina da escola para vender seus doces. O diretor está organizando as caixas de presente para sorteio e precisa de ajuda. Depois, vai montar um cardápio especial associando frações, decimais e moedas para os participantes.',
          mascotTip: '"O diretor me pediu dois favores. Um de subtração e outro de associação de frações com moedas. Vamos resolver juntos?" — Eraldo',
        },

        // ── 2. Desafio das Caixas (Subtração) ───────────────────────────────
        {
          id: 'tmd-u5-s2',
          type: 'guided_practice',
          title: 'Qual a diferença entre as caixas?',
          content: 'O diretor tem duas caixas de presente:\n\n┌────────────────────────────────┐\n│ Caixa Ouro    → R$ 177,00     │\n│ Caixa Prata   → R$ 127,00     │\n└────────────────────────────────┘\n\nQual a diferença de valor entre elas?\n\n  177,00\n− 127,00\n────────',
          mascotTip: '"Subtração direta! A vírgula está alinhada. Pode ir coluna a coluna."',
          quiz: {
            question: 'Qual a diferença entre R$ 177,00 e R$ 127,00?',
            options: [
              '(A) R$ 60,00',
              '(B) R$ 65,00',
              '(C) R$ 50,00 ✓',
              '(D) R$ 304,00 — somei os dois',
            ],
            correctIndex: 2,
            explanationOnSuccess: 'Certíssimo! R$ 177,00 − R$ 127,00 = R$ 50,00. Um resultado limpo! O diretor ficou impressionado com a rapidez. 🎉',
            explanationOnError: '177 − 127: subtrai os centésimos (0), décimos (0), unidades (7−7=0), dezenas (7−2=5), centenas (1−1=0). Resultado: 50,00.',
            hint: 'Subtrai coluna a coluna: 177 − 127. Os centavos são iguais, então foque nos reais inteiros.',
          },
        },

        // ── 3. Visualização do Cardápio de Frações ───────────────────────────
        {
          id: 'tmd-u5-s3',
          type: 'explanation',
          title: 'O Cardápio Matemático da Festa',
          content: 'O diretor montou um cardápio especial onde cada prato tem um nome em fração, um preço decimal e uma moeda equivalente.',
          conceptCard: {
            title: '🎪 Cardápio Matemático da Festa do Eraldo',
            subtitle: 'Conectando fração ↔ decimal ↔ moeda',
            points: [
              {
                label: '"Metade de Real" → ½ → 0,5 → R$ 0,50',
                text: '½ real = 1 real ÷ 2 = 0,5 = 50 centavos\n\n🪙 Uma moeda de 50 centavos\n\nVisualize: [████████████████████]\n             ← metade pintada →',
                iconName: 'PieChart',
              },
              {
                label: '"Um Quarto de Real" → ¼ → 0,25 → R$ 0,25',
                text: '¼ real = 1 real ÷ 4 = 0,25 = 25 centavos\n\n🪙 Uma moeda de 25 centavos\n\nVisualize: [█████               ]\n             ← ¼ pintado →',
                iconName: 'PieChart',
              },
              {
                label: '"Um Décimo de Real" → 1/10 → 0,1 → R$ 0,10',
                text: '1/10 real = 0,1 = 10 centavos\n\n🪙 Uma moeda de 10 centavos\n\n10 moedas de 10¢ = R$ 1,00',
                iconName: 'Hash',
              },
              {
                label: 'A conexão: Fração → Decimal → Moeda',
                text: '   Fração    Decimal   Moeda\n   ½      =  0,50   = 50¢\n   ¼      =  0,25   = 25¢\n   1/10   =  0,10   = 10¢\n   1/100  =  0,01   =  1¢\n\nTudo é a mesma quantidade — só muda a forma de escrever!',
                iconName: 'Link',
              },
            ],
          },
        },

        // ── 4. Exercício de Associação ────────────────────────────────────────
        {
          id: 'tmd-u5-s4',
          type: 'interactive_drag_drop',
          title: 'Associando fração, decimal e moeda',
          content: 'O diretor embaralhou as etiquetas do cardápio! Ajude Eraldo a organizar as etiquetas em suas caixas corretas.',
          dragAndDrop: {
            title: 'Cardápio Bagunçado',
            instruction: 'Arraste as frações e textos para as caixas de valores correspondentes:',
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
            successMessage: 'Perfeito! Você categorizou todas as frações, decimais e moedas. 🎊'
          }
        },

        // ── 5. Desafio Final ────────────────────────────────────────────────
        {
          id: 'tmd-u5-s5',
          type: 'final_challenge',
          title: '🏆 Badge "Sócio Oficial do Eraldo" conquistado!',
          content: 'VOCÊ ZEROU O DIA COM O ERALDO! 🎊\n\nFrom the start to the party, you helped him:\n✅ Fase 1: Escrever decimais em etiquetas (décimos)\n✅ Fase 2: Localizar na reta numérica + centésimos\n✅ Fase 3: Provar que 0,2 > 0,02 com malha visual\n✅ Fase 4: Calcular lucro e converter centavos\n✅ Fase 5: Conectar fração ↔ decimal ↔ moeda do Brasil\n\nEraldo agora faz suas contas sem errar!\n\n"Você é o meu sócio oficial! Sem você, eu teria prejudicado o negócio hoje. Obrigado, parceiro!" — Eraldo 🤝',
          mascotTip: '"As vendas foram um sucesso e a escola adorou! Você provou que domina os decimais no dia a dia." — Eraldo',
          writtenPrompt: {
            question: 'Escolha UMA das fases (1 a 5) e explique com suas palavras o que Eraldo aprendeu e como a matemática decimal apareceu naquela situação da rua.',
            linesNeeded: 4,
            suggestedAnswer: 'Exemplo (Fase 4): Eraldo aprendeu que o sistema monetário brasileiro é decimal: reais são a parte inteira e centavos são os centésimos. Quando ele calculou o lucro (R$ 1,20 − R$ 0,80 = R$ 0,40), estava fazendo subtração de decimais do dia a dia.',
            guideline: 'Mencione a situação do Eraldo, o conceito matemático e um exemplo com número.',
          },
        },
      ],
    },
  ],

  // ── DESAFIO FINAL DA TRILHA ──────────────────────────────────────────────
  trackChallenge: {
    id: 'tmd-desafio',
    title: 'Missão Final: O Balanço do Dia',
    description: 'Eraldo precisa fechar o caixa do dia. Resolva 4 desafios que cobrem TODAS as habilidades da trilha.',
    xpReward: 150,
    steps: [
      // Desafio 1: Representação Decimal
      {
        id: 'tmd-df-s1',
        type: 'objective',
        title: 'Hora de fechar o caixa!',
        content: 'O dia acabou e Eraldo vai fechar as contas. Quatro desafios rápidos para provar que você é o Sócio Oficial!\n\n🎯 Total de XP disponível: 150 pontos\n💼 Personagem: Eraldo, o Camelô Matemático\n📍 Local: Calçada da escola, fim do dia',
        readingPassage: {
          title: 'Resumo do Dia do Eraldo',
          genre: 'Relatório de vendas',
          text: 'Unidades vendidas: 23 balas\nCusto por bala: R$ 0,80\nPreço de venda: R$ 1,20\nLucro por bala: R$ 0,40\n\nPano xadrez: contorno 12,40 m\nLados conhecidos: 2,90 m cada\n\nMoedas recebidas: 4 moedas de R$ 0,25\nFração equivalente: ¼ de real cada',
          glossary: [
            { word: 'Lucro', meaning: 'Diferença entre o que ganhou (venda) e o que gastou (custo).' },
            { word: 'Contorno', meaning: 'Soma de todos os lados de uma figura (perímetro).' },
          ],
        },
      },

      // Desafio 2: Fração → Decimal
      {
        id: 'tmd-df-s2',
        type: 'final_challenge',
        title: 'Desafio 1 — Decimal da caixa',
        content: 'A caixa de Eraldo tem 10 espaços. Ao fim do dia, restaram 3 espaços vazios. Quantas partes foram vendidas e como se escreve em decimal?',
        quiz: {
          question: 'Com 3 espaços de 10 vazios, quantas partes (em decimal) foram vendidas?',
          options: [
            '0,3 — três décimos vendidos (os vazios)',
            '0,7 — sete décimos vendidos ✓',
            '3,0 — três caixas inteiras',
            '0,03 — apenas 3 centésimos',
          ],
          correctIndex: 1,
          explanationOnSuccess: 'Excelente! 10 − 3 = 7 espaços vendidos. 7/10 = 0,7. Quase esgotou o estoque! 🔥',
          explanationOnError: '10 espaços no total. 3 vazios. Quantos foram vendidos? Depois converta para decimal.',
          hint: 'Total − Vazios = Vendidos. Depois escreva como décimo.',
        },
      },

      // Desafio 3: Lucro Total
      {
        id: 'tmd-df-s3',
        type: 'final_challenge',
        title: 'Desafio 2 — Lucro total do dia',
        content: 'Eraldo vendeu 23 balas com lucro de R$ 0,40 cada.\n\nLucro total = R$ 0,40 × 23\n\nDica: 0,40 × 20 = R$ 8,00\n      0,40 × 3  = R$ 1,20\n      Total     = R$ ???',
        quiz: {
          question: 'Qual foi o lucro total de Eraldo ao vender 23 balas?',
          options: [
            'R$ 9,20 — lucro total correto ✓',
            'R$ 8,40 — contei só 21 balas',
            'R$ 23,40 — confundi lucro com venda',
            'R$ 18,40 — dobrei o valor',
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Perfeito! R$ 0,40 × 23 = R$ 9,20. Eraldo ganhou R$ 9,20 de lucro em um único dia! Esse é o poder da matemática no trabalho! 💰',
          explanationOnError: 'Quebre em partes: 0,40 × 20 = R$ 8,00 e 0,40 × 3 = R$ 1,20. Some: R$ 8,00 + R$ 1,20 = ?',
          hint: 'Distribua: 0,40 × (20 + 3). Calcule cada parte separada e some.',
        },
      },

      // Desafio 4: Localização na Reta
      {
        id: 'tmd-df-s4',
        type: 'final_challenge',
        title: 'Desafio 3 — Reta Numérica dos preços',
        content: 'Eraldo marca o preço de cada bala (R$ 0,40) na reta de 0 a 1.\n\n0────┬────┬────┬────┬────┬────┬────┬────┬────┬────1\n     0,1  0,2  0,3  0,4  0,5  0,6  0,7  0,8  0,9\n\nO preço de custo (R$ 0,80) e o preço de venda (R$ 1,20) estão em que posição?',
        quiz: {
          question: 'R$ 0,80 está em qual posição na reta de 0 a 1?',
          options: [
            'Oitavo tracinho (8ª posição) ✓',
            'Segundo tracinho (2ª posição)',
            'Além do 1 — fora da reta',
            'No meio da reta (5ª posição)',
          ],
          correctIndex: 0,
          explanationOnSuccess: 'Correto! 0,80 tem o 8 na casa dos décimos → 8º tracinho. E 1,20 ficaria ALÉM do 1, já no próximo inteiro + 2 décimos. 🎯',
          explanationOnError: 'O dígito na casa dos décimos (depois da vírgula) indica o tracinho. 0,80 → dígito dos décimos = 8 → 8º tracinho.',
          hint: 'Olhe o primeiro dígito após a vírgula em 0,80. Esse número é o tracinho na reta.',
        },
      },

      // Desafio 5: Associação Monetária Final
      {
        id: 'tmd-df-s5',
        type: 'final_challenge',
        title: 'Desafio 4 — O troco da festa',
        content: 'Na festa, uma criança pagou com R$ 1,00 e comprou uma bala de R$ 0,40. Eraldo precisa dar o troco EXATO usando moedas do sistema brasileiro.',
        quiz: {
          question: 'Qual é o troco e qual combinação de moedas Eraldo deve dar?',
          options: [
            'R$ 0,60 → uma moeda de R$ 0,50 + uma de R$ 0,10 ✓',
            'R$ 0,40 → igual ao preço da bala',
            'R$ 0,60 → seis moedas de R$ 0,01',
            'R$ 1,40 → devolveu mais do que recebeu',
          ],
          correctIndex: 0,
          explanationOnSuccess: 'BRILHANTE! Troco = R$ 1,00 − R$ 0,40 = R$ 0,60. Uma moeda de 50¢ (= ½ real = 0,5) + uma de 10¢ (= 1/10 de real = 0,1) = 0,60. Você conectou decimais + frações + moedas! 🏆🎊',
          explanationOnError: 'Troco = Recebido − Cobrado. R$ 1,00 − R$ 0,40 = R$ 0,60. Agora, quais moedas formam R$ 0,60?',
          hint: 'R$ 1,00 − R$ 0,40 = R$ 0,60. Uma moeda de 50¢ + uma de 10¢ = quanto?',
        },
      },
    ],
  },
};

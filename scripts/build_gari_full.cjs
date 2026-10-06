const fs = require('fs');
const path = require('path');

const allUnits = require('./gen_gari_data_grouped.cjs');

function generateId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const lines = [];

lines.push(`import { Track } from '../../types';`);
lines.push(``);
lines.push(`export const trackGari: Track = {`);
lines.push(`  id: 'gari-mission',`);
lines.push(`  subjectId: 'matematica',`);
lines.push(`  title: 'Área e Perímetro',`);
lines.push(`  subtitle: 'Um dia de trabalho com um gari',`);
lines.push(`  description: 'Trilha lúdica sobre área, perímetro, frações, volume e probabilidade acompanhando o dia a dia de um gari trabalhador.',`);
lines.push(`  objective: 'Aplicar conceitos de área, perímetro, frações e probabilidade em cenários reais.',`);
lines.push(`  bnccSkills: ['Matemática do 4º e 5º ano'],`);
lines.push(`  theme: {`);
lines.push(`    primary: 'from-amber-600 to-orange-500',`);
lines.push(`    secondary: 'from-yellow-500 to-amber-500',`);
lines.push(`    accent: 'bg-amber-400',`);
lines.push(`    background: 'bg-[#10213f]',`);
lines.push(`    cardBg: 'bg-[#1a2b54]',`);
lines.push(`    textMain: 'text-amber-50',`);
lines.push(`    textMuted: 'text-amber-200/60',`);
lines.push(`  },`);
lines.push(`  worldName: 'CIEP',`);
lines.push(`  units: [`);

let globalActIndex = 0;

allUnits.forEach((u, uIndex) => {
  lines.push(`    {`);
  lines.push(`      id: 'gari-unit-${uIndex + 1}',`);
  lines.push(`      trackId: 'gari-mission',`);
  lines.push(`      number: ${uIndex + 1},`);
  lines.push(`      title: ${JSON.stringify(u.title)},`);
  lines.push(`      shortDesc: ${JSON.stringify(u.shortDesc)},`);
  lines.push(`      icon: '${u.icon}',`);
  lines.push(`      xpReward: 50,`);
  lines.push(`      color: 'emerald',`);
  lines.push(`      steps: [`);
  
  u.activities.forEach((act, actIndex) => {
    const cleanTitle = act.title.replace(/^Atividade \d+ — /i, '');
    
    // STEP 1: OBJECTIVE
    lines.push(`        {`);
    lines.push(`          id: 'step-${uIndex + 1}-${actIndex + 1}-a',`);
    lines.push(`          type: 'objective',`);
    lines.push(`          title: ${JSON.stringify(cleanTitle)},`);
    if (act.cena) {
      lines.push(`          content: ${JSON.stringify(act.cena)},`);
    } else {
      lines.push(`          content: 'O trabalho nas ruas reserva muitos desafios.',`);
    }
    if (act.fala) {
      lines.push(`          mascotTip: ${JSON.stringify(act.fala)},`);
    }
    lines.push(`        },`);

    // STEP 2: EXPLANATION
    lines.push(`        {`);
    lines.push(`          id: 'step-${uIndex + 1}-${actIndex + 1}-b',`);
    lines.push(`          type: 'explanation',`);
    lines.push(`          title: 'Entendendo: ' + ${JSON.stringify(act.shortDesc || 'Conceitos')},`);
    lines.push(`          content: ${JSON.stringify(act.explicacao)},`);
    
    lines.push(`          conceptCard: {`);
    lines.push(`            title: 'No dia a dia do Gari...',`);
    lines.push(`            points: [`);
    lines.push(`              { label: 'Dica de Ouro', text: ${JSON.stringify(act.detalhePedagogico)}, iconName: 'Star' }`);
    lines.push(`            ]`);
    lines.push(`          },`);

    if (act.demoInteraction || act.microexemplo) {
      lines.push(`          explanation: {`);
      lines.push(`            text: ${JSON.stringify(act.microexemplo || 'Veja o exemplo visual.')},`);
      if (act.demoInteraction) {
        lines.push(`            interaction: { type: '${act.demoInteraction.type}', data: ${JSON.stringify(act.demoInteraction.data || {})} }`);
      }
      lines.push(`          },`);
    }
    lines.push(`        },`);

    // STEP 3: CHALLENGE
    lines.push(`        {`);
    lines.push(`          id: 'step-${uIndex + 1}-${actIndex + 1}-c',`);
    lines.push(`          type: 'challenge',`);
    lines.push(`          title: 'Mão na Massa!',`);
    lines.push(`          content: ${JSON.stringify(act.comando || 'Resolva o problema a seguir:')},`);
    
    // Assign specific interactions based on global index
    let assignedType = null;
    let assignedData = "{}";

    switch(globalActIndex) {
      case 0: assignedType = 'path-draw'; assignedData = JSON.stringify({target: 6}); break;
      case 1: assignedType = 'measure'; break;
      case 2: assignedType = 'paint'; assignedData = JSON.stringify({target: 12}); break;
      case 3: assignedType = 'area-perimeter-toggle'; break; // cm2 vs m2
      case 4: assignedType = 'grid-compare'; assignedData = JSON.stringify({target1: 18, target2: 18}); break; // 6x3 and 3x6
      case 5: assignedType = 'area-perimeter-toggle'; break; // area vs perimeter
      case 6: assignedType = 'dice'; break; // dice
      case 7: assignedType = 'path-draw'; break; // contorno
      case 8: assignedType = 'grid-compare'; assignedData = JSON.stringify({target1: 25, target2: 21}); break; // 5x5 vs 7x3
      case 9: assignedType = 'paint'; break; // 5 figuras
      case 10: assignedType = 'paint'; break; // blocos lógicos
      case 11: assignedType = 'paint'; break; // chão da praça
      case 12: assignedType = 'roulette'; break; // balões
      case 13: assignedType = 'roulette'; break; // roleta
      case 14: assignedType = 'roulette'; break; // roleta
      case 15: assignedType = 'fraction-pie'; break; // fração pizza
      case 16: assignedType = 'fraction-pie'; assignedData = JSON.stringify({slices: 10, target: 5}); break; // 10 partes
      case 17: assignedType = 'bar-chart'; assignedData = JSON.stringify({categories: ['Papel', 'Plástico', 'Vidro', 'Metal'], targets: [20, 12, 10, 5]}); break; // recicláveis
      case 18: assignedType = 'bar-chart'; break; // massa
      case 19: assignedType = 'fraction-pie'; break; // lixo orgânico
      case 20: assignedType = 'bar-chart'; assignedData = JSON.stringify({categories: ['Seg', 'Ter', 'Qua', 'Qui'], targets: [15, 10, 20, 5]}); break; // estatística
      case 21: assignedType = 'cubes'; break; // caixas isopor
      case 22: assignedType = 'paint'; assignedData = JSON.stringify({target: 24}); break; // quadrados pintados
      case 23: assignedType = 'paint'; break; // mosaico
    }

    if (assignedType) {
      lines.push(`          gariInteraction: { type: '${assignedType}', data: ${assignedData} },`);
    } else {
      if (act.interaction) {
        lines.push(`          gariInteraction: {`);
        lines.push(`            type: '${act.interaction.type}',`);
        lines.push(`            data: ${JSON.stringify(act.interaction.data)}`);
        lines.push(`          },`);
      } else if (act.quiz) {
        lines.push(`          quiz: {`);
        lines.push(`            question: ${JSON.stringify(act.quiz.question)},`);
        lines.push(`            options: ${JSON.stringify(act.quiz.options)},`);
        lines.push(`            correctIndex: ${act.quiz.correctIndex},`);
        lines.push(`            explanationOnSuccess: ${JSON.stringify(act.quiz.explanationOnSuccess)},`);
        lines.push(`            explanationOnError: ${JSON.stringify(act.quiz.explanationOnError)}`);
        lines.push(`          },`);
      }
    }

    lines.push(`          notebookGuide: {`);
    lines.push(`            tips: [${JSON.stringify(act.transicao)}],`);
    lines.push(`            showBorders: false`);
    lines.push(`          }`);

    lines.push(`        }${actIndex === u.activities.length - 1 ? '' : ','}`);
    
    globalActIndex++;
  });
  
  lines.push(`      ]`);
  lines.push(`    }${uIndex === allUnits.length - 1 ? '' : ','}`);
});

lines.push(`  ]`);
lines.push(`};`);

fs.writeFileSync(path.join(__dirname, '../src/data/tracks/trackGari.ts'), lines.join('\n'));
console.log('Successfully generated Gari track with FULL interactivity mapped!');

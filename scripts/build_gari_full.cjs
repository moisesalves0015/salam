const fs = require('fs');
const path = require('path');

const data1 = require('./gen_gari_data1.cjs');
const data2 = require('./gen_gari_data2.cjs');

const allUnits = [...data1, ...data2];

function generateId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const lines = [];

lines.push(`import { Track } from '../../types';`);
lines.push(``);
lines.push(`export const MISSION_DATA: Track = {`);
lines.push(`  id: 'gari-mission',`);
lines.push(`  title: 'Área e Perímetro',`);
lines.push(`  subtitle: 'Um dia de trabalho com um gari',`);
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

allUnits.forEach((u, uIndex) => {
  lines.push(`    {`);
  lines.push(`      id: 'gari-unit-${uIndex + 1}',`);
  lines.push(`      number: ${uIndex + 1},`);
  lines.push(`      title: ${JSON.stringify(u.title)},`);
  lines.push(`      shortDesc: ${JSON.stringify(u.shortDesc)},`);
  lines.push(`      icon: '${u.icon}',`);
  lines.push(`      xpReward: 50,`);
  lines.push(`      color: 'emerald',`);
  lines.push(`      steps: [`);
  
  u.activities.forEach((act, actIndex) => {
    lines.push(`        {`);
    lines.push(`          id: 'step-${uIndex + 1}-${actIndex + 1}',`);
    lines.push(`          title: ${JSON.stringify(act.title)},`);
    if (act.cena) lines.push(`          mascotTip: ${JSON.stringify(act.cena)},`);
    
    // Concept Card with dialogue and explanation
    lines.push(`          conceptCard: {`);
    lines.push(`            title: 'No dia a dia do Gari...',`);
    lines.push(`            paragraphs: [`);
    lines.push(`              ${JSON.stringify('O gari diz: "' + act.fala + '"')},`);
    lines.push(`              ${JSON.stringify('💡 ' + act.explicacao)},`);
    lines.push(`              ${JSON.stringify(act.detalhePedagogico)}`);
    lines.push(`            ]`);
    lines.push(`          },`);
    
    // Explanation block (Demo interaction and microexample)
    if (act.demoInteraction || act.microexemplo) {
      lines.push(`          explanation: {`);
      lines.push(`            text: ${JSON.stringify(act.microexemplo || 'Veja o exemplo visual.')},`);
      if (act.demoInteraction) {
        lines.push(`            interaction: { type: '${act.demoInteraction.type}', data: ${JSON.stringify(act.demoInteraction.data || {})} }`);
      }
      lines.push(`          },`);
    }

    // Interaction block
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
    } else if (act.dragAndDrop) {
      lines.push(`          dragAndDrop: {`);
      lines.push(`            title: ${JSON.stringify(act.dragAndDrop.title)},`);
      lines.push(`            instruction: ${JSON.stringify(act.dragAndDrop.instruction)},`);
      lines.push(`            items: ${JSON.stringify(act.dragAndDrop.items)},`);
      lines.push(`            categories: ${JSON.stringify(act.dragAndDrop.categories)},`);
      lines.push(`            correctMapping: ${JSON.stringify(act.dragAndDrop.correctMapping)},`);
      lines.push(`            successMessage: ${JSON.stringify(act.dragAndDrop.successMessage)}`);
      lines.push(`          },`);
    } else if (act.writtenPrompt) {
      lines.push(`          writtenPrompt: {`);
      lines.push(`            question: ${JSON.stringify(act.writtenPrompt.question)},`);
      lines.push(`            linesNeeded: ${act.writtenPrompt.linesNeeded},`);
      lines.push(`            suggestedAnswer: ${JSON.stringify(act.writtenPrompt.suggestedAnswer)},`);
      lines.push(`            guideline: ${JSON.stringify(act.writtenPrompt.guideline)}`);
      lines.push(`          },`);
    }

    lines.push(`          notebookGuide: {`);
    lines.push(`            instruction: ${JSON.stringify(act.transicao)},`);
    lines.push(`            example: 'Avançando...',`);
    lines.push(`            showBorders: false`);
    lines.push(`          }`);

    lines.push(`        }${actIndex === u.activities.length - 1 ? '' : ','}`);
  });
  
  lines.push(`      ]`);
  lines.push(`    }${uIndex === allUnits.length - 1 ? '' : ','}`);
});

lines.push(`  ]`);
lines.push(`};`);

fs.writeFileSync(path.join(__dirname, '../src/data/tracks/trackGari.ts'), lines.join('\\n'));
console.log('Successfully generated 24-phase trackGari.ts');

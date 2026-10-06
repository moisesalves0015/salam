const data1 = require('./gen_gari_data1.cjs');
const data2 = require('./gen_gari_data2.cjs');
const allActivities = [...data1, ...data2].flatMap(u => u.activities); // extracts all 24 activities

// Group the 24 activities into 7 phases
const groupedUnits = [
  {
    title: 'O mapa e a rota',
    shortDesc: 'Planejamento da varrição',
    icon: 'MapIcon',
    activities: allActivities.slice(0, 3) // 1, 2, 3
  },
  {
    title: 'O m² da praça',
    shortDesc: 'Unidades grandes',
    icon: 'Maximize',
    activities: allActivities.slice(3, 6) // 4, 5, 6
  },
  {
    title: 'Comparando figuras',
    shortDesc: 'Retângulos e formatos',
    icon: 'Grid',
    activities: allActivities.slice(6, 10) // 7, 8, 9, 10
  },
  {
    title: 'Mosaicos e contornos',
    shortDesc: 'Formas complexas',
    icon: 'Puzzle',
    activities: allActivities.slice(10, 13) // 11, 12, 13
  },
  {
    title: 'Sorteios no turno',
    shortDesc: 'Roletas e balões',
    icon: 'Target',
    activities: allActivities.slice(13, 17) // 14, 15, 16, 17
  },
  {
    title: 'Estatística da coleta',
    shortDesc: 'Frações e massas',
    icon: 'PieChart',
    activities: allActivities.slice(17, 21) // 18, 19, 20, 21
  },
  {
    title: 'A revisão final',
    shortDesc: 'Padrões e 3D',
    icon: 'CheckSquare',
    activities: allActivities.slice(21, 24) // 22, 23, 24
  }
];

module.exports = groupedUnits;

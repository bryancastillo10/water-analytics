export const mockNotesData = [
  {
    id: '1',
    title: 'Water Quality Monitoring Overview',
    content: JSON.stringify(
      'Water quality monitoring involves systematic collection and analysis of water samples from various sites to assess environmental health, pollution levels, and ecosystem impacts.',
    ),
    colors: JSON.stringify({
      id: 'color-yellow',
      colorHeader: '#FDD89B',
      colorBody: '#FDF0D3',
      colorText: '#222222',
    }),
    position: JSON.stringify({ x: 305, y: 110 }),
  },
  {
    id: '2',
    title: 'Key Water Quality Parameters',
    content: JSON.stringify(
      'Critical parameters include pH, dissolved oxygen, turbidity, conductivity, and presence of contaminants. Each parameter provides insights into water ecosystem health and potential human-induced stressors.',
    ),
    colors: JSON.stringify({
      id: 'color-pink',
      colorHeader: '#FFB6C1',
      colorBody: '#FFCCE5',
      colorText: '#111000',
    }),
    position: JSON.stringify({ x: 450, y: 250 }),
  },
  {
    id: '3',
    title: 'Water Quality Assessment Sites',
    content: JSON.stringify(
      'Strategic monitoring sites include rivers, lakes, groundwater wells, and coastal areas. Site selection is crucial for comprehensive environmental surveillance and understanding regional water quality variations.',
    ),
    colors: JSON.stringify({
      id: 'color-blue',
      colorHeader: '#8EBDCF',
      colorBody: '#9CC2D1',
      colorText: '#111000',
    }),
    position: JSON.stringify({ x: 200, y: 380 }),
  },
  {
    id: '4',
    title: 'Evaluation and Reporting Protocols',
    content: JSON.stringify(
      'Standardized evaluation protocols involve data collection, laboratory analysis, statistical interpretation, and comprehensive reporting. Regular monitoring helps track long-term environmental trends and inform policy decisions.',
    ),
    colors: JSON.stringify({
      id: 'color-green',
      colorHeader: '#B2D39C',
      colorBody: '#C4E0B0',
      colorText: '#111000',
    }),
    position: JSON.stringify({ x: 600, y: 180 }),
  },
];

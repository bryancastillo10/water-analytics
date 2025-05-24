import { Drop, Cube, Flask, Microscope, type Icon } from '@phosphor-icons/react';

export interface statisticsCardProps {
  id: number;
  parameter: string;
  icon: Icon;
  value: number;
  unit: string;
}

export const statisticsCard: statisticsCardProps[] = [
  {
    id: 1,
    parameter: 'pH Level',
    icon: Drop,
    value: 7.2,
    unit: '',
  },
  {
    id: 2,
    parameter: 'Avg Suspended Solids',
    icon: Cube,
    value: 35,
    unit: 'mg/L',
  },
  {
    id: 3,
    parameter: 'Avg Total COD',
    icon: Flask,
    value: 88,
    unit: 'mg/L',
  },
  {
    id: 4,
    parameter: 'Fecal Coliform',
    icon: Microscope,
    value: 220,
    unit: 'MPN/100mL',
  },
];

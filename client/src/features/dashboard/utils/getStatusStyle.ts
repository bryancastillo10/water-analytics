import { ChartLineUp, ChartLineDown, ArrowsOutLineVertical } from '@phosphor-icons/react';

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Alkaline':
      return {
        trendIcon: ChartLineUp,
        colorClass: 'text-emerald-300',
      };
    case 'Pass':
      return {
        trendIcon: ChartLineDown,
        colorClass: 'text-emerald-300',
      };
    case 'Above Threshold':
      return {
        trendIcon: ChartLineUp,
        colorClass: 'text-rose-300',
      };
    case 'Acidic':
      return {
        trendIcon: ChartLineDown,
        colorClass: 'text-rose-300',
      };
    default:
      return {
        trendIcon: ArrowsOutLineVertical,
        colorClass: 'text-lightYellow',
      };
  }
};

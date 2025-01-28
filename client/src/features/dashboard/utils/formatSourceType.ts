export const formatSourceType = (sourceType: string): string => {
    return sourceType
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
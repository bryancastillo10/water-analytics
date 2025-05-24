export const handleZIndex = (
  card: React.MutableRefObject<HTMLDivElement | null>,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  isOpenDrawer: boolean,
) => {
  const selectedCard = card.current;
  const container = containerRef.current;
  if (!selectedCard || !container) return;
  const allNoteCards = Array.from(container.querySelectorAll('[data-card]')) as HTMLDivElement[];

  if (isOpenDrawer) {
    allNoteCards.forEach(cardElement => {
      cardElement.style.zIndex = '1';
    });
    return;
  }

  allNoteCards.forEach(cardElement => {
    if (cardElement !== selectedCard) {
      cardElement.style.zIndex = '1';
    }
  });
  selectedCard.style.zIndex = '999';
};

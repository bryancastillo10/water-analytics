export const handleZIndex = (
    card: React.MutableRefObject<HTMLDivElement | null>,
    containerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
    const selectedCard = card.current;
    const container = containerRef.current;

    if (!selectedCard || !container) return;

    const allNoteCards = Array.from(container.querySelectorAll('[data-card]')) as HTMLDivElement[];
    allNoteCards.forEach((cardElement) => {
        if (cardElement !== selectedCard) {
            cardElement.style.zIndex = "1";
        }
        selectedCard.style.zIndex = "999";
    })
};
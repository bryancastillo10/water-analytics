export const handleZIndex = (card: React.MutableRefObject<HTMLDivElement | null>) => {
    const selectedCard = card.current;
    if (!selectedCard) return;

    selectedCard.style.zIndex = "999";

    const allNoteCards = Array.from(document.getElementsByClassName("card")) as HTMLDivElement[];
    allNoteCards.forEach((cardElement) => {
        if (cardElement !== selectedCard) {
            const selectedZIndex = parseInt(selectedCard.style.zIndex || "0", 10);
            cardElement.style.zIndex = (selectedZIndex - 1).toString();
        }
    })
};
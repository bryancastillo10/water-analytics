interface ISetNewOffset {
    card: React.MutableRefObject<HTMLDivElement | null>;
    mouseMoveDir?: { x: number, y: number };
}

export const setNewOffset = ({
    card,
    mouseMoveDir = { x: 0 , y: 0}
}: ISetNewOffset) => {
    const cardElement = card.current;

    if (!cardElement) {
        return { x: 0, y: 0 };
    }

    const offsetLeft = cardElement.offsetLeft - mouseMoveDir.x;
    const offsetTop = cardElement.offsetTop - mouseMoveDir.y;

    return {
        x: Math.max(0, offsetLeft),
        y: Math.max(0,offsetTop)
    }
};
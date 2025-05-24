interface ISetNewOffset {
  card: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  mouseMoveDir?: { x: number; y: number };
}

export const setNewOffset = ({
  card,
  mouseMoveDir = { x: 0, y: 0 },
  containerRef,
}: ISetNewOffset) => {
  const cardElement = card.current;
  const containerElement = containerRef.current;

  if (!cardElement || !containerElement) {
    return { x: 0, y: 0 };
  }

  const containerRect = containerElement.getBoundingClientRect();

  const offsetLeft = cardElement.offsetLeft - mouseMoveDir.x;
  const offsetTop = cardElement.offsetTop - mouseMoveDir.y;

  const constrainedX = Math.max(
    0,
    Math.min(containerRect.width - cardElement.offsetWidth, offsetLeft),
  );

  const constrainedY = Math.max(
    0,
    Math.min(containerRect.height - cardElement.offsetHeight, offsetTop),
  );

  return {
    x: constrainedX,
    y: constrainedY,
  };
};

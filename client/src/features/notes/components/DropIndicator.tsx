
const DropIndicator = ({ beforeId, column }: { beforeId: string, column: string }) => {
    return (
      <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-secondary opacity-0"
    />
    )
}

export default DropIndicator;
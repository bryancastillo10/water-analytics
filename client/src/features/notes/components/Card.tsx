import DropIndicator from "@/features/notes/components/DropIndicator";
import type { INotesData } from "@/features/notes/api/interface";
import { motion } from "framer-motion";

interface CardProps{
  id: string;
  title: string;
  column: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: INotesData) => void;
}

const Card = ({
  id,
  title,
  column,
  handleDragStart
}: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layoutId={id}
        layout
        className="rounded border border-dark bg-lightYellow p-3 cursor-grab active:cursor-grabbing"
      >
        <div
          draggable
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, { id, title, column })}
         >
          <p className="text-sm">
            {title}
          </p>
        </div>
      </motion.div>
    </>
  )
}

export default Card;


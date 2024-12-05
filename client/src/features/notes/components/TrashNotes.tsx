import { type SetStateAction, useState } from "react";
import { Trash, Fire } from "@phosphor-icons/react";
import type { INotesData } from "@/features/notes/api/interface";

interface TrashNotesProps {
    setCards: React.Dispatch<SetStateAction<INotesData[]>>
}

const TrashNotes = ({ setCards }: TrashNotesProps) => {
    const [active, setActive] = useState<boolean>(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");
        
        setCards((prev) => prev.filter((card) => card.id !== cardId));
        setActive(false);
    };
  return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`mt-10 grid size-56 shrink-0 place-content-center rounded border text-3xl
        ${active
          ? "border-rose-800 bg-rose-500 text-red-300" 
          : "border-neutral bg-neutral/40 text-darkGray"
        }
    `}>
        {active ? <Fire size={50} className="animate-bounce"/> : <Trash size={50}/>}
    </div>
  )
}

export default TrashNotes;

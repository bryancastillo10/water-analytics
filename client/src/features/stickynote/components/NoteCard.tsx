import { TrashSimple } from "@phosphor-icons/react";
import { Spinner } from "@/assets/svg";

import type { INotesData } from "@/features/stickynote/api/interface";

interface NoteCardProps {
  note: INotesData;
}

const NoteCard = ({ note }: NoteCardProps) => {
  let position = JSON.parse(note.position);

  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.content);
  return (
    <article
      className="w-[450px] rounded-md shadow-md cursor-grab bg-lightYellow text-dark"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {/* Note Header */}
      <div
        className="flex justify-between items-center bg-[#FDD89B] rounded-l-md rounded-r-md px-4 py-3"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <div className="flex items-center gap-3">
          <TrashSimple weight="fill" className="cursor-pointer hover:scale-110 duration-150 ease-out" size="20" />
          <h1 className="font-semibold tracking-wider w-[180px] truncate">
            {note.title}
          </h1>
        </div>  
        <div className="flex items-center gap-3">
          <Spinner className=""/>
          <p className="text-sm font-secondary">Saving...</p>
        </div>
      </div>

      {/* Note Body */}
      <div className="p-[1em]">
        <textarea
          className="bg-inherit w-full h-full text-base resize-none focus:bg-inehirt focus:outline-none"
          defaultValue={body}
        />
      </div>
    </article>
  )
}

export default NoteCard;

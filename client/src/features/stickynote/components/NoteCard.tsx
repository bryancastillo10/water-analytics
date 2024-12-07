import { TrashSimple } from "@phosphor-icons/react";
import { Spinner } from "@/assets/svg";

const NoteCard = () => {
  return (
    <article className="w-96 h-56 rounded-md shadow-md cursor-grab bg-lightYellow text-dark">
      <div className="flex justify-between items-center bg-[#FDD89B] rounded-l-md rounded-r-md px-4 py-3">
        <TrashSimple weight="fill" className="cursor-pointer hover:scale-110 duration-150 ease-out" size="20" />
        <div className="flex items-center gap-3">
          <Spinner className=""/>
          <p className="text-sm font-secondary">Saving...</p>
        </div>
      </div>
      <div className="p-[1em]">
        <textarea
          className="bg-inherit w-full h-full text-base resize-none focus:bg-inehirt focus:outline-none"
        />
      </div>
    </article>
  )
}

export default NoteCard;

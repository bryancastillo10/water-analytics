import { CheckCircle, TrashSimple } from "@phosphor-icons/react";
import { Spinner } from "@/assets/svg";

import useDeleteNote from "@/features/stickynote/hooks/useDeleteNote";
import type { INotesData } from "@/features/stickynote/api/interface";
import { autoGrow, handleZIndex } from "@/features/stickynote/utils";
import { useAppSelector } from "@/lib/redux/hooks";
import useDragAndDropStates from "@/features/stickynote/hooks/useDragAndDropStates";
import useAutoSaveNotes from "../hooks/useAutoSaveNotes";
import useMouseEvent from "../hooks/useMouseEvent";

interface NoteCardProps {
  note: INotesData;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NoteCard = ({ note, containerRef }: NoteCardProps) => {
  const {
    textAreaRef,
    cardRef,
    position,
    keyUpTimer,
    mouseStartPos,
    savedSuccessTimer,
    setSelectedNote,
    setPosition
  } = useDragAndDropStates(note);
  
  const {
    saving,
    savedSuccess,
    setSaving,
    setSavedSuccess,
    saveData
  } = useAutoSaveNotes();
  
  const { callDeleteNote } = useDeleteNote();
  
  const { mouseDown, handleKeyUp } = useMouseEvent(
  {  note,
     mouseStartPos,
     cardRef,
     textAreaRef,
     containerRef,
     savedSuccessTimer,
     keyUpTimer,
     saveData,
     setSelectedNote,
     setPosition,
     setSaving,
     setSavedSuccess});

  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpenDrawer);
  
  const colors = note.colors;
  const content = note.content;
  
  return (
    <article
      data-card="card"
      ref={cardRef}
      className="w-[450px] absolute rounded-md shadow-md cursor-grab bg-lightYellow text-dark"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {/* Note Header */}
      <div
        onMouseDown={mouseDown}
        id="card-header"
        className="flex justify-between items-center bg-[#FDD89B] rounded-l-md rounded-r-md px-4 py-3"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <div className="flex items-center gap-3">
          <TrashSimple
            onClick={() => callDeleteNote(note.id)}
            weight="fill"
            className="cursor-pointer hover:scale-110 duration-150 ease-out"
            size="20"
          />
          <h1 className="font-semibold tracking-wider w-[180px] truncate">
            {note.title}
          </h1>
        </div>  
        {saving ? (
          <div className="flex items-center gap-3">
            <Spinner className="animate-spin"/>
            <p className="text-sm font-secondary">Saving...</p>
          </div>) : savedSuccess ? (
          <div className="flex items-center gap-1">
            <CheckCircle size="22" />
            <p className="text-sm font-secondary">Saved</p>
          </div>
        ): null}
      </div>

      {/* Note Body */}
      <div className="p-[1em]">
        <textarea
          ref={textAreaRef}
          className="bg-inherit w-full h-full text-base resize-none focus:bg-inehirt focus:outline-none"
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            handleZIndex(cardRef, containerRef, isOpenDrawer);
            // handleNoteClick(note);
            autoGrow(textAreaRef);
          }}
          onKeyUp={handleKeyUp}
          defaultValue={content}
        />
      </div>
    </article>
  )
}

export default NoteCard;

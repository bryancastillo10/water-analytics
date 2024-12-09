import React, { useRef, useEffect, useState } from "react";
import { TrashSimple } from "@phosphor-icons/react";
import { Spinner } from "@/assets/svg";

import type { INotesData } from "@/features/stickynote/api/interface";
import { autoGrow, handleZIndex, setNewOffset } from "@/features/stickynote/utils";

interface NoteCardProps {
  note: INotesData;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NoteCard = ({ note, containerRef }: NoteCardProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>(
    JSON.parse(note.position)
  );
  const mouseStartPos = useRef({ x: 0, y: 0 });

  const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "card-header") {
        // setSelectedNote(note);
        mouseStartPos.current = { x: e.clientX, y: e.clientY };

        handleZIndex(cardRef, containerRef);

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }
  };
  
  const mouseMove = (e: MouseEvent) => {
    // 1 to calculate the movement direction
    let mouseMoveDirection = {
        x: mouseStartPos.current.x - e.clientX,
        y: mouseStartPos.current.y - e.clientY
    };

    // 2 to update the starting position on the next move
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
    const newPosition = setNewOffset({
        card: cardRef,
        mouseMoveDir: mouseMoveDirection,
        containerRef: containerRef
    });
    setPosition(newPosition);

};

    // Mouse Up
    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    
        // setNewOffset({ card: cardRef, containerRef });
        // const newPosition =
        // setSaving(true);
        // saveData("position", newPosition, note.$id, setSaving)
        //     .then((success) => {
        //         if (success) {
        //             setSavedSuccess(true);
        //             if (savedSuccessTimer.current) {
        //                 clearTimeout(savedSuccessTimer.current);
        //             }
        //             savedSuccessTimer.current = window.setTimeout(() => {
        //                 setSavedSuccess(false);
        //             }, 1000); 
        //         }
        //     });
    };


  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.content);
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
          ref={textAreaRef}
          className="bg-inherit w-full h-full text-base resize-none focus:bg-inehirt focus:outline-none"
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            handleZIndex(cardRef, containerRef);
            autoGrow(textAreaRef);
          }}
          defaultValue={body}
        />
      </div>
    </article>
  )
}

export default NoteCard;

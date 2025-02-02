import React, { useRef, useEffect, useState } from "react";
import { CheckCircle, TrashSimple } from "@phosphor-icons/react";
import { Spinner } from "@/assets/svg";

import useDeleteNote from "@/features/stickynote/hooks/useDeleteNote";
import type { INotesData } from "@/features/stickynote/api/interface";
import { autoGrow, handleZIndex, setNewOffset } from "@/features/stickynote/utils";
import { useAppSelector } from "@/lib/redux/hooks";
import { useUpdateNotesMutation } from "@/features/stickynote/api/stickynoteApi";
import useNoteContext from "@/features/stickynote/hooks/useNoteContext";

interface NoteCardProps {
  note: INotesData;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const NoteCard = ({ note, containerRef }: NoteCardProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>
    (typeof note.position === "string" ? JSON.parse(note.position) : note.position);
  const mouseStartPos = useRef({ x: 0, y: 0 });


  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const keyUpTimer = useRef<number | null>(null);
  const savedSuccessTimer = useRef<number | null>(null);

  const [updateNotes, { isLoading }] = useUpdateNotesMutation();
  const { callDeleteNote } = useDeleteNote();
  const saveData = async (
    key: string, 
    value: any, 
    noteId: string, 
    setSaving: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const updatedData = { [key]: value };
    try {
      if (isLoading) return false;
      await updateNotes({ id: noteId, notesData: updatedData });
      
      setSaving(false);
      return true;
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const { setSelectedNote } = useNoteContext();
  const isOpenDrawer = useAppSelector((state) => state.drawer.isOpenDrawer);

  const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "card-header") {
        setSelectedNote(note);
        mouseStartPos.current = { x: e.clientX, y: e.clientY };
        
        handleZIndex(cardRef, containerRef, isOpenDrawer);

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
    
        const newPosition = setNewOffset({ card: cardRef, containerRef });    
        setSaving(true);
        saveData("position", newPosition, note.id, setSaving)
            .then((success) => {
                if (success) {
                    setSavedSuccess(true);
                    if (savedSuccessTimer.current) {
                        clearTimeout(savedSuccessTimer.current);
                    }
                    savedSuccessTimer.current = window.setTimeout(() => {
                        setSavedSuccess(false);
                    }, 1000); 
                }
            });
    };
  
  
    const handleKeyUp = () => {
      setSaving(true);
    
      if (keyUpTimer.current) {
        clearTimeout(keyUpTimer.current);
      }
    
      keyUpTimer.current = window.setTimeout(() => {
        saveData("content", textAreaRef?.current!.value, note.id, setSaving)
          .then((success) => {
            if (success) {
              setSavedSuccess(true);
              if (savedSuccessTimer.current) {
                clearTimeout(savedSuccessTimer.current);
              }
              savedSuccessTimer.current = window.setTimeout(() => {
                setSavedSuccess(false);
              }, 1000);
            } else {
              console.error('Failed to save note');
            }
          })
          .catch((error) => {
            console.error('Error saving note:', error);
            setSaving(false);
            setSavedSuccess(false);
          });
      }, 2000);
    }

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  useEffect(() => {
    handleZIndex(cardRef, containerRef, isOpenDrawer);
  }, [isOpenDrawer, cardRef, containerRef]);

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

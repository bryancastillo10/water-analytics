import React, { useEffect } from "react";

import { autoGrow, handleZIndex, setNewOffset } from "@/features/stickynote/utils";
import { useAppSelector } from "@/lib/redux/hooks";

import type { ISaveData } from "@/features/stickynote/hooks/useAutoSaveNotes";
import type { INotesData } from "@/features/stickynote/api/interface";

type CoordinatesType = { x: number; y: number };

interface MouseEventProps {
    note: INotesData;
    
    mouseStartPos: React.MutableRefObject<CoordinatesType>;
    
    cardRef: React.MutableRefObject<HTMLDivElement | null>;
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    
    savedSuccessTimer: React.MutableRefObject<number | null>;
    keyUpTimer: React.MutableRefObject<number | null>;
    
    saveData: ISaveData;
    
    setSelectedNote: React.Dispatch<React.SetStateAction< INotesData | null>>;
    setPosition: React.Dispatch<React.SetStateAction<CoordinatesType>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
    setSavedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMouseEvent = (props: MouseEventProps) => {
    const {
        note,
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
        setSavedSuccess
    } = props;
    
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
    
  return {
      mouseDown,
      handleKeyUp
    };

}

export default useMouseEvent;

import { useState, useRef } from "react";

import type { INotesData } from "@/features/stickynote/api/interface";
import useNoteContext from "@/features/stickynote/hooks/useNoteContext";

const useDragAndDropStates = (note: INotesData) => {
    const { setSelectedNote } = useNoteContext();
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>
      (typeof note.position === "string" ? JSON.parse(note.position) : note.position);
    const mouseStartPos = useRef({ x: 0, y: 0 });


    
    const keyUpTimer = useRef<number | null>(null);
    const savedSuccessTimer = useRef<number | null>(null);

    
    return {
        textAreaRef,
        cardRef,
        position,
        keyUpTimer,
        mouseStartPos,
        savedSuccessTimer,
        setSelectedNote,
        setPosition
    }
}

export default useDragAndDropStates;

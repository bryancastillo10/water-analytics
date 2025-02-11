import { handleZIndex, setNewOffset } from "@/features/stickynote/utils";

import type { INotesData } from "@/features/stickynote/api/interface";
import type { ISaveData } from "@/features/stickynote/hooks/useAutoSaveNotes";


type CoordinatesType = { x: number; y: number };

interface TouchEventProps {
    note: INotesData;
    isOpenDrawer: boolean;
    
    cardRef: React.MutableRefObject<HTMLDivElement | null>;
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    savedSuccessTimer: React.MutableRefObject<number | null>;
    
    saveData: ISaveData;
    setSelectedNote: React.Dispatch<React.SetStateAction<INotesData | null>>;
    setPosition: React.Dispatch<React.SetStateAction<CoordinatesType>>;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
    setSavedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const useTouchEvent = (props: TouchEventProps) => {
    let touchStartPos = { x: 0, y: 0 };
    const {
        note,
        isOpenDrawer,
        cardRef,
        containerRef,
        savedSuccessTimer,
        saveData,        
        setSelectedNote,
        setPosition,
        setSaving,
        setSavedSuccess        
    } = props;
    
    const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && e.target.className === "card-header") {
            setSelectedNote(note);

            const touch = e.touches[0];
            touchStartPos.x = touch?.clientX!;
            touchStartPos.y = touch?.clientY!;

            handleZIndex(cardRef, containerRef, isOpenDrawer);

            document.addEventListener("touchmove", touchMove);
            document.addEventListener("touchend", touchEnd);
        }
    };

    // Touch Move
    const touchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const touchMoveDirection = {
            x: touchStartPos.x - touch?.clientX!,
            y: touchStartPos.y - touch?.clientY!,
        };
    
        touchStartPos.x = touch?.clientX!;
        touchStartPos.y = touch?.clientY!;
    
        const newPosition = setNewOffset({
            card: cardRef,
            mouseMoveDir: touchMoveDirection,
            containerRef
        });
        setPosition(newPosition);

        if (cardRef.current) {
            setPosition({
                x: cardRef.current.offsetLeft - touchMoveDirection.x,
                y: cardRef.current.offsetTop - touchMoveDirection.y,
            });
        }
    };

    // Touch End
    const touchEnd = () => {
        document.removeEventListener("touchmove", touchMove);
        document.removeEventListener("touchend", touchEnd);

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
    
    return {
        touchStart
    }
}

export default useTouchEvent;

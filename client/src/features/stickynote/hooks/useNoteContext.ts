import { useContext } from "react";
import { NoteContext } from "@/features/stickynote/context/NoteContext";

const useNoteContext = () => {
    const { notes, selectedNote, setSelectedNote } = useContext(NoteContext);

    return { notes, selectedNote, setSelectedNote };
}

export default useNoteContext;

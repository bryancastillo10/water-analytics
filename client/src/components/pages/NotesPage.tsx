import { useRef } from "react";
import { TextHeader } from "@/components/common";

import NoteCard from "@/features/stickynote/components/NoteCard";
import Controls from "@/features/stickynote/components/Controls";
import { mockNotesData as notes } from "@/features/stickynote/api/mockData";

import { useAppSelector } from "@/lib/redux/hooks";

const NotesPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <main>
      <TextHeader text="Sticky Notes Board" />
      <div
        ref={containerRef}
        className={`w-full h-screen border mt-2 relative overflow-hidden bg-darkGray/40
            ${theme ? "grid-style-dark border-secondary": "grid-style-light border-primary"}
        `}
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            containerRef={containerRef}
          />
        ))}
        <Controls/>
      </div> 
    </main>
  )
}

export default NotesPage;

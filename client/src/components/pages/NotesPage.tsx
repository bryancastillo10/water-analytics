import { useRef } from "react";
import { TextHeader } from "@/components/common";

import NoteCard from "@/features/stickynote/components/NoteCard";
import Controls from "@/features/stickynote/components/Controls";
import { mockNotesData as notes } from "@/features/stickynote/api/mockData";

const NotesPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <main>
      <TextHeader text="Sticky Notes Board" />
      <div
        ref={containerRef}
        className="w-full h-screen border mt-2 relative bg-neutral/40  border-primary overflow-hidden"
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

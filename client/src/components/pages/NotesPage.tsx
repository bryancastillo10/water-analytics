import { TextHeader } from "@/components/common";

import NoteCard from "@/features/stickynote/components/NoteCard";
import Controls from "@/features/stickynote/components/Controls";
import { mockNotesData as notes } from "@/features/stickynote/api/mockData";

const NotesPage = () => {
  return (
    <main>
      <TextHeader text="Sticky Notes Board" />
      <div className="w-full h-screen border">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))}
        <Controls/>
      </div> 
    </main>
  )
}

export default NotesPage

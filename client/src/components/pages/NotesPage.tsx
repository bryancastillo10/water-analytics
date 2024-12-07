import { TextHeader } from "@/components/common";

import NoteCard from "@/features/stickynote/components/NoteCard";
import Controls from "@/features/stickynote/components/Controls";

const NotesPage = () => {
  return (
    <main>
      <TextHeader text="Sticky Notes Board" />
      <div className="w-full h-screen border">
        <NoteCard />
        <Controls/>
      </div> 
    </main>
  )
}

export default NotesPage

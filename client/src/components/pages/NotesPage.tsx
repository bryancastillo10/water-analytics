import { TextHeader } from "@/components/common";
import KanbanBoard from "@/features/notes/components/KanbanBoard";

const NotesPage = () => {
  return (
    <main>
      <TextHeader text="Task Board" />
      <div className="w-full h-screen">
        <KanbanBoard />
      </div> 
    </main>
  )
}

export default NotesPage

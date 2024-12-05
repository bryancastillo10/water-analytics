import { useState } from "react";

import { mockNotesData } from "@/features/notes/api/mockData";
import type { INotesData } from "@/features/notes/api/interface";

import Column from "@/features/notes/components/Column";
import TrashNotes from "@/features/notes/components/TrashNotes";

const KanbanBoard = () => {
  const [taskCard, setTaskCard] = useState<INotesData[]>(mockNotesData);
  return (
    <div className="flex gap-3 overflow-scroll px-12 py-10">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-dark"
        card={taskCard}
        setCard={setTaskCard}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-600"
        card={taskCard}
        setCard={setTaskCard}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-500"
        card={taskCard}
        setCard={setTaskCard}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-500"
        card={taskCard}
        setCard={setTaskCard}
      />
      <TrashNotes
          setCards={setTaskCard}
      />
    </div>
  )
}

export default KanbanBoard;
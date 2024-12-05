import React, { useState, type SetStateAction } from "react";

import { mockNotesData } from "@/features/notes/api/mockData";
import type { INotesData } from "@/features/notes/api/interface";

interface ColumnProps<T>{
  title: string;
  column: string;
  headingColor: string;
  card: T;
  setCard: React.Dispatch<SetStateAction<T>>
}

const KanbanBoard = () => {
  const [taskCard, setTaskCard] = useState<INotesData[]>(mockNotesData);
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll px-12 py-10">
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
    </div>
  )
}

export default KanbanBoard;



const Column = ({ title, column, headingColor, card, setCard }: ColumnProps<INotesData[]>) => {
  const [active, setActive] = useState<boolean>(false);

  const filteredCards = card.filter((c) => c.column === column);

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: INotesData) => {
  //   e.dataTransfer.setData("cardId", card.id);
  // }
  return (
    <div className="w-56 shrink-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded-full px-2 border border-neutral text-sm text-neutral">
          {filteredCards.length}
        </span>
        <div className="">
          {filteredCards.map((fcard) => {
            return <Card key={fcard.id} {...fcard} />
          })}
        </div>
      </div>
    </div>
  )
};


const Card = () => {
  return (
    <>
    
    </>
  )
};




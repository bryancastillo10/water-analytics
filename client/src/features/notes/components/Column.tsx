import React, { useState, type SetStateAction } from "react";
import type { INotesData } from "@/features/notes/api/interface";

import Card from "@/features/notes/components/Card";
import DropIndicator from "@/features/notes/components/DropIndicator";
import AddCard from "@/features/notes/components/AddCard";

interface ColumnProps<T>{
  title: string;
  column: string;
  headingColor: string;
  card: T;
  setCard: React.Dispatch<SetStateAction<T>>
}

interface IgetNearestIndicator {
  e: React.DragEvent<HTMLDivElement>;
  indicators: Element[];
}


const Column = ({
  title,
  column,
  headingColor,
  card,
  setCard
  }: ColumnProps<INotesData[]>) => {
  const [active, setActive] = useState<boolean>(false);

   const filteredCards = card.filter((c) => c.column === column);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: INotesData) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator({ e, indicators });

    if (el?.element instanceof HTMLElement) {
      el.element.style.opacity = "1";
    }
  };


  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`
      [data-column = "${column}"]
    `));
  };

  const clearHighlights = (elements? : Element[]) => {
    const indicators = elements || getIndicators();

    indicators.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "0";
      }
    })
  }

  const getNearestIndicator = ({ e, indicators }: IgetNearestIndicator) => {
    const DISTANCE_OFFSET = 50;

    const element = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1], 
      }
    );

    return element;
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearHighlights();
    
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();

    const { element } = getNearestIndicator({ e, indicators });
    
    if (element instanceof HTMLElement) {
      const before = element.dataset.before || "-1";

      if (before !== cardId) {
        let copy = [...card];

        let cardTransfer = copy.find((c) => c.id === cardId);
        if (!cardTransfer) return;

        cardTransfer = { ...cardTransfer, column };

        copy = copy.filter((c) => c.id !== cardId);

        const moveBack = before === "-1";

        if (moveBack) {
          copy.push(cardTransfer);
        } else {
          const insertAtIndex = copy.findIndex((element) =>
            element.id === before);
          if (insertAtIndex === undefined) return;

          copy.splice(insertAtIndex, 0, cardTransfer);
        }

        setCard(copy);
      }  
    }

  };
  return (
    <div className="w-56 shrink-0">
      <div className="flex flex-col  justify-between items-center mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}
          <span className="rounded-full ml-2 px-2 border border-neutral text-sm text-neutral">
            {filteredCards.length}
          </span>
        </h3>
       
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-screen w-full transition-colors ${active ? "bg-darkGray/90 " : "bg-neutral"}`}>
          {filteredCards.map((indCard) => {
            return <Card
              key={indCard.id}
              id={indCard.id}
              title={indCard.title}
              column={indCard.column}
              handleDragStart={handleDragStart}
              />
          })}
          <DropIndicator beforeId="-1" column={column} />
          <AddCard column={column} setCard={setCard} />
        </div>
      </div>
    </div>
  )
}

export default Column;

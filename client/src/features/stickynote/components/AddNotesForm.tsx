import { useState, useRef } from "react";
import { Notepad, ChatCircleDots } from "@phosphor-icons/react";

import { FormInput, FormTextarea } from "@/components/ui";
import { FormButtons, DrawerLoadingState } from "@/components/layout";

import { colorOptions } from "@/features/stickynote/constants/colorOptions";
import useCreateNote from "@/features/stickynote/hooks/useCreateNote";
import type { INotesData } from "@/features/stickynote/api/interface";

const initialNotesData = {
  id:"",
  title: "",
  content: "",
  colors: colorOptions[0]!,
  position:JSON.stringify({ x: 80, y: 50 })
}

const AddNotesForm = () => {
  const startingPos = useRef({ x: 80, y: 50 });
  const [newNote, setNewNote] = useState<INotesData>(initialNotesData);
  const { callCreateNote, isLoading } = useCreateNote();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewNote({ ...newNote, [id]: value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preparedNote = {
      ...newNote,
      position: JSON.stringify({
        x: startingPos.current.x,
        y: startingPos.current.y,
      }),
    };

    startingPos.current = {
      x: startingPos.current.x + 50, 
      y: startingPos.current.y + (startingPos.current.x > 400 ? 80 : 0), 
    };

    
    callCreateNote(preparedNote);
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLoading ?
      (<>
      <FormInput
        id="title"
        icon={Notepad}
        label="Note Title"
        value={newNote.title}
        onChange={onChangeInput}
      />
      <FormTextarea
        id="content"
        icon={ChatCircleDots}
        label="Note Content"
        value={newNote.content}
        onChange={onChangeInput}
      />
      </>) :
      <DrawerLoadingState/>
      }
      <FormButtons loading={isLoading} primaryBtnLabel="Add" />
    </form>
  )
}

export default AddNotesForm;

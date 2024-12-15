import { useState, useRef } from "react";
import { Notepad, ChatCircleDots } from "@phosphor-icons/react";

import { FormInput, FormTextarea } from "@/components/ui";
import { FormButtons } from "@/components/layout";

import { colorOptions } from "@/features/stickynote/constants/colorOptions";
import type { INotesData } from "@/features/stickynote/api/interface";
const initialNotesData = {
  id:"",
  title: "",
  content: "",
  colors: colorOptions[0]!,
  position:JSON.stringify({ x: 10, y: 10 })
}

const AddNotesForm = () => {
  const startingPos = useRef<number>(10);
  const [newNote, setNewNote] = useState<INotesData>(initialNotesData);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewNote({ ...newNote, [id]: value });
  };

  startingPos.current += 10;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preparedNote = {
      ...newNote,
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
    };

    startingPos.current += 10;

    console.log("Submitting note:", preparedNote);

    // API Call here
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <FormButtons primaryBtnLabel="Add"/>
    </form>
  )
}

export default AddNotesForm;

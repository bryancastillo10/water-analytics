import { useUpdateNotesMutation, useGetNotesQuery } from "@/features/stickynote/api/stickynoteApi";

import useNoteContext from "@/features/stickynote/hooks/useNoteContext";
import { useToast } from "@/hooks/useToast";
import type { INotesData } from "@/features/stickynote/api/interface";

interface ColorShadeProps<T>{
  color: {
      id: T;
      colorHeader: T;
      colorBody: T;
      colorText:T
  }
}

const ColorShade = ({ color }: ColorShadeProps<string>) => {
  const [ updateNotes ] = useUpdateNotesMutation();
  const { refetch } = useGetNotesQuery();
  const { showToast } = useToast();
  const { selectedNote } = useNoteContext();
  const changeColor = async (selectedNote: INotesData | null) => {
    if (!selectedNote) {
      showToast({
            status:"warning",
            message:"Select a note first before changing colors"    
        });
        return;
    }
    try {

      await updateNotes({
        id: selectedNote.id,
        notesData: {colors:color},
      }).unwrap();
      refetch();

      showToast({
        status: "success",
        message: "Note color updated successfully!",
      });


    } catch (error) {
      console.error("Error updating note color:", error);
      showToast({
        status: "error",
        message: "Failed to update note color. Please try again.",
      });
    }
  };
  
  return (
    <div
      onClick={() => changeColor(selectedNote)}
      className="size-10 my-1 rounded-full cursor-pointer hover:scale-110 duration-150 ease-out"
      style={{ backgroundColor: color.colorHeader }}
    />
  )
}

export default ColorShade;

import React, { useState } from "react";
import { useUpdateNotesMutation } from "@/features/stickynote/api/stickynoteApi";

export interface ISaveData {
    ( key: string, value: any, noteId: string,
      setSaving: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<boolean>;
}
    
const useAutoSaveNotes = () => {
  const [updateNotes, { isLoading }] = useUpdateNotesMutation();
  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const saveData: ISaveData = async (key, value, noteId, setSaving) => {
    const updatedData = { [key]: value };
    try {
      if (isLoading) return false;
      await updateNotes({ id: noteId, notesData: updatedData });
      
      setSaving(false);
      return true;
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };
    
  return {
      saving,
      savedSuccess,
      setSaving,     
      setSavedSuccess,
      saveData
    }
}

export default useAutoSaveNotes;

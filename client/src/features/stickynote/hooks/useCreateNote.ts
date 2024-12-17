import { useCreateNotesMutation } from "@/features/stickynote/api/stickynoteApi";
import type { INotesData } from "@/features/stickynote/api/interface";
import { useToast } from "@/hook/useToast";

const useCreateNote = () => {
    const [createNote, { isLoading }] = useCreateNotesMutation();
    const { showToast } = useToast();

    const callCreateNote = async (note:INotesData) => {
        try {
            if (note.title === "" || note.content === "") {
                showToast({
                    status: "warning",
                    message: "Empty title or content. Please fill it out"
                });
                return;
            }

            const res = await createNote(note).unwrap();
            showToast({
                status: "success",
                message: res.message 
            })
        }
        catch (error: any) {
            showToast({
                status: "error",
                message: error.message || "Failed to add a new note"
            })
        }
    };

    return {
        callCreateNote,
        isLoading
    }
}

export default useCreateNote


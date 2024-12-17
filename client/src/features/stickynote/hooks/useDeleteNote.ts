import { useDeleteNotesMutation } from "@/features/stickynote/api/stickynoteApi";
import { useToast } from "@/hook/useToast";

const useDeleteNote = () => {
    const [deleteNote, { isLoading }] = useDeleteNotesMutation();
    const { showToast } = useToast();

    const callDeleteNote = async (id:string) => {
        try {
            const res = await deleteNote({id}).unwrap();

            showToast({
                status: "success",
                message: res.message
            })
        }
        catch (error: any) {
            showToast({
                status: "error",
                message: error.message || "Failed to delete the selected note"
            })
        }
    };

    return {
        callDeleteNote,
        isLoading
  }
}

export default useDeleteNote;

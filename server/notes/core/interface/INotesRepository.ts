import { NotesData } from "@/notes/core/entity/notes";

export interface INotesRepository {
    createNotes(data: CreateNotesRequest): Promise<NotesData>;
    getNotesByUser(userId: string): Promise<NotesData[]>;
    updateNotes(notesId: string, notes: Partial<NotesDataInput>): Promise<NotesData | null>;
    deleteNotes(notesId: string): Promise<void>;
}

export type NotesDataInput = Omit<NotesData, "id" | "userId" >;

export interface CreateNotesRequest{
    userId: string;
    notesData: NotesData;
}
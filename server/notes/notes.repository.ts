import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateNotesRequest, INotesRepository, NotesDataInput } from "@/notes/core/interface/INotesRepository";
import { NotesData } from "@/notes/core/entity/notes";

export class NotesRepository implements INotesRepository{
    private prisma = new PrismaClient();

    createNotes(data: CreateNotesRequest): Promise<NotesData> {
        throw new Error("Method not implemented.");
    }
    getNotesByUser(userId: string): Promise<NotesData[]> {
        throw new Error("Method not implemented.");
    }
    updateNotes(notesId: string, notes: Partial<NotesDataInput>): Promise<NotesData | null> {
        throw new Error("Method not implemented.");
    }
    deleteNotes(notesId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
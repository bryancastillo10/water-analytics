import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateNotesRequest, INotesRepository, NotesDataInput } from "@/notes/core/interface/INotesRepository";
import { NotesData } from "@/notes/core/entity/notes";
import { DatabaseError } from "@/infrastructure/errors/customErrors";
export class NotesRepository implements INotesRepository{

    private prisma = new PrismaClient();

    async createNotes({userId, notesData}: CreateNotesRequest): Promise<NotesData> {
        try {
            const newNotes = await this.prisma.note.create({
                data: {
                    title: notesData.title,
                    content: notesData.content,
                    isCompleted: Boolean(notesData.isCompleted),
                    userId: userId,
                }
            });

            return newNotes as NotesData;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createNotes method");
              }
             throw Error;
        }
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
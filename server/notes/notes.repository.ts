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

            return newNotes ;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createNotes method");
              }
             throw Error;
        }
    }

    async getNotesByUser(userId: string): Promise<NotesData[]> {
        try {
     
            const allNotes = await this.prisma.note.findMany({
                where: { userId }
            });

            return allNotes as NotesData[];
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createNotes method");
              }
             throw Error;
        }     
    }

    async updateNotes(notesId: string, notes: Partial<NotesDataInput>): Promise<NotesData | null> {
        try {
            const updatedNotes = await this.prisma.note.update({
                where: { id: notesId },
                data: { ...notes }
            })

            return updatedNotes;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createNotes method");
              }
             throw Error;
        }
    }
    async deleteNotes(notesId: string): Promise<void> {
        try {
            await this.prisma.note.delete({
                where: { id: notesId }
            });   
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createNotes method");
              }
             throw Error;
        }
    }
    
}
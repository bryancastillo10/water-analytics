import { NotesRepository } from "@/notes/notes.repository";

import { CreateNotesRequest, UpdateNotesRequest } from "@/notes/core/interface/INotesRepository";
import { ValidationError } from "@/infrastructure/errors/customErrors";

export class NotesService{
    constructor(private readonly notesRepository: NotesRepository) {
        
    }

    async createNotes({userId, notesData}: CreateNotesRequest) {
        if (!userId) {
            throw new ValidationError("User id was not found");
        }

        if (!notesData || !notesData.title || !notesData.content) {
            throw new ValidationError("Title and Content for notes are required");
        }

        const newNotes = await this.notesRepository.createNotes({ userId, notesData });

        return newNotes;
    }

    async getNotesByUser(userId: string) {
        
    }

    async updateNotes({notesId, notesData}: UpdateNotesRequest) {
        
    }

    async deleteNotes(notesId : string) {
        
    }
}
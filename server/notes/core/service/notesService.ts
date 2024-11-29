import { NotesRepository } from "@/notes/notes.repository";

import { CreateNotesRequest, UpdateNotesRequest } from "@/notes/core/interface/INotesRepository";

export class NotesService{
    constructor(private readonly notesRepository: NotesRepository) {
        
    }

    async createNotes({userId, notesData}: CreateNotesRequest) {
        
    }

    async getNotesByUser(userId: string) {
        
    }

    async updateNotes({notesId, notesData}: UpdateNotesRequest) {
        
    }

    async deleteNotes(notesId : string) {
        
    }
}
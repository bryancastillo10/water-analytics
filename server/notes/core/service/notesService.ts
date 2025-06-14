import { NotesRepository } from '@/notes/notes.repository';

import { CreateNotesRequest, NotesDataInput } from '@/notes/core/interface/INotesRepository';
import { ValidationError, NotFoundError } from '@/infrastructure/errors/customErrors';

export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async createNotes({ userId, notesData }: CreateNotesRequest) {
    if (!userId) {
      throw new ValidationError('User id was not found');
    }

    if (!notesData || !notesData.title || !notesData.content) {
      throw new ValidationError('Title and Content for notes are required');
    }

    const newNotes = await this.notesRepository.createNotes({ userId, notesData });

    return newNotes;
  }

  async getNotesByUser(userId: string) {
    if (!userId) {
      throw new ValidationError('User id was not found');
    }

    const userNotes = await this.notesRepository.getNotesByUser(userId);
    if (!userNotes || null) {
      throw new NotFoundError('No sites were found for the user');
    }

    return userNotes;
  }

  async updateNotes(notesId: string, notesData: Partial<NotesDataInput>) {
    if (!notesId) {
      throw new ValidationError('Note ID');
    }

    const updatedNotes = await this.notesRepository.updateNotes(notesId, notesData);

    return updatedNotes;
  }

  async deleteNotes(notesId: string) {
    if (!notesId) {
      throw new ValidationError('Notes ID');
    }

    await this.notesRepository.deleteNotes(notesId);
  }
}

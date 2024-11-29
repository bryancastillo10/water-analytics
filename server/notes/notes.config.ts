import { NotesRepository } from "@/notes/notes.repository";
import { NotesService } from "@/notes/core/service/notesService";
import { NotesController } from "@/notes/notes.controller";


const notesRepository = new NotesRepository();

const notesService = new NotesService(notesRepository);

export const notesController = new NotesController(notesService);
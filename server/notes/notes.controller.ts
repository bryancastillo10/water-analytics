import { Request, Response, NextFunction } from "express";
import { NotesService } from "@/notes/core/service/notesService";

export class NotesController {
    constructor(private readonly notesService: NotesService) {
        this.createNotes = this.createNotes.bind(this);
    }

    async createNotes(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(201).json({ "message": "Notes has been created successfully" });
        }
        catch (error) {
            next(error);
        }
    }

    async getNotesByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const allNotesByUser = "Notes Data";
            res.status(200).json({ notes: allNotesByUser });
        }
        catch (error) {
            next(error);
        }
    }

    async updateNotes(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ "message": "Notes has been updated" });
        }
        catch (error) {
            next(error);
        }
    }

    async deleteNotes(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ "message": "Notes has been deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { NotesService } from "@/notes/core/service/notesService";
import { CustomRequest } from "@/infrastructure/middleware/type";

export class NotesController {
    constructor(private readonly notesService: NotesService) {
        this.createNotes = this.createNotes.bind(this);
        this.getNotesByUser = this.getNotesByUser.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
        this.deleteNotes = this.deleteNotes.bind(this);
    }

    async createNotes(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id!;
            const notesData = req.body;

            const newNotes = await this.notesService.createNotes({userId, notesData});

            res.status(201).json({ "message": "Notes has been created successfully", notes: newNotes });
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
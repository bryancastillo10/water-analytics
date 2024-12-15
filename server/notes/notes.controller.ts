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
            const userId = req.user?.id;
            const notesData = req.body;
            if (!userId) {
                throw new Error("User ID is undefined. Ensure auth middleware is applied");
            }

            const newNotes = await this.notesService.createNotes({userId, notesData});

            res.status(201).json({ "message": "Notes has been created successfully", notes: newNotes });
        }
        catch (error) {
            next(error);
        }
    }

    async getNotesByUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new Error("User ID is undefined. Ensure auth middleware is applied");
            }

            const allNotesByUser = await this.notesService.getNotesByUser(userId);

            res.status(200).json(allNotesByUser);
        }
        catch (error) {
            next(error);
        }
    }

    async updateNotes(req: Request, res: Response, next: NextFunction) {
        try {
            const notesId = req.params.id;
            const notesData = req.body;

            const updatedNotes = await this.notesService.updateNotes(notesId, notesData);

            res.status(200).json({ "message": "Notes has been updated", notes: updatedNotes });
        }
        catch (error) {
            next(error);
        }
    }

    async deleteNotes(req: Request, res: Response, next: NextFunction) {
        try {
            const notesId = req.params.id;

            await this.notesService.deleteNotes(notesId);

            res.status(200).json({ "message": "Notes has been deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
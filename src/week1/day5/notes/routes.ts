import express, { Request, Response } from "express";
import { NotesRoutes } from "./routes.constants";
import {
    validateNote,
    validateNoteBody,
    validateNoteId,
    validateNotePagination,
} from "./validate";
import {
    deleteNote,
    fetchNotes,
    fetchNotesById,
    storeNotes,
    updateNotes,
} from "./store";
import { NoteResult, NotesDetailedResult } from "./types";
export const router = express.Router();

router.post(
    NotesRoutes.getDefaultRoute(),
    validateNoteBody,
    validateNote,
    (req: Request, res: Response) => {
        const title: string = req.body.title,
            body: string = req.body.body;
        const response: NoteResult = storeNotes(title, body);
        return res.status(201).json(response);
    },
);

router.get(
    NotesRoutes.getID(),
    validateNoteId,
    (req: Request, res: Response) => {
        const id: string = req.params.id as unknown as string;
        const response: NoteResult = fetchNotesById(id);

        return res.status(200).json(response);
    },
);

router.get(
    NotesRoutes.getDefaultRoute(),
    validateNotePagination,
    (req: Request, res: Response) => {
        const limit: number = req.pagination!.limit,
            offset: number = req.pagination!.offset;

        const response: NotesDetailedResult = fetchNotes(limit, offset);
        return res.status(200).json(response);
    },
);

router.put(
    NotesRoutes.getID(),
    validateNoteId,
    validateNoteBody,
    validateNote,
    (req: Request, res: Response) => {
        const id: string = req.params.id as unknown as string,
            title: string = req.body.title,
            body = req.body.body;

        const response: NoteResult = updateNotes(title, body, id);
        return res.status(200).json(response);
    },
);

router.delete(
    NotesRoutes.getID(),
    validateNoteId,
    (req: Request, res: Response) => {
        const id: string = req.params.id as unknown as string;

        deleteNote(id);
        return res.status(204).send();
    },
);

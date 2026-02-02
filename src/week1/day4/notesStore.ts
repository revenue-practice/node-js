import { randomUUID } from "node:crypto";
import { Note, NoteResult, NotesDetailedResponse, NotesResponse } from "./type";
import { isEitherUndefinedOrNull } from "../../utils/helper";

let notes = new Map<string, Note>();

export const storeNotes = (title: string, body: string): NotesResponse => {
    const id: string = randomUUID();
    const note: Note = {
        title: title,
        body: body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    notes.set(id, note);

    return { id: id, ...note };
};

export const fetchNotesById = (id: string): NotesResponse => {
    const response: Note | undefined = notes.get(id);
    if (isEitherUndefinedOrNull(response)) return undefined;

    return { id: id, ...response! };
};

export const fetchNotes = (
    limit: number,
    offset: number,
): NotesDetailedResponse => {
    if (!notes.size) return undefined;

    const all = Array.from(notes.entries()).map(([id, n]) => ({ id, ...n }));
    all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const items = all.slice(offset, offset + limit);

    return {
        items,
        total: notes.size,
        limit: Math.min(limit, 50),
        offset: offset,
    };
};

export const updateNotes = (
    title: string,
    body: string,
    id: string,
): NotesResponse => {
    if (!notes.has(id)) return undefined;

    const note: NoteResult = {
        id: id,
        title: title,
        body: body,
        createdAt: notes.get(id)!.createdAt,
        updatedAt: new Date().toISOString(),
    };
    notes.set(id, note);

    return note;
};

export const deleteNote = (id: string): boolean => {
    if (!notes.has(id)) return false;

    notes.delete(id);
    return true;
};

export const __seedNotes = (data: NoteResult[]) => {
    notes = new Map(data.map(({ id, ...note }) => [id, { ...note }]));
};

export const __getNotesUnsafe = (): NoteResult[] =>
    Array.from(notes.entries()).map(([id, note]) => ({
        id,
        ...note,
    }));

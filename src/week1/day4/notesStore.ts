import { randomUUID } from "node:crypto";
import { Note, NotesDetails, NotesError, NotesResponse } from "./type";
import { isEitherUndefinedOrNull } from "../../utils/helper";

let notes: Note[] = [];

export const storeNotes = (title: string, body: string): NotesResponse => {
    const note: Note = {
        id: randomUUID(),
        title: title,
        body: body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    notes.push(note);

    return {
        status: 201,
        message: "Notes created successfully",
    };
};

export const updatedNotes = (
    title: string,
    body: string,
    id: string,
): NotesResponse | NotesError => {
    const fetchNote: Note[] = notes.filter((note: Note) => note.id === id);
    if (!fetchNote.length || isEitherUndefinedOrNull(fetchNote[0]))
        return { status: 404, error: "No record found" };

    const fetchNoteIndex = notes.indexOf(fetchNote[0]);
    const note: Note = {
        id: id,
        title: title,
        body: body,
        created_at: fetchNote[0].created_at,
        updated_at: new Date().toISOString(),
    };
    notes[fetchNoteIndex] = note;

    return {
        status: 200,
        message: "Notes updated successfully",
    };
};

export const fetchNotesById = (
    id: string,
): NotesDetails | NotesResponse | NotesError => {
    const fetchedNote: Note[] = notes.filter((note: Note) => note.id === id);
    if (isEitherUndefinedOrNull(fetchedNote) || !fetchedNote.length)
        return { status: 400, error: "No record found" };

    const response: NotesDetails[] = fetchedNote.map((note: Note) => ({
        status: 200,
        title: note.title,
        body: note.body,
    }));

    return response[0] as NotesDetails;
};

export const fetchNotes = (
    limit: number,
    offset: number,
): NotesDetails[] | NotesError => {
    const fetchedNote: Note[] = notes.slice(offset, offset + limit);
    if (!fetchNotes.length) return { status: 404, error: "Not found" };

    const response: NotesDetails[] = fetchedNote.filter(
        (note: Note) => note.body || note.title,
    );

    return { status: 200, ...response };
};

export const deleteNote = (id: string): NotesResponse | NotesError => {
    const fetchNote: Note[] = notes.filter((note: Note) => note.id === id);
    if (!fetchNote.length || isEitherUndefinedOrNull(fetchNote[0]))
        return { status: 204, error: "No content" };

    const fetchNoteIndex = notes.indexOf(fetchNote[0]);
    notes.splice(fetchNoteIndex, 1);

    return {
        status: 201,
        message: "Note deleted successfully",
    };
};

export const __seedNotes = (data: Note[]) => {
    notes = data.map((n) => ({ ...n }));
};

export const __getNotesUnsafe = () => notes; // optional, test-only

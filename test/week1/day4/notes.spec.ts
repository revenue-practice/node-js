import {
    mockNotes,
    mockNoteParams,
    mockNonExistentNoteParams,
    mockNoteUpdated,
    genericMockNoteParams,
    mockOutOfRangeNotes,
    mockNotesDeleted,
} from "./mock-data";
import {
    storeNotes,
    __seedNotes,
    __getNotesUnsafe,
    updatedNotes,
    fetchNotesById,
    fetchNotes,
    deleteNote,
} from "../../../src/week1/day4/notesStore";
import { createApp } from "../../../src/week1/day4/app";
import { it, expect, vi, beforeEach, describe, afterEach } from "vitest";
import {
    NotesDetails,
    NotesError,
    NotesResponse,
} from "../../../src/week1/day4/type";
import request from "supertest";

describe("Post notes validation", () => {
    const app = createApp();
    it("Error for missing title", async () => {
        const response = await request(app).post("/notes").send({
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title must be a valid string" },
            }),
        );
    });

    it("Error for missing body", async () => {
        const response = await request(app).post("/notes").send({
            title: "Physical Discipline",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body must be a valid string" },
            }),
        );
    });
});

describe("Post notes", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
        const fixedTime = new Date("2026-02-01T02:12:20.000Z");
        vi.setSystemTime(fixedTime);
    });

    it("Insert a new note", () => {
        const mockNotesResponse: NotesResponse = storeNotes(
            mockNoteParams.title,
            mockNoteParams.body,
        );

        const notes = __getNotesUnsafe();
        expect(notes).toHaveLength(mockNotes.length + 1);

        const createdNote = notes.at(-1)!;
        expect(createdNote).toMatchObject({
            title: mockNoteParams.title,
            body: mockNoteParams.body,
        });

        expect(createdNote.id).toBeTypeOf("string");
        expect(createdNote.created_at).toBe(createdNote.updated_at);
        expect(mockNotesResponse).toEqual({
            status: 201,
            message: "Notes created successfully",
        });
    });
});

describe("Update notes validation", () => {
    const app = createApp();
    it("Error for missing title", async () => {
        const response = await request(app).put("/notes/123").send({
            body: "Total abstinence from sexual feelings",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { title: "Title must be a valid string" },
            }),
        );
    });

    it("Error for missing body", async () => {
        const response = await request(app).put("/notes/123").send({
            title: "Physical Discipline",
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual(
            JSON.stringify({
                error: "validation",
                details: { body: "Body must be a valid string" },
            }),
        );
    });
});

describe("Update notes", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
        const fixedTime = new Date("2026-01-21T08:42:10.000Z");
        vi.setSystemTime(fixedTime);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("Id do not exists in Notes", () => {
        const mockNotesResponse: NotesResponse | NotesError = updatedNotes(
            mockNonExistentNoteParams.title,
            mockNonExistentNoteParams.body,
            mockNonExistentNoteParams.id,
        );
        expect(mockNotesResponse).toEqual({
            status: 404,
            error: "No record found",
        });
    });

    it("Update notes", () => {
        const mockNotesResponse: NotesResponse | NotesError = updatedNotes(
            mockNoteUpdated.title,
            mockNoteUpdated.body,
            mockNoteUpdated.id,
        );

        const notes = __getNotesUnsafe();
        expect(notes).toHaveLength(mockNotes.length);

        const updatedNote = notes.find((n) => n.id === mockNoteUpdated.id);
        expect(updatedNote).toBeDefined();
        expect(updatedNote).toMatchObject({
            title: mockNoteUpdated.title,
            body: mockNoteUpdated.body,
        });

        expect(mockNotesResponse).toEqual({
            status: 200,
            message: "Notes updated successfully",
        });
    });
});

describe("Fetch note via Id", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
    });

    it("Check for note which do not exist", () => {
        const mockNotesResponse: NotesDetails | NotesResponse | NotesError =
            fetchNotesById(mockNonExistentNoteParams.id);
        expect(mockNotesResponse).toEqual({
            status: 400,
            error: "No record found",
        });
    });

    it("Fetch note", () => {
        const mockNotesResponse: NotesDetails | NotesResponse | NotesError =
            fetchNotesById(genericMockNoteParams.id);
        expect(mockNotesResponse).toEqual({
            status: 200,
            title: genericMockNoteParams.title,
            body: genericMockNoteParams.body,
        });
    });
});

describe("Fetch notes", () => {
    beforeEach(() => {
        __seedNotes(mockOutOfRangeNotes);
        vi.useFakeTimers();
    });

    it("Should check for limit of notes with offset", () => {
        const mockedResponse: NotesDetails[] | NotesError = fetchNotes(10, 2);
        const refractorMockData = mockOutOfRangeNotes.slice(2, 12);

        expect(mockedResponse).toEqual({ status: 200, ...refractorMockData });
    });
});

describe("Delete notes", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
    });

    it("Should check for limit of notes with offset", () => {
        const mockedResponse: NotesResponse | NotesError = deleteNote(
            mockNoteUpdated.id,
        );

        const notes = __getNotesUnsafe();
        expect(notes).toEqual(mockNotesDeleted);
        expect(mockedResponse).toEqual({
            status: 201,
            message: "Note deleted successfully",
        });
    });
});

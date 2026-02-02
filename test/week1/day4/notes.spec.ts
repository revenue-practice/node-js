import { mockNonExistentId, mockNoteParams, mockNotes } from "./mock-data";
import {
    storeNotes,
    __seedNotes,
    __getNotesUnsafe,
    fetchNotesById,
    fetchNotes,
    updateNotes,
    deleteNote,
} from "../../../src/week1/day4/notesStore";
import { it, expect, vi, beforeEach, describe, afterEach } from "vitest";

describe("Post notes", () => {
    const fixedTime = "2026-02-01T02:12:20.000Z";

    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
        vi.setSystemTime(new Date(fixedTime));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("inserts a new note", () => {
        const response = storeNotes(mockNoteParams.title, mockNoteParams.body);

        const notes = __getNotesUnsafe();

        expect(notes).toHaveLength(mockNotes.length + 1);

        const created = notes.at(-1)!;

        expect(created).toMatchObject({
            title: mockNoteParams.title,
            body: mockNoteParams.body,
            createdAt: fixedTime,
            updatedAt: fixedTime,
        });

        expect(response).toMatchObject({
            title: mockNoteParams.title,
            body: mockNoteParams.body,
            createdAt: fixedTime,
            updatedAt: fixedTime,
        });
    });
});

describe("Fetch note via id", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("returns undefined for non-existent note", () => {
        const response = fetchNotesById(mockNonExistentId);
        expect(response).toBeUndefined();
    });

    it("fetches an existing note", () => {
        const existingId = mockNotes[0].id;

        const response = fetchNotesById(existingId);

        expect(response).toMatchObject({
            id: existingId,
            title: mockNotes[0].title,
            body: mockNotes[0].body,
        });
    });
});

describe("Fetch notes", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("returns notes with limit and offset", () => {
        const response = fetchNotes(1, 1);

        expect(response).toEqual({
            items: [mockNotes[1]],
            total: mockNotes.length,
            limit: 1,
            offset: 1,
        });
    });
});

describe("Update notes", () => {
    const fixedTime = "2026-01-21T08:42:10.000Z";

    beforeEach(() => {
        __seedNotes(mockNotes);
        vi.useFakeTimers();
        vi.setSystemTime(new Date(fixedTime));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns undefined if note does not exist", () => {
        const response = updateNotes(
            "New title",
            "New body",
            mockNonExistentId,
        );

        expect(response).toBeUndefined();
    });

    it("updates an existing note", () => {
        const id = mockNotes[2].id;

        const response = updateNotes("Updated title", "Updated body", id);

        const notes = __getNotesUnsafe();
        const updated = notes.find((n) => n.id === id);

        expect(updated).toMatchObject({
            title: "Updated title",
            body: "Updated body",
            updatedAt: fixedTime,
        });

        expect(response).toMatchObject({
            title: "Updated title",
            body: "Updated body",
        });
    });
});

describe("Delete notes", () => {
    beforeEach(() => {
        __seedNotes(mockNotes);
    });

    it("deletes an existing note", () => {
        const id = mockNotes[2].id;

        const response = deleteNote(id);

        const notes = __getNotesUnsafe();

        expect(notes.find((n) => n.id === id)).toBeUndefined();
        expect(notes).toHaveLength(mockNotes.length - 1);
        expect(response).toBeDefined();
    });
});

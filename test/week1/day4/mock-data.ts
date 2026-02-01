import { Note } from "../../../src/week1/day4/type";

const baseNote: Note = {
    id: "note_00000000-0000-0000-0000-000000000000",
    title: "Base note",
    body: "Base body",
    created_at: "2026-01-20T10:15:30.000Z",
    updated_at: "2026-01-20T10:15:30.000Z",
};

export const mockNoteParams = {
    id: "note_8f3c2a91-7b2d-4f8a-9b3e-2d9f4b6e7c11",
    title: "API validation checklist (updated)",
    body: "All incoming requests must be validated at the router boundary using Zod. Invalid payloads should return 400.",
};

export const mockLengthyParams = {
    id: "note_8fblko491-7b2d-4f84ta-9b3e-2d4yy97o00",
    title: "This is a very long note title designed specifically to exceed the eighty character validation limit number 3",
    body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note",
};

export const mockTrimmedParams = {
    id: "note_8fblko491-7b2d-4f84ta-9b3e-2d4yy97o00",
    title: "This is a very long note title designed specifically to exceed the eighty",
    body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no",
};

export const genericMockNoteParams = {
    id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
    title: "CI pipeline rules",
    body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
};

export const mockNonExistentNoteParams = {
    id: "note_a912bc34-55de-4a12-9cfa-abcdef123456",
    title: "Production readiness checklist",
    body: "Enable logging, health checks, request validation, rate limiting, and proper error handling before release.",
};

export const mockNoteUpdated = {
    id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
    title: "Edge cases to test before release",
    body: "Test empty inputs, very long text, invalid IDs, unauthorized access, and unexpected payload shapes. Edge cases break production, not happy paths.",
    updated_at: "2026-01-21T08:42:10.000Z",
};

export const mockNotes: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
    {
        ...baseNote,
        id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
        title: "Database safety rules",
        body: "Never allow destructive queries without explicit confirmation. Always use transactions for multi-step writes.",
        created_at: "2026-01-23T11:45:00.000Z",
        updated_at: "2026-01-23T11:45:00.000Z",
    },
];

export const mockNotesInserted: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
    {
        ...baseNote,
        id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
        title: "Database safety rules",
        body: "Never allow destructive queries without explicit confirmation. Always use transactions for multi-step writes.",
        created_at: "2026-01-23T11:45:00.000Z",
        updated_at: "2026-01-23T11:45:00.000Z",
    },
    {
        ...baseNote,
        id: "note_8f3c2a91-7b2d-4f8a-9b3e-2d9f4b6e7c11",
        title: "API validation checklist (updated)",
        body: "All incoming requests must be validated at the router boundary using Zod. Invalid payloads should return 400.",
        created_at: "2026-02-01T02:12:20.000Z",
        updated_at: "2026-02-01T02:12:20.000Z",
    },
];

export const mockNotesUpdated: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
    {
        ...baseNote,
        id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
        title: "Edge cases to test before release",
        body: "Test empty inputs, very long text, invalid IDs, unauthorized access, and unexpected payload shapes. Edge cases break production, not happy paths.",
        created_at: "2026-01-23T11:45:00.000Z",
        updated_at: "2026-01-23T11:45:00.000Z",
    },
];

export const mockNotesDeleted: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
];

export const mockLengthyNotes: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
    {
        ...baseNote,
        id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
        title: "Database safety rules",
        body: "Never allow destructive queries without explicit confirmation. Always use transactions for multi-step writes.",
        created_at: "2026-01-23T11:45:00.000Z",
        updated_at: "2026-01-23T11:45:00.000Z",
    },
    {
        ...baseNote,
        id: "note_8fblko491-7b2d-4f84ta-9b3e-2d4yy97o00",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no",
    },
];

export const mockTrimmedNotes: Note[] = [
    {
        ...baseNote,
        id: "note_1c9b4f21-12d3-4c88-baa1-9e0cfa112345",
        title: "CI pipeline rules",
        body: "All pull requests must pass lint, typecheck, tests, and build before merging.",
        created_at: "2026-01-21T07:20:00.000Z",
        updated_at: "2026-01-21T07:20:00.000Z",
    },
    {
        ...baseNote,
        id: "note_77a9e123-4e10-4f91-b5fa-1a2b3c4d5e66",
        title: "Testing strategy",
        body: "Unit tests mock dependencies. Router tests use Supertest. Never hit real external services.",
        created_at: "2026-01-22T09:05:10.000Z",
        updated_at: "2026-01-22T09:05:10.000Z",
    },
    {
        ...baseNote,
        id: "note_f4b3c201-9d21-45a7-82f1-998877665544",
        title: "Database safety rules",
        body: "Never allow destructive queries without explicit confirmation. Always use transactions for multi-step writes.",
        created_at: "2026-01-23T11:45:00.000Z",
        updated_at: "2026-01-23T11:45:00.000Z",
    },
    {
        ...baseNote,
        id: "note_8fblko491-7b2d-4f84ta-9b3e-2d4yy97o00",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for note 25 Body for no",
    },
];

export const mockOutOfRangeNotes: Note[] = [
    {
        id: "note_1",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 1",
        created_at: "2026-01-01T10:00:00.000Z",
        updated_at: "2026-01-01T10:00:00.000Z",
    },
    {
        id: "note_2",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 2",
        created_at: "2026-01-02T10:00:00.000Z",
        updated_at: "2026-01-02T10:00:00.000Z",
    },
    {
        id: "note_3",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 3",
        created_at: "2026-01-03T10:00:00.000Z",
        updated_at: "2026-01-03T10:00:00.000Z",
    },
    {
        id: "note_4",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 4",
        created_at: "2026-01-04T10:00:00.000Z",
        updated_at: "2026-01-04T10:00:00.000Z",
    },
    {
        id: "note_5",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 5",
        created_at: "2026-01-05T10:00:00.000Z",
        updated_at: "2026-01-05T10:00:00.000Z",
    },

    {
        id: "note_6",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 6",
        created_at: "2026-01-06T10:00:00.000Z",
        updated_at: "2026-01-06T10:00:00.000Z",
    },
    {
        id: "note_7",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 7",
        created_at: "2026-01-07T10:00:00.000Z",
        updated_at: "2026-01-07T10:00:00.000Z",
    },
    {
        id: "note_8",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 8",
        created_at: "2026-01-08T10:00:00.000Z",
        updated_at: "2026-01-08T10:00:00.000Z",
    },
    {
        id: "note_9",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 9",
        created_at: "2026-01-09T10:00:00.000Z",
        updated_at: "2026-01-09T10:00:00.000Z",
    },
    {
        id: "note_10",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 10",
        created_at: "2026-01-10T10:00:00.000Z",
        updated_at: "2026-01-10T10:00:00.000Z",
    },

    {
        id: "note_11",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 11",
        created_at: "2026-01-11T10:00:00.000Z",
        updated_at: "2026-01-11T10:00:00.000Z",
    },
    {
        id: "note_12",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 12",
        created_at: "2026-01-12T10:00:00.000Z",
        updated_at: "2026-01-12T10:00:00.000Z",
    },
    {
        id: "note_13",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 13",
        created_at: "2026-01-13T10:00:00.000Z",
        updated_at: "2026-01-13T10:00:00.000Z",
    },
    {
        id: "note_14",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 14",
        created_at: "2026-01-14T10:00:00.000Z",
        updated_at: "2026-01-14T10:00:00.000Z",
    },
    {
        id: "note_15",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 15",
        created_at: "2026-01-15T10:00:00.000Z",
        updated_at: "2026-01-15T10:00:00.000Z",
    },

    {
        id: "note_16",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 16",
        created_at: "2026-01-16T10:00:00.000Z",
        updated_at: "2026-01-16T10:00:00.000Z",
    },
    {
        id: "note_17",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 17",
        created_at: "2026-01-17T10:00:00.000Z",
        updated_at: "2026-01-17T10:00:00.000Z",
    },
    {
        id: "note_18",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 18",
        created_at: "2026-01-18T10:00:00.000Z",
        updated_at: "2026-01-18T10:00:00.000Z",
    },
    {
        id: "note_19",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 19",
        created_at: "2026-01-19T10:00:00.000Z",
        updated_at: "2026-01-19T10:00:00.000Z",
    },
    {
        id: "note_20",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 20",
        created_at: "2026-01-20T10:00:00.000Z",
        updated_at: "2026-01-20T10:00:00.000Z",
    },

    {
        id: "note_21",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 21",
        created_at: "2026-01-21T10:00:00.000Z",
        updated_at: "2026-01-21T10:00:00.000Z",
    },
    {
        id: "note_22",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 22",
        created_at: "2026-01-22T10:00:00.000Z",
        updated_at: "2026-01-22T10:00:00.000Z",
    },
    {
        id: "note_23",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 23",
        created_at: "2026-01-23T10:00:00.000Z",
        updated_at: "2026-01-23T10:00:00.000Z",
    },
    {
        id: "note_24",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 24",
        created_at: "2026-01-24T10:00:00.000Z",
        updated_at: "2026-01-24T10:00:00.000Z",
    },
    {
        id: "note_25",
        title: "This is a very long note title designed specifically to exceed the eighty",
        body: "Body for note 25",
        created_at: "2026-01-25T10:00:00.000Z",
        updated_at: "2026-01-25T10:00:00.000Z",
    },
];

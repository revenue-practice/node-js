export type Note = {
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
};

export type NoteResult = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
};

export type NotesResponse = NoteResult | undefined;
export type NotesDeletionResponse = object | undefined;

export type NotesDetailedResult = {
    items: NoteResult[];
    total?: number;
    limit?: number;
    offset?: number;
};

export type NotesDetailedResponse = NotesDetailedResult | undefined;

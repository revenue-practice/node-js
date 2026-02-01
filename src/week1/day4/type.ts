export type Note = {
    id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
};

export type NotesResponse = {
    status: number;
    message: string;
};

export type NotesError = {
    status: number;
    error: string;
};

export type NotesDetails = {
    statu?: number;
    title: string;
    body: string;
};

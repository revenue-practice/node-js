import express from "express";
import {
    isEitherUndefinedOrNull,
    isEmptyString,
    isInteger,
    isNeitherUndefinedNorNull,
    validationErrorMessage,
} from "../../utils/helper";
import {
    storeNotes,
    fetchNotesById,
    fetchNotes,
    updatedNotes,
    deleteNote,
} from "./notesStore";
import { NotesDetails, NotesError, NotesResponse } from "./type";
export const router = express.Router();

router.use((req, res, next) => {
    if (!JSON.parse(req.body)) res.status(400).json({ error: "invalid json" });
    next();
});

router.post("/", (req, res) => {
    const { title: rawTitle, body: rawBody } = req.body;
    if (!isEmptyString(rawTitle))
        res.status(400).json(
            validationErrorMessage("title", "Title must be a valid string"),
        );
    if (!isEmptyString(rawBody))
        res.status(400).json(
            validationErrorMessage("body", "Body must be a valid string"),
        );

    const title = rawTitle.substring(0, 80);
    const body = rawTitle.substring(0, 2000);

    const response: NotesResponse = storeNotes(title, body);
    return res.status(response.status).json(response.message);
});

router.get("/:id", (req, res) => {
    const id: unknown = req.params.id;
    if (!isEmptyString(id))
        res.status(400).json(
            validationErrorMessage("id", "Id must be a valid string"),
        );

    const response: NotesDetails | NotesResponse | NotesError = fetchNotesById(
        id as string,
    );
    return res.status(response.status!).json(response);
});

router.get("/", (req, res) => {
    const { limit: rawLimit, offset: rawOffset } = req.query;
    if (isNeitherUndefinedNorNull(rawLimit) && !isInteger(rawLimit))
        res.status(400).json(
            validationErrorMessage("limit", "Limit must be a valid integer"),
        );
    if (isNeitherUndefinedNorNull(rawOffset) && !isInteger(rawOffset))
        res.status(400).json(
            validationErrorMessage("offset", "Offset must be a valid integer"),
        );

    const limit: number = isEitherUndefinedOrNull(rawLimit)
        ? 100
        : Number(rawLimit);
    const offset: number = isEitherUndefinedOrNull(rawOffset)
        ? 0
        : Number(rawOffset);
    const response: NotesDetails[] | NotesError = fetchNotes(limit, offset);

    return res
        .status(Array.isArray(response) ? 200 : response.status)
        .json(response);
});

router.put("/:id", (req, res) => {
    const { title: rawTitle, body: rawBody } = req.body;
    const id = req.params.id;

    if (!isEmptyString(rawTitle))
        res.status(400).json(
            validationErrorMessage("title", "Title must be a valid string"),
        );
    if (!isEmptyString(rawBody))
        res.status(400).json(
            validationErrorMessage("body", "Body must be a valid string"),
        );
    if (!isEmptyString(id))
        res.status(400).json(
            validationErrorMessage("id", "Id must be a valid string"),
        );

    const title = rawTitle.substring(0, 80);
    const body = rawTitle.substring(0, 2000);

    const response: NotesResponse | NotesError = updatedNotes(title, body, id);
    return res
        .status(Array.isArray(response) ? 200 : response.status)
        .json(response);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!isEmptyString(id))
        res.status(400).json(
            validationErrorMessage("id", "Id must be a valid string"),
        );

    const response: NotesResponse | NotesError = deleteNote(id);
    return res
        .status(Array.isArray(response) ? 200 : response.status)
        .json(response);
});

module.exports = {
    router,
};

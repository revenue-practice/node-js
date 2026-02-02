import express from "express";
import {
    isEitherUndefinedOrNull,
    isEmptyString,
    isNeitherUndefinedNorNull,
    parseIntQuery,
    validationErrorMessage,
} from "../../utils/helper";
import {
    storeNotes,
    fetchNotesById,
    fetchNotes,
    updateNotes,
    deleteNote,
} from "./notesStore";
import { NotesDetailedResponse, NotesResponse } from "./type";
export const router = express.Router();

router.post("/", (req, res) => {
    const { title, body } = req.body;
    if (isEmptyString(title))
        return res
            .status(400)
            .json(
                validationErrorMessage("title", "Title must be a valid string"),
            );
    if (isEmptyString(body))
        return res
            .status(400)
            .json(
                validationErrorMessage("body", "Body must be a valid string"),
            );

    if (title.length > 80)
        return res
            .status(400)
            .json(
                validationErrorMessage("title", "Title length should be <= 80"),
            );
    if (body.length > 2000)
        return res
            .status(400)
            .json(
                validationErrorMessage("body", "Body length should be <= 2000"),
            );

    const response: NotesResponse = storeNotes(title, body);
    return res.status(201).json(response);
});

router.get("/:id", (req, res) => {
    const id: unknown = req.params.id;
    if (isEmptyString(id))
        return res
            .status(400)
            .json(validationErrorMessage("id", "Id must be a valid string"));

    const response: NotesResponse = fetchNotesById(id as string);
    if (isEitherUndefinedOrNull(response))
        return res.status(404).json({ error: "not found" });

    return res.status(200).json(response);
});

router.get("/", (req, res) => {
    const { limit: rawLimit, offset: rawOffset } = req.query;
    if (
        isNeitherUndefinedNorNull(rawLimit) &&
        !Number.isInteger(parseIntQuery(rawLimit))
    )
        return res
            .status(404)
            .json(
                validationErrorMessage(
                    "limit",
                    "Limit must be a valid integer",
                ),
            );
    if (
        isNeitherUndefinedNorNull(rawOffset) &&
        !Number.isInteger(parseIntQuery(rawOffset))
    )
        return res
            .status(404)
            .json(
                validationErrorMessage(
                    "offset",
                    "Offset must be a valid integer",
                ),
            );

    const limit: number = isEitherUndefinedOrNull(rawLimit)
        ? 20
        : Math.min(Math.max(Number(rawLimit), 1), 50);
    const offset: number = isEitherUndefinedOrNull(rawOffset)
        ? 0
        : Number(rawOffset);
    const response: NotesDetailedResponse = fetchNotes(limit, offset);

    if (isEitherUndefinedOrNull(response))
        return res.status(404).json({ error: "not found" });

    return res.status(200).json(response);
});

router.put("/:id", (req, res) => {
    const { title, body } = req.body;
    const id = req.params.id;

    if (isEmptyString(title))
        return res
            .status(400)
            .json(
                validationErrorMessage("title", "Title must be a valid string"),
            );
    if (isEmptyString(body))
        return res
            .status(400)
            .json(
                validationErrorMessage("body", "Body must be a valid string"),
            );
    if (isEmptyString(id))
        return res
            .status(400)
            .json(validationErrorMessage("id", "Id must be a valid string"));

    if (title.length > 80)
        return res
            .status(400)
            .json(
                validationErrorMessage("title", "Title length should be <= 80"),
            );
    if (body.length > 2000)
        return res
            .status(400)
            .json(
                validationErrorMessage("body", "Body length should be <= 2000"),
            );

    const response: NotesResponse = updateNotes(title, body, id);
    if (isEitherUndefinedOrNull(response))
        return res.status(404).json({ error: "not found" });

    return res.status(200).json(response);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (isEmptyString(id))
        return res
            .status(404)
            .json(validationErrorMessage("id", "Id must be a valid string"));

    const response: boolean = deleteNote(id);
    if (!response) return res.status(404).json({ error: "not found" });

    return res.status(204).send();
});

export default router;

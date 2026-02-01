import express from "express";
import { router as notesRouter } from "./notes";
export const server = express();

server.use(express.json());

server.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

server.use("/notes", notesRouter);

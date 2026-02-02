import express from "express";
import { router as notesRouter } from "./notes";

export function createApp() {
    const server = express();
    server.use(express.json());
    server.use("/notes", notesRouter);

    server.get("/health", (req, res) => {
        res.status(200).json({ ok: true });
    });

    return server;
}

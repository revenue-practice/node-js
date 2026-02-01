import express from "express";
import { router as notesRouter } from "./notes";

export function createApp() {
    const server = express();
    server.use(express.json());

    return server;
}

const server = createApp();
server.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

server.use("/notes", notesRouter);

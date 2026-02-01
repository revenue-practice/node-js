import express from "express";
import { PORT } from "./config";
import { router as notesRouter } from "./notes";

export function createApp() {
    const server = express();
    server.use(express.json());

    server.use("/notes", notesRouter);
    server.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    });

    return server;
}

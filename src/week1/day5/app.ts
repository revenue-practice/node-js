import express from "express";
import { router as notesRouter } from "./notes/routes";
import { router as healthRouter } from "./health/routes";
import { errorHandler } from "./middleware/errors";
import { requestIdHandler } from "./middleware/requestId";
import { loggingRouter } from "./middleware/logger";

export function createApp() {
    const server = express();

    server.use(express.json());
    server.use(requestIdHandler);
    server.use(loggingRouter);

    server.use(healthRouter);
    server.use(notesRouter);
    server.use(errorHandler);

    return server;
}

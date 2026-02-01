import { createApp } from "./app";

const server = createApp();

server.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

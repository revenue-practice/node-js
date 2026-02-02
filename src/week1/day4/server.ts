import { createApp } from "./app";
import { PORT } from "./config";

const server = createApp();

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

import { PORT } from "./config";
import { server } from "./app";

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

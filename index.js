import { httpServer } from "./src/http_server/index.js";
import { wsServer, wsCallback } from "./src/ws_server/index.js";
import 'dotenv/config'

const HTTP_PORT = 8181;
const WS_PORT = process.env.PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start ws server on the ${WS_PORT} port!`);
wsServer.on('connection', (ws) => wsCallback(ws));

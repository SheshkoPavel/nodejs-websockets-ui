import { WebSocketServer } from 'ws';
import 'dotenv/config'

const port = process.env.PORT || 8080;

export const wsServer = new WebSocketServer({ port });

export const wsCallback = (ws) => {
    console.log('Connected <-------', ws);

    ws.send('Hello noob 2!')

    ws.on('message', (message) => {
        console.log(message);
        ws.send(typeof message)

        const parsedMSG = JSON.parse(JSON.stringify(message));
        console.log('parsedMSG <-------', parsedMSG);
        ws.send(typeof parsedMSG)

        if (message === 'hi') {
            ws.send(`Hello, my dear`);
        } else if (message == 'bye') {
            ws.send(`So what?`);
        } else {
            ws.send(`Your message is ${message}`);
        }
    })
};

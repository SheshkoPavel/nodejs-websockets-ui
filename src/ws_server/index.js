import { WebSocketServer } from 'ws';
import 'dotenv/config'

const port = process.env.PORT || 8080;

export const wsServer = new WebSocketServer({ port });

export const wsCallback = (ws) => {
    console.log('Connected <-------', ws);

    ws.send(JSON.stringify('Hello noob!'))

    ws.on('message', (message) => {

        // You need to stringify the json, not calling toString
        // var buf = Buffer.from(JSON.stringify(obj);

        // And for converting string to json obj
        // var temp = JSON.parse(buf.toString());

        const parsedMSG = JSON.parse(message.toString());
        console.log('parsedMSG <-------', parsedMSG);



        if (parsedMSG.type === 'reg') {
            const obj = {
                type: "reg",
                data:
                    {
                        name: '11111',
                        index: 1,
                        error: false,
                        errorText: 'Error string',
                    },
                id: 0,
            };

            obj.data = JSON.stringify(obj.data);

            ws.send(JSON.stringify(obj));
        }

        if (parsedMSG.type === 'create_room') {
            const obj = {
                type: "create_game",
                data:
                    {
                        idGame: 0,
                        idPlayer: 0,
                    },
                id: 0,
            };

            obj.data = JSON.stringify(obj.data);

            ws.send(JSON.stringify(obj));
        }

        // if (message === 'hi') {
        //     ws.send(`Hello, my dear`);
        // } else if (message == 'bye') {
        //     ws.send(`So what?`);
        // } else {
        //     ws.send(JSON.stringify(message));
        // }
    })
};

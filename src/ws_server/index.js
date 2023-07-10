import { WebSocketServer } from 'ws';
import 'dotenv/config'

const port = process.env.PORT || 8080;

export const wsServer = new WebSocketServer({ port });

export const wsCallback = (ws) => {
    console.log('Connected <-------', ws);

    const players = [];

    ws.send(JSON.stringify('Hello friend!'))

    ws.on('message', (message) => {

        // You need to stringify the json, not calling toString
        // var buf = Buffer.from(JSON.stringify(obj);

        // And for converting string to json obj
        // var temp = JSON.parse(buf.toString());

        const parsedMSG = JSON.parse(message.toString());
        console.log('parsedMSG <-------', parsedMSG);


        if (parsedMSG.type === 'reg') {
            parsedMSG.data = JSON.parse(parsedMSG.data || {});
            console.log('parsedMSG <-------', parsedMSG);

            players.push(parsedMSG.data);
            console.log('players <-------', players);

            const obj = {
                type: "reg",
                data:
                    {
                        name: players[0].name,
                        index: players.length,
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

            console.log('players 2 <-------', players);

            const obj2 = {
                type: "update_room",
                data:
                    [
                        {
                            roomId: 0,
                            roomUsers:
                                [
                                    {
                                        name: players[0].name,
                                        index: players.length,
                                    }
                                ],
                        },
                    ],
                id: 0,
            };
            obj2.data = JSON.stringify(obj2.data);

            ws.send(JSON.stringify(obj2));
        }

        if (parsedMSG.type === 'add_ships') {
            parsedMSG.data = JSON.parse(parsedMSG.data || {});
            console.log('parsedMSG <-------', parsedMSG);

            const obj = {
                type: "add_ships",
                data:
                    {
                        gameId: 0,
                        ships:
                            [
                                {
                                    position: {
                                        x: 2,
                                        y: 5,
                                    },
                                    direction: false,
                                    length: 4,
                                    type: "huge",
                                    // type: "small"|"medium"|"large"|"huge",
                                }
                            ],
                        indexPlayer: 0, /* id of the player in the current game */
                    },
                id: 0,
            };

            obj.data = JSON.stringify(obj.data);

            ws.send(JSON.stringify(obj));
        }

        ws.on('error', console.error);

        // if (message === 'hi') {
        //     ws.send(`Hello, my dear`);
        // } else if (message == 'bye') {
        //     ws.send(`So what?`);
        // } else {
        //     ws.send(JSON.stringify(message));
        // }
    })
};

import { StartFunc as StartFuncPortListen } from "./PortListen.js";

import { StartFunc as StartFuncFromEntryFile } from "./Projects/WaV1/entryFile.js";

import { StartFunc as StartFuncKWSServer } from "./Projects/WebSocketServer/V2/entryFile.js";

import express from 'express';
import http from 'http';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
global.__basedir = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

var port = normalizePort(process.env.PORT || '7019');

app.use('/', express.static(path.join(path.resolve(), 'Public')));

app.get('/StartWA', (req, res) => {
    StartFuncFromEntryFile().then();
});

StartFuncKWSServer(server);

server.listen(port, StartFuncPortListen);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};
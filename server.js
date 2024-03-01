/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const port = process.env.PORT || 3000;

app.use('/src', express.static(path.resolve(dirname, '.', 'src')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(dirname, 'index.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`HTTP Server started at http://localhost:${port}`);
});

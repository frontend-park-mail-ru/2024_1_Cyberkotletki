/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compression = require('compression');
const serveStatic = require('serve-static');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

const isDev = process.env.NODE_ENV === 'development';

const config = isDev ? devConfig : prodConfig;

const compiler = webpack(config);

const filename = path.join(compiler.outputPath, 'index.html');

if (!isDev) {
    app.use(compression());
}

app.use(
    serveStatic(path.join(__dirname, '/dist'), {
        maxAge: '1d',
    }),
);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }),
);

app.use('/src', express.static(path.resolve(__dirname, '.', 'src')));

app.use('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

const httpServer = http.createServer(app);
httpServer.listen(port, process.env.HOST || 'localhost', () => {
    console.log(
        `\nHTTP Server started at http://${process.env.HOST || 'localhost'}:${port}\n\n`,
    );
});

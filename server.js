/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const port = process.env.PORT || 3000;
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }),
);

app.use('/src', express.static(path.resolve(__dirname, '.', 'src')));
app.use('/dist', express.static(path.resolve(__dirname, '.', 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`\nHTTP Server started at http://localhost:${port}\n\n`);
});

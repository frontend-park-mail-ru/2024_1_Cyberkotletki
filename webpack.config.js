const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    target: ['web', 'es2017'],
    entry: {
        main: './src/index.tsx',
        sw: './src/sw.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.m?(js|ts|jsx|tsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            { test: /\.svg$/, loader: 'raw-loader' },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: path.join(__dirname, './dist/index.html'),
        }),
    ],
};

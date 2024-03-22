const { merge } = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        compress: true,
    },
    module: {
        rules: [
            ...common.module.rules,
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['./src/styles/mixins.scss'],
                        },
                    },
                ],
            },
        ],
    },
});

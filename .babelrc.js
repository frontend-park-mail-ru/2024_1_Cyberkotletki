const path = require('path');

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
            '@babel/plugin-transform-react-jsx',
            {
                throwIfNamespace: false,
                runtime: 'automatic',
                importSource: path.resolve(__dirname, './src/core'),
            },
        ],
    ],
};

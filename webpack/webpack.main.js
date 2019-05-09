const path = require('path');
const webpack = require('webpack');
// eslit 友好格式化插件
const EslintFriendlyFormatter = require('eslint-friendly-formatter');

const mainConfig = {
    target: 'electron-main',
    entry: {
        main: path.join(__dirname, '../src/main.js'),
    },
    output: {
        filename: '[name].js',
        // libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/electron'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: EslintFriendlyFormatter,
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.node'],
    },
};

module.exports = mainConfig;

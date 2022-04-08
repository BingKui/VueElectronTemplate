const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const mainConfig = {
    target: 'electron-main',
    entry: {
        main: path.join(__dirname, '../src/main.js'),
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/electron'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
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
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: './',
                        name: '[folder]/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: './',
                    name: '[folder]/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: './',
                        name: '[folder]/[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackNotifierPlugin({
            title: '主进程',
            emoji: true,
            contentImage: path.resolve(__dirname, '../icons/icon.png'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@common': path.resolve(__dirname, '../src/common'),
            '@constants': path.resolve(__dirname, '../src/constants'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@feature': path.resolve(__dirname, '../src/feature'),
            '@mock': path.resolve(__dirname, '../src/mock'),
            '@router': path.resolve(__dirname, '../src/router'),
            '@styles': path.resolve(__dirname, '../src/styles'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@views': path.resolve(__dirname, '../src/views'),
        },
        extensions: ['.js', '.json', '.node'],
    },
    node: {
        __dirname: process.env.ENV !== 'prod',
        __filename: process.env.ENV !== 'prod'
    },
};

module.exports = mainConfig;

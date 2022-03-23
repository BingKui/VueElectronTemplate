'use strict';

process.env.ENV = 'prod';
const chalk = require('chalk');
const del = require('del');
// webpack
const webpack = require('webpack');
// loading
const Multispinner = require('multispinner');

const mainConfig = require('../webpack/main');
const rendererConfig = require('../webpack/render');
const { greeting, clearConsole } = require('./utils');

const errorLog = chalk.bgRed.white(' ERROR ') + ' ';
const okayLog = chalk.bgGreen.white(' OK ') + ' ';

// 打包
function build () {
    // 清理控制台
    clearConsole();
    // 打印开始
    greeting('vet build!');

    del.sync(['dist/electron/*', '!.gitkeep']);

    const tasks = ['main', 'render'];
    const m = new Multispinner(tasks, {
        preText: '打包',
        postText: '资源'
    });

    m.on('success', () => {
        greeting('resource build success!');
        console.log(`${okayLog} 资源打包完成，可以执行 ${chalk.yellow('`electron-builder`')} 进行客户端打包\n`);
        process.exit();
    });

    pack(mainConfig).then(result => {
        m.success('main');
    }).catch(err => {
        m.error('main');
        console.log(`\n  ${errorLog} 主进程打包失败`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });

    pack(rendererConfig).then(result => {
        m.success('render');
    }).catch(err => {
        m.error('render');
        console.log(`\n  ${errorLog} 渲染进程打包失败`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });
}

function pack (config) {
    return new Promise((resolve, reject) => {
        config.mode = 'production';
        webpack(config, (err, stats) => {
            if (err) reject(err.stack || err);
            else if (stats.hasErrors()) {
                let err = '';

                stats.toString({
                    chunks: false,
                    colors: true
                })
                    .split(/\r?\n/)
                    .forEach(line => {
                        err += `    ${line}\n`;
                    });

                reject(err);
            } else {
                resolve(stats.toString({
                    chunks: false,
                    colors: true
                }));
            }
        });
    });
}

// 执行打包
build();

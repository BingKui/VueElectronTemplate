// 命令行格式化工具
const chalk = require('chalk');
// 特殊字体输出工具
const { say } = require('cfonts');

/**
 *
 * @param {String} text
 */
const greeting = (text) => {
    say(text, {
        colors: ['#19be6b', '#19be6b', '#19be6b'],
        font: 'chrome',
        space: true,
    });
};

const electronLog = (data, color) => {
    let log = '';
    data = data.toString().split(/\r?\n/);
    data.forEach(line => {
        log += `  ${line}\n`;
    });
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        );
    }
};

const clearConsole = () => {
    const code = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H';
    process.stdout.write(code);
};

const logStats = (proc, data) => {
    let log = '';
    log += chalk.green.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`);
    log += '\n\n';
    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n';
        });
    } else {
        log += `  ${data}\n`;
    }
    log += '\n' + chalk.green.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n';
    console.log(log);
};


module.exports = {
    greeting,
    electronLog,
    clearConsole,
    logStats,
};

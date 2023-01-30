const infoStyle = 'background: #2db7f5;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const warnStyle = 'background: #ff9900;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const errorStyle = 'background: #ed4014;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const successStyle = 'background: #19be6b;color: #fff;font-size: 12px;padding: 5px 8px;border-radius: 2px;';
const logger = {
    _log: (style: string, ...args: any) => {
        const tips = [];
        const vals = [];
        const tip = args[0];
        if (typeof tip === 'string') {
            tips.push(`%c${tip + ''}`);
            tips.push(style);
        }
        for (let i = 1; i < args.length; i++) {
            const item = args[i];
            vals.push(item);
        }
        console.log(...tips, ...vals);
    },
    info: (...args: any) => {
        logger._log(infoStyle, ...args);
    },
    warn: (...args: any) => {
        logger._log(warnStyle, ...args);
    },
    error: (...args: any) => {
        logger._log(errorStyle, ...args);
    },
    success: (...args: any) => {
        logger._log(successStyle, ...args);
    },
};

export default logger;

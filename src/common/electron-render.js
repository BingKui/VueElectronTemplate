const BrowserWindow = require('electron').remote.BrowserWindow;
const BrowserView = require('electron').remote.BrowserView;
const path = require('path');
export const createNewWindow = (name, url) => {
    console.log(__dirname);
    const modalPath = path.join('file:///Users/zl/GitHub_workspace/VueElectronTemplate/src/plugins/test/index.html');
    console.log(modalPath, __dirname);
    let win = new BrowserWindow({ frame: true, name });
    win.on('close', function () { win = null; });
    win.loadURL(modalPath);
    win.show();
    return window;
};

const iTools = {
    getValue: () => {
        return '获取到的值';
    },
};

export const createNewView = (url) => {
    let win = new BrowserWindow({ width: 800, height: 600 });
    win.on('closed', () => {
        win = null;
    });
    let view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
    view.webContents.openDevTools();
    view.webContents.loadURL('file:///Users/zl/GitHub_workspace/VueElectronTemplate/src/plugins/test/index.html');
    console.log(view.webContents);
    // view.webContents.addListener('did-finish-load', () => {
    //     console.log(window);
    // });
    // view.webContents.addListener('dom-ready', (e) => {
    //     console.log(e);
    // });
    view.webContents.focus();
    view.webContents.executeJavaScript(createScriptLabel('https://cdn.bootcss.com/require.js/2.3.6/require.js'), true);
    view.webContents.executeJavaScript('console.log(window)', true);
    view.webContents.executeJavaScript(createScriptLabel('file:///Users/zl/GitHub_workspace/VueElectronTemplate/src/api/api.js'), true);
};

const createScriptLabel = (url) => {
    return `var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '${url}';
    document.body.appendChild(script);`;
};

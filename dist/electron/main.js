module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar _electron = __webpack_require__(/*! electron */ \"electron\");\n\n// eslint-disable-line\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n/**\n * Set `__static` path to static files in production\n * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html\n */\n// if (process.env.NODE_ENV !== 'development') {\n//     global.__static = require('path').join(__dirname, '/static').replace(/\\\\/g,\n//         '\\\\\\\\') // eslint-disable-line\n// }\nvar mainWindow = void 0;\nvar winURL = process.env.ENV === 'dev' ? 'http://localhost:2333' : 'file://' + __dirname + '/index.html';\n\nfunction createWindow() {\n    /**\n     * Initial window options\n     */\n    mainWindow = new _electron.BrowserWindow({\n        title: 'VET',\n        height: 700,\n        width: 900,\n        center: true, // 窗口默认居中\n        // resizable: false, // 不可修改窗口大小\n        // maximizable: false, // 不存在最大化\n        // skipTaskbar: true, // 任务栏显示\n        // useContentSize: false, // 不允许修改大小\n        // transparent: true, // 透明\n        // // frame: false, // 不使用框架\n        // // show: false, // 禁止显示\n        // fullscreenable: false,\n        // titleBarStyle: 'hidden',\n        // backgroundColor: 'none',\n        webPreferences: {\n            scrollBounce: false,\n            nodeIntegration: true\n            // webSecurity: false,\n        }\n    });\n\n    mainWindow.loadURL(winURL);\n\n    mainWindow.on('closed', function () {\n        mainWindow = null;\n    });\n}\n\n_electron.app.on('ready', createWindow);\n\n_electron.app.on('window-all-closed', function () {\n    if (process.platform !== 'darwin') {\n        _electron.app.quit();\n    }\n});\n\n_electron.app.on('activate', function () {\n    if (mainWindow === null) {\n        createWindow();\n    }\n});\n\n/**\n * Auto Updater\n *\n * Uncomment the following code below and install `electron-updater` to\n * support auto updating. Code Signing with a valid certificate is required.\n * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating\n */\n\n/*\nimport { autoUpdater } from 'electron-updater'\n\nautoUpdater.on('update-downloaded', () => {\n  autoUpdater.quitAndInstall()\n})\n\napp.on('ready', () => {\n  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()\n})\n */\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
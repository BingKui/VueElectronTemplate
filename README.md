# VueElectronTemplate

一个用来开发客户端的模板。

## 依赖库

- clean-webpack-plugin：清理文件
- progress-bar-webpack-plugin：打包进度展示
- webpack-build-notifier：打包结果提示
- html-webpack-plugin：页面生成
- mini-css-extract-plugin：抽离css
- uglifyjs-webpack-plugin：压缩代码
- optimize-css-assets-webpack-plugin：压缩css
- friendly-errors-webpack-plugin：友好的展示 webpack 的错误和警告
- happypack：多线程打包
- splitChunks：webpack内置插件，拆分chunk
- DllPlugin：webpack内置插件，预打包
- DllReferencePlugin：webpack内置插件，将预先编译好的模块关联到当前编译中
- HotModuleReplacementPlugin：webpack内置插件，局部刷新
- chalk：命令行工具
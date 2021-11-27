# VueElectronTemplate

一个用来开发客户端的模板。

## 前言

为了更好的学习使用 Electron 开发桌面端客户端，特搭建此项目，作为开发项目的基础框架。

本项目借鉴自 [electron-vue](https://github.com/SimulatedGREG/electron-vue)。

## 环境

Vue 2 + Vue-Router + Vuex + Electron@12 + Webpack 4

## 项目依赖环境

- nodejs: v10.10.0
- electron: v12.2.3
- vue: v2.6.10
- vuex: v3.1.1
- vue-router: v3.0.6
- axios: v0.24.0
- nedb: v1.8.0

## 开发

```bash
# 拉取项目
git clone https://github.com/BingKui/VueElectronTemplate
# 安装依赖
cd VueElectronTemplate
npm install
# 运行开发环境
npm run dev
```

## 基础模板功能

- 系统通知
- 系统托盘
- 自动更新
- 系统设置
- 自定义菜单配置
- 本地数据库支持
- 快捷键配置
- 自定义滚动条模块
- 右键菜单
- 自动打包发布（Windows & Mac），GitHub Action
- 支持M1芯片

## 项目自带组件

- Button: 按钮组件
- Progress: 进度条组件
- ScrollBar: 自定义滚动条组件
- MouseRight: 右键菜单组件

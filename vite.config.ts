import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Autoprefixed from 'autoprefixer';
import PostcssFixes from 'postcss-flexbugs-fixes';
import electron from "vite-plugin-electron";
import commonjsExternals from 'vite-plugin-commonjs-externals';
import { port } from './config';

const externals = ['path', /^electron(\/.+)?$/];

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: port,
  },
  plugins: [
    vue(),
    electron({
      entry: "./electron/main.ts", // 主进程文件
    }),
    commonjsExternals({
      externals,
    }),
  ],
  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@common': resolve(__dirname, './src/common'),
      '@constants': resolve(__dirname, './src/constants'),
      '@components': resolve(__dirname, './src/components'),
      '@feature': resolve(__dirname, './src/feature'),
      '@mock': resolve(__dirname, './src/mock'),
      '@router': resolve(__dirname, './src/router'),
      '@styles': resolve(__dirname, './src/styles'),
      '@stores': resolve(__dirname, './src/stores'),
      '@views': resolve(__dirname, './src/views'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve("src/styles/var.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        // 前缀追加
        Autoprefixed({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%',
          ],
          grid: true,
        }),
        PostcssFixes,
      ],
    }
  },
})

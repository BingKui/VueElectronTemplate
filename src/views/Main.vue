<template>
    <div class="v-main-page">
        <perfect-scrollbar class="scroll-container">
            <Divider orientation="left">项目简介</Divider>
            <div class="desc">此项目为vet项目的iview模板，已实现iview的配置，可直接使用。</div>
            <Divider orientation="left">项目依赖项</Divider>
            <div class="dependencies">
                <div class="dependencies-item" v-for="item in dependencies" :key="item">{{ item }}</div>
            </div>
            <Divider orientation="left">开源声明</Divider>
            <div class="license font-size-sm text-content">
                <div class="license-name">MIT License</div>
                <div class="license-author">Copyright (c) 2019-2022 康兵奎</div>
                <div class="license-part">Permission is hereby granted, free of charge, to any person obtaining a copy<br />
                of this software and associated documentation files (the "Software"), to deal<br />
                in the Software without restriction, including without limitation the rights<br />
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br />
                copies of the Software, and to permit persons to whom the Software is<br />
                furnished to do so, subject to the following conditions:</div>
                <div class="license-part">The above copyright notice and this permission notice shall be included in all<br />
                copies or substantial portions of the Software.</div>
                <div class="license-part">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br />
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br />
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br />
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br />
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br />
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE<br />
                SOFTWARE.</div>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { Divider } from 'view-ui-plus';
import PKG from '../../package.json';
let dependencies: string[] = [];
const obj: any = PKG.dependencies;
for (let key in obj) {
    dependencies.push(`${key}: ${obj[key]}`);
}
</script>

<style scoped lang="less">
.v-main-page {
    // padding: 0 @gap;
    height: 100vh;
    overflow: hidden;
    .scroll-container {
        height: 100vh;
        padding: 10px;
    }
    .desc {
        text-indent: 20px;
    }
    .dependencies {
        padding-left: 20px;
        .dependencies-item {
            font-size: @font-size;
            margin: 3px 0;
        }
    }
    .license {
        padding-left: 20px;
        .license-name,
        .license-author,
        .license-part {
            margin-bottom: @gap;
        }
    }
}
</style>
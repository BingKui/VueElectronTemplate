<template>
    <div class="v-home">
        <Divider orientation="left">项目简介</Divider>
        <div class="desc">此项目为vet项目的iview模板，已实现iview的配置，可直接使用。</div>
        <Divider orientation="left">项目依赖项</Divider>
        <div class="dependencies">
            <div class="dependencies-item">view-design(iview): v4.0.2</div>
            <div class="dependencies-item">nedb: v1.8.0</div>
            <div class="dependencies-item">v-contextmenu: v2.8.0</div>
            <div class="dependencies-item">vue: v2.6.10</div>
            <div class="dependencies-item">vue-router: v3.1.3</div>
            <div class="dependencies-item">vue-scrolly: v0.9.3</div>
            <div class="dependencies-item">vuex: v3.1.1</div>
        </div>
        <Divider orientation="left">开源声明</Divider>
        <div class="license">
            <div class="license-name">MIT License</div>
            <div class="license-author">Copyright (c) 2019 康兵奎</div>
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
    </div>
</template>

<script>
import { Divider } from 'view-design';
export default {
    name: 'Home',
    components: {
        Divider,
    },
};
</script>

<style lang="less" scoped>
.v-home {
    .p-h(@gap);
    .desc {
        text-indent: 20px;
    }
    .dependencies {
        .p-l(20px);
        .dependencies-item {
            .font-size();
            .m-v(3px);
        }
    }
    .license {
        .p-l(20px);
        .license-name,
        .license-author,
        .license-part {
            .font-size-sm();
            .m-b(@gap-md);
        }
    }
}
</style>

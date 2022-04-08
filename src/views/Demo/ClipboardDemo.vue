<template>
    <Page class="v-clipboard-demo" header="粘贴板">
        <Divider content-position="left">复制</Divider>
        <div class="text-content font-size" id="copy-text">点击下方复制按钮，即可复制这段文字。</div>
        <Button @click="copyText">复制</Button>
        <Divider content-position="left">粘贴</Divider>
        <Input class="margin-bottom" placeholder="复制的内容粘贴到此处" disabled v-model="pasteValue" />
        <Button @click="pasteText">粘贴</Button>
    </Page>
</template>

<script>
import { Button, Divider, Input } from 'element-ui';
import { copyText, pasteText } from '@common/common';
import { Page } from '@components';
export default {
    name: 'ClipboardDemo', // 粘贴板操作
    components: {
        Button,
        Divider,
        Input,
        Page,
    },
    data() {
        return {
            pasteValue: '',
        };
    },
    methods: {
        copyText() {
            copyText(document.querySelector('#copy-text').innerHTML);
        },
        pasteText() {
            this.pasteValue = pasteText();
        },
    },
};
</script>

<style lang="less" scoped>
.v-clipboard-demo {
    .el-button {
        margin-top: @gap;
    }
}
</style>

<template>
    <div class="v-clipboard-demo">
        <Divider orientation="left">复制</Divider>
        <div id="copy-text">点击下方复制按钮，即可复制这段文字。</div>
        <Button @click="copyText">复制</Button>
        <Divider orientation="left">粘贴</Divider>
        <Input placeholder="复制的内容粘贴到此处" disabled v-model="pasteValue" />
        <Button @click="pasteText">粘贴</Button>
    </div>
</template>

<script>
import { Button, Divider, Input } from 'view-design';
import { Copy, PasteValue } from '@common/common';
export default {
    name: 'ClipboardDemo', // 粘贴板操作
    components: {
        Button,
        Divider,
        Input,
    },
    data() {
        return {
            pasteValue: '',
        };
    },
    methods: {
        copyText() {
            Copy(document.querySelector('#copy-text').innerHTML);
        },
        pasteText() {
            this.pasteValue = PasteValue();
        },
    },
};
</script>

<style lang="less" scoped>
.v-clipboard-demo {
    .p-h(@gap);
    .ivu-btn {
        .m-t(@gap);
    }
}
</style>

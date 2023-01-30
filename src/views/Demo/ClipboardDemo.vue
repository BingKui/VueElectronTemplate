<template>
    <Page class="v-clipboard-demo" header="粘贴板">
        <Divider orientation="left">复制</Divider>
        <div class="text-content font-size" id="copy-text">点击下方复制按钮，即可复制这段文字。</div>
        <Button @click="handleCopyText">复制</Button>
        <Divider orientation="left">粘贴</Divider>
        <Input class="margin-bottom" placeholder="复制的内容粘贴到此处" disabled v-model="pasteValue" />
        <Button @click="handlePasteText">粘贴</Button>
    </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Divider, Button, Input } from 'view-ui-plus';
import Page from '@components/Page.vue';
import { copyText, pasteText } from '@common/render';
import { successTip } from '@/common/tip';
const pasteValue = ref<string>('');

const handleCopyText = () => {
    copyText(document.querySelector('#copy-text')?.innerHTML || '');
    successTip('复制成功');
}
const handlePasteText = () => {
    pasteValue.value = pasteText();
    successTip('粘贴成功');
}
</script>

<style scoped lang="less">

</style>
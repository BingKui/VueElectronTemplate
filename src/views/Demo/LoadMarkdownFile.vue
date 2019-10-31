<template>
    <div class="v-load-markdown-file">
        <Divider orientation="left">Markdown文件内容</Divider>
        <div class="markdown-file-content">{{fileText}}</div>
    </div>
</template>

<script>
import { Divider } from 'view-design';
import { loadMarkdownFile } from '@common/utils';
export default {
    name: 'LoadMarkdownFile', // 加载markdown文件
    components: {
        Divider,
    },
    data() {
        return {
            fileText: loadMarkdownFile('test'),
        };
    },
};
</script>

<style lang="less" scoped>
.v-load-markdown-file {
    .p-h(@gap);
}
</style>

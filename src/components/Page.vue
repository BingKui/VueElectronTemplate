<template>
    <div class="v-page-framework">
        <Header v-if="header" :title="header" />
        <perfect-scrollbar :class="`framework-container ${header ? 'has-header' : ''}`">
            <slot></slot>
        </perfect-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Header from './Header.vue';
const props = defineProps<{ header: string; }>();
const { header } = toRefs(props);
</script>

<style scoped lang="less">
.v-page-framework {
    height: 100vh;
    width: 100%;

    .framework-container {
        height: 100vh;
        width: 100%;
        padding: @gap;
        &.has-header {
            height: calc(100vh - @header-height);
        }
    }
}
</style>

<template>
    <div class="v-header flex-row">
        <div v-if="!isHideBack" class="back-action flex-row-center" @click="handleBack">
            <Left theme="outline" size="32" fill="#333" :strokeWidth="3"/>
        </div>
        <div class="flex-item-one font-size-md font-weight-bold text-title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { Left } from '@icon-park/vue-next';
const props = defineProps<{ isHideBack?: boolean; title: string; }>();
const { isHideBack, title } = toRefs(props);
const router = useRouter();
const handleBack = () => {
    router.back();
};
</script>

<style scoped lang="less">
.v-header {
    height: @header-height;
    background-color: @white;
    border-bottom: @border-mini;
    user-select: none;
    -webkit-app-region: drag;

    .back-action {
        height: @header-height;
        width: @header-height;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
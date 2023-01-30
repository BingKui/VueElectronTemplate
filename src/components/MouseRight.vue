<template>
    <div class="v-mouse-right">
        <div class="mouse-content" @contextmenu="handleContextMenu">
            <slot></slot>
        </div>
        <context-menu v-if="mouseData && mouseData.length > 0" :name="name">
            <MouseItem v-for="(item, i) in mouseData" :key="`${i}_${item.text}`" :item="item" :mouseKey="mouseKey" />
        </context-menu>
    </div>
</template>

<script setup lang="ts">
import { toRefs, inject } from 'vue';
import { MouseDataItem } from '@/types';
import MouseItem from './MouseItem.vue';
const props = defineProps<{ name: string, mouseData: MouseDataItem[], mouseKey: string | number | object }>();
const { name, mouseData, mouseKey } = toRefs(props);
const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void;

const handleContextMenu = (e: any) => {
    emitContext(e, { name })
}
</script>

<style scoped>

</style>
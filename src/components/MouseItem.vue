<template>
    <context-menu-submenu v-if="item.group?.length" :label="item.text" :divider="item.sperator">
        <MouseItem v-for="(temp, i) in item.group" :key="`${i}_${temp.text}`" :item="temp" :mouseKey="mouseKey" />
    </context-menu-submenu>
    <context-menu-item v-else @click="() => !item.disabled && item.action(mouseKey)" :divider="item.sperator" :disabled="item.disabled">{{ item.text }}</context-menu-item>
</template>

<script setup lang="ts">
import { MouseDataItem } from "@/types";
import { toRefs } from "vue";
const props = defineProps<{ item: MouseDataItem, mouseKey: any }>();
const { item, mouseKey } = toRefs(props);
</script>

<style scoped>

</style>
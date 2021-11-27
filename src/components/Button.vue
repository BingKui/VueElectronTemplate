<template>
    <button :class="`v-button v-button-${type} v-button-${size} ${ghost ? 'ghost' : ''}`" :disabled="disabled" v-bind="$attrs" v-on="$listeners">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'Button', // 按钮
    props: {
        disabled: { // 是否禁用
            type: Boolean,
            default: false,
        },
        ghost: { // 是否是幽灵按钮
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'default',
        },
        size: {
            type: String,
            default: 'middle', // small, middle, larger
        },
    },
};
</script>

<style lang="less" scoped>
.v-button {
    line-height: 1.499;
    outline: none;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;

    color: @content-color;
    background-color: @white;
    border: @border;
    &:active {
        opacity: .7;
    }
    &.ghost {
        background-color: transparent !important;
    }
    &.v-button-small {
        height: 26px;
        padding: 0 @gap;
        font-size: @font-size-sm;
    }
    &.v-button-middle {
        height: 32px;
        padding: 0 @gap-md;
        font-size: @font-size;
    }
    &.v-button-larger {
        height: 38px;
        padding: 0 @gap-md;
        font-size: @font-size-md;
    }
    &.v-button-primary {
        color: @white;
        background-color: @primary;
        border-color: @primary;
        &.ghost {
            color: @primary;
        }
    }
    &.v-button-info {
        color: @white;
        background-color: @info;
        border-color: @info;
        &.ghost {
            color: @info;
        }
    }
    &.v-button-warn {
        color: @white;
        background-color: @warn;
        border-color: @warn;
        &.ghost {
            color: @warn;
        }
    }
    &.v-button-success {
        color: @white;
        background-color: @success;
        border-color: @success;
        &.ghost {
            color: @success;
        }
    }
    &.v-button-danger {
        color: @white;
        background-color: @danger;
        border-color: @danger;
        &.ghost {
            color: @danger;
        }
    }
}
.v-button[disabled] {
    color: @disable-color;
    background-color: #f5f5f5;
    border-color: @border-color;
    text-shadow: none;
    box-shadow: none;
}
</style>

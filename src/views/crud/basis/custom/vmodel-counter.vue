<template>
  <el-tooltip content="点击我自增">
    <el-tag :type="color" @click="onClick">
      <!-- 插槽示例 -->
      <slot></slot>
      <span> {{ modelValue }}</span>
    </el-tag>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "VmodelCounter",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "success"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    function onClick() {
      //发射modelValue更新事件，父组件引用时只需要v-model={xxx}即可
      ctx.emit("update:modelValue", props.modelValue + 1);
    }
    watch(
      () => {
        return props.modelValue;
      },
      (value) => {
        ctx.emit("change", value);
      }
    );
    return {
      onClick
    };
  }
});
</script>

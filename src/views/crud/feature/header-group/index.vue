<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFs, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FeatureHeaderGroup",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
    useFs({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
    // 页面打开后获取列表数据
    onMounted(async () => {
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

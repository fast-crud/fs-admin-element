<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { useFs } from "@fast-crud/fast-crud";
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FormText",
  setup() {
    // crud组件的ref
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

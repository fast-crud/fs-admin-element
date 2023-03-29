<template>
  <fs-crud ref="crudRef" v-bind="crudBinding">
    <template #actionbar-right>
      <el-alert type="warning" class="ml-1" title="左侧表格点击行可以触发这里的查询" />
    </template>
  </fs-crud>
</template>

<script lang="ts">
import { useFs } from "@fast-crud/fast-crud";
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "AsideTable",
  setup() {
    // crud组件的ref
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      setSearchFormData: crudExpose.setSearchFormData,
      doRefresh: crudExpose.doRefresh
    };
  }
});
</script>

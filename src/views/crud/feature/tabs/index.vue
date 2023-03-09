<template>
  <fs-page>
    <template #header>
      <div class="title">
        Tabs快捷查询
        <span class="sub">表格顶部显示tabs,点击tabs快捷查询</span>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFs, UseFsProps } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FeatureTabs",
  setup() {
    const customValue: any = {}; //自定义变量，传给createCrudOptions的额外参数（可以任意命名，任意多个）
    const { crudBinding, crudRef, crudExpose, customExport } = useFs({ createCrudOptions, customValue } as UseFsProps);

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

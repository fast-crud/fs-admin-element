<template>
  <fs-page>
    <template #header>
      <div class="title">
        列设置
        <span class="sub">列设置可以禁用或者隐藏某字段勾选</span>
      </div>
      <div class="more"></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue";
import createCrudOptions from "./crud.jsx";
import { useFs, CrudBinding, UseFsProps } from "@fast-crud/fast-crud";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "BasisColumnsSet",
  setup() {
    const customValue: any = {}; //自定义变量，传给createCrudOptions的额外参数（可以任意命名，任意多个）
    const { crudBinding, crudRef, crudExpose, context } = useFs({ createCrudOptions, context: customValue });

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

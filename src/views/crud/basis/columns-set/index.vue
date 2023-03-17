<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-alert class="ml-1" type="warning" title="列设置可以禁用或者隐藏某字段勾选" />
        <el-button @click="columnsSetToggleMode()"> 切换简单模式 </el-button>
      </template>
    </fs-crud>
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

    function columnsSetToggleMode() {
      crudBinding.value.toolbar.columnsFilter.mode =
        crudBinding.value.toolbar.columnsFilter.mode === "simple" ? "default" : "simple";
      ElMessage.info("当前列设置组件的模式为：" + crudBinding.value.toolbar.columnsFilter.mode);
    }

    return {
      crudBinding,
      crudRef,
      columnsSetToggleMode
    };
  }
});
</script>

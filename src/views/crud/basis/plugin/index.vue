<template>
  <fs-page>
    <template #header>
      <div class="title">
        CrudOptionsPlugin
        <span class="sub"
          >用于合并CrudOptions，做一些可配置化的公共参数；此处演示使用rowSelectionPlugin生成行选择配置,支持跨页选择</span
        >
      </div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/settings.html#plugins">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #pagination-left>
        <el-tooltip content="批量删除">
          <fs-button icon="ion:trash-outline" @click="handleBatchDelete"></fs-button>
        </el-tooltip>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFs } from "@fast-crud/fast-crud";
import { BatchDelete } from "./api";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  name: "BasisPlugin",
  setup() {
    const { crudBinding, crudRef, crudExpose, context } = useFs({ createCrudOptions });
    const selectedRowKeys = context.selectedRowKeys;
    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    const handleBatchDelete = async () => {
      if (selectedRowKeys.value?.length > 0) {
        await ElMessageBox.confirm(`确定要批量删除这${selectedRowKeys.value.length}条记录吗`, "确认");
        await BatchDelete(selectedRowKeys.value);
        ElMessage.info("删除成功");
        selectedRowKeys.value = [];
        crudExpose.getBaseTableRef().clearSelection();
        await crudExpose.doRefresh();
      } else {
        ElMessage.error("请先勾选记录");
      }
    };
    return {
      crudBinding,
      crudRef,
      handleBatchDelete
    };
  }
});
</script>

<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <span>示例说明：1、勾选记录，然后点击下方pagination左边的删除按钮进行批量删除。2、第一条记录配置为不可选</span>
      </template>
      <template #pagination-left>
        <el-tooltip content="批量删除">
          <fs-button icon="ion:trash-outline" @click="handleBatchDelete"></fs-button>
        </el-tooltip>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useExpose, useCrud } from "@fast-crud/fast-crud";
import { ElMessage, ElMessageBox } from "element-plus";
import { BatchDelete } from "./api";
export default defineComponent({
  name: "FeatureSelection",
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const { expose } = useExpose({ crudRef, crudBinding });
    // 你的crud配置
    const { crudOptions, selectedIds } = createCrudOptions({ expose });
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ expose, crudOptions });
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

    // 页面打开后获取列表数据
    onMounted(() => {
      expose.doRefresh();
    });

    const handleBatchDelete = async () => {
      if (selectedIds.value?.length > 0) {
        await ElMessageBox.confirm(`确定要批量删除这${selectedIds.value.length}条记录吗`, "确认");
        await BatchDelete(selectedIds.value);
        ElMessage.info("删除成功");
        selectedIds.value = [];
        await expose.doRefresh();
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

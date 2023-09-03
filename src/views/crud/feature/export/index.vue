<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #toolbar-left>
        <span class="ml-5">
          导出文件类型
          <el-select v-model="fileType">
            <el-option value="excel">Excel</el-option>
            <el-option value="csv">CSV</el-option>
          </el-select>
        </span>
        <span class="ml-5">
          数据来源
          <el-select v-model="dataFrom">
            <el-option value="search">查询</el-option>
            <el-option value="local">本页数据</el-option>
          </el-select>
        </span>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useFs } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FeatureExport",
  setup() {
    const fileType = ref("excel");
    const dataFrom = ref("search");
    const context = {
      fileType,
      dataFrom
    };
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions, context });
    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      ...context
    };
  }
});
</script>

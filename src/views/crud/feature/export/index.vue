<template>
  <fs-page>
    <template #header>
      <div class="title">导出</div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/toolbar.html#export">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #toolbar-left>
        <fs-label class="ml-5" label="导出文件类型">
          <el-select v-model="fileType">
            <el-option value="excel">Excel</el-option>
            <el-option value="csv">CSV</el-option>
          </el-select>
        </fs-label>
        <fs-label class="ml-5" label="数据来源">
          <el-select v-model="dataFrom">
            <el-option value="search">查询</el-option>
            <el-option value="local">本页数据</el-option>
          </el-select>
        </fs-label>
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

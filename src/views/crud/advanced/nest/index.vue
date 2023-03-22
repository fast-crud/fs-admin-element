<template>
  <el-row class="demo-nest" :gutter="0">
    <el-col :span="12">
      <fs-crud ref="crudRef" v-bind="crudBinding">
        <template #actionbar-right>
          <el-alert type="warning" class="ml-1" title="<--对话框内嵌套子表格" />
        </template>
      </fs-crud>
    </el-col>
    <el-col :span="12">
      <aside-table ref="asideTableRef" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFs } from "@fast-crud/fast-crud";
import AsideTable from "./aside-table/index.vue";
export default defineComponent({
  name: "FeatureNest",
  // eslint-disable-next-line vue/no-unused-components
  components: { AsideTable },
  setup() {
    // 你的crud配置
    const asideTableRef = ref();

    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions, context: { asideTableRef } });

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      asideTableRef
    };
  }
});
</script>
<style lang="less">
.demo-nest {
  height: 100%;
  width: 100%;
}
</style>

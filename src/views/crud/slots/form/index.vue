<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-alert class="ml-1" type="info" title=" ← 在表单的各个位置都可以插入自定义内容" />
      </template>

      <template #form-header-left>
        <el-tag color="danger">form-header-left插槽</el-tag>
      </template>
      <template #form-header-right>
        <el-tag color="danger">form-header-right插槽</el-tag>
      </template>
      <template #form-header-action-left>
        <el-tag color="danger">form-header-action-left插槽</el-tag>
      </template>
      <template #form-header-action-right>
        <el-tag color="danger">form-header-action-right插槽</el-tag>
      </template>
      <template #form-body-top>
        <el-alert type="warning" title="form-body-top 插槽" />
      </template>
      <template #form-body-bottom>
        <el-alert type="warning" title="form-body-bottom 插槽" />
      </template>

      <template #form-body-left>
        <el-alert type="warning" title="form-body-left 插槽" />
      </template>
      <template #form-body-right>
        <el-alert type="warning" title="form-body-right 插槽" />
      </template>

      <template #form-footer-left>
        <el-button type="danger">form-footer-left 插槽</el-button>
      </template>
      <template #form-footer-right>
        <el-button type="danger">form-footer-right 插槽</el-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useCrud, useExpose } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
export default defineComponent({
  name: "SlotsForm",
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const { expose } = useExpose({ crudRef, crudBinding });
    // 你的crud配置
    const { crudOptions } = createCrudOptions({ expose });
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ expose, crudOptions });
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

    // 页面打开后获取列表数据
    onMounted(() => {
      expose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

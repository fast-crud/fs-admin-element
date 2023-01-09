<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-alert class="ml-1" type="info" title="单列模式" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useFs, useDrag } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
export default defineComponent({
  name: "FormSingleColumn",
  setup() {
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

    const visibleRef = ref(false);
    // 页面打开后获取列表数据
    onMounted(async () => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

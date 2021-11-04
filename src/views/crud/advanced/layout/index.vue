<template>
  <fs-page>
    <fs-crud ref="crudRef" custom-class="demo-layout" v-bind="crudBinding">
      <template #header-top>
        <el-alert class="ml-1" type="warning" title="修改样式【flex子元素的order】可以调整布局顺序" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
export default defineComponent({
  name: "FeatureLayout",
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

<style lang="less">
.demo-layout {
  .fs-crud-header {
    flex-direction: row;
    justify-content: space-between;
    .fs-crud-actionbar {
      order: 1;
      flex: 0;
    }
    .fs-crud-search {
      order: 2;
      width: auto;
      padding-bottom: 0;
    }
    .fs-crud-toolbar {
      order: 4;
    }
  }
}
</style>

<template>
  <fs-page>
    <fs-crud ref="crudRef" custom-class="demo-button" v-bind="crudBinding">
      <template #actionbar-right>
        <el-alert
          class="ml-1"
          type="warning"
          message="将fs-crud.vue的源码复制出来自己修改布局，此处演示把翻页组件挪到上面来，你可以将这个自定义的fs-crud.vue全局注册为公共组件（注意：后续升级fs可能会由于fs-crud的逻辑与官方不同步出现不可知的问题）"
        />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import FsCrud from "./fs-crud.vue";
export default defineComponent({
  name: "FeatureCustomLayout",
  components: { FsCrud },
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
.demo-button {
  .fs-search {
    .ant-form-item {
      width: 23%;
    }
    .ant-form-item-label {
      width: 90px;
    }

    .fs-search-btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

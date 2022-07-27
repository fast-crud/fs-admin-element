<template>
  <fs-page>
    <template #header>
      <div class="title">
        动态计算
        <fs-icon icon="ion:apps-sharp" :spin="true" />
      </div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/guide/advance/compute.html">帮助说明</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-tooltip content="我能控制表格显隐">
          <div class="ml-5" style="display: flex; width: 200px">
            表格显隐:<el-switch v-model="showTableRef"></el-switch>
          </div>
        </el-tooltip>

        <div class="ml-5" style="display: flex; width: 200px">
          列显隐:<el-switch v-model="columnComponentShowRef"></el-switch>
        </div>
        <el-alert class="ml-1" type="info" title="点击下方右边的编辑按钮查看示例效果-----------> ↓↓↓↓↓" />
      </template>
      <template #form_refSwitch>
        <el-switch v-model="showRef"></el-switch>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useCrud, useExpose } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
export default defineComponent({
  name: "BasisCompute",
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const { expose } = useExpose({ crudRef, crudBinding });
    // 你的crud配置
    const { crudOptions, output } = createCrudOptions({ expose });
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
      crudRef,
      ...output
    };
  }
});
</script>

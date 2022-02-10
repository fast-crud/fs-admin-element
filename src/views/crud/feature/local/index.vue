<template>
  <fs-page>
    <fs-crud  ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-button @click="showData">打印data</el-button>
        <el-button @click="disabledEdit">退出编辑模式</el-button>
        <el-button @click="enabledFreeEdit">自由编辑模式</el-button>
        <el-button @click="enabledRowEdit">行编辑模式</el-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script>
import {defineComponent, ref, onMounted} from 'vue';
import createCrudOptions from './crud';
import {useExpose, useCrud} from '@fast-crud/fast-crud';

export default defineComponent({
  name: 'FeatureLocal',
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const {expose} = useExpose({crudRef, crudBinding});
    // 你的crud配置
    const {crudOptions} = createCrudOptions({expose});
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const {resetCrudOptions} = useCrud({expose, crudOptions});
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

    // 页面打开后获取列表数据
    // onMounted(() => {
    //   expose.doRefresh();
    // });

    function showData() {
      console.log('data:', crudBinding.value.data)
    }
    crudBinding.value.data = [{name:'test'}]


    function enabledRowEdit(){
      expose.editable.enable({
        mode: "row",
      });
      crudBinding.value.actionbar.buttons.add.show=false
      crudBinding.value.actionbar.buttons.addRow.show=true

    }

    function enabledFreeEdit(){
      expose.editable.enable({
        mode: "free",
      });
      crudBinding.value.actionbar.buttons.add.show=false
      crudBinding.value.actionbar.buttons.addRow.show=true
    }

    function disabledEdit(){
      expose.editable.enable({
        enabled: false
      });
      crudBinding.value.actionbar.buttons.add.show=true
      crudBinding.value.actionbar.buttons.addRow.show=false
    }

    return {
      crudBinding,
      crudRef,
      showData,
      enabledRowEdit,
      enabledFreeEdit,
      disabledEdit
    };
  },
});
</script>

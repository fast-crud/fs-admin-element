<template>
  <fs-page>
    <template #header>
      <div class="title">
        列设置
        <span class="sub">列设置可以禁用或者隐藏某字段勾选</span>
      </div>
      <div class="more"></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-button @click="changeColumns">切换table</el-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, nextTick } from "vue";
import createCrudOptions from "./crud.jsx";
import { useFs, CrudBinding, UseFsProps, useMerge, FsRemoteStorage } from "@fast-crud/fast-crud";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  name: "BasisColumnsSet",
  setup() {
    let currentIsOld = true;
    //自定义列设置storage
    const customStorage: FsRemoteStorage = {
      async get(key: string) {
        let saveKey = `customColumnFilter.${currentIsOld}.` + key;
        const saved = localStorage.getItem(saveKey);
        if (saved == null) {
          return;
        }
        console.log("get", saveKey, saved);
        return JSON.parse(saved);
      },
      async set(key: string, value: any) {
        let saveKey = `customColumnFilter.${currentIsOld}.` + key;
        console.log("set", saveKey, value);
        localStorage.setItem(saveKey, JSON.stringify(value));
      },
      async remove(key: string) {
        let saveKey = `customColumnFilter.${currentIsOld}.` + key;
        console.log("remove", saveKey);
        localStorage.removeItem(saveKey);
      }
    };

    const context: any = {
      customStorage
    }; //自定义变量，传给createCrudOptions的额外参数（可以任意命名，任意多个）

    const { crudBinding, crudRef, crudExpose, crudOptions, resetCrudOptions } = useFs({
      createCrudOptions,
      context
    });

    let oldColumns = cloneDeep(crudOptions.columns);
    let newColumns = {
      id: {
        title: "ID",
        show: true,
        disabled: true
      },
      name2: {
        title: "名称2",
        show: true,
        disabled: false
      },
      age2: {
        title: "年龄2",
        show: true,
        disabled: false
      },
      address2: {
        title: "地址2",
        show: true,
        disabled: false
      }
    };

    async function changeColumns() {
      let columns = null;
      if (currentIsOld) {
        columns = cloneDeep(newColumns);
      } else {
        columns = cloneDeep(oldColumns);
      }
      currentIsOld = !currentIsOld;

      crudOptions.columns = columns;
      const newCrudOptions = cloneDeep(crudOptions);
      resetCrudOptions(newCrudOptions);
    }

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      changeColumns
    };
  }
});
</script>

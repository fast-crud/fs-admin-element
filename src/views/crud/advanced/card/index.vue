<template>
  <fs-crud ref="crudRef" v-bind="crudBinding">
    <el-row v-if="crudBinding.data" gutter="10" style="height: 100%; width: 100%; overflow: auto">
      <el-col v-for="(item, index) of crudBinding.data" :key="item.id" :span="6" style="margin-bottom: 10px">
        <el-card :header="item.title">
          {{ item.content }}
          <template #footer>
            <fs-button icon="ion:eye-outline" @click="openView({ index: index, row: item })"></fs-button>
            <fs-button icon="ion:create-outline" @click="openEdit({ index: index, row: item })"></fs-button>
            <fs-button icon="ion:trash-outline" @click="doRemove({ index: index, row: item })"></fs-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </fs-crud>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.js";

const { crudRef, crudBinding, crudExpose, context } = useFsRef();

// 页面打开后获取列表数据
onMounted(async () => {
  await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

  await crudExpose.doRefresh();
});

function openView(opts: any) {
  crudExpose.openView(opts);
}
function openEdit(opts: any) {
  crudExpose.openEdit(opts);
}
function doRemove(opts: any) {
  crudExpose.doRemove(opts);
}
</script>

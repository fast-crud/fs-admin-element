<template>
  <fs-page>
    <template #header>
      <div class="title">自由编辑</div>
      <div class="more"><a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/table.html#editable">文档</a></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <!--      <fs-button class="ml-1" @click="addRow">添加行</fs-button>-->
        <el-radio-group v-model="crudBinding.table.editable.enabled" class="ml-5">
          <el-radio-button :label="true">启用编辑</el-radio-button>
          <el-radio-button :label="false">退出编辑</el-radio-button>
        </el-radio-group>
        <!--            <el-radio-group class="ml-1" v-model="crudBinding.table.editable.mode">-->
        <!--              <el-radio-button label="free">自由模式</el-radio-button>-->
        <!--              <el-radio-button label="row">行编辑模式</el-radio-button>-->
        <!--            </el-radio-group>-->
        <template v-if="crudBinding.table.editable.enabled">
          <fs-button class="ml-5" @click="save">保存</fs-button>
          <fs-button class="ml-5" @click="log">log</fs-button>
        </template>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFs } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "EditableFree",
  setup() {
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
      crudExpose.editable.enable({ mode: "free", activeDefault: true });
    });

    return {
      crudBinding,
      crudRef,
      active() {
        crudExpose.editable.active();
      },
      inactive() {
        crudExpose.editable.inactive();
      },
      async save() {
        const res = await crudExpose.editable.validate();
        if (res !== true) {
          console.error("validate error:", res);
          return;
        }
        message.success("保存,修改行：" + JSON.stringify(crudBinding.value.data));
      },
      log() {
        console.log("table data:", crudBinding.value.data, crudExpose.getTableData());
      },
      cancel() {
        crudExpose.editable.resume();
      },
      addRow() {
        crudExpose.editable.addRow();
      },
      editCol() {
        crudExpose.editable.activeCols({ cols: ["radio"] });
      }
    };
  }
});
</script>

<template>
  <fs-page>
    <template #header>
      <div class="title">对话框中显示crud</div>
    </template>
    <div style="padding: 50px">
      <el-button type="primary" @click="openDialog">打开对话框</el-button>
    </div>

    <el-dialog v-model="dialogShow" width="80%" title="fs-crud in dialog">
      <div style="height: 400px; position: relative">
        <fs-in-dialog></fs-in-dialog>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogShow = false">确定</el-button>
      </template>
    </el-dialog>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FsInDialog from "./crud/index.vue";
export default defineComponent({
  name: "InDialog",
  components: { FsInDialog },
  setup() {
    const dialogShow = ref(false);
    function openDialog() {
      dialogShow.value = true;
    }
    return {
      dialogShow,
      openDialog
    };
  }
});
</script>

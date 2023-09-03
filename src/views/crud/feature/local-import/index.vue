<template>
  <fs-page>
    <template #header>
      <div class="title">将本地crud当做v-model,编辑好之后一并提交，本示例演示import导入</div>
    </template>
    <div style="padding: 30px">
      <el-form ref="formRef" :model="form" laba-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="表格">
          <div style="min-height: 300px; width: 100%">
            <FeatureLocalImportValueInput v-model="form.data" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import FeatureLocalImportValueInput from "./local.vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FeatureLocalImport",
  components: { FeatureLocalImportValueInput },
  setup() {
    const form = reactive({
      name: "test",
      data: [{ name: "初始数据" }]
    });

    function submit() {
      ElMessage.info("submit:" + JSON.stringify(form));
      console.log("submit:", form);
    }
    return {
      form,
      submit
    };
  }
});
</script>

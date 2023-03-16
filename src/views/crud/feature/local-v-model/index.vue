<template>
  <fs-page>
    <template #header>
      <div class="title">将本地crud当做v-model,编辑好之后一并提交，你还可以使用行编辑模式，效果更好</div>
    </template>
    <div style="padding: 30px">
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="表格">
          <div style="min-height: 300px; width: 100%">
            <FeatureLocalModelValueInput v-model="form.data" />
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
import {defineComponent, reactive} from "vue";
import {ElMessage} from "element-plus";
import FeatureLocalModelValueInput from "./local.vue";

export default defineComponent({
  name: "FeatureLocalVModel",
  components: { FeatureLocalModelValueInput },
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

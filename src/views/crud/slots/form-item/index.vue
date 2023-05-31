<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-alert class="ml-1" type="info" title=" ← form表单字段插槽，可以做一些很复杂的输入，可配置校验" />
      </template>
      <template #form_multiField="scope">
        <el-form-item v-if="scope.mode !== 'view'" prop="numBe" class="form-item-num">
          <el-input v-model="scope.form.numBe" placeholder="请输入数字" @change="onMultiFieldChange(scope.form)" />
        </el-form-item>
        <el-form-item v-if="scope.mode !== 'view'" prop="operator" class="form-item-num">
          <el-select v-model="scope.form.operator" @change="onMultiFieldChange(scope.form)">
            <el-option v-for="item in operatorList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="scope.mode !== 'view'" prop="numAf" class="form-item-num">
          <el-input v-model="scope.form.numAf" placeholder="请输入数字" @change="onMultiFieldChange(scope.form)" />
        </el-form-item>
        = {{ scope.form.multiField || "？" }}
      </template>

      <template #form_topics="scope">
        <el-form-item
          v-for="(item, index) in scope.form.topics"
          :key="index"
          style="margin-bottom: 20px"
          :prop="'topics.' + index"
          :rules="{ required: true, message: '请输入', trigger: 'blur' }"
        >
          <el-input v-model="scope.form.topics[index]" :disabled="scope.mode === 'view'" placeholder="请输入">
            <template #append>
              <fs-button
                :disabled="scope.mode === 'view'"
                icon="ion:trash-outline"
                @click="removeTopic(index, scope.form, scope.key)"
              >
              </fs-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button :disabled="scope.mode === 'view'" @click="addTopic(scope.form, scope.key)">添加主题</el-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useCrud, useExpose } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
export default defineComponent({
  name: "SlotsForm",
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const { crudExpose } = useExpose({ crudRef, crudBinding });
    // 你的crud配置
    const { crudOptions } = createCrudOptions({ crudExpose });
    // 初始化crud配置
    const { resetCrudOptions } = useCrud({ crudExpose, crudOptions, context: {} });
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });
    const operatorList = [
      { value: "+", label: "加" },
      { value: "-", label: "减" },
      { value: "*", label: "乘" },
      { value: "/", label: "除" }
    ];
    function onMultiFieldChange(form) {
      if (form.numBe && form.numAf && form.operator) {
        form.multiField = `${form.numBe} ${form.operator} ${form.numAf}`;
        return;
      }
      form.multiField = "？";
    }
    function addTopic(form, key) {
      if (form[key] == null) {
        form[key] = [];
      }
      form[key].push("");
    }
    function removeTopic(index, form, key) {
      form[key].splice(index, 1);
    }
    return {
      crudBinding,
      crudRef,
      operatorList,
      addTopic,
      removeTopic,
      onMultiFieldChange
    };
  }
});
</script>
<style lang="less">
.fs-form-item-component {
  .el-form-item.form-item-num {
    width: 120px;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>

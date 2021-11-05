<template>
  <fs-page>
    <template #header>
      <div class="title">表单独立使用</div>
    </template>
    <div class="m-5">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card title="直接显示表单">
            <fs-form ref="formRef" v-bind="formOptions" />
            <div style="margin-top: 10px">
              <el-button @click="formSubmit">提交表单</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card title="打开表单对话框">
            <el-button @click="openFormWrapper">打开表单对话框</el-button>
            <fs-form-wrapper ref="formWrapperRef" />
          </el-card>

          <el-card class="mt-10" title="打开表单对话框【复用crudBinding.addForm】">
            <el-button @click="openFormWrapper2">打开表单对话框</el-button>
            <fs-form-wrapper ref="formWrapperRef2" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </fs-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { useCrud, useExpose, useColumns } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

function createFormOptions() {
  // 自定义表单配置
  const { buildFormOptions } = useColumns();
  //使用crudOptions结构来构建自定义表单配置
  return buildFormOptions({
    columns: {
      customField: {
        title: "新表单字段",
        type: "text",
        form: {
          rules: [{ required: true, message: "此项必填" }]
        }
      },
      groupField: {
        title: "分组字段",
        type: "text",
        form: {
          rules: [{ required: true, message: "此项必填" }]
        }
      }
    },
    form: {
      labelWidth: "120px",
      group: {
        groups: {
          testGroupName: {
            header: "分组测试",
            columns: ["groupField"]
          }
        }
      },
      doSubmit({ form }) {
        console.log("form submit:", form);
        ElMessage.info("自定义表单提交:" + JSON.stringify(form));
        ElMessage.success("保存成功");
      }
    }
  });
}
function useFormDirect() {
  const formRef = ref();
  const formOptions = ref();
  formOptions.value = createFormOptions();
  function formSubmit() {
    formRef.value.submit();
  }
  return {
    formOptions,
    formRef,
    formSubmit
  };
}
function useFormWrapper() {
  const formWrapperRef = ref();
  const formWrapperOptions = ref();
  formWrapperOptions.value = createFormOptions();
  function openFormWrapper() {
    formWrapperRef.value.open(formWrapperOptions.value);
  }
  return {
    formWrapperRef,
    openFormWrapper,
    formWrapperOptions
  };
}

/**
 * 复用crudBinding的表单配置，可以减少一些手写代码
 * @returns {{formWrapperRef2, openFormWrapper2: openFormWrapper2, formWrapperOptions2}}
 */
function useCrudBindingForm() {
  const formWrapperRef2 = ref();

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

  // 以下代码实际上== crudBinding.addForm 或者 crudBinding.editForm
  const formWrapperOptions2 = ref({
    ...crudBinding.value.addForm, // 你也可以用editForm
    doSubmit({ form }) {
      //覆盖提交方法
      console.log("form submit:", form);
      ElMessage.info("自定义表单提交:" + JSON.stringify(form));
      ElMessage.warning("抛出异常可以阻止表单关闭");
      throw new Error("抛出异常可以阻止表单关闭");
    }
  });
  function openFormWrapper2() {
    formWrapperRef2.value.open(formWrapperOptions2.value);
  }
  return {
    formWrapperRef2,
    openFormWrapper2,
    formWrapperOptions2
  };
}

export default defineComponent({
  name: "FormIndependent",
  setup() {
    return {
      ...useFormDirect(),
      ...useFormWrapper(),
      ...useCrudBindingForm()
    };
  }
});
</script>

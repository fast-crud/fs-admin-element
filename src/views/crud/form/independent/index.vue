<template>
  <fs-page>
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
          <fs-form-wrapper ref="formWrapperRef" v-bind="formWrapperOptions" />
        </el-card>
      </el-col>
    </el-row>
  </fs-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";

function useFormDirect() {
  const formRef = ref();
  const formOptions = ref({
    col: {
      span: 12
    },
    labelAlign: "right",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    },
    display: "flex",
    columns: {
      customField: {
        title: "新表单字段",
        component: {
          name: "el-input",
          allowClear: true
        },
        rules: [{ required: true, message: "此项必填" }]
      },
      groupField: {
        title: "分组字段",
        component: {
          name: "el-input",
          allowClear: true
        },
        rules: [{ required: true, message: "此项必填" }]
      }
    },
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
  });

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
  const formWrapperOptions = ref({
    labelPosition: "right",
    labelWidth: "120px",
    col: {
      span: 12
    },
    wrapper: {
      is: "el-dialog",
      width: "960px",
      destroyOnClose: true,
      footer: null,
      title: "表单独立使用"
    },
    display: "flex",
    columns: {
      customField: {
        title: "新表单字段",
        component: {
          name: "el-input",
          allowClear: true
        },
        rules: [{ required: true, message: "此项必填" }]
      },
      groupField: {
        title: "分组字段",
        component: {
          name: "el-input",
          allowClear: true
        },
        rules: [{ required: true, message: "此项必填" }]
      }
    },
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
      ElMessage.warn("抛出异常可以阻止表单关闭");
      throw new Error("抛出异常可以阻止表单关闭");
    }
  });
  function openFormWrapper() {
    formWrapperRef.value.open(formWrapperOptions.value);
  }
  return {
    formWrapperRef,
    openFormWrapper,
    formWrapperOptions
  };
}
export default defineComponent({
  name: "FormIndependent",
  setup() {
    return {
      ...useFormDirect(),
      ...useFormWrapper()
    };
  }
});
</script>

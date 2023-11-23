import * as api from "./api";
import { reactive } from "vue";
import type { FormRules } from 'element-plus';
import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    if (form.id == null) {
      form.id = row.id;
    }
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };
  const numValidator = (rule, value, callback) => {
    if (value === '') {
      return callback(new Error('全局form校验'));
    }
    if (!/^[0-9]*$/.test(value)) {
      return callback(new Error('全局form校验'));
    }
    return callback();
  };
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      form: {
        // 单列布局
        col: { span: 24 },
        // 仅在独立使用表单组件时有效，fs-crud中会被行数据代替，你可以在字段中配置columns.key.form.value=默认值
        initialForm: {
          numBe: "1"
        },
        // 插槽的表单校验在这配置
        // 数组的表单校验看https://element-plus.org/zh-CN/component/form.html#%E6%B7%BB%E5%8A%A0-%E5%88%A0%E9%99%A4%E8%A1%A8%E5%8D%95%E9%A1%B9
        rules: reactive<FormRules>({
          operator: [
            { required: true, message: "全局form校验" }
          ],
          numBe: [
            { validator: numValidator, trigger: 'blur' }
          ]
          // numAf: [
          //   { validator: numValidator, trigger: 'blur' }
          // ]
        })
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 50
          },
          form: {
            show: false
          }
        },
        // 如果插槽字段想添加必填星号，又不想设为必填（不然必需给multiField赋值），参考/crud/form/render
        multiField: {
          title: "多字段录入",
          type: "text",
          form: {
            // 如无必要，可不配置message，校验提示交给插槽
            rules: [{ required: true, message: "" }]
          }
        },
        topics: {
          title: "多行输入",
          type: "text",
          search: { show: true },
          form: {
            rules: [{ required: true, message: "请添加主题_columns.xxx.form.rules校验" }]
          },
          column: {
            component: { name: "fs-values-format" }
          }
        },
        // 插槽表单的字段在这里声明，并隐藏。不然编辑弹窗显示不了这些的值
        // 插槽表单字段的默认值在这配置优先级低于于父级的form.initialForm
        // 表单校验这里配置无效
        numBe: {
          show: false,
          column: {
            show: false
          },
          form: {
            show: false,
            // 优先级低于于父级的form.initialForm
            value: '111'
          }
        },
        operator: {
          show: false,
          column: {
            show: false
          },
          form: {
            show: false,
            // 无效，使用全局form校验
            rules: [{ required: true, message: "columns.xxx.form.rules校验" }]
          }
        },
        numAf: {
          show: false,
          column: {
            show: false
          },
          form: {
            show: false,
            // 无效，该字段不会校验
            rules: [{ required: true, message: "columns.xxx.form.rules校验" }],
            value: '222'
          }
        }
      }
    }
  };
}

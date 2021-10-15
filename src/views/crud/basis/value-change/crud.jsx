import * as api from "./api";
import { message } from "ant-design-vue";
export default function ({ expose }) {
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    form.id = row.id;
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };

  return {
    output: {},
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
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
        normal: {
          title: "value-change",
          type: "text",
          form: {
            valueChange({ value, key, form }) {
              console.log("valueChanged,", key, value, form);
              message.info(`valueChanged:${key}=${value}`);
            }
          }
        },
        immediate: {
          title: "immediate",
          type: "text",
          form: {
            valueChange: {
              handle({ value, key, form, immediate }) {
                console.log("valueChange,", key, value, "isImmediate=", immediate);
                message.info(`valueChanged:${key}=${value},isImmediate=${immediate}`);
              },
              immediate: true
            }
          }
        }
      }
    }
  };
}

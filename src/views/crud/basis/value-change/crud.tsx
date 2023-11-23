import * as api from "./api";
import { ElMessage } from "element-plus";
import {
  AddReq,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes
} from "@fast-crud/fast-crud";

export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    if (form.id == null) {
      form.id = row.id;
    }
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
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
              ElMessage.info(`valueChanged:${key}=${value}`);
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
                ElMessage.info(`valueChanged:${key}=${value},isImmediate=${immediate}`);
              },
              immediate: true
            }
          }
        }
      }
    }
  };
}

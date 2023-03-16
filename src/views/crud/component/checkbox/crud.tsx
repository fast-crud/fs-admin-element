import * as api from "./api";
import { requestForMock } from "/src/api/service";
import { dict } from "@fast-crud/fast-crud";
export default function ({ crudRef }) {
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
        checkbox: {
          title: "状态",
          search: { show: true },
          type: "dict-checkbox",
          form: {
            value: [] //element-plus要设置默认值
          },
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        },
        buttonType: {
          title: "按钮样式",
          search: { show: true },
          type: "dict-checkbox",
          form: {
            component: {
              optionName: "el-checkbox-button"
            },
            value: [] //element-plus要设置默认值
          },
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        },
        border: {
          title: "带边框",
          search: { show: true },
          type: "dict-checkbox",
          form: {
            component: {
              optionProps: {
                border: true
              }
            },
            value: [] //element-plus要设置默认值
          },
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        }
      }
    }
  };
}

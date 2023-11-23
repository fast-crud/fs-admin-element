import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";

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
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        // 表头过滤改变事件
        onFilterChange(e) {
          console.log("onFilterChange", e);
          for (const key in e) {
            const i = parseInt(key.replace("el-table_1_column_", ""));
            if (i === 3) {
              expose.setSearchFormData({
                form: {
                  remote: e[key]
                }
              });
              expose.doRefresh();
            }
          }
        }
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
        radio: {
          title: "本地过滤",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          column: {
            filters: [
              { text: "开", value: "1" },
              { text: "关", value: "0" },
              { text: "停", value: "2" }
            ],
            filterMethod: (value, row) => {
              return row.radio === value;
            },
            sortable: true
          }
        },
        remote: {
          title: "服务端过滤",
          search: {
            show: true,
            component: {
              multiple: true
            }
          },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          column: {
            filters: [
              { text: "开", value: "1" },
              { text: "关", value: "0" },
              { text: "停", value: "2" }
            ]
          }
        }
      }
    }
  };
}

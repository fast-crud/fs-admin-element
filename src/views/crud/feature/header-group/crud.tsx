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
      form: {
        layout: "flex",
        labelWidth: 100 //表单label宽度
      },
      table: {
        tableVersion: "v2",
        fixed: true
      },
      rowHandle: {
        fixed: "right"
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
        user: {
          title: "用户信息",
          children: {
            name: {
              title: "姓名",
              type: "text"
            },
            age: {
              title: "年龄",
              type: "number"
            }
          }
        },
        address: {
          title: "地址",
          children: {
            area: {
              title: "地区",
              children: {
                province: {
                  title: "省",
                  search: { show: true },
                  type: "dict-select",
                  dict: dict({
                    data: [
                      { value: "广东省", label: "广东省" },
                      { value: "浙江省", label: "浙江省" }
                    ]
                  })
                },
                city: {
                  title: "市",
                  search: { show: true },
                  type: "text"
                },
                county: {
                  title: "区",
                  search: { show: true },
                  type: "text"
                }
              }
            },
            street: {
              title: "街道",
              type: "text"
            }
          }
        }
      }
    }
  };
}

import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";

export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
        tree: {
          title: "树形选择",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?single"
          })
        },
        multiple: {
          title: "多选",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?single"
          }),
          form: {
            component: {
              multiple: true,
              "show-checkbox": true
            }
          }
        },
        fieldReplace: {
          title: "自定义label",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/littlePca",
            value: "code",
            label: "name"
          }),
          form: {
            component: {
              select: {
                valueKey: "code"
              },
              tree: {
                valueKey: "code"
              },
              props: {
                props: {
                  // 为什么这里要写两层props
                  // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                  label: "name",
                  key: "code",
                  value: "code",
                  valueKey: "code"
                }
              }
            }
          }
        }
      }
    }
  };
}

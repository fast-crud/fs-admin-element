import * as api from "./api";
import {
  asyncCompute,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  dict,
  GetContextFn,
  ScopeContext
} from "@fast-crud/fast-crud";

export default function ({}: CreateCrudOptionsProps): CreateCrudOptionsRet {
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

  let idGen = 0;
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
          }),
          form: {
            component: {
              slots: {
                //插槽
                prefix() {
                  return <fs-icon icon={"ion:search"}></fs-icon>;
                },
                //自定义选项text
                default({ scope }) {
                  const label = `${scope.data.label}(${scope.data.value})`;
                  return (
                    <div>
                      <fs-icon icon={"ion:download"}></fs-icon>
                      <span>{label}</span>
                    </div>
                  );
                }
              }
            }
          }
        },
        lazy: {
          title: "懒加载",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            prototype: true,
            value: "id",
            label: "text",
            async getNodesByValues(values: any) {
              //你要实现这个方法，根据values从后台获取节点数据
              //以下为本地转换模拟
              return [
                {
                  id: values,
                  text: "lazy load node " + values
                }
              ];
            }
          }),
          form: {
            component: {
              props: {
                props: {
                  // 为什么这里要写两层props
                  // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                  label: "text",
                  value: "id",
                  isLeaf: "leaf" //重要
                }
              },
              lazy: true,
              cacheData: asyncCompute({
                watch(context: ScopeContext) {
                  return context.form.lazy;
                },
                async asyncFn(value: any, getContextFn: GetContextFn) {
                  if (value == null) {
                    return [];
                  }
                  //异步从后台获取节点
                  return [
                    {
                      id: value,
                      text: "lazy load node " + value
                    }
                  ];
                },
                defaultValue: []
              }),
              load(node: any, resolve: (data: any[]) => void) {
                if (node.isLeaf) return resolve([]);

                setTimeout(() => {
                  //根据node.id 作为父节点，从后台加载子节点数据
                  resolve([
                    {
                      id: ++idGen,
                      text: `lazy load node ${idGen}`,
                      leaf: false
                    },
                    {
                      id: ++idGen,
                      text: `lazy load node ${idGen}`,
                      leaf: true
                    }
                  ]);
                }, 400);
              }
            }
          }
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
              // props: {
              //   props: {
              //     // 为什么这里要写两层props
              //     // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
              //     label: "name",
              //     value: "code"
              //   }
              // }
            }
          }
        }
      }
    }
  };
}

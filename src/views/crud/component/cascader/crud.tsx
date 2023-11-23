import * as api from "./api";
import { requestForMock } from "/src/api/service";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";

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
        // 表单label宽度
        labelWidth: "150px"
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
        cascader: {
          title: "级联",
          search: { show: true },
          type: "dict-cascader",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?single"
          })
        },
        lazyLoad: {
          title: "懒加载",
          type: "dict-cascader",
          dict: dict({
            url: "/mock/tree/GetTreeChildrenByParentId?lazyLoad",
            value: "code",
            label: "name",
            isTree: true,
            cache: true,
            prototype: true,
            async getNodesByValues(values) {
              if (values == null) {
                return [];
              }
              //用于单元格展示
              const ret = await requestForMock({
                url: "/mock/tree/GetNodesByValues",
                params: { values }
              });
              console.log("getNodes", ret);
              return ret;
            }
          }),
          form: {
            component: {
              props: {
                props: {
                  lazy: true,
                  value: "code",
                  label: "name",
                  async lazyLoad(node, resolve) {
                    console.log("node", node);
                    const { value } = node;
                    const ret = await requestForMock({
                      url: "/mock/tree/GetTreeChildrenByParentId",
                      params: { parentId: value }
                    });
                    resolve(ret);
                  }
                }
              }
            }
          }
        },
        strictly: {
          title: "只选父级",
          type: "dict-cascader",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData"
          }),
          form: {
            component: {
              filterable: true,
              // props下配置属性跟配置在component下是一样的效果，而el-cascade下也有一个叫props的属性，所以需要配置两层
              props: { props: { checkStrictly: true } }
            },
            helper: "只选父节点"
          }
        },
        multiple: {
          title: "多选",
          type: "dict-cascader",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?multiple"
          }),
          form: {
            component: {
              filterable: true,
              // props下配置属性跟配置在component下是一样的效果，而el-cascade下也有一个叫props的属性，所以需要配置两层
              props: { props: { multiple: true, checkStrictly: true } }
            },
            helper: "可搜索，多选，可只选父节点"
          },
          column: {
            //级联多选展示
            component: {
              multiple: true
            }
          }
        }
      }
    }
  };
}

import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";
import { nextTick } from "vue";

export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    if (form.id == null) {
      form.id = row.id;
    }
    await api.UpdateObj(form);
    if (row.parentId) {
      //刷新父节点的状态
      reloadTreeChildren(row.parentId);
    }
  };
  const delRequest = async ({ row }) => {
    await api.DelObj(row.id);
    if (row.parentId) {
      //刷新父节点的状态
      reloadTreeChildren(row.parentId);
    }
  };

  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };

  //刷新父节点状态
  function reloadTreeChildren(parentId) {
    const data = expose.getBaseTableRef().store.states.treeData;
    if (data.value != null) {
      const item = data.value[parentId];
      if (item != null) {
        item.loaded = false;
        item.expanded = false;
      }
    }
  }

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        lazy: true,
        load: async (row: any, treeNode: unknown, resolve: (date: any[]) => void) => {
          //懒加载，更新和删除后，需要刷新父节点的状态，见上方
          const obj = await api.GetObj(row.id);
          resolve([...obj.children]);
        }
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 100
          },
          form: {
            show: false
          }
        },
        data: {
          title: "data",
          type: "text"
        },
        time: {
          title: "时间",
          type: "datetime",
          column: {
            width: 180
          }
        },
        province: {
          title: "地区",
          type: "dict-select",
          search: { show: true },
          form: {
            component: { filterable: true, multiple: true }
          },
          dict: dict({
            data: [
              { value: "sz", label: "深圳" },
              { value: "gz", label: "广州" },
              { value: "wh", label: "武汉" },
              { value: "sh", label: "上海" }
            ]
          }),
          column: {
            width: 300
          }
        },
        amount: {
          title: "金额(元)",
          key: "amount"
        },
        radio: {
          title: "状态",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        }
      }
    }
  };
}

import * as api from "./api";
import { dict, compute } from "@fast-crud/fast-crud";
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
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      rowHandle: {
        buttons: {
          remove: {
            // 根据row的值判断按钮是否显示
            show: compute(({ row }) => {
              return row.radio !== "0";
            })
          },
          orderExample: {
            text: "我排前面",
            title: "按钮排序示例",
            order: 0 //数字越小，越靠前,查看、编辑、删除按钮的排序号分别为1，2，3
          }
        },
        dropdown: {
          // 操作列折叠
          atLeast: 2, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
          more: {
            text: "更多",
            icon: null
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

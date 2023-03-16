import * as api from "./api";
import { dict } from "@fast-crud/fast-crud";
export default function ({ expose }) {
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
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        name: {
          title: "姓名",
          type: "text"
        },
        roles: {
          title: "角色",
          search: { show: true },
          type: "dict-select",
          dict: dict({
            value: "id",
            label: "name",
            data: [
              { id: 1, name: "管理员" },
              { id: 2, name: "普通用户" }
            ]
          }),
          form: {
            component: {
              multiple: true
            },
            valueBuilder({ form }) {
              //通过valueBuilder 可以修改从后台获取到的数据，适配组件所需要的value值
              //http://fast-crud.docmirror.cn/api/crud-options/columns.html#valuebuilder与valueresolve
              if (form.roles) {
                form.roles = form.roles.map((item) => item.id);
              }
            }
          }
        }
      }
    }
  };
}

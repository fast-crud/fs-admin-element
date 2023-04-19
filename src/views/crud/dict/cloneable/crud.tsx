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

  const remoteDict = dict({
    cloneable: true,
    url: "/mock/dicts/OpenStatusEnum"
  });

  return {
    crudOptions: {
      remoteDict,
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
        remote: {
          title: "远程字典",
          search: { show: true },
          dict: remoteDict,
          type: "dict-select",
          form: {
            component: { dict: { cache: false } }
          }
        },
        modifyDict: {
          title: "动态修改字典",
          search: { show: false },
          type: "text",
          column: {
            component: {
              name: "el-switch"
            },
            valueChange({ row, getComponentRef }) {
              // 这里不能使用remoteDict,因为在分发时已经clone到column配置中了
              // 这里dict修改不会影响form里面的字典数据，但会影响所有列里面的字典
              const componentRef = getComponentRef("remote");
              if (componentRef == null) {
                return;
              }
              const targetDict = componentRef.dict;
              if (targetDict == null) {
                return;
              }
              targetDict.url = row.modifyDict
                ? "/mock/dicts/moreOpenStatusEnum?remote"
                : "/mock/dicts/OpenStatusEnum?remote";
              targetDict.reloadDict();
            }
          },
          form: {
            component: {
              name: "el-switch"
            },
            valueChange({ form, getComponentRef }) {
              // 这里不能使用remoteDict,因为在分发时已经clone到form配置中了
              // 这里dict修改不会影响列里面的数据
              const targetDict = getComponentRef("remote").dict;
              if (targetDict == null) {
                return;
              }
              targetDict.url = form.modifyDict
                ? "/mock/dicts/moreOpenStatusEnum?remote"
                : "/mock/dicts/OpenStatusEnum?remote";
              targetDict.reloadDict();
            }
          }
        }
      }
    }
  };
}

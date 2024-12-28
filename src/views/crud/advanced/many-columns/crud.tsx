import * as api from "./api";
import {
  AddReq,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  dict,
  EditReq,
  UserPageQuery,
  UserPageRes
} from "@fast-crud/fast-crud";
import { ref } from "vue";

export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    if (form.id == null) {
      form.id = row.id;
    }
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
    return await api.AddObj(form);
  };
  const selectedRowKeys = ref([]);
  context.selectedRowKeys = selectedRowKeys;

  return {
    output: {},
    crudOptions: {
      settings: {
        plugins: {
          //这里使用行选择插件，生成行选择crudOptions配置，最终会与crudOptions合并
          rowSelection: {
            enabled: true,
            order: -2,
            before: true,
            // handle: (pluginProps,useCrudProps)=>CrudOptions,
            props: {
              multiple: true,
              crossPage: true,
              selectionFixed: "left",
              selectedRowKeys,
              onSelectedChanged(selected) {
                console.log("已选择变化：", selected);
              }
            }
          }
        }
      },
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        tableVersion: "v2",
        fixed: true
      },
      pagination: {
        pageSize: 100
      },
      rowHandle: {
        fixed: "right",
        width: 300
      },
      columns: {
        id: {
          title: "ID",
          type: "number",
          column: {
            width: 50
          },
          form: {
            show: false
          }
        },
        text: {
          title: "文本",
          type: "text",
          search: { show: true }
        },
        dict1: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict2: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict2"
          })
        },
        dict3: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict3"
          })
        },
        dict4: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict5: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict6: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict7: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict8: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict9: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict10: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        },
        text1: {
          title: "文本",
          type: "text"
        },
        text2: {
          title: "文本",
          type: "text"
        },
        text3: {
          title: "文本",
          type: "text"
        },
        text4: {
          title: "文本",
          type: "text"
        },
        text5: {
          title: "文本",
          type: "text"
        },
        text6: {
          title: "文本",
          type: "text"
        },
        text7: {
          title: "文本",
          type: "text"
        },
        text8: {
          title: "文本",
          type: "text"
        },
        text9: {
          title: "文本",
          type: "text"
        },
        text10: {
          title: "文本",
          type: "text"
        },
        text11: {
          title: "文本",
          type: "text"
        },
        text12: {
          title: "文本",
          type: "text"
        },
        text13: {
          title: "文本",
          type: "text"
        },
        text14: {
          title: "文本",
          type: "text"
        },
        text15: {
          title: "文本",
          type: "text"
        },
        text16: {
          title: "文本",
          type: "text"
        },
        text17: {
          title: "文本",
          type: "text"
        },
        text18: {
          title: "文本",
          type: "text"
        },
        text19: {
          title: "文本",
          type: "text"
        },
        text20: {
          title: "文本",
          type: "text"
        },
        text21: {
          title: "文本",
          type: "text"
        },
        text22: {
          title: "文本",
          type: "text"
        },
        text23: {
          title: "文本",
          type: "text"
        },
        text24: {
          title: "文本",
          type: "text"
        },
        text25: {
          title: "文本",
          type: "text"
        },
        text26: {
          title: "文本",
          type: "text"
        },
        text27: {
          title: "文本",
          type: "text"
        },
        text28: {
          title: "文本",
          type: "text"
        },
        text29: {
          title: "文本",
          type: "text"
        },
        text30: {
          title: "文本",
          type: "text"
        },
        text31: {
          title: "文本",
          type: "text"
        },
        text32: {
          title: "文本",
          type: "text"
        },
        text33: {
          title: "文本",
          type: "text"
        },
        text34: {
          title: "文本",
          type: "text"
        },
        text35: {
          title: "文本",
          type: "text"
        },
        text36: {
          title: "文本",
          type: "text"
        },
        text37: {
          title: "文本",
          type: "text"
        },
        text38: {
          title: "文本",
          type: "text"
        },
        text39: {
          title: "文本",
          type: "text"
        },
        text40: {
          title: "文本",
          type: "text"
        }
      }
    }
  };
}

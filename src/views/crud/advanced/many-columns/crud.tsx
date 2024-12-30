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
        fixed: true,
        editable: {
          //是否启用编辑
          enabled: false,
          //模式，free 自由编辑，row：行编辑,cell：单元格编辑
          mode: "cell", //"free" | "row" | "cell";
          /**
           * 是否排他式激活，激活一个，关闭其他
           */
          exclusive: true,
          /**
           * 排他式激活关闭其他编辑时的效果，是取消还是保存
           */
          exclusiveEffect: "cancel", // "cancel" | "save";,
          updateCell() {
            console.log("updateCell");
          }
        }
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
        },
        dict11: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict12: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict2"
          })
        },
        dict13: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict3"
          })
        },
        dict14: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict15: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict16: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict17: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict18: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict19: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict110: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        },
        dict21: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict22: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict2"
          })
        },
        dict23: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict3"
          })
        },
        dict24: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict25: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict26: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict27: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict28: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict29: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict210: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        },
        dict31: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict32: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict3"
          })
        },
        dict33: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict3"
          })
        },
        dict34: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict35: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict36: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict37: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict38: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict39: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict310: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        },
        dict41: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict42: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict43: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict44: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict4"
          })
        },
        dict45: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict46: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict47: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict48: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict49: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict410: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        },
        dict51: {
          title: "字典1",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict1"
          })
        },
        dict52: {
          title: "字典2",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict53: {
          title: "字典3",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict54: {
          title: "字典4",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict55: {
          title: "字典5",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict5"
          })
        },
        dict56: {
          title: "字典6",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict6"
          })
        },
        dict57: {
          title: "字典7",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict7"
          })
        },
        dict58: {
          title: "字典8",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict8"
          })
        },
        dict59: {
          title: "字典9",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict9"
          })
        },
        dict510: {
          title: "字典10",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/ManyOpenStatusEnum?from=dict10"
          })
        }
      }
    }
  };
}

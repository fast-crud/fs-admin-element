import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";
import { ref } from "vue";

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
  const labelPosition = ref("");
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        // 表头过滤改变事件
        onFilterChange(e) {
          console.log("onFilterChange", e);
        }
      },
      search: {
        options: {
          labelPosition: labelPosition
        },
        validate: true,
        container: {
          action: {
            col: {
              span: 6
            }
          }
        },
        buttons: {
          change: {
            text: "切换label位置",
            click() {
              labelPosition.value = labelPosition.value == "top" ? "" : "top";
            }
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
          search: {
            show: true,
            rules: [
              {
                required: true,
                message: "请选择状态"
              }
            ]
          },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          column: {
            filters: [
              { text: "开", value: "1" },
              { text: "关", value: "0" },
              { text: "停", value: "2" }
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => {
              return record.radio === value;
            },
            sorter: (a, b) => a.radio - b.radio,
            sortDirections: ["descend"]
          }
        },
        customRender: {
          title: "自定义render",
          search: {
            show: true
          },
          type: "text",
          form: {
            component: {
              vModel: "modelValue",
              render({ attrs }) {
                return <el-switch {...attrs} />;
              },
              title: "自定义render，可以继承component的属性,可以触发search的自动查询"
            }
          }
        },
        customRender2: {
          title: "自定义render2",
          search: {
            show: true
          },
          type: "text",
          form: {
            component: {
              render({ form }) {
                //注意此处的v-model写法
                return (
                  <el-switch
                    v-model={[form.customRender2, "modelValue"]}
                    title={"render配置在component之下，注意vModel的写法,不能触发search的自动查询"}
                  />
                );
              }
            }
          }
        },
        customRender3: {
          title: "自定义render3",
          search: {
            show: true
          },
          type: "text",
          form: {
            render({ form }) {
              //注意此处的v-model写法
              return (
                <el-switch
                  v-model={[form.customRender3, "modelValue"]}
                  title={"render配置在form之下，注意vModel的写法,不能触发search的自动查询"}
                />
              );
            }
          }
        }
      }
    }
  };
}

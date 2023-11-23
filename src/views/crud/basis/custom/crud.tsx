import * as api from "./api";
import {
  AddReq,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes
} from "@fast-crud/fast-crud";
import { shallowRef } from "vue";
import VmodelCounter from "./vmodel-counter.vue";
import { ElMessage } from "element-plus";

export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    if(form.id==null){
      form.id = row.id;
    };
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
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
        counter: {
          title: "自定义组件",
          type: "text",
          column: {
            component: {
              //引用自定义组件
              name: shallowRef(VmodelCounter),
              color: "primary",
              slots: {
                //插槽示例
                default() {
                  return <span>counter on cell:</span>;
                }
              },
              on: {
                //监听事件
                onChange({ $event, row }) {
                  ElMessage.info("counter changed:" + $event);
                }
              }
            }
          },
          form: {
            //form表单
            component: {
              //引用自定义组件
              name: shallowRef(VmodelCounter),
              vModel: "modelValue",
              color: "danger",
              on: {
                //监听事件
                onChange({ $event, form }) {
                  ElMessage.info("counter changed:" + $event);
                }
              },
              slots: {
                //插槽示例
                default() {
                  return <span>counter on form:</span>;
                }
              }
            }
          },
          search: {
            show: true,
            //form表单
            component: {
              color: "warning",
              slots: {
                //插槽示例
                default() {
                  return "counter:";
                }
              }
            }
          }
        },
        cellRender: {
          title: "单元格render",
          type: "text",
          column: {
            cellRender({ value }) {
              return <el-tag>{value}</el-tag>;
            }
          }
        },
        formAroundRender: {
          title: "表单组件周围的render",
          type: "text",
          form: {
            helper: "演示组件周围自定义render",
            topRender({ value }) {
              return <el-tag type="danger">topRender</el-tag>;
            },
            bottomRender({ value }) {
              return <el-tag type="danger">bottomRender {value ?? ""}</el-tag>;
            },
            prefixRender({ value }) {
              return <el-tag type="danger">prefixRender</el-tag>;
            },
            suffixRender({ value }) {
              return <el-tag type="danger">suffixRender</el-tag>;
            }
          }
        },
        formRender: {
          title: "字段组件本身render",
          type: "text",
          form: {
            helper: "组件本身render",
            render({ form }) {
              return (
                <div>
                  <el-input v-model={[form.formRender, "modelValue"]} />
                  render value : {form.formRender}
                </div>
              );
            }
          }
        }
      }
    }
  };
}

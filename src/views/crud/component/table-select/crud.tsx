import * as api from "./api";
import * as textTableApi from "../text/api";
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
import createCrudOptionsText from "../text/crud";
export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
        single: {
          title: "单选",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          form: {
            component: {
              multiple: false,
              rowKey: "id", //element-plus 必传
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride: {
                rowHandle: {
                  fixed: "right"
                }
              }
            }
          }
        },
        multi: {
          title: "多选",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          form: {
            component: {
              multiple: true,
              crossPage: true,
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride: {
                table: {
                  scroll: {
                    x: 2000
                  }
                },
                rowHandle: {
                  fixed: "right"
                }
              }
            }
          }
        },
        viewMode: {
          title: "查看模式",
          dict: dict({
            value: "id",
            label: "name"
          }),
          column: {
            component: {
              name: "fs-table-select",
              //设置为查看模式
              viewMode: true,
              createCrudOptions: createCrudOptionsText,
              dialog: {
                appendToBody: true
              },
              slots: {
                default({ scope, value }) {
                  async function open() {
                    //打开时传入默认查询参数
                    const crudOptions = {
                      search: {
                        initialForm: {
                          classId: value
                        }
                      }
                    };
                    const { crudExpose } = await scope.open({ crudOptions });
                    // 这里还能通过crudExpose等返回值操作表格
                  }

                  return <el-button onClick={open}>点我查看学生列表:{value}</el-button>;
                }
              }
            }
          }
        }
      }
    }
  };
}

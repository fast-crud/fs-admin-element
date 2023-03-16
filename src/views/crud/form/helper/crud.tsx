import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

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
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      form: {
        labelWidth: "120px",
        helper: {
          // position: "label" // helper的展示位置全局配置
          // tooltip:{}
        }
      },
      columns: {
        name: {
          title: "最简单",
          type: "text",
          form: {
            helper: "最简单的helper\n换行测试"
          }
        },
        age: {
          title: "jsx",
          type: "text",
          form: {
            helper: {
              render() {
                return <div style={"color:blue"}>jsx自定义render</div>;
              }
            }
          }
        },
        status: {
          title: "显示在label",
          type: "text",
          form: {
            rules: [{ required: true, message: "此项必填" }],
            helper: {
              position: "label",
              tooltip: {
                placement: "top-start"
              },
              text: "在label通过tooltip方式显示的helper\n换行测试"
              // render() {
              //   return <div style={"color:red"}>在label通过tooltip方式显示的helper</div>;
              // }
            }
          }
        }
      }
    }
  };
}

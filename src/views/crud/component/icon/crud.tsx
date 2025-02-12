import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
        icon: {
          title: "icon",
          search: { show: true },
          type: "text",
          column: {
            component: {
              name: "fs-icon",
              vModel: "icon",
              style: "font-size:18px"
            }
          },
          form: {
            helper: {
              render() {
                return (
                  <a target={"_blank"} href={"https://iconify.design/icon-sets/ion/"}>
                    点击此处选择图标名称
                  </a>
                );
              }
            }
          }
        },
        svg: {
          title: "svg",
          search: { show: true },
          type: "text",
          column: {
            component: {
              name: "fs-icon",
              vModel: "icon",
              style: "font-size:18px"
            }
          }
        },
        selector: {
          title: "图标选择器",
          search: { show: true },
          type: "icon"
        }
      }
    }
  };
}

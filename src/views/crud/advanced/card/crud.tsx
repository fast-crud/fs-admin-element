import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, ScopeContext, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
export default async function ({ crudExpose }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
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
      rowHandle: {
        align: "center"
      },
      table: {
        show: false
      },
      toolbar: {
        compact: false
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
        title: {
          title: "标题",
          type: "text"
        },
        content: {
          title: "内容",
          type: "text"
        }
      }
    }
  };
}

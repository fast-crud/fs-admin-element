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

export default function ({ crudExpose, context: { ctx } }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    form.id = row.id;
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
      table: {
        highlightCurrentRow: true,
        onCurrentChange: (currentRow) => {
          if (currentRow != null) {
            ctx.emit("update:modelValue", currentRow?.id);
          }
        }
      },
      request: {
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      search: { show: false },
      form: {
        wrapper: {
          is: "el-drawer"
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
        name: {
          title: "用户姓名",
          search: { show: true },
          type: "text",
          column: {
            sortable: true
          }
        }
      }
    }
  };
}

import * as api from "./api.js";
import { CreateCrudOptionsProps, dict, CreateCrudOptionsRet, EditReq, DelReq, AddReq } from "@fast-crud/fast-crud";
export default async function ({ crudExpose }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
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
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        text: {
          title: "text",
          type: "text",
          search: { show: true },
          column: {
            columnSlots: {
              header() {
                return (
                  <span class={"flex "}>
                    Text
                    <el-tooltip content={"tooltip 提示"}>
                      <fs-icon class={"ml-5"} icon={"ion:alert-circle-outline"}></fs-icon>
                    </el-tooltip>
                  </span>
                );
              }
            }
          }
        }
      }
    }
  };
}

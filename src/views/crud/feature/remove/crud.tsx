import * as api from "./api";
import { ElMessageBox } from "element-plus";
import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    if(form.id==null){
      form.id = row.id;
    };
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
      table: {
        remove: {
          async confirmFn(context) {
            await ElMessageBox.confirm(`确定删除记录(${context.row.id})吗?`);
          },
          confirmTitle: "请确认", // confirmFn配置为空时生效
          confirmMessage: "确定删除此记录吗", // confirmFn配置为空时生效
          showSuccessMessage: true, //是否显示删除成功记录
          refreshTable: true, //删除后是否刷新表格
          onCanceled({ row }) {
            console.log(`记录${row.id}取消删除`);
          },
          onRemoved({ row }) {
            //可以在这里自定义删除成功记录
            console.log(`记录${row.id}已删除`);
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
        text: {
          title: "文本",
          search: { show: true },
          type: "text"
        }
      }
    }
  };
}

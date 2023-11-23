import * as api from "./api";
import {
  AddReq,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes,
  useUi
} from "@fast-crud/fast-crud";

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

  const { ui } = useUi();

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      form: {
        labelWidth: "200px"
      },
      columns: {
        name: {
          title: "表单字段组件周围的render",
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
        render: {
          title: "字段组件本身render",
          type: "text",
          form: {
            helper: "组件本身render",
            render({ form }) {
              return (
                <div>
                  <el-input v-model={[form.render]} />
                  render value : {form.render}
                </div>
              );
            }
          }
        }
      }
    }
  };
}

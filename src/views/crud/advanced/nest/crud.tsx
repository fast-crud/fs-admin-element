import * as api from "./api";
import { ref, shallowRef } from "vue";
import {
  AddReq,
  compute,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes
} from "@fast-crud/fast-crud";
import SubTable from "./sub-table/index.vue";

export default function ({ crudExpose, context: { asideTableRef } }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
  const currentRow = ref();

  return {
    crudOptions: {
      table: {
        "highlight-current-row": true,
        // 监听 el-table的单行选中事件
        onCurrentChange(currentRow) {
          console.log("选中行", currentRow);
          if (asideTableRef.value) {
            asideTableRef.value.setSearchFormData({ form: { gradeId: currentRow.id } });
            asideTableRef.value.doRefresh();
          }
        }
      },
      pagination: {},
      form: {
        wrapper: {
          is: "el-drawer",
          size: "50%"
        }
      },
      request: {
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      rowHandle: {
        width: "240px"
      },
      toolbar: {
        compact: false
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
        grade: {
          title: "年级",
          search: { show: true },
          type: "text",
          column: {
            sortable: true
          }
        },
        nestId: {
          title: "嵌套表格",
          //复合字段类型
          type: ["number", "colspan"],
          form: {
            // 嵌套表格字段
            rules: [{ required: true, message: "请选择用户" }],
            component: {
              //局部引用子表格，要用shallowRef包裹
              name: shallowRef(SubTable),
              vModel: "modelValue",
              //将年级id传入子组件
              gradeId: compute(({ form }) => {
                return form.id;
              })
            }
            // antdv 的跨列配置，需要配置如下三个, 可以通过colspan简化
            // col: { span: 24 },
            // labelCol: { span: 2 },
            // wrapperCol: { span: 21 }
          }
        }
      }
    }
  };
}

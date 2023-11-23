import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict } from "@fast-crud/fast-crud";

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
      search: {
        container: {
          layout: "multi-line"
        },
        col: {
          span: 4
        },
        options: {
          labelWidth: "100px"
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
        radio: {
          title: "状态",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          column: {
            filters: [
              { text: "开", value: "1" },
              { text: "关", value: "0" },
              { text: "停", value: "2" }
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => {
              return record.radio === value;
            },
            sorter: (a, b) => a.radio - b.radio,
            sortDirections: ["descend"]
          }
        },
        text1: {
          type: "datetimerange",
          title: "text1",
          search: { show: true, col: { span: 8 } }
        },
        text2: {
          type: "text",
          title: "text2",
          search: { show: true }
        },
        text3: {
          type: "text",
          title: "text3",
          search: { show: true }
        },
        text4: {
          type: "text",
          title: "text4",
          search: { show: true }
        },
        text5: {
          type: "text",
          title: "text5",
          search: { show: true }
        },
        text6: {
          type: "text",
          title: "text6",
          search: { show: true }
        },
        text7: {
          type: "text",
          title: "text7",
          search: { show: true }
        },
        text8: {
          type: "text",
          title: "text8",
          search: { show: true }
        }
      }
    }
  };
}

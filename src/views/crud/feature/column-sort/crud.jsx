import * as api from "./api";
import { dict } from "@fast-crud/fast-crud";
export default function ({ expose }) {
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
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        col1: {
          title: "col.1",
          search: { show: true },
          type: "text"
        },
        col2: {
          title: "col.2,我排最后一个",
          type: "text",
          column: {
            order: 2
          }
        },
        col3: {
          title: "col.3,我排第一个",
          type: "text",
          column: {
            order: 0
          }
        },
        col4: {
          title: "col.4,我在col3后面",
          type: "text",
          column: {
            order: 0
          }
        },
        col5: {
          title: "col.5",
          type: "text"
        }
      }
    }
  };
}

import * as api from "./api";
import { dict } from "@fast-crud/fast-crud";
export default function ({ expose }) {
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

  /**
   * 列合并render
   */
  function colMergeRender({ index }) {
    return {
      props: {
        colSpan: 5
      }
    };
  }
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        //合并单元格
        spanMethod: ({ row, column, rowIndex, columnIndex }) => {
          if (columnIndex === 2) {
            //第三列纵向合并
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          } else if (rowIndex % 2 === 0) {
            // 第四列 第五列横向合并
            if (columnIndex === 3) {
              return {
                rowspan: 1,
                colspan: 2
              };
            } else if (columnIndex === 4) {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        },
        //表尾合计行
        summaryMethod: (param) => {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = "Total Cost";
              return;
            }
            const values = data.map((item) => Number(item[column.property]));
            if (!values.every((value) => isNaN(value))) {
              sums[index] = `$ ${values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0)}`;
            } else {
              sums[index] = "N/A";
            }
          });

          return sums;
        },
        showSummary: true
      },
      columns: {
        id: {
          title: "id",
          type: "text"
        },
        radio: {
          title: "状态",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        },
        cellMerge: {
          title: "上下合并"
        },
        colMerge1: {
          title: "左右合并",
          column: {
            align: "left"
          }
        },
        colMerge2: {
          title: "左右合并"
        }
        // header1: {
        //   title: "表头合并(我合并了)",
        //   type: "text",
        //   column: {
        //     colSpan: 2
        //   }
        // },
        // header2: {
        //   title: "表头合并",
        //   type: "text",
        //   column: {
        //     colSpan: 0
        //   }
        // }
      }
    }
  };
}

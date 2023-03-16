import * as api from "./api";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, utils } from "@fast-crud/fast-crud";

console.log("utils", utils);
export default function ({ expose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        scroll: { x: 1700 }
      },
      rowHandle: { fixed: "right" },
      form: {
        wrapper: {
          width: "70%"
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
        timestamp: {
          title: "时间戳",
          type: "datetime",
          search: {
            show: true,
            width: 185,
            component: {}
          }
        },
        humanize: {
          type: ["datetime", "time-humanize"],
          title: "人性化时间",
          column: {
            component: {
              options: {
                largest: 2
              }
            }
          }
        },
        datetime: {
          title: "日期时间",
          type: "datetime"
        },
        format: {
          title: "格式化",
          type: "datetime",
          form: {
            component: {
              //显示格式化
              format: "YYYY年MM月DD日 HH:mm",
              //输入值格式
              valueFormat: "YYYY-MM-DD HH:mm:ss"
            }
          },
          column: {
            width: 180,
            component: {
              // 显示格式化，行展示组件使用的dayjs，
              format: "YYYY年MM月DD日 HH:mm"
            }
          }
        },
        date: {
          title: "仅日期",
          type: "date",
          form: {
            component: {
              events: {
                onChange(context) {
                  console.log("change", context);
                }
              }
            }
          }
        },
        disabledDate: {
          title: "禁用日期",
          type: "date",
          form: {
            component: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              }
            }
          }
        },
        time: {
          title: "仅时间",
          type: "time"
        },
        month: {
          title: "月份",
          type: "month"
        },
        week: {
          title: "星期",
          type: "week",
          form: {
            component: {
              format: "YYYY-w[周]",
              valueFormat: "YYYY-MM-DD HH:mm:ss" //输入值的格式
            }
          }
        },
        //element 不支持季度选择
        // quarter: {
        //   title: "季度",
        //   type: "quarter",
        //   form: {
        //     component: {
        //       valueFormat: "YYYY-MM-DD HH:mm:ss" //输入值的格式
        //     }
        //   }
        // },
        year: {
          title: "年份",
          type: "year"
        },
        daterange: {
          title: "日期范围",
          type: "daterange",
          search: { show: true, width: 300 },
          valueBuilder({ row, key }) {
            if (!utils.strings.hasEmpty(row.daterangeStart, row.daterangeEnd)) {
              row[key] = [row.daterangeStart, row.daterangeEnd];
            }
          }
        },
        datetimerange: {
          title: "日期时间范围",
          type: "datetimerange",
          valueBuilder({ row, key }) {
            if (!utils.strings.hasEmpty(row.datetimerangeStart, row.datetimerangeEnd)) {
              row[key] = [row.datetimerangeStart, row.datetimerangeEnd];
            }
          },
          valueResolve({ form, key }) {
            const row = form;
            if (row[key] != null && !utils.strings.hasEmpty(row[key])) {
              row.datetimerangeStart = row[key][0];
              row.datetimerangeEnd = row[key][1];
            } else {
              row.datetimerangeStart = null;
              row.datetimerangeEnd = null;
            }
          }
        }
      }
    }
  };
}

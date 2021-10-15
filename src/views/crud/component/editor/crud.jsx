import * as api from "./api";
import { utils, dict, compute } from "@fast-crud/fast-crud";
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
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
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
        title: {
          title: "标题",
          type: ["text", "colspan"],
          column: {
            width: 400
          }
        },
        text: {
          title: "摘要",
          type: ["textarea", "colspan"],
          viewForm: {
            component: {
              name: null,
              render(h, scope) {
                return <div>{scope.value}</div>;
              }
            }
          }
        },
        disabled: {
          title: "禁用启用",
          search: { show: false },
          type: ["dict-switch", "colspan"],
          dict: dict({
            data: [
              { value: true, label: "禁用" },
              { value: false, label: "启用" }
            ]
          })
        },
        // 放弃支持quill，两年没有更新了，关键是bug修复不了
        // change: {
        //   title: "切换编辑器",
        //   type: "dict-radio",
        //   disabled: true,
        //   dict: dict({
        //     data: [
        //       { value: "quill", label: "Quill" },
        //       { value: "wang", label: "WangEditor" }
        //     ]
        //   })
        // },
        // content_quill: {
        //   title: "内容",
        //   column: {
        //     show: false
        //   },
        //   type: ["editor-quill", "colspan"],
        //   form: {
        //     show: compute(({ form }) => {
        //       return form.change === "quill";
        //     }),
        //     component: {
        //       disabled: compute(({ form }) => {
        //         return form.disabled;
        //       }),
        //       uploader: {
        //         type: "form", // 上传后端类型【cos,aliyun,oss,form】
        //         buildUrl(res) {
        //           return "http://www.docmirror.cn:7070" + res.url;
        //         }
        //       },
        //       on: {
        //         "text-change": (event) => {
        //           console.log("text-change:", event);
        //         }
        //       }
        //     }
        //   }
        // },
        content_wang: {
          title: "内容",
          column: {
            width: 300,
            show: false
          },
          type: ["editor-wang", "colspan"], // 富文本图片上传依赖file-uploader，请先配置好file-uploader
          form: {
            // 动态显隐字段
            // show: compute(({ form }) => {
            //   return form.change === "wang";
            // }),
            rules: [{ required: true, message: "此项必填" }],
            component: {
              disabled: compute(({ form }) => {
                return form.disabled;
              }),
              id: "1", // 当同一个页面有多个editor时，需要配置不同的id
              config: {},
              uploader: {
                type: "form",
                buildUrl(res) {
                  return res.url;
                }
              }
            }
          }
        }
      }
    }
  };
}

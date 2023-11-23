import * as api from "./api";
import { createUploaderRules } from "@fast-crud/fast-extends";
import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

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
      form: {
        wrapper: {
          async onOpened() {
            // 异步组件实例的获取
            const componentRef = await expose.getFormComponentRef("file", true);
            console.log("componentRef", componentRef);
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
        file: {
          title: "表单上传",
          type: "file-uploader",
          form: {
            component: {
              multiple: true, //可选择多个
              uploader: {
                type: "form"
              }
            }
          },
          column: {
            component: {
              // 如果你后台返回的值不是一个完整的url，那么展示时就无法显示和点击
              // 需要你本地根据value构建文件的url。
              // 支持异步
              async buildUrl(value) {
                return value;
              }
            }
          }
        },
        pictureCard: {
          title: "照片墙",
          type: "image-uploader",
          form: {
            component: {
              limit: 1,
              uploader: {
                type: "form"
              }
            },
            rules: createUploaderRules([{ required: true, message: "此项必传", trigger: "change" }]),
            helper: "最大可上传1个文件"
          },
          column: {
            component: {
              buildPreviewUrl({ url, index }) {
                if (index === 0) {
                  return "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
                } else {
                  return url + "?preview=600x600";
                }
              }
            }
          }
        },
        error: {
          title: "error",
          type: "image-uploader",
          column: {
            component: {
              modelValue: null
            }
          }
        },
        cropper: {
          title: "裁剪",
          type: "cropper-uploader",
          form: {
            component: {
              uploader: {
                type: "form"
              }
            },
            rules: createUploaderRules([{ required: true, message: "此项必传", trigger: "change" }])
          }
        },
        keyValueType: {
          title: "valueType为key",
          type: "file-uploader",
          form: {
            component: {
              uploader: {
                type: "form"
              },
              valueType: "key",
              async buildUrl(value) {
                return new Promise((resolve) => {
                  const url = "http://www.docmirror.cn:7070/api/upload/form/download?key=" + value;
                  resolve(url);
                });
              }
            }
          },
          column: {
            component: {
              async buildUrl(value) {
                return new Promise((resolve) => {
                  const url = "http://www.docmirror.cn:7070/api/upload/form/download?key=" + value;
                  resolve(url);
                });
              }
            }
          }
        },
        limit: {
          title: "限制数量",
          type: "file-uploader",
          form: {
            component: {
              limit: 1,
              uploader: {
                type: "form"
              }
            },
            helper: "最大可上传1个文件"
          }
        },
        sizeLimit: {
          title: "限制大小",
          type: "file-uploader",
          form: {
            component: {
              sizeLimit: 1024,
              uploader: {
                type: "form"
              }
            },
            helper: "大小不能超过1k"
          }
        },
        accept: {
          title: "限制类型",
          type: "file-uploader",
          form: {
            component: {
              accept: ".jpg,.png"
            },
            helper: "只能上传jpg或者png"
          }
        },
        validation: {
          title: "校验",
          type: "file-uploader",

          form: {
            rules: createUploaderRules([{ required: true, message: "此项必传", trigger: "change" }]),
            component: {
              uploader: {
                type: "form"
              }
            }
          }
        }
      }
    }
  };
}

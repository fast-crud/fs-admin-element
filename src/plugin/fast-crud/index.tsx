import { request, requestForMock } from "/src/api/service";
import {
  ColumnCompositionProps,
  CrudOptions,
  FastCrud,
  setLogger,
  useColumns,
  UseCrudProps,
  useTypes
} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import {
  FsExtendsCopyable,
  FsExtendsEditor,
  FsExtendsInput,
  FsExtendsJson,
  FsExtendsTime,
  FsExtendsUploader,
  FsUploaderS3SignedUrlType
} from "@fast-crud/fast-extends";
import "@fast-crud/fast-extends/dist/style.css";
import UiElement from "@fast-crud/ui-element";
import _ from "lodash-es";
import { useCrudPermission } from "../permission";
import { GetSignedUrl } from "/@/views/crud/component/uploader/s3/api";
import { ElNotification } from "element-plus";

function install(app, options: any = {}) {
  app.use(UiElement);
  setLogger({ level: "debug" });
  app.use(FastCrud, {
    i18n: options.i18n,
    async dictRequest({ url }) {
      if (url && url.startsWith("/mock")) {
        //如果是crud开头的dict请求视为mock
        return await requestForMock({ url, method: "post" });
      }
      return await request({ url, method: "post" });
    },
    /**
     * useCrud时会被执行
     * @param props
     */
    commonOptions(props: UseCrudProps): CrudOptions {
      const opts = {
        table: {
          size: "default",
          pagination: false,
          conditionalRender: {
            match(scope) {
              //不能用 !scope.value ， 否则switch组件设置为关之后就消失了
              const { value, key } = scope;
              return !value && key != "_index" && value != false;
            },
            render(scope: any) {
              return "-";
            }
          }
        },
        search: {
          options: {
            inline: false
          },
          container: {
            col: {
              span: 4
            }
          }
        },
        rowHandle: {
          buttons: {
            view: { text: null, icon: "ion:eye-outline", size: "default" },
            copy: { show: true, text: null, icon: "ion:copy-outline", size: "default" },
            edit: { text: null, icon: "ion:create-outline", size: "default" },
            remove: { type: "danger", text: null, icon: "ion:trash-outline", size: "default" }
          },
          dropdown: {
            more: {
              size: "default"
            }
          }
        },
        request: {
          // 查询参数转换
          transformQuery: ({ page, form, sort }) => {
            const limit = page.pageSize;
            const currentPage = page.currentPage ?? 1;
            const offset = limit * (currentPage - 1);

            sort = sort == null ? {} : sort;

            return {
              page: {
                limit,
                offset
              },
              query: form,
              sort
            };
          },
          // page请求结果转换
          transformRes: ({ res }) => {
            const pageSize = res.limit;
            let currentPage = res.offset / pageSize;
            if (res.offset % pageSize === 0) {
              currentPage++;
            }
            return { currentPage, pageSize, records: res.records, total: res.total, ...res };
          }
        },
        form: {
          async afterSubmit({ mode }) {
            if (mode === "add") {
              ElNotification.success({ message: "添加成功" });
            } else if (mode === "edit") {
              ElNotification.success({ message: "保存成功" });
            }
          },
          row: {
            gutter: 20
          },
          display: "flex", //表单布局
          labelWidth: "100px" //表单label宽度
        },
        columns: {
          createdAt: {
            title: "创建时间",
            type: "datetime",
            form: {
              show: false
            },
            column: {
              order: 1000
            }
          }
        }
      };

      // 从 useCrud({permission}) 里获取permission参数，去设置各个按钮的权限
      const permission = props.context?.permission || null;
      const crudPermission = useCrudPermission({ permission });
      return crudPermission.merge(opts);
    }
  });

  // fast-extends里面的扩展组件均为异步组件，只有在使用时才会被加载，并不会影响首页加载速度
  //安装uploader 公共参数
  app.use(FsExtendsUploader, {
    defaultType: "cos",
    cos: {
      keepName: true,
      domain: "https://d2p-demo-1251260344.cos.ap-guangzhou.myqcloud.com",
      bucket: "d2p-demo-1251260344",
      region: "ap-guangzhou",
      secretId: "", //
      secretKey: "", // 传了secretKey 和secretId 代表使用本地签名模式（不安全，生产环境不推荐）
      getAuthorization(custom: any) {
        // 不传secretKey代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
        return request({
          url: "http://www.docmirror.cn:7070/api/upload/cos/getAuthorization",
          method: "get"
        }).then((ret) => {
          // 返回结构如下
          // ret.data:{
          //   TmpSecretId,
          //   TmpSecretKey,
          //   XCosSecurityToken,
          //   ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
          // }
          return ret;
        });
      },
      successHandle(ret) {
        // 上传完成后可以在此处处理结果，修改url什么的
        console.log("success handle:", ret);
        return ret;
      }
    },
    alioss: {
      keepName: true,
      domain: "https://d2p-demo.oss-cn-shenzhen.aliyuncs.com",
      bucket: "d2p-demo",
      region: "oss-cn-shenzhen",
      accessKeyId: "",
      accessKeySecret: "",
      async getAuthorization(custom, context) {
        // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
        const ret = await request({
          url: "http://www.docmirror.cn:7070/api/upload/alioss/getAuthorization",
          method: "get"
        });
        console.log("ret", ret);
        return ret;
      },
      sdkOpts: {
        // sdk配置
        secure: true // 默认为非https上传,为了安全，设置为true
      },
      successHandle(ret) {
        // 上传完成后可以在此处处理结果，修改url什么的
        console.log("success handle:", ret);
        return ret;
      }
    },
    qiniu: {
      keepName: true,
      bucket: "d2p-demo",
      async getToken(options) {
        const ret = await request({
          url: "http://www.docmirror.cn:7070/api/upload/qiniu/getToken",
          method: "get"
        });
        return ret; // {token:xxx,expires:xxx}
      },
      successHandle(ret) {
        // 上传完成后可以在此处处理结果，修改url什么的
        console.log("success handle:", ret);
        return ret;
      },
      domain: "http://d2p.file.handsfree.work"
    },
    s3: {
      keepName: true,
      //同时也支持minio
      bucket: "fast-crud",
      sdkOpts: {
        s3ForcePathStyle: true,
        signatureVersion: "v4",
        region: "us-east-1",
        forcePathStyle: true,
        //minio与s3完全适配
        endpoint: "https://play.min.io",
        credentials: {
          //不建议在客户端使用secretAccessKey来上传
          accessKeyId: "Q3AM3UQ867SPQQA43P2F", //访问登录名
          secretAccessKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG" //访问密码
        }
      },
      //预签名配置，向后端获取上传的预签名连接
      async getSignedUrl(bucket: string, key: string, options: any, type: FsUploaderS3SignedUrlType) {
        return await GetSignedUrl(bucket, key, type);
      },
      successHandle(ret: any) {
        // 上传完成后可以在此处处理结果，修改url什么的
        console.log("success handle:", ret);
        return ret;
      }
    },
    form: {
      keepName: true,
      action: "http://www.docmirror.cn:7070/api/upload/form/upload",
      name: "file",
      withCredentials: false,
      uploadRequest: async ({ action, file, onProgress }) => {
        // @ts-ignore
        const data = new FormData();
        data.append("file", file);
        return await request({
          url: action,
          method: "post",
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data,
          onUploadProgress: (p) => {
            onProgress({ percent: Math.round((p.loaded / p.total) * 100) });
          }
        });
      },
      successHandle(ret) {
        // 上传完成后的结果处理， 此处应返回格式为{url:xxx,key:xxx}
        return {
          url: "http://www.docmirror.cn:7070" + ret,
          key: ret.replace("/api/upload/form/download?key=", "")
        };
      }
    }
  });
  //安装editor
  app.use(FsExtendsEditor, {
    //编辑器的公共配置
    wangEditor: {
      editorConfig: {
        MENU_CONF: {}
      },
      toolbarConfig: {}
    }
  });
  app.use(FsExtendsCopyable);
  app.use(FsExtendsJson);
  app.use(FsExtendsTime);
  app.use(FsExtendsInput);

  const { addTypes, getType } = useTypes();
  //此处演示修改官方字段类型
  const textType = getType("text");
  textType.search.autoSearchTrigger = "change"; //修改官方的字段类型，设置为文本变化就触发查询

  // 自定义字段合并插件
  const { registerMergeColumnPlugin } = useColumns();
  registerMergeColumnPlugin({
    name: "readonly-plugin",
    order: 1,
    handle: (columnProps: ColumnCompositionProps) => {
      // 你可以在此处做你自己的处理
      // 比如你可以定义一个readonly的公共属性，处理该字段只读，不能编辑
      if (columnProps.readonly) {
        // 合并column配置
        _.merge(columnProps, {
          form: { show: false },
          viewForm: { show: true }
        });
      }
      return columnProps;
    }
  });
}

export default {
  install
};

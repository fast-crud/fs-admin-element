import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import * as path from "path";
import { generateModifyVars } from "./build/modify-vars";
// import { configThemePlugin } from "./build/theme-plugin";
import DefineOptions from "unplugin-vue-define-options/vite";
// https://vitejs.dev/config/
// 增加环境变量 _
process.env.VITE_APP_VERSION = require("./package.json").version;
process.env.VITE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss");

export default ({ command, mode }) => {
  console.log("args", command, mode);

  let devServerFs: any = {};
  let devAlias: any[] = [];
  if (mode.startsWith("debug")) {
    devAlias = [
      { find: /@fast-crud\/fast-crud\/dist/, replacement: path.resolve("../../fast-crud/src/") },
      // { find: /@fast-crud\/fast-crud$/, replacement: path.resolve("../../fast-crud/src/") },
      { find: /@fast-crud\/fast-extends\/dist/, replacement: path.resolve("../../fast-extends/src/") }
      // { find: /@fast-crud\/fast-extends$/, replacement: path.resolve("../../fast-extends/src/") },
      // { find: /@fast-crud\/ui-element$/, replacement: path.resolve("../../ui/ui-element/src/") },
      // { find: /@fast-crud\/ui-interface$/, replacement: path.resolve("../../ui/ui-interface/src/") }
    ];
    devServerFs = {
      // 这里配置dev启动时读取的项目根目录
      // allow: ["../../"]
    };
    console.log("devAlias", devAlias);
  }

  return {
    base: "/element/",
    plugins: [
      DefineOptions(),
      vueJsx(),
      vue(),
      // 压缩build后的代码
      viteCompression()
    ],
    // optimizeDeps: {
    //   exclude: ["@fast-crud/fast-crud-extends"],
    // },
    esbuild: {
      drop: command === "build" ? ["debugger"] : [],
      jsxFactory: "h",
      jsxFragment: "Fragment"
    },
    resolve: {
      alias: [
        ...devAlias,
        { find: "/@", replacement: path.resolve("./src") },
        { find: "/#", replacement: path.resolve("./types") }
      ],
      dedupe: ["vue"]
    },
    build: {
      rollupOptions: {
        plugins: [visualizer()]
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // 修改默认主题颜色，配置less变量
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: 3001,
      fs: devServerFs,
      proxy: {
        // with options
        "/api": {
          //配套后端 https://github.com/fast-crud/fs-server-js
          target: "http://127.0.0.1:7001"
        }
      }
    }
  };
};

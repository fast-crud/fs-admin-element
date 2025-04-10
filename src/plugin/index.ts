import "./iconify";
import "./iconfont";
import FastCrud from "./fast-crud";
import permission from "./permission";
import { setupMonaco } from "/@/plugin/monaco";

function install(app, options: any = {}) {
  app.use(FastCrud, options);
  app.use(permission);
  setupMonaco();
}

export default {
  install
};

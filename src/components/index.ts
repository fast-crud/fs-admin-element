import { defineAsyncComponent } from "vue";
import FsPage from "./fs-page.vue";
const AsyncHighLight = defineAsyncComponent(() => import("./highlight/index.vue"));

export default {
  install(app) {
    app.component("FsHighlight", AsyncHighLight);
    app.component("FsPage", FsPage);
  }
};

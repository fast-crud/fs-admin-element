<template>
  <el-config-provider :locale="locale">
    <router-view v-if="routerEnabled" />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { provide, ref, nextTick } from "vue";
import { usePageStore } from "/src/store/modules/page";
import { useResourceStore } from "/src/store/modules/resource";
import { useSettingStore } from "/@/store/modules/settings";
import { useAsync } from "@fast-crud/fast-crud/src/use/use-async";
export default {
  name: "App",
  setup() {
    //刷新页面方法
    const routerEnabled = ref(true);
    async function reload() {
      console.log("router reload");
      routerEnabled.value = false;
      await nextTick();
      routerEnabled.value = true;
    }
    provide("fn:router.reload", reload);

    //其他初始化
    const resourceStore = useResourceStore();
    resourceStore.init();
    const pageStore = usePageStore();
    pageStore.init();
    const settingStore = useSettingStore();
    settingStore.init();

    //注册异步lib，懒加载
    const { registerAsyncLib } = useAsync();
    registerAsyncLib("FsExportUtil");

    return {
      routerEnabled,
      locale: zhCn
    };
  }
};
</script>

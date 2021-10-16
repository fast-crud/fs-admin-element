<template>
  <div class="fs-theme" @click="show()">
    <fs-iconify icon="ion:sparkles-outline" />
    <el-drawer v-model="visible" title="主题设置" width="350px">
      <fs-theme-color-picker
        :primary-color="setting.getTheme.primaryColor"
        @change="setting.setPrimaryColor"
      ></fs-theme-color-picker>
    </el-drawer>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import FsThemeColorPicker from "./color-picker.vue";
import { useSettingStore } from "/@/store/modules/settings";

export default defineComponent({
  name: "FsTheme",
  components: { FsThemeColorPicker },
  setup() {
    const visible = ref(false);
    function show() {
      visible.value = true;
    }

    const setting = useSettingStore();
    return {
      visible,
      show,
      setting
    };
  }
});
</script>

<style lang="less">
.fs-theme {
}
.fs-theme-drawer {
}
</style>

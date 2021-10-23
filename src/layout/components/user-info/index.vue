<template>
  <el-dropdown>
    <div class="fs-user-info">您好，{{ userStore.getUserInfo?.nickName }}</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <div @click="doLogout">注销登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { defineComponent } from "vue";
import { useUserStore } from "/src/store/modules/user";
import { ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "FsUserInfo",
  setup() {
    const userStore = useUserStore();
    console.log("user", userStore);
    const { t } = useI18n();
    async function doLogout() {
      await ElMessageBox.confirm(t("app.login.logoutMessage"), t("app.login.logoutTip"));
      await userStore.logout(true);
    }
    return {
      userStore,
      doLogout
    };
  }
});
</script>

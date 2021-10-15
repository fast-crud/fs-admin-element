<template>
  <el-dropdown>
    <div class="fs-user-info">您好，{{ userStore.getUserInfo?.nickName }}</div>
    <template #overlay>
      <el-menu>
        <el-menu-item>
          <div @click="doLogout">注销登录</div>
        </el-menu-item>
      </el-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { defineComponent } from "vue";
import { useUserStore } from "/src/store/modules/user";
import { Modal } from "ant-design-vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "FsUserInfo",
  setup() {
    const userStore = useUserStore();
    console.log("user", userStore);
    const { t } = useI18n();
    function doLogout() {
      Modal.confirm({
        iconType: "warning",
        title: t("app.login.logoutTip"),
        content: t("app.login.logoutMessage"),
        onOk: async () => {
          await userStore.logout(true);
        }
      });
    }
    return {
      userStore,
      doLogout
    };
  }
});
</script>

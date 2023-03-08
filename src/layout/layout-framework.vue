<template>
  <el-container class="fs-framework">
    <el-aside :width="asideCollapsed ? '64px' : '300px'" :trigger="null" collapsible>
      <div class="header-logo">
        <img src="/images/logo/rect-black.svg" />
        <span v-if="!asideCollapsed" class="title">FsAdmin</span>
      </div>
      <div class="aside-menu">
        <fs-menu mode="vertical" :scroll="false" :menus="asideMenus" :collapse="asideCollapsed" menu-trigger="click" />
      </div>
    </el-aside>

    <el-container class="layout-body">
      <el-header class="header">
        <div class="header-buttons">
          <div class="menu-fold" @click="asideCollapsedToggle">
            <fs-icon v-if="asideCollapsed" icon="ant-design:menu-unfold-outlined" />
            <fs-icon v-else icon="ant-design:menu-fold-outlined" />
          </div>
        </div>

        <fs-menu
          class="fs-header-menu"
          mode="horizontal"
          :expand-selected="false"
          :selectable="false"
          :scroll="false"
          :ellipsis="true"
          :menus="frameworkMenus"
        />
        <div class="header-right header-buttons">
          <!--          <button-->
          <!--            w:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"-->
          <!--            w:text="sm white"-->
          <!--            w:font="mono light"-->
          <!--            w:p="y-2 x-4"-->
          <!--            w:border="2 rounded blue-200"-->
          <!--          >-->
          <!--            Button-->
          <!--          </button>-->
          <fs-menu mode="horizontal" :scroll="false" :menus="headerMenus" :ellipsis="false" />
          <fs-locale class="btn" />
          <!--          <fs-theme-set class="btn" />-->
          <fs-user-info class="btn" />
        </div>
      </el-header>
      <fs-tabs></fs-tabs>
      <el-main class="fs-framework-content">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade-transverse">
              <keep-alive :include="keepAlive">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </template>
        </router-view>
      </el-main>
      <el-footer class="fs-framework-footer">
        <div>Powered by Greper</div>
        <div>v{{ version }}</div>
        <fs-source-link />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { computed, onErrorCaptured, ref } from "vue";
import FsMenu from "./components/menu/index.jsx";
import FsLocale from "./components/locale/index.vue";
import FsSourceLink from "./components/source-link/index.vue";
import FsUserInfo from "./components/user-info/index.vue";
import FsTabs from "./components/tabs/index.vue";
import { useResourceStore } from "../store/modules/resource";
import { usePageStore } from "/@/store/modules/page";
import FsThemeSet from "/@/layout/components/theme/index.vue";
import { ElNotification } from "element-plus";
export default {
  name: "LayoutFramework",
  // eslint-disable-next-line vue/no-unused-components
  components: { FsThemeSet, FsMenu, FsLocale, FsSourceLink, FsUserInfo, FsTabs },
  setup() {
    const resourceStore = useResourceStore();
    const frameworkMenus = computed(() => {
      return resourceStore.getFrameworkMenus;
    });
    const headerMenus = computed(() => {
      return resourceStore.getHeaderMenus;
    });
    const asideMenus = computed(() => {
      return resourceStore.getAsideMenus;
    });

    const pageStore = usePageStore();
    const keepAlive = pageStore.keepAlive;

    const asideCollapsed = ref(false);
    function asideCollapsedToggle() {
      asideCollapsed.value = !asideCollapsed.value;
    }
    onErrorCaptured((e) => {
      console.error("ErrorCaptured:", e);
      ElNotification.error({ message: e.message });
      //阻止错误向上传递
      return false;
    });
    const version = ref(import.meta.env.VITE_APP_VERSION);
    return {
      version,
      frameworkMenus,
      headerMenus,
      asideMenus,
      keepAlive,
      asideCollapsed,
      asideCollapsedToggle
    };
  }
};
</script>
<style lang="less">
.fs-framework {
  height: 100%;
  overflow-x: hidden;
  .header-logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;

    // margin: 16px 24px 16px 0;
    //background: rgba(255, 255, 255, 0.3);
    img {
      height: 80%;
    }
    .title {
      margin-left: 5px;
      font-weight: bold;
    }
  }
  .fs-framework-content {
    flex: 1;
    border-left: 1px solid #e5e7eb;
    overflow-x: hidden;
  }
  .fs-framework-footer {
    border-left: 1px solid #e5e7eb;
    padding: 10px 20px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    background: #f6f6f6;
    display: flex;
    height: auto;
    justify-content: space-between;
    > div {
      padding: 5px;
    }
  }
  .header-buttons {
    display: flex;
    align-items: center;
    //height: 100%;
    & > *:hover {
      color: @primary-color;
    }
    & > * {
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;
      padding: 0 10px;
    }

    //& > .btn {
    //  &:hover {
    //    // background-color: #fff;
    //    color: @primary-color;
    //  }
    //}
  }
  .header-right {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    margin-right: 10px;
    line-height: 60px;
    .fs-menu-wrapper {
      .el-menu-item {
        & > * {
          line-height: 58px;
        }
      }
    }
  }
  .fs-header-menu {
    flex: 1;
    overflow: hidden;
  }
  .aside-menu {
    flex: 1;
    ui {
      height: 100%;
    }
    overflow: hidden;
    // overflow-y: auto;
  }

  .layout-body {
    flex: 1;
  }
}
.fs-framework {
  &.el-container {
    flex-direction: row;
  }

  .el-aside {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .el-header {
    flex: 0;
    height: 60px;
    padding: 0 10px;
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-menu--horizontal {
      border: 0;
      .el-sub-menu__title * {
        vertical-align: baseline;
        box-sizing: content-box;
        line-height: 58px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-sub-menu__title {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        line-height: inherit;
        .menu-item-title {
          display: flex;
          align-items: center;
        }
      }
      .el-sub-menu__icon-arrow {
        margin-left: 5px;
        margin-top: 0;
        position: initial;
        padding: 0;
        line-height: inherit;
      }
    }
  }
  .el-main {
    padding: 0;
    background: #fff;
    height: 100%;
    position: relative;
  }
}
//element
.fs-framework {
  .el-aside {
    .el-menu {
      // height: 100%;
    }
  }
}
.el-menu {
  .fs-iconify {
    margin-right: 5px;
  }
}
</style>

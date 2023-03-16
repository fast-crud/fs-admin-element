<template>
  <el-dropdown class="fs-locale-picker" @command="changeLocale">
    <fs-iconify icon="ion-globe-outline" @click.prevent></fs-iconify>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in languages" :key="item.key" :command="item.key">
          <div class="language-item">
            <span v-if="item.key === current" class="icon-radio">
              <span class="iconify" data-icon="ion:radio-button-on" data-inline="false"></span>
            </span>
            <span v-else class="icon-radio">
              <span class="iconify" data-icon="ion:radio-button-off" data-inline="false"></span>
            </span>
            {{ item.label }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import i18n from "../../../i18n";
import { computed, inject } from "vue";
import _ from "lodash-es";
export default {
  name: "FsLocale",
  setup() {
    const languages = computed(() => {
      const map = i18n.global.messages?.value || {};
      const list = [];
      _.forEach(map, (item, key) => {
        list.push({
          key,
          label: item.label
        });
      });
      return list;
    });
    const current = computed(() => {
      return i18n.global.locale.value;
    });

    const routerReload = inject("fn:router.reload");
    const changeLocale = (change) => {
      i18n.global.locale.value = change;
      routerReload();
    };
    return {
      languages,
      current,
      changeLocale
    };
  }
};
</script>

<style lang="less">
.locale-picker {
  display: flex;
  align-items: center;
}
.language-item {
  display: flex;
  align-items: center;
  .icon-radio {
    display: flex;
    align-items: center;
  }
  .iconify {
    margin-right: 5px;
  }
}
</style>

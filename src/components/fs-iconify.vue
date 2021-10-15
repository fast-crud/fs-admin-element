<template>
  <span
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed, CSSProperties } from "vue";
import type { PropType } from "vue";

/**
 * iconify 按需加载图标组件
 * https://iconify.design/icon-sets/ion/
 */
export default defineComponent({
  name: "FsIconify",
  props: {
    // icon name
    icon: {},
    // icon color
    color: {
      type: String
    },
    // icon size
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16
    },
    spin: {}
  },
  setup(props) {
    const elRef = ref(null);

    const update = async () => {
      if (!props.icon) return;

      const el: any = unref(elRef);
      if (!el) return;

      await nextTick();
      const span: any = document.createElement("span");
      span.className = "iconify";
      span.dataset.icon = props.icon;
      el.textContent = "";
      el.appendChild(span);
    };

    const getWrapStyle = computed(
      (): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (typeof size === "string") {
          fs = parseInt(size, 10);
        }

        return {
          fontSize: `${fs}px`,
          color: color,
          display: "inline-flex"
        };
      }
    );

    watch(() => props.icon, update, { flush: "post" });

    onMounted(update);

    return { elRef, getWrapStyle };
  }
});
</script>
<style lang="less">
.app-iconify {
  display: inline-block;
  // vertical-align: middle;

  &-spin {
    svg {
      animation: loadingCircle 1s infinite linear;
    }
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  // background-color: @iconify-bg-color;
  border-radius: 100%;
}
</style>

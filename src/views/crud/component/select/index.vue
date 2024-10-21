<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-input
          v-model="columnSearchValue"
          style="width: 160px"
          placeholder="请输入列名称,回车搜索"
          @keydown.enter="onColumnSearch"
        />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useCrud, useUi } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "ComponentSelect",
  setup() {
    // crud组件的ref
    const crudRef = ref();
    // crud 配置的ref
    const crudBinding = ref();
    // 暴露的方法
    const { expose } = useExpose({ crudRef, crudBinding });
    // 你的crud配置
    const { crudOptions } = createCrudOptions({ expose });
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ expose, crudOptions });
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)
    const { ui } = useUi();
    function useColumnSearch() {
      const columnSearchValue = ref("");
      function onColumnSearch() {
        if (!columnSearchValue.value) {
          ui.message.info("请输入列名称");
        }
        const cells = document.querySelectorAll(".el-table__header-wrapper .el-table__header .el-table__cell .cell");
        for (const cell of cells) {
          //@ts-ignore
          if (cell.innerText.includes(columnSearchValue.value)) {
            // 获取 el-table__header-wrapper 的横向scroll
            const wrapper = document.querySelector(".el-table__inner-wrapper");
            if (wrapper) {
              //wrapper 的left 坐标
              const wrapperLeft = wrapper.getBoundingClientRect().left;
              //cell 的left 坐标
              const cellLeft = cell.getBoundingClientRect().left;
              const tableHeaderLeft = document
                .querySelector(".el-table__header-wrapper .el-table__header")
                .getBoundingClientRect().left;

              //获取左边最后一个fix列
              const fixLeft = document.querySelector(
                ".el-table__header-wrapper .el-table__header .el-table-fixed-column--left.is-last-column"
              );
              let fixLeftRight = fixLeft ? fixLeft.getBoundingClientRect().right : wrapperLeft;
              let targetScroll = cellLeft - tableHeaderLeft + wrapperLeft - fixLeftRight;
              console.log(targetScroll, cellLeft, wrapperLeft, fixLeftRight, tableHeaderLeft);
              expose.getBaseTableRef().setScrollLeft(targetScroll);
              return;
            }
          }
        }

        ElMessage.warning(`未找到列:${columnSearchValue.value}`);
      }
      return {
        columnSearchValue,
        onColumnSearch
      };
    }

    // 页面打开后获取列表数据
    onMounted(async () => {
      await expose.doRefresh();
      await nextTick();
      await nextTick();

      var observer = new IntersectionObserver(
        (a) => {
          console.log("inte", a);
        },
        {
          root: document.getElementById(".el-table__header-wrapper"),
          rootMargin: "0px -300px"
        }
      );
      const res = document.querySelectorAll("th.el-table__cell");
      console.log("11", res);
      for (const re of res) {
        observer.observe(re);
      }
    });

    return {
      crudBinding,
      crudRef,
      ...useColumnSearch()
    };
  }
});
</script>

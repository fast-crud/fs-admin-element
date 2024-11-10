<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import { debounce } from "lodash-es";

export default defineComponent({
  name: "FeatureFixed",
  setup() {
    const { crudRef, crudBinding, crudExpose } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, createCrudOptions });
      await crudExpose.doRefresh();

      //表头常驻
      const handleScroll = debounce((event: any) => {
        //节流执行
        const tableHeader = crudRef.value.$el.querySelector(".el-table__header-wrapper");
        const tableHeaderX = tableHeader.getBoundingClientRect().x;
        const fixedLeft = tableHeader.querySelector(".el-table-fixed-column--left.is-last-column");

        const fixedLeftX = fixedLeft
          ? fixedLeft.getBoundingClientRect().x + fixedLeft.getBoundingClientRect().width
          : tableHeaderX;

        const headCells = tableHeader.querySelectorAll(".el-table__header th.el-table__cell");
        for (const headCell of headCells) {
          if (
            headCell.classList.contains("el-table-fixed-column--left") ||
            headCell.classList.contains("el-table-fixed-column--right")
          ) {
            continue;
          }
          const cell = headCell.querySelector(".cell");
          cell.style.overflow = "hidden";
          cell.style.overflowWrap = "normal";

          const headCellX = headCell.getBoundingClientRect().x;
          const headCellXRight = headCell.getBoundingClientRect().x + headCell.getBoundingClientRect().width;
          if (headCellX < fixedLeftX && headCellXRight > fixedLeftX) {
            headCell.style.paddingLeft = `${fixedLeftX - headCellX}px`;
          } else {
            headCell.style.paddingLeft = "0px";
          }
        }
      }, 100);
      crudRef.value.$el
        .querySelector(".el-table__body-wrapper .el-scrollbar__wrap")
        ?.addEventListener("scroll", handleScroll);
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

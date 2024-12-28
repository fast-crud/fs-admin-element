<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFs, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { debounce } from "lodash-es";

function headerHolder(crudRef: any, crudBinding: any) {
  //表头常驻
  const handleScroll = debounce((event: any) => {
    //节流执行
    const tableHeader = crudRef.value.$el.querySelector(".el-table-v2__main .el-table-v2__header-wrapper");
    const tableHeaderX = tableHeader.getBoundingClientRect().x;
    const fixedLeft = tableHeader.querySelector(".el-table-v2__left .el-table-v2__header");

    const fixedLeftX = fixedLeft
      ? fixedLeft.getBoundingClientRect().x + fixedLeft.getBoundingClientRect().width
      : tableHeaderX;

    const headCells = tableHeader.querySelectorAll(
      ".el-table-v2__main .el-table-v2__header .el-table-v2__header-cell-text"
    );
    debugger;
    for (const headCell of headCells) {
      if (
        headCell.classList.contains("el-table-fixed-column--left") ||
        headCell.classList.contains("el-table-fixed-column--right")
      ) {
        continue;
      }
      const cell = headCell;
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
  crudBinding.value.table.scroll = handleScroll;
  // crudRef.value.$el.querySelector(".el-table-v2__main .el-virtual-scrollbar")?.addEventListener("scroll", handleScroll);
}
export default defineComponent({
  name: "FeatureHeaderGroup",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
    useFs({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
    // 页面打开后获取列表数据
    onMounted(async () => {
      await crudExpose.doRefresh();
      headerHolder(crudRef, crudBinding);
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

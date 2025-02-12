<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <el-input
          :model-value="columnSearchValue"
          style="width: 160px"
          placeholder="请输入列名称,回车搜索"
          @keydown.enter="onColumnSearch"
          @update:model-value="onColumnSearchValueChange"
        />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import createCrudOptions from "./crud";
import { useFs, useFsRef, useUi } from "@fast-crud/fast-crud";
import { debounce } from "lodash-es";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FeatureFixed",
  setup() {
    const { crudRef, crudBinding, crudExpose } = useFsRef();
    useFs({ crudBinding, crudRef, crudExpose, createCrudOptions });
    // 页面打开后获取列表数据
    onMounted(async () => {
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

    const { ui } = useUi();
    function useColumnSearch() {
      const columnSearchValue = ref("");
      const columnSearchFoundIndex = ref(-1);
      function onColumnSearchValueChange(value: string = "") {
        columnSearchFoundIndex.value = -1;
        columnSearchValue.value = value.trim();
      }
      function onColumnSearch() {
        if (!columnSearchValue.value) {
          ui.message.info("请输入列名称");
        }

        const cells = document.querySelectorAll(".el-table__header-wrapper .el-table__header .el-table__cell .cell");
        for (const cell of cells) {
          cell.style.color = "";
        }
        let index = -1;
        let found = false;
        for (const cell of cells) {
          //@ts-ignore
          if (cell.innerText.includes(columnSearchValue.value)) {
            //找到了
            index += 1;
            found = true;
            if (index <= columnSearchFoundIndex.value) {
              //如果还是上次找到的，继续找下一个
              continue;
            }
            columnSearchFoundIndex.value += 1;

            cell.style.color = "red";
            // 给一个闪烁的动画，让人注意到
            cell.animate(
              [
                { color: "red" },
                { color: "transparent" },
                { color: "red" },
                { color: "transparent" },
                { color: "red" },
                { color: "transparent" }
              ],
              {
                duration: 1000
              }
            );
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
              crudExpose.getBaseTableRef().setScrollLeft(targetScroll);
              return;
            }
          }
        }

        if (found) {
          columnSearchFoundIndex.value = -1;
          ElMessage.warning(`已经是最后一个，从头开始查找`);
        } else {
          ElMessage.warning(`未找到列:${columnSearchValue.value}`);
        }
      }
      return {
        columnSearchValue,
        onColumnSearch,
        onColumnSearchValueChange
      };
    }

    return {
      crudBinding,
      crudRef,
      ...useColumnSearch()
    };
  }
});
</script>

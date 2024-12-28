<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCrud, useFs, useFsRef } from "@fast-crud/fast-crud";
import { useExpose } from "@fast-crud/fast-crud";
import _ from "lodash-es";

//此处为crudOptions配置
const createCrudOptions = function ({ expose }) {
  //本地模拟后台crud接口方法 ----开始
  const records = reactive([{ id: 1, name: "Hello World" }]);
  const pageRequest = async (query) => {
    return {
      records,
      offset: 0,
      limit: 20,
      total: records.length
    };
  };
  const editRequest = async ({ form, row }) => {
    const target = _.find(records, (item) => {
      return row.id === item.id;
    });
    _.merge(target, form);
    return target;
  };
  const delRequest = async ({ row }) => {
    _.remove(records, (item) => {
      return item.id === row.id;
    });
  };

  const addRequest = async ({ form }) => {
    const maxRecord = _.maxBy(records, (item) => {
      return item.id;
    });
    form.id = (maxRecord?.id || 0) + 1;
    records.push(form);
    return form;
  };
  const selectedRowKeys = ref([]);
  //本地模拟后台crud接口方法 ----结束
  return {
    crudOptions: {
      settings: {
        plugins: {
          //这里使用行选择插件，生成行选择crudOptions配置，最终会与crudOptions合并
          rowSelection: {
            enabled: true,
            order: -2,
            before: true,
            // handle: (pluginProps,useCrudProps)=>CrudOptions,
            props: {
              multiple: true,
              crossPage: true,
              selectedRowKeys,
              onSelectedChanged(selected) {
                console.log("已选择变化：", selected);
              }
            }
          }
        }
      },
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        tableVersion: "v2",
        width: 1200,
        height: 800,
        fixed: true
      },
      rowHandle: {
        fixed: "right",
        width: 260
      },
      columns: {
        name: {
          title: "姓名",
          type: "text",
          search: { show: true },
          form: {
            component: {
              maxlength: 20
            },
            submit: true
          }
        }
      }
    }
  };
};

//此处为组件定义
export default defineComponent({
  name: "FsCrudTablev2",
  setup() {
    // crud组件的ref
    const { crudRef, crudBinding, crudExpose } = useFsRef();
    useFs({ crudRef, crudBinding, crudExpose, createCrudOptions });
    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>

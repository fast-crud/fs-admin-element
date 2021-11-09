<template>
  <el-tree
    v-if="computedTree"
    ref="treeRef"
    class="fs-permission-tree"
    :class="{ 'is-editable': editable }"
    :data="computedTree"
    :props="{ class: customNodeClass }"
    @check="onChecked"
  >
    <template #default="{ data }">
      <div :class="'node-title-pane'">
        <div class="node-title">{{ data.title }}</div>
        <div v-if="editable === true" class="node-suffix">
          <fs-icon v-if="actions.add !== false" :icon="$fsui.icons.add" @click.stop="add(data)" />
          <fs-icon v-if="actions.edit !== false && data.id !== -1" :icon="$fsui.icons.edit" @click.stop="edit(data)" />
          <fs-icon
            v-if="actions.remove !== false && data.id !== -1"
            :icon="$fsui.icons.remove"
            @click.stop="remove(data)"
          />
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script>
import _ from "lodash-es";
import getEachDeep from "deepdash-es/getEachDeep";
const eachDeep = getEachDeep(_);
import { defineComponent, ref, computed, nextTick, onMounted } from "vue";
export default defineComponent({
  name: "FsPermissionTree",
  props: {
    /**
     * 树形数据
     * */
    tree: {},
    /**
     * 是否可编辑
     */
    editable: {
      default: true
    },
    actions: {
      default: {}
    }
  },
  emits: ["add", "edit", "remove"],
  setup(props, ctx) {
    const treeRef = ref();
    const computedTree = computed(() => {
      if (props.tree == null) {
        return null;
      }
      const clone = _.cloneDeep(props.tree);
      eachDeep(clone, (value, key, pNode, context) => {
        if (value == null) {
          return;
        }
        if (!(value instanceof Object) || value instanceof Array) {
          return;
        }
        if (value.class === "is-leaf-node") {
          //处理过，无需再次处理
          return;
        }
        if (value.children != null && value.children.length > 0) {
          return;
        }
        const parents = context.parents;
        if (parents.length < 2) {
          return;
        }
        const parent = parents[parents.length - 2].value;
        //看parent下面的children，是否全部都没有children
        for (const child of parent.children) {
          if (child.children != null && child.children.length > 0) {
            //存在child有children
            return;
          }
        }
        // 所有的子节点都没有children
        parent.class = "is-twig-node"; // 连接叶子节点的末梢枝杈节点
        for (const child of parent.children) {
          child.class = "is-leaf-node";
        }
      });
      console.log("nodes ", clone);
      return [
        {
          title: "根节点",
          id: -1,
          children: clone
        }
      ];
    });
    function add(data) {
      ctx.emit("add", data);
    }
    function edit(data) {
      ctx.emit("edit", data);
    }
    function remove(data) {
      ctx.emit("remove", data);
    }
    function onChecked(a, b, c) {
      console.log("chedcked", a, b, c);
    }
    function getChecked() {
      const nodes = treeRef.value.tree.domTreeNodes;
      const checked = [];
      const halfChecked = [];
      _.forEach(nodes, (item, id) => {
        if (item.checked) {
          checked.push(id);
        } else if (item.halfChecked) {
          halfChecked.push(id);
        }
      });
      return {
        checked,
        halfChecked
      };
    }

    function customNodeClass(data) {
      debugger;
      if (data.class) {
        return data.class;
      }
      return null;
    }
    return {
      computedTree,
      add,
      edit,
      remove,
      treeRef,
      onChecked,
      getChecked,
      customNodeClass
    };
  }
});
</script>

<style lang="less">
.fs-permission-tree {
  .el-tree-node.is-expanded.is-twig-node > .el-tree-node__children {
    display: flex;
    flex-wrap: wrap;
  }

  .is-twig-node > .el-tree-node__children > div {
    width: 25%;
  }

  .is-leaf-node {
    border-bottom: 1px solid #ddd;
    padding: 5px;
    &::before {
      display: none;
    }
  }

  .node-title-pane {
    display: flex;
    .node-title {
      width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &.is-editable {
    .el-tree-node__content {
      &:hover {
        .node-suffix {
          visibility: visible;
        }
      }
    }

    .node-suffix {
      visibility: hidden;
      > * {
        margin-left: 3px;
      }
    }
  }
}
</style>

import { uiContext } from "@fast-crud/fast-crud";

export default function ({ expose }) {
  return {
    crudOptions: {
      mode:{
        name:'local',
        isMergeWhenUpdate:true,
        isAppendWhenAdd:true
      },
      actionbar: { buttons: { add: { show: true }, addRow: { show: false } } },
      editable: {
        enabled: false,
        mode: "row",
        activeTrigger: false
      },
      search: {
        show: false
      },
      toolbar: {
        buttons: {
          search: {
            show: false
          },
          refresh: {
            show: false
          },
          compact: {
            show: false
          }
        }
      },
      table: {
        maxHeight: null,
        height: null
      },
      columns: {
        name: {
          type: "text",
          title: "联系人姓名"
        },
        mobile: {
          type: "text",
          title: "联系人手机号码"
        }
      }
    }
  };
}

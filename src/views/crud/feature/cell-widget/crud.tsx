import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";

export default function ({ expose }: CreateCrudOptionsProps): {
  crudOptions: {
    mode: { name: string; isAppendWhenAdd: boolean; isMergeWhenUpdate: boolean };
    search: { show: boolean };
    pagination: { show: boolean };
    editable: { mode: string; activeTrigger: boolean; enabled: boolean };
    columns: { name: { column: { name: void }; type: string; title: string }; mobile: { type: string; title: string } };
    actionbar: { buttons: { add: { show: boolean }; addRow: { show: boolean } } }
  }
} {
  return {
    crudOptions: {
      mode: {
        name: "local",
        isMergeWhenUpdate: true,
        isAppendWhenAdd: true
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
      pagination: {
        show: false
      },
      rowHandle:{
        show: false
      },
      columns: {
        name: {
          type: "text",
          title: "联系人姓名",
          column:{
            component:{
              name: 'el-input'
            }
          }
        },
        mobile: {
          type: "text",
          title: "联系人手机号码",
          column:{
            component:{
              name: 'el-input'
            }
          }
        }
      }
    }
  };
}

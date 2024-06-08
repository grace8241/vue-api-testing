<template>
<div class="table-container"> 
      <v-data-table Are
        :headers="headers" 
        :items="desserts"
        aaaaa
        class="elevation-1"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>部門資料</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">              
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn 
                  color="primary" 
                  variant="outlined" 
                  v-bind="activatorProps" 
                  style="position: relative; left: -100px;"
                >
                  <v-icon left dark>mdi-table-plus</v-icon>
                  新增資料
                </v-btn>
              </template>
              <template v-slot:default="">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="部門編號"
                          prepend-icon="mdi-account"
                          v-model="editedItem.deptId"
                          single-line
                          @keydown="handleKeyDown"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field     
                          label="部門簡稱(英文)"
                          prepend-icon="mdi-account"                          
                          v-model="editedItem.deptCname"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="部門名稱"
                          prepend-icon="mdi-account"
                          v-model="editedItem.deptEname"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="部門簡稱(中文)"
                          prepend-icon="mdi-account"
                          v-model="editedItem.deptAname"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
                    <v-btn color="blue darken-1" text @click="saveItem" :disabled='checkData'>確定</v-btn>
                </v-card-actions>
              </v-card>
              </template>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" style="color: blue;">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)" style="color: red;">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <strong style="color: red;">目前沒有資料</strong>
        </template>

      </v-data-table>
</div>  
</template>

<script>
import { ref, watch, onMounted, onBeforeMount, computed } from 'vue';
import axios from 'axios';
import { myMixin } from '../mixins/common.js';

export default {
  setup() {
    const { initAxios } = myMixin();

    // data
    const dialog = ref(false);
    const valid = ref(true);
    const list_table_is_ok = ref(false);
    const temp_desserts = ref([]);    
    const desserts = ref([]);
    const editedIndex = ref(-1);
    const defaultItem = {
      deptId: '', 
      deptCname: '', 
      deptEname: '', 
      deptAname: '',
    };
    const editedItem = ref(Object.assign({}, defaultItem));

    // method
    const initialize = () => {
      list_table_is_ok.value = false;
      listDepts();
    };
    
    const handleKeyDown = (event) => {
      // 檢查按鍵是否為負號或超出範圍
      const numValue = parseInt(event.target.value + event.key);
      if (isNaN(numValue)) {
        // 阻止事件的預設行為，即不允許輸入
        event.preventDefault();
      }
    };
    
    /*
    const openDialog = () => {
      editedItem.value = Object.assign({}, defaultItem);
      dialog.value = true;
    };
    */
    const closeDialog = () => {
      dialog.value = false;
      editedItem.value = Object.assign({}, defaultItem);
    };

    const saveItem = () => {
      if (editedIndex.value > -1) {
        updateDept();
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
      } else {
        createDept();
        desserts.value.push(Object.assign({}, editedItem.value));
      }
      closeDialog();
    };

    const createDept = () => {   //新增後端 dept table資料
      console.log("createDept(),", editedItem.value);

      const path='/dept2/insert';
      let payload= {
        deptId: editedItem.value.deptId,
        deptCname: editedItem.value.deptCname,
        deptEname: editedItem.value.deptEname,
        deptAname: editedItem.value.deptAname,
      };
      axios.post(path, payload)
      .then(res => {
        console.log("save dept data status: ", res.data.msg)
      })
      .catch(err => {
        console.error(err);
      });
    };

    const updateDept = () => {  //編輯後端dept table資料
      console.log("updateDept(),", editedItem.value);

      //const path='/dept/update_dept';
      const path='/dept2/update';
      let payload= {
        deptId: editedItem.value.deptId,
        deptCname: editedItem.value.deptCname,
        deptEname: editedItem.value.deptEname,
        deptAname: editedItem.value.deptAname,
      };
      axios.post(path, payload)
      .then(res => {
        console.log("update dept data status: ", res.data.msg)
      })
      .catch(err => {
        console.error(err);
      });
    };

    const editItem = (item) => {
      console.log("editItem(),", item);

      editedIndex.value = desserts.value.indexOf(item);
      console.log("editedIndex.value:", editedIndex.value);
      editedItem.value = Object.assign({}, item);
      console.log("editedItem.value:", editedItem.value);
      dialog.value = true;
    };

    const deleteItem = (item) => {
      const index = desserts.value.indexOf(item);
      confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    };

    const listDepts = () => {
      console.log("listDepts, Axios get data...");
      const path = '/dept';
      axios.get(path)
      .then((res) => {
        temp_desserts.value = res.data.data;
        console.log("GET ok, total records:", res.data.data, temp_desserts.value);
        list_table_is_ok.value = true;
      })
      .catch((error) => {
        console.error(error);        
      });
    };

    // watch
    watch(list_table_is_ok, (val) => {
      if (val) {
        desserts.value = Object.assign([], temp_desserts.value);
        list_table_is_ok.value = false;
      }
    });

    watch(dialog, (val) => {
      if (!val) {
        closeDialog();
      }
    });


    // mounted
    onMounted(() => {
      
    });

    // computed
    const formTitle = computed(() => {
      return  editedIndex.value === -1 ? '新增資料' : '編輯資料';
    });

    const checkData = computed(() => {
      return !(
        editedItem.value.deptId.trim() &&
        editedItem.value.deptCname.trim() &&
        editedItem.value.deptEname.trim() &&
        editedItem.value.deptAname.trim()
      );
    });



    // created
    onBeforeMount(() => {
      initAxios();
      initialize();      
    });

    //{deptId: '035', deptCname: 'SMPI', deptEname: '樣品室國際部', deptAname: null}

    const headers = [
      { title: '部門編號', key: 'deptId', sortable: true },
      { title: '部門簡稱(英文)', key: 'deptCname', sortable: false},
      { title: '部門名稱', key: 'deptEname', sortable: false },
      { title: '部門簡稱(中文)', key: 'deptAname', sortable: false },
      { title: 'Actions', key: 'actions', sortable: false },

    ];

    return {
      editedIndex,
      headers,
      desserts,
      temp_desserts,
      list_table_is_ok,
      dialog,
      valid,
      defaultItem,
      editedItem,

      initAxios,
      initialize,
      listDepts,
      formTitle,  
      editItem,
      deleteItem,
      saveItem,
      //openDialog,
      closeDialog,
      handleKeyDown,
      checkData,

      updateDept,
      createDept,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500&display=swap&subset=chinese-traditional'
);

@import "../styles/variables.scss";
.v-card {
  width: 100%;
}

.table-container {
  padding: 20px; /* <-- 新增 */
  width: 100%; /* <-- 新增 */
  box-sizing: border-box; /* <-- 新增 */
}

/*
.full-width-container {
  padding: 60px 0px 0px;
  width: 100vw;
  margin: 0;

}

.v-card {
  width: 100%; 
}
*/
:deep(thead) {
  background-color: $SYSTEM_COLOR;
}

:deep(tbody > tr td) {
  text-align: left !important;
}

:deep(thead > tr th span) {
  font-weight: bolder !important;
}

</style>
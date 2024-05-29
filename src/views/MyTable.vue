<template>
  <v-card title="部門編號" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table 
      :headers="headers" 
      :items="desserts" 
      :search="search"></v-data-table>
  </v-card>
</template>

<script>
import { ref, watch, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import { myMixin } from '../mixins/common.js';

export default {
  setup() {
    const { initAxios } = myMixin();
    // for render
    const list_table_is_ok = ref(false);
    const temp_desserts = ref([]);    
    const desserts = ref([]);
    const search = ref('');

    // method
    const initialize = () => {
      list_table_is_ok.value = false;
      listDepts();
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

    // mounted
    onMounted(() => {
      
    });

    // created
    onBeforeMount(() => {
      initAxios();
      initialize();      
    });

    //{deptId: '035', deptCname: 'SMPI', deptEname: '樣品室國際部', deptAname: null}

    const headers = [
      { title: '部門編號', key: 'deptId', sortable: true, align: 'start' },
      { title: '部門簡稱(C)', key: 'deptCname', sortable: false },
      { title: '部門名稱', key: 'deptEname', sortable: false },
      { title: '部門簡稱(A)', key: 'deptAname', sortable: false },
    ];

    return {
      search,
      headers,
      desserts,
      temp_desserts,
      list_table_is_ok,

      initAxios,
      initialize,
      listDepts,  
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

:deep(thead) {
  background-color: $SYSTEM_COLOR;
}
</style>
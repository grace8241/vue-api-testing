import { createRouter, createWebHistory } from 'vue-router';
import A from '../views/a.vue';
import B from '../views/b.vue';
import C from '../views/c.vue';
import MyTable from '../views/MyTable.vue';


const routes = [
  {
    path: '/',
    name: 'a',
    component: A
  },
  {
    path: '/b',
    name: 'b',
    component: B
  },
  {
    path: '/c',
    name: 'c',
    component: C
  },
  {
    path: '/myTable',
    name: 'MyTable',
    component: MyTable
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';
import layout from '@/views/layout.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: 'home',
    component: layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

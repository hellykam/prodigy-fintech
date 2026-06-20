import { createRouter, createWebHistory } from 'vue-router'
import SystemMapView from '../views/SystemMapView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'system-map',
      component: SystemMapView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router

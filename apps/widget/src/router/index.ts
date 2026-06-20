import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WidgetView from '../views/WidgetView.vue'
import WidgetDemoView from '../views/WidgetDemoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/widget',
      name: 'widget',
      component: WidgetView,
    },
    {
      path: '/widget/demo',
      name: 'widget-demo',
      component: WidgetDemoView,
    },
  ],
})

export default router

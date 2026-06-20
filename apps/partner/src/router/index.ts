import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardView from '../views/DashboardView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import CommissionsView from '../views/CommissionsView.vue'
import ApiKeysView from '../views/ApiKeysView.vue'
import LoginView from '../views/LoginView.vue'
import EndUsersView from '../views/EndUsersView.vue'
import WidgetConfigView from '../views/WidgetConfigView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
    },
    {
      path: '/commissions',
      name: 'commissions',
      component: CommissionsView,
    },
    {
      path: '/api-keys',
      name: 'api-keys',
      component: ApiKeysView,
    },
    {
      path: '/end-users',
      name: 'end-users',
      component: EndUsersView,
    },
    {
      path: '/widget-config',
      name: 'widget-config',
      component: WidgetConfigView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && !authStore.user) {
    return { name: 'login' }
  }
})

export default router

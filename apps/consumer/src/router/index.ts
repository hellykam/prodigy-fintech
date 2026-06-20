import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue'),
    meta: { public: true },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/buy',
    name: 'buy',
    component: () => import('@/views/BuyView.vue'),
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('@/views/SellView.vue'),
  },
  {
    path: '/swap',
    name: 'swap',
    component: () => import('@/views/SwapView.vue'),
  },
  {
    path: '/send',
    name: 'send',
    component: () => import('@/views/SendView.vue'),
  },
  {
    path: '/receive',
    name: 'receive',
    component: () => import('@/views/ReceiveView.vue'),
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import('@/views/WalletsView.vue'),
  },
  {
    path: '/wallets/:currency',
    name: 'wallet-detail',
    component: () => import('@/views/WalletDetailView.vue'),
    props: true,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/TransactionsView.vue'),
  },
  {
    path: '/transactions/:id',
    name: 'transaction-detail',
    component: () => import('@/views/TransactionDetailView.vue'),
    props: true,
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: () => import('@/views/DepositView.vue'),
  },
  {
    path: '/kyc',
    name: 'kyc',
    component: () => import('@/views/KycView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    path: '/rewards',
    name: 'rewards',
    component: () => import('@/views/RewardsView.vue'),
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: () => import('@/views/InboxView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/beneficiaries',
    name: 'beneficiaries',
    component: () => import('@/views/BeneficiariesView.vue'),
  },
  {
    path: '/error/:type',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  // Auth store must be used inside the navigation guard
  // pinia is initialized before router
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isLoggedIn) {
    return { name: 'login' }
  }

  if (to.name === 'login' && auth.isLoggedIn) {
    return { name: 'home' }
  }
})

export default router

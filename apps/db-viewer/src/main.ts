import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/users' },
    { path: '/users', component: () => import('./views/UsersView.vue') },
    { path: '/transactions', component: () => import('./views/TransactionsView.vue') },
    { path: '/ledger', component: () => import('./views/LedgerView.vue') },
    { path: '/kyc', component: () => import('./views/KycView.vue') },
    { path: '/b2b', component: () => import('./views/B2BView.vue') },
    { path: '/events', component: () => import('./views/EventsView.vue') },
  ],
})

createApp(App).use(router).use(VueQueryPlugin).mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import CustomersView from '../views/CustomersView.vue'
import UserDetailPanel from '../views/UserDetailPanel.vue'
import TransactionsView from '../views/TransactionsView.vue'
import TransactionDetailPanel from '../views/TransactionDetailPanel.vue'
import KycQueueView from '../views/KycQueueView.vue'
import KycDetailPanel from '../views/KycDetailPanel.vue'
import RiskQueueView from '../views/RiskQueueView.vue'
import RiskReviewDetailPanel from '../views/RiskReviewDetailPanel.vue'
import LedgerView from '../views/LedgerView.vue'
import SystemEventsView from '../views/SystemEventsView.vue'
import B2bClientsView from '../views/B2bClientsView.vue'
import WidgetConfigsView from '../views/WidgetConfigsView.vue'
import CommissionsView from '../views/CommissionsView.vue'
import SettingsFeesView from '../views/SettingsFeesView.vue'
import SettingsLimitsView from '../views/SettingsLimitsView.vue'
import SettingsKycConfigView from '../views/SettingsKycConfigView.vue'
import RewardsView from '../views/RewardsView.vue'
import LiquidityView from '../views/LiquidityView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView,
      children: [
        {
          path: ':id',
          name: 'customer-detail',
          component: UserDetailPanel,
        },
      ],
    },
    {
      path: '/customers/:id/activity',
      name: 'customer-activity',
      component: () => import('@/views/CustomerActivityView.vue'),
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
      children: [
        {
          path: ':id',
          name: 'transaction-detail',
          component: TransactionDetailPanel,
        },
      ],
    },
    {
      path: '/kyc-queue',
      name: 'kyc-queue',
      component: KycQueueView,
      children: [
        {
          path: ':id',
          name: 'kyc-detail',
          component: KycDetailPanel,
        },
      ],
    },
    {
      path: '/risk-queue',
      name: 'risk-queue',
      component: RiskQueueView,
      children: [
        {
          path: ':id',
          name: 'risk-review-detail',
          component: RiskReviewDetailPanel,
        },
      ],
    },
    {
      path: '/b2b-clients',
      name: 'b2b-clients',
      component: B2bClientsView,
    },
    {
      path: '/widget-configs',
      name: 'widget-configs',
      component: WidgetConfigsView,
    },
    {
      path: '/commissions',
      name: 'commissions',
      component: CommissionsView,
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: LedgerView,
    },
    {
      path: '/system-events',
      name: 'system-events',
      component: SystemEventsView,
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: RewardsView,
    },
    {
      path: '/liquidity',
      name: 'liquidity',
      component: LiquidityView,
    },
    {
      path: '/settings',
      redirect: '/settings/fees',
    },
    {
      path: '/settings/fees',
      name: 'settings-fees',
      component: SettingsFeesView,
    },
    {
      path: '/settings/limits',
      name: 'settings-limits',
      component: SettingsLimitsView,
    },
    {
      path: '/settings/kyc-config',
      name: 'settings-kyc-config',
      component: SettingsKycConfigView,
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/SupportView.vue'),
    },
    {
      path: '/audit-log',
      name: 'audit-log',
      component: () => import('@/views/AuditLogView.vue'),
    },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') },
  ],
})

export default router

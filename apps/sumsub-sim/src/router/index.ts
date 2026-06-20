import { createRouter, createWebHistory } from 'vue-router'
import ApplicantsView from '../views/ApplicantsView.vue'
import ApplicantDetailPanel from '../views/ApplicantDetailPanel.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/applicants',
    },
    {
      path: '/applicants',
      name: 'applicants',
      component: ApplicantsView,
      children: [
        {
          path: ':id',
          name: 'applicant-detail',
          component: ApplicantDetailPanel,
        },
      ],
    },
  ],
})

export default router

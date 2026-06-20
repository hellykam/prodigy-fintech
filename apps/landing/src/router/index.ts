import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // Theme picker
    {
      path: '/',
      component: () => import('@/pages/ThemeIndex.vue'),
    },

    // ── Swiss / Editorial / Grid theme ──────────────────────────────
    {
      path: '/swiss',
      component: () => import('@/themes/swiss/SwissLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/swiss/pages/SwissHome.vue') },
        { path: 'product', component: () => import('@/themes/swiss/pages/SwissProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/swiss/pages/SwissPricing.vue') },
        { path: 'partners', component: () => import('@/themes/swiss/pages/SwissPartners.vue') },
        { path: 'security', component: () => import('@/themes/swiss/pages/SwissSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/swiss/pages/SwissDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/swiss/pages/SwissCaseStudies.vue') },
      ],
    },

    // ── Crypto / Dark / 3D theme ─────────────────────────────────────
    {
      path: '/crypto',
      component: () => import('@/themes/crypto/CryptoLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/crypto/pages/CryptoHome.vue') },
        { path: 'product', component: () => import('@/themes/crypto/pages/CryptoProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/crypto/pages/CryptoPricing.vue') },
        { path: 'partners', component: () => import('@/themes/crypto/pages/CryptoPartners.vue') },
        { path: 'security', component: () => import('@/themes/crypto/pages/CryptoSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/crypto/pages/CryptoDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/crypto/pages/CryptoCaseStudies.vue') },
      ],
    },

    // ── Fintech / Data-Dense / Professional theme ────────────────────
    {
      path: '/fintech',
      component: () => import('@/themes/fintech/FintechLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/fintech/pages/FintechHome.vue') },
        { path: 'product', component: () => import('@/themes/fintech/pages/FintechProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/fintech/pages/FintechPricing.vue') },
        { path: 'partners', component: () => import('@/themes/fintech/pages/FintechPartners.vue') },
        { path: 'security', component: () => import('@/themes/fintech/pages/FintechSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/fintech/pages/FintechDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/fintech/pages/FintechCaseStudies.vue') },
      ],
    },

    // ── Bold Editorial / Tempo-grid theme ───────────────────────────
    {
      path: '/bold',
      component: () => import('@/themes/bold/BoldLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/bold/pages/BoldHome.vue') },
        { path: 'product', component: () => import('@/themes/bold/pages/BoldProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/bold/pages/BoldPricing.vue') },
        { path: 'partners', component: () => import('@/themes/bold/pages/BoldPartners.vue') },
        { path: 'security', component: () => import('@/themes/bold/pages/BoldSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/bold/pages/BoldDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/bold/pages/BoldCaseStudies.vue') },
      ],
    },

    // ── SaaS Platform / Clean Light theme ───────────────────────────
    {
      path: '/saas',
      component: () => import('@/themes/saas/SaasLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/saas/pages/SaasHome.vue') },
        { path: 'product', component: () => import('@/themes/saas/pages/SaasProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/saas/pages/SaasPricing.vue') },
        { path: 'partners', component: () => import('@/themes/saas/pages/SaasPartners.vue') },
        { path: 'security', component: () => import('@/themes/saas/pages/SaasSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/saas/pages/SaasDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/saas/pages/SaasCaseStudies.vue') },
      ],
    },

    // ── Gradient App / Soft Mesh theme ───────────────────────────────
    {
      path: '/gradient',
      component: () => import('@/themes/gradient/GradLayout.vue'),
      children: [
        { path: '', component: () => import('@/themes/gradient/pages/GradHome.vue') },
        { path: 'product', component: () => import('@/themes/gradient/pages/GradProduct.vue') },
        { path: 'pricing', component: () => import('@/themes/gradient/pages/GradPricing.vue') },
        { path: 'partners', component: () => import('@/themes/gradient/pages/GradPartners.vue') },
        { path: 'security', component: () => import('@/themes/gradient/pages/GradSecurity.vue') },
        { path: 'developers', component: () => import('@/themes/gradient/pages/GradDevelopers.vue') },
        { path: 'case-studies', component: () => import('@/themes/gradient/pages/GradCaseStudies.vue') },
      ],
    },

    // Demo Request page
    { path: '/demo-request', component: () => import('@/pages/DemoRequest.vue') },

    // Demo Script — internal presenter guide
    { path: '/demo-script', component: () => import('@/pages/DemoScript.vue') },

    // 404 catch-all
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
  ],
})

export default router

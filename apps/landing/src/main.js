import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './styles/main.css';
import { initStaggerObserver } from '@/composables/useScrollReveal';
import Lenis from 'lenis';
createApp(App).use(router).mount('#app');
initStaggerObserver();
// Smooth scroll — Lenis (skip if user prefers reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });
    function rafLoop(time) {
        lenis.raf(time);
        requestAnimationFrame(rafLoop);
    }
    requestAnimationFrame(rafLoop);
}

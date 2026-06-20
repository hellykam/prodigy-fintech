import { onMounted, onUnmounted } from 'vue';
/**
 * Makes a button/element drift magnetically toward the cursor when hovered.
 * Feels premium and interactive — great for primary CTAs.
 */
export function useMagneticButton(el, options = {}) {
    const { strength = 0.35, returnDuration = 500, activationRadius = 80 } = options;
    let cleanup = null;
    onMounted(() => {
        if (!el.value)
            return;
        // Skip on touch-only devices (no hover support)
        if (window.matchMedia('(hover: none)').matches)
            return;
        // Skip if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const btn = el.value;
        btn.style.transition = 'transform 0.1s ease';
        btn.style.willChange = 'transform';
        const onMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const distX = e.clientX - cx;
            const distY = e.clientY - cy;
            const dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < activationRadius) {
                btn.style.transition = 'transform 0.1s ease';
                btn.style.transform = `translate(${distX * strength}px, ${distY * strength}px)`;
            }
            else {
                btn.style.transition = `transform ${returnDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                btn.style.transform = 'translate(0px, 0px)';
            }
        };
        const onMouseLeave = () => {
            btn.style.transition = `transform ${returnDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            btn.style.transform = 'translate(0px, 0px)';
        };
        // Listen on the parent container so the magnetic field extends beyond button bounds
        const container = btn.parentElement || document.body;
        container.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);
        cleanup = () => {
            container.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', onMouseLeave);
            btn.style.transition = '';
            btn.style.transform = '';
            btn.style.willChange = '';
        };
    });
    onUnmounted(() => cleanup?.());
}
/**
 * Applies magnetic effect to ALL elements matching a selector within a container.
 * Useful for applying to all CTA buttons at once in a component.
 */
export function useMagneticAll(container, selector = 'a.btn, button', options = {}) {
    const cleanups = [];
    onMounted(() => {
        if (!container.value)
            return;
        // Skip on touch-only devices (no hover support)
        if (window.matchMedia('(hover: none)').matches)
            return;
        // Skip if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        container.value.querySelectorAll(selector).forEach(btn => {
            const { strength = 0.3, returnDuration = 450 } = options;
            const onMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
                const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
                btn.style.transition = 'transform 0.08s linear';
                btn.style.transform = `translate(${dx}px, ${dy}px)`;
            };
            const onLeave = () => {
                btn.style.transition = `transform ${returnDuration}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
                btn.style.transform = '';
            };
            btn.addEventListener('mousemove', onMove);
            btn.addEventListener('mouseleave', onLeave);
            cleanups.push(() => {
                btn.removeEventListener('mousemove', onMove);
                btn.removeEventListener('mouseleave', onLeave);
            });
        });
    });
    onUnmounted(() => cleanups.forEach(fn => fn()));
}

import { onMounted, onUnmounted } from 'vue';
/**
 * Adds a 3D perspective tilt + edge glow to a card on mouse move.
 * Applied to the element ref and scoped to that element's bounds.
 */
export function useCardTilt(el, options = {}) {
    const { maxTilt = 8, scale = 1.02, glowIntensity = 0.3, glowColor = '#ffffff', perspective = 800, } = options;
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
        const card = el.value;
        card.style.willChange = 'transform';
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.1s ease, box-shadow 0.2s ease';
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const tiltX = -dy * maxTilt;
            const tiltY = dx * maxTilt;
            card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';
            card.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
            // Edge glow
            const gradX = ((e.clientX - rect.left) / rect.width) * 100;
            const gradY = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.boxShadow = `0 16px 40px rgba(0,0,0,0.15), ${glowIntensity > 0
                ? `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 30px -5px ${glowColor}${Math.round(glowIntensity * 99).toString(16).padStart(2, '0')}`
                : ''}`;
        };
        const onLeave = () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease';
            card.style.transform = '';
            card.style.boxShadow = '';
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanup = () => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
            card.style.willChange = '';
            card.style.transform = '';
        };
    });
    onUnmounted(() => cleanup?.());
}
/**
 * Applies tilt effect to all matching child elements within a container.
 */
export function useCardTiltAll(container, selector, options = {}) {
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
        container.value.querySelectorAll(selector).forEach(card => {
            const { maxTilt = 8, scale = 1.02, perspective = 800, glowColor = '#ffffff', glowIntensity = 0.3, } = options;
            card.style.willChange = 'transform';
            card.style.transition = 'transform 0.1s ease';
            const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                card.style.transition = 'transform 0.08s linear';
                card.style.transform = `perspective(${perspective}px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg) scale(${scale})`;
            };
            const onLeave = () => {
                card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
                card.style.transform = '';
                card.style.boxShadow = '';
            };
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            cleanups.push(() => {
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
            });
        });
    });
    onUnmounted(() => cleanups.forEach(fn => fn()));
}

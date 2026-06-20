import { onMounted, onUnmounted } from 'vue';
/**
 * Typewriter effect: reveals text character-by-character on scroll.
 * IMPORTANT: only use on elements containing plain text — no child HTML.
 * Respects prefers-reduced-motion: skips animation if user prefers reduced motion.
 */
export function useTypewriter(el, options = {}) {
    const { speed = 28, delay = 0, activeClass = 'typing', cursor = true, threshold = 0.3, once = true, } = options;
    let observer = null;
    let timer = null;
    let frameId = 0;
    onMounted(() => {
        if (!el.value)
            return;
        const element = el.value;
        const original = element.textContent || '';
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        // Hide text initially
        element.textContent = '';
        if (cursor)
            element.classList.add('tw-cursor');
        const typeOut = () => {
            let i = 0;
            element.classList.add(activeClass);
            const type = () => {
                if (i <= original.length) {
                    element.textContent = original.slice(0, i);
                    if (cursor)
                        element.classList.add('tw-cursor');
                    i++;
                    timer = setTimeout(type, speed);
                }
                else {
                    element.classList.remove(activeClass);
                    if (cursor) {
                        // Blink for 2s then remove cursor
                        setTimeout(() => element.classList.remove('tw-cursor'), 2000);
                    }
                }
            };
            setTimeout(type, delay);
        };
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeOut();
                    if (once)
                        observer?.unobserve(entry.target);
                }
            });
        }, { threshold });
        observer.observe(element);
    });
    onUnmounted(() => {
        observer?.disconnect();
        if (timer)
            clearTimeout(timer);
        cancelAnimationFrame(frameId);
    });
}
/**
 * Typewriter for multi-line code blocks. Each line types out in sequence.
 * The element must contain <span class="tw-line"> children, one per line.
 */
export function useTypewriterLines(container, options = {}) {
    const { speed = 18, delay = 0, threshold = 0.2, once = true, lineDelay = 120 } = options;
    let observer = null;
    onMounted(() => {
        if (!container.value)
            return;
        const el = container.value;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const lines = Array.from(el.querySelectorAll('.tw-line'));
        const originals = lines.map(l => l.textContent || '');
        lines.forEach(l => { l.textContent = ''; });
        const typeSequence = () => {
            let lineIdx = 0;
            const typeLine = () => {
                if (lineIdx >= lines.length)
                    return;
                const line = lines[lineIdx];
                const orig = originals[lineIdx];
                if (!line || orig === undefined)
                    return;
                let i = 0;
                lineIdx++;
                const typeChar = () => {
                    if (i <= orig.length) {
                        line.textContent = orig.slice(0, i);
                        i++;
                        setTimeout(typeChar, speed);
                    }
                    else {
                        setTimeout(typeLine, lineDelay);
                    }
                };
                typeChar();
            };
            setTimeout(typeLine, delay);
        };
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeSequence();
                    if (once)
                        observer?.unobserve(entry.target);
                }
            });
        }, { threshold });
        observer.observe(el);
    });
    onUnmounted(() => observer?.disconnect());
}

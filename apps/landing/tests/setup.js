"use strict";
// jsdom does not implement IntersectionObserver — provide a no-op stub so
// components that use useScrollReveal() can mount in unit tests.
const IntersectionObserverMock = class {
    observe() { }
    unobserve() { }
    disconnect() { }
};
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
});
// jsdom does not implement HTMLCanvasElement.getContext — stub it out so
// canvas-based components (CryptoHome particle animation) can mount safely.
const fakeCtx = {
    clearRect() { },
    beginPath() { },
    arc() { },
    fill() { },
    stroke() { },
    moveTo() { },
    lineTo() { },
    save() { },
    restore() { },
    fillRect() { },
    strokeRect() { },
    fillText() { },
    measureText: () => ({ width: 0 }),
    canvas: { width: 0, height: 0 },
};
HTMLCanvasElement.prototype.getContext = () => fakeCtx;
// jsdom does not implement ResizeObserver — stub it.
const ResizeObserverMock = class {
    observe() { }
    unobserve() { }
    disconnect() { }
};
Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
});

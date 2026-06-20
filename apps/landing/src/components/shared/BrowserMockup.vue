<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  tiltDeg?: number
  float?: boolean
}>(), {
  src: undefined,
  tiltDeg: -8,
  float: false,
})
</script>

<template>
  <div class="browser-outer" :class="{ 'browser-float': float }">
    <div class="browser-frame">
      <div class="browser-bar" aria-hidden="true">
        <div class="browser-dots">
          <span class="dot dot-red" />
          <span class="dot dot-yellow" />
          <span class="dot dot-green" />
        </div>
        <div class="browser-url">localhost:5001</div>
      </div>
      <div class="browser-content">
        <iframe v-if="src" :src="src" class="browser-iframe" title="App preview" />
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.browser-outer {
  transform: perspective(1200px) rotateY(-8deg) rotateX(4deg);
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: inline-block;
}

.browser-float {
  animation: browser-float 6s ease-in-out infinite;
}

@keyframes browser-float {
  0%, 100% { transform: perspective(1200px) rotateY(-8deg) rotateX(4deg) translateY(0); }
  50%       { transform: perspective(1200px) rotateY(-8deg) rotateX(4deg) translateY(-12px); }
}

.browser-frame {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #e8e8e8;
  border-radius: 8px 8px 0 0;
}

.browser-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.dot {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red    { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green  { background: #28c840; }

.browser-url {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  height: 22px;
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.browser-content {
  height: 400px;
  overflow: hidden;
  border: 1px solid #d0d0d0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #fff;
}

.browser-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

@media (max-width: 768px) {
  .browser-outer,
  .browser-float {
    transform: none;
    animation: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .browser-float {
    animation: none;
  }
}
</style>

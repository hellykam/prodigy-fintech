<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  code: string
  language?: 'html' | 'js' | 'bash' | 'jsx' | 'swift' | 'kotlin'
  selfType?: boolean
  copyable?: boolean
}>(), {
  language: 'js',
  selfType: false,
  copyable: true,
})

// ── Copy ──────────────────────────────────────────────────────────
const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard write failed silently
  }
}

// ── Syntax highlighting ───────────────────────────────────────────
const KEYWORDS = ['import', 'const', 'function', 'return', 'async', 'await', 'let', 'var', 'if', 'else', 'new']

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlight(raw: string): string {
  const escaped = escapeHtml(raw)
  // Process line by line so comments don't bleed
  return escaped.split('\n').map(line => {
    // Comments
    const commentIdx = line.indexOf('//')
    let main = line
    let comment = ''
    if (commentIdx !== -1) {
      main    = line.slice(0, commentIdx)
      comment = `<span class="cmt">${line.slice(commentIdx)}</span>`
    }

    // Strings (single and double quotes)
    main = main.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
      (m) => `<span class="str">${m}</span>`)

    // Numbers (standalone)
    main = main.replace(/\b(\d+(?:\.\d+)?)\b/g,
      (m) => `<span class="num">${m}</span>`)

    // Properties (word after dot, not inside a span)
    main = main.replace(/(?<=[^<>a-zA-Z])\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      (_, p) => `.<span class="prop">${p}</span>`)

    // Keywords (whole words, not inside spans)
    for (const kw of KEYWORDS) {
      const re = new RegExp(`\\b(${kw})\\b`, 'g')
      main = main.replace(re, `<span class="kw">${kw}</span>`)
    }

    return main + comment
  }).join('\n')
}

// ── Self-type effect ──────────────────────────────────────────────
const displayedCode  = ref('')
const showCursor     = ref(false)
const typingDone     = ref(false)
const blockRef       = ref<HTMLElement | null>(null)
let typeInterval: ReturnType<typeof setInterval> | null = null
let typeObserver: IntersectionObserver | null = null

function startTyping() {
  if (!props.selfType || typingDone.value) return

  // Skip typing animation for users who prefer reduced motion — show full code immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayedCode.value = props.code
    typingDone.value = true
    return
  }

  showCursor.value = true
  let i = 0
  const full = props.code
  typeInterval = setInterval(() => {
    i++
    displayedCode.value = full.slice(0, i)
    if (i >= full.length) {
      clearInterval(typeInterval!)
      typeInterval = null
      typingDone.value = true
      showCursor.value = false
    }
  }, 20)
}

const renderedCode = computed(() => {
  const src = props.selfType ? displayedCode.value : props.code
  return highlight(src)
})

onMounted(() => {
  if (!props.selfType) return

  typeObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        startTyping()
        typeObserver?.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (blockRef.value) typeObserver.observe(blockRef.value)
})

onUnmounted(() => {
  if (typeInterval) clearInterval(typeInterval)
  typeObserver?.disconnect()
})
</script>

<template>
  <div ref="blockRef" class="code-block" role="region" :aria-label="`${language} code block`">
    <!-- Top bar -->
    <div class="code-topbar">
      <span class="code-lang-badge">{{ language }}</span>
      <button
        v-if="copyable"
        class="copy-btn"
        type="button"
        :aria-label="copied ? 'Code copied' : 'Copy code'"
        @click="copyCode"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Code body -->
    <pre class="code-pre" :aria-label="`${language} source code`"><code class="code-content" v-html="renderedCode" /><span v-if="showCursor" class="code-cursor" aria-hidden="true">|</span></pre>
  </div>
</template>

<style scoped>
.code-block {
  background: #0d1117;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  position: relative;
}

.code-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.code-lang-badge {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding: 2px 8px;
  letter-spacing: 0.05em;
  font-family: inherit;
}

.copy-btn {
  font-size: 0.75rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 3px 8px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.copy-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.copy-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.code-pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
  line-height: 1.6;
  color: #c9d1d9;
  font-family: inherit;
  font-size: inherit;
  white-space: pre;
}

.code-content {
  font-family: inherit;
}

.code-cursor {
  display: inline-block;
  color: #c9d1d9;
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Syntax token colors */
:deep(.kw)   { color: #ff7b72; }
:deep(.str)  { color: #a5d6ff; }
:deep(.cmt)  { color: #8b949e; }
:deep(.prop) { color: #79c0ff; }
:deep(.num)  { color: #79c0ff; }

@media (max-width: 480px) {
  .code-block {
    font-size: 0.75rem;
  }

  .code-pre {
    padding: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .code-cursor {
    animation: none;
    opacity: 1;
  }
}
</style>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const isDark = ref(false)

onMounted(() => {
  document.documentElement.classList.add('transition-ready')
  // Initialize theme from localStorage
  const saved = localStorage.getItem('vueuse-color-scheme')
  isDark.value = saved === 'dark'

  // Apply initial theme
  applyTheme()

  // Listen for Astro page changes
  document.addEventListener('astro:before-swap', (event) => {
    const saved = localStorage.getItem('vueuse-color-scheme')
    const dark = saved === 'dark'

    if (dark) {
      event.newDocument.documentElement.classList.add('dark')
      event.newDocument.documentElement.style.colorScheme = 'dark'
    }
    else {
      event.newDocument.documentElement.classList.remove('dark')
      event.newDocument.documentElement.style.colorScheme = 'light'
    }
  })

  document.addEventListener('astro:after-swap', () => {
    applyTheme()
  })
})

watch(isDark, () => {
  applyTheme()
  localStorage.setItem('vueuse-color-scheme', isDark.value ? 'dark' : 'light')
})

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
  }
  else {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    :aria-label="isDark ? 'Dark Theme' : 'Light Theme'"
    nav-link
    :class="isDark ? 'i-ri-moon-line' : 'i-ri-sun-line'"
    @click="toggleTheme"
  />
</template>

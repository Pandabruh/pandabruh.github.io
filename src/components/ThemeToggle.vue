<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isDark = ref(false)

let cachedTheme = 'light'

function applyTheme() {
  const root = document.documentElement

  if (cachedTheme === 'dark') {
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
    isDark.value = true
  }
  else {
    root.classList.remove('dark')
    root.style.colorScheme = 'light'
    isDark.value = false
  }
}

function toggleTheme() {
  cachedTheme = cachedTheme === 'dark' ? 'light' : 'dark'
  localStorage.setItem('vueuse-color-scheme', cachedTheme)
  applyTheme()
}

onMounted(() => {
  document.documentElement.classList.add('transition-ready')

  cachedTheme = localStorage.getItem('vueuse-color-scheme') || 'light'

  applyTheme()

  // ✅ Fix Astro navigation flash
  document.addEventListener('astro:before-swap', (event: any) => {
    const root = event.newDocument.documentElement

    if (cachedTheme === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    }
    else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  })
})
</script>

<template>
  <button
    :aria-label="isDark ? 'Dark Theme' : 'Light Theme'"
    nav-link
    :class="isDark ? 'i-ri-moon-line' : 'i-ri-sun-line'"
    @click="toggleTheme"
  />
</template>

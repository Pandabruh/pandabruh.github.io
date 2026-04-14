<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import ThemeToggle from './ThemeToggle.vue'

const { y: scroll } = useWindowScroll()

const navLinks = siteConfig.header.navLinks || []
const isOpen = ref(false)
const isShrunk = computed(() => scroll.value > 80)

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter(link => link.href !== undefined)
})

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 50)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 50) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 50) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 50) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})
</script>

<template>
  <header
    id="header"
    view-transition-name="site-header"
    :class="[
      { 'header-bg-blur': scroll > 20 },
      { 'header-shrink': isShrunk },
    ]"
    class="fixed top-0 left-0 right-0 z-899 h-20 px-6 flex items-center bg-transparent"
  >
    <div class="flex items-center h-full gap-x-6 flex-1">
      <a href="/" class="mr-6" aria-label="Header Logo Image">
        <img
          width="32"
          height="32"
          :src="siteConfig.header.logo.src"
          :alt="siteConfig.header.logo.alt"
        >
      </a>
      <div
        v-if="isOpen"
        class="sm:hidden absolute top-20 left-0 w-full bg-main border-t border-main flex flex-col items-center py-4 gap-y-4 z-800"
      >
        <a
          v-for="link in navLinks"
          :key="link.text"
          :href="link.href"
          class="text-lg opacity-80 hover:opacity-100 transition-all"
          @click="isOpen = false"
        >
          {{ link.text }}
        </a>
      </div>
      <nav class="sm:flex hidden flex-wrap gap-x-6 flex-row">
        <a
          v-for="link in navLinks"
          :key="link.text"
          :aria-label="`${link.text}`"
          :target="getLinkTarget(link.href)"
          nav-link
          :href="link.href"
        >
          {{ link.text }}
        </a>
      </nav>
    </div>

    <div class="flex gap-x-4 mr-auto sm:mr-0">
      <a
        v-for="link in socialLinks"
        :key="link.text"
        :aria-label="link.text"
        :target="getLinkTarget(link.href)"
        :href="link.href"
        class="text-lg opacity-70 hover:opacity-100 transition-all duration-200"
      >
        <i :class="link.icon" />
      </a>

      <ThemeToggle />
      <button
        class="sm:hidden text-xl opacity-70 hover:opacity-100 transition-all"
        aria-label="Toggle Menu"
        @click="isOpen = !isOpen"
      >
        <div :class="isOpen ? 'i-ri-close-line' : 'i-ri-menu-line'" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}
</style>

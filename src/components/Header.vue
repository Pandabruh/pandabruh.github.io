<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') return link
    if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    return false
  })
})

const { y: scroll } = useWindowScroll()
const oldScroll = ref(unref(scroll))

onMounted(() => {
  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl) return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
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
    :class="{ 'header-bg-blur': scroll > 20 }"
    class="fixed top-0 left-0 right-0 z-899 h-20 px-6 flex justify-between items-center bg-transparent"
  >
    <div class="flex items-center h-full">
      <a href="/" class="mr-6" aria-label="Header Logo Image">
        <img
          width="32"
          height="32"
          :src="siteConfig.header.logo.src"
          :alt="siteConfig.header.logo.alt"
        >
      </a>

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

    <div class="flex gap-x-6">
      <a
        v-for="link in socialLinks"
        :key="link.text"
        :aria-label="`${link.text}`"
        :class="link.icon"
        nav-link
        :target="getLinkTarget(link.href)"
        :href="link.href"
      />
      <a nav-link target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" />
      <ThemeToggle />
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

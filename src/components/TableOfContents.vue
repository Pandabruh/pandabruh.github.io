<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

const headings = ref<Heading[]>([])
const activeId = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Get all h2 headings from the article
  const article = document.querySelector('article')
  if (!article)
    return

  const h2Elements = article.querySelectorAll('h2')
  headings.value = Array.from(h2Elements).map((h2) => {
    // Create id if it doesn't exist
    if (!h2.id) {
      h2.id = h2.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || ''
    }
    return {
      id: h2.id,
      text: h2.textContent || '',
      level: 2,
    }
  })

  // Set up the Intersection Observer instead of a scroll listener
  // This is infinitely better for performance on heavy DOM pages
  observer = new IntersectionObserver((entries) => {
    // Find the most recently intersecting heading
    const visibleEntries = entries.filter(entry => entry.isIntersecting)
    if (visibleEntries.length > 0) {
      // If multiple headings are visible, grab the first one
      activeId.value = visibleEntries[0].target.id
    }
  }, {
    // This margin creates a "trigger line" near the top of the screen
    rootMargin: '-100px 0px -70% 0px',
  })

  // Start observing all the h2 elements
  h2Elements.forEach((h2) => {
    observer?.observe(h2)
  })
})

onUnmounted(() => {
  // Clean up observer when component unmounts
  if (observer)
    observer.disconnect()
})

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <nav v-if="headings.length > 0" class="toc-sidebar">
    <div
      v-for="heading in headings"
      :key="heading.id"
      class="toc-item"
      :class="{ active: activeId === heading.id }"
      @click="scrollToSection(heading.id)"
    >
      <div class="toc-line" />
      <span class="toc-text">{{ heading.text }}</span>
    </div>
  </nav>
</template>

<style scoped>
.toc-sidebar {
  position: fixed;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 50;
}

.toc-item {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  gap: 0.75rem;
}

.toc-line {
  width: 20px;
  height: 2px;
  background-color: #cbd5e1;
  /* Reduced transition scope to only what is necessary */
  transition: width 0.3s ease, background-color 0.3s ease;
  pointer-events: none;
}

html.dark .toc-line {
  background-color: #475569;
}

.toc-item.active .toc-line {
  width: 40px;
  height: 2px;
  background-color: #fa7171;
}

.toc-text {
  position: absolute;
  left: 3rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  background-color: white;
  color: #1f2937;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
}

html.dark .toc-text {
  background-color: #1f2937;
  color: #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.toc-item:hover .toc-text {
  opacity: 1;
}

.toc-item:hover .toc-line {
  background-color: #fa7171;
  width: 30px;
}

/* Hide on mobile */
@media (max-width: 768px) {
  .toc-sidebar {
    display: none;
  }
}
</style>

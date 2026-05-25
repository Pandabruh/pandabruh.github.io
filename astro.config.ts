import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tunnel from 'astro-tunnel'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import UnoCSS from 'unocss/astro'

export default defineConfig({
  site: 'https://pandabruh.github.io',
  server: {
    port: 1977,
  },
  integrations: [mdx(), sitemap(), UnoCSS({
    injectReset: true,
  }), vue(), tunnel()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      // Modified this line to strip out hidden MathML nodes and slash DOM size in half
      [rehypeKatex, { output: 'html' }],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
  },
})

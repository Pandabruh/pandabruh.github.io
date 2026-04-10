import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  astro: true,

  formatters: {
    css: true,
  },

  rules: {
    'format/prettier': 'off',
  },
})

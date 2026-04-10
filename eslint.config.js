import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  astro: true,

  formatters: {
    css: true,
  },

  rules: {
    // disable problematic formatting rules
    'format/prettier': 'off',
    'style/no-trailing-spaces': 'off',
    'style/no-multiple-empty-lines': 'off',
    'style/eol-last': 'off',
  },
})

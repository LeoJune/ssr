module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/no-v-html": "off",
    "vue/html-indent": "off",
    "vue/max-attributes-per-line": "off",
    "no-console": "off",
    'arrow-parens': 'off',
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "any"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/attribute-hyphenation": ["error", "never", {
      "ignore": ["custom-prop"]
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": ["div"]
    }],
    "handle-callback-err": "off"
  }
}

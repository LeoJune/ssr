const URL = {
  development: "http://58.49.89.99:8056/front",
  production: "http://58.49.89.99:8056/front"
}[process.env.VUE_APP_API];
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/reset.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui'
    // '@/plugins/axios'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // '@nuxtjs/proxy'
  ],
  // 环境变量配置
  env: {
    VUE_APP_API: process.env.VUE_APP_API
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: URL
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://58.49.89.99:8055',
  //     pathRewrite: { '^/api': '' },
  //     changeOrigin: true,
  //     ws: false
  //   },
  //   '/front': {
  //     target: 'http://58.49.89.99:8056',
  //     pathRewrite: { '^/front': '' },
  //     changeOrigin: true,
  //     // logLevel: 'debug',
  //     ws: false
  //   }
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // additionalExtensions: ["jsx"],
    transpile: [/^element-ui/]
  }
}

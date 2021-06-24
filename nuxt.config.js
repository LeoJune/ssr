// const URL = {
//   test: "http://58.49.89.100:8056", // 测试环境接口地址
//   production: "http://58.49.89.99:8056/front" // 正式环境接口地址
// }[process.env.VUE_APP_API];
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
  server: {
    host: '0.0.0.0', // 可以让当前局域网内都可以访问
    port: 3000
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: '维元动力商城' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '维元动力是一家专业动力设备提供商' || '' }
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
    '@/plugins/element-ui',
    // '@/plugins/permission',
    // { src: '@/plugins/permission', mode: 'client' },
    '@/plugins/request',
    '@/plugins/api'
    // { src: '@/plugins/axios', mode: 'server' }
  ],
  // router: {
  //   middleware: 'permission'
  // },
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
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  // 环境变量配置
  env: {
    dev: 'http://127.0.0.1:8056',
    prod: 'http://127.0.0.1:8056'
    // dev: 'http://58.49.89.100:8056',
    // prod: 'http://58.49.89.100:8056'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://58.49.89.99:8056/front'
  },
  proxy: {
    '/front': {
      target: 'http://127.0.0.1:8056',
      // target: 'http://58.49.89.100:8056',
      pathRewrite: { '^/front': '' },
      changeOrigin: true,
      // logLevel: 'debug',
      ws: false
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // additionalExtensions: ["jsx"],
    transpile: [/^element-ui/]
  },
  loading: {
    color: '#1487d5',
    height: '3px'
  }
}

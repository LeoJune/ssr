// @param { import('@nuxt/vue-app').Context } ctx
// import ctx from ('@nuxt/vue-app').Context
export default function ({ $axios }) {
  $axios.onRequest(config => {
    if (process.server) {
      // $axios.baseURL = process.env.SERVER_API
      return config
    }
    if (process.client) {

    }
  })
  $axios.onResponse(response => {
    return Promise.resolve({ err: false, data: response.data })
  })
  $axios.onError(error => {
    return Promise.resolve({
      err: true,
      data: error
    })
  })
}

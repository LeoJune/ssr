import { getProductDetail as getProductData } from '@/api/product'

export const state = () => ({

})

export const mutations = () => ({

})

export const actions = () => ({
  async getProductDetail (store, { id, params }) {
    return await getProductData({ id, params })
  }
})

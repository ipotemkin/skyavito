import { productsApi } from "./api/products.api"

export const api = {
  async adImageToAd(idx: number, file: Blob) {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const resp = productsApi.endpoints.adImageToAd.initiate({ idx, body: formData })
      console.log('resp -->', resp)
    } catch (error) {
      console.log('error -->', error)
    }
  },

}
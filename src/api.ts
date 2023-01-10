import { productsApi } from "./api/products.api"

export const api = {
  async addImageToAd(idx: number, file: Blob) {
    const formData = new FormData()
    formData.append('file', file)
    try {
      productsApi.endpoints.addImageToAd.initiate({ idx, body: formData })
    } catch (error) {
      console.error(error)
    }
  },

}
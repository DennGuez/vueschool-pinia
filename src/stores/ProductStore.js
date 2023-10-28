import { defineStore } from 'pinia'

export const useProductStore = defineStore('ProductStore', {
   state: () => {
      return {
         products: []
      }
   },

   actions: {
      // Example realistic case, is a function to fill our state from an API
      async fill() {
         // this.products = (await axios.get('some/end/point')).data
         this.products = (await import('@/data/products.json')).default
      }
   }
})
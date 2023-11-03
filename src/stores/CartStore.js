import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore', {
   state: () => {
      return {
         items: [],
      }
   },

   getters: {
      count: (state) => state.items.length,

      isEmpty() {
         return this.count === 0
      }
   },

   actions: {
      addItems(count, item) {
         count = parseInt(count);
         for (let index = 0; index < count; index++) {
            /* Nunca pasar dato por refenrecia, si no por valor, 
            /  we need to clone the product or item adding it the cart items */
            // this.items.push(item);
            this.items.push({ ...item })
         }
      }
   }
})
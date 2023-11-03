import { defineStore } from "pinia";
import { groupBy } from "lodash";

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
      },

      grouped: (state) => groupBy(state.items, (item) => item.name),
      groupCount: (state) => (name) => state.grouped[name].length
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
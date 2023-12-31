import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from '@vueuse/core';
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore('CartStore', {
   historyEnabled: true,
   state: () => {
      return {
         // items: [],
         /* Usando datos persistentes en el localStora con vueuse */
         items: useLocalStorage("CartStore:items", []),
      }
   },

   getters: {
      count: (state) => state.items.length,

      isEmpty() {
         return this.count === 0
      },

      grouped: (state) => groupBy(state.items, (item) => item.name),
      groupCount: (state) => (name) => state.grouped[name].length,
      // totalPrice: (state) => state.items.reduce((acc, item) => { return acc + item.price }, 0)
      totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price, 0)
   },

   actions: {
      checkout() {
         const authUserStore = useAuthUserStore()
         alert(`${authUserStore.username} just bought ${this.count} item at a total of ${this.totalPrice}`)
      },

      addItems(count, item) {
         count = parseInt(count);
         // throw new Error("example error");
         for (let index = 0; index < count; index++) {
            /* Nunca pasar dato por refenrecia, si no por valor, 
            /  we need to clone the product or item adding it the cart items */
            // this.items.push(item);
            this.items.push({ ...item })
         }
      },

      clearItem(itemName) {
         // const newState = this.items.filter((item) => {
         //    return item.name !== name
         // })
         // this.items = [...newState]
         this.items = this.items.filter(item => item.name !== itemName)
      }
   }
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
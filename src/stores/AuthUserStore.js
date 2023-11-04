import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore("AuthUserSttore", {
   state: () => {
      return {
         username: 'dennis_ro'
      }
   }
})
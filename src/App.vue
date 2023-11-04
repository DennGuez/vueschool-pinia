<script setup>
import { ref, reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const history = reactive([])
const doingHistory = ref(false)

history.push(JSON.stringify(cartStore.$state))

const undo = () => {
   if(history.length === 1) return
   doingHistory.value = true
   history.pop()
   cartStore.$state = JSON.parse(history.at(-1))
   doingHistory.value = false
}

cartStore.$subscribe((mutation, state) => {
   // console.log({mutation});
   // console.log({state});
   if(!doingHistory.value) {
      history.push(JSON.stringify(state))
   }
})

cartStore.$onAction(({
   name,
   store,
   args,
   after,
   onError
})=>{
   // We need to specify the name, because if it is not executed for all the actions that the store has
   if(name === 'addItems'){
      after(() => {
         console.log(args[0])
      });
      onError((error) => {
         console.log("Hello error", error,message)
      })
   }
})

productStore.fill();
</script>

<template>
   <div class="container">
      <TheHeader />
      <div class="mb-5 flex justify-end">
         <AppButton @click=undo>Undo</AppButton>
      </div>
      <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
         <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
            @addToCart="cartStore.addItems($event, product)" />
      </ul>
   </div>
</template>
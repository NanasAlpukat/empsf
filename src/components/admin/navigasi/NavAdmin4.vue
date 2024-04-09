<template>
    <nav class="w-full bg-white p-2 shadow-md flex items-center text-xs">
      <div class="flex justify-start items-center w-6 h-6  ml-2 -mr-2">
      <a @click.prevent="back" class="text-xl cursor-pointer"><i class="ri-arrow-left-circle-fill"></i></a>
      </div>
      <div class="w-full justify-center flex items-center gap-2">
      <img src="@/assets/arm.png" alt="" class="w-8 h-8">
      <span class=" font-medium">E-MPS SMK Armaniyah</span>
      </div>
    </nav>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
    setup() {
         const router = useRouter()
         const back = () =>{
             router.replace({name:'admin'})
         }

         return {
             back
         }
    }
}
</script>
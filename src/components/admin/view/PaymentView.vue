<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
    <div class="w-full p-3 flex flex-col justify-center items-center lg:mt-16 md:mt-16 lg:ml-28 md:ml-20 ">
      <div class="lg:w-1/2 md:w-1/2 w-full bg-white flex items-center justify-center mt-5 shadow-md rounded-lg">
        <img src="@/assets/bunner.jpg" alt="" class="p-2 w-full lg:w-8/12" />
      </div>

      <div class="w-full mt-10 flex flex-wrap justify-center gap-2 text-white text-xxs uppercase font-medium text-xs lg:text-sm md:text-sm">
        <router-link to="/pay/transaction" class=" bg-amber-400 hover:bg-amber-200 focus:bg-amber-400 lg:w-40 md:w-40 w-2/5 h-16 mb-2 flex items-center justify-center rounded">
          <i class="ri-coins-fill mr-1"></i>
          <span>Pembayaran</span>
        </router-link>
        <router-link to="/pay/history" class=" bg-emerald-500 hover:bg-emerald-300 focus:bg-emerald-500 lg:w-40 md:w-40 w-2/5 h-16 mb-2 flex items-center justify-center rounded" >
           <i class="ri-funds-fill mr-1"></i>
          <span>History</span>
        </router-link>
        
      </div>
    </div>
    <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import Nav from '@/components/student/nav/NavStudent.vue';
// import { useStore } from 'vuex';
// import axios from 'axios';
export default {
  components: { Nav },
  setup() {
      // const store = useStore()
    
        
  }
};
</script>


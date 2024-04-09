<template>
  <div>
    <Nav class="lg:hidden md:hidden block" />
     <!-- <i class=" lg:block  hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28 mt-4 text-sky-600 font-medium text-lg hover:text-2xl hover:mt-2 hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i> -->
    <div class="flex flex-col justify-center items-center p-4 lg:mt-16 md:mt-16 lg:ml-28 md:ml-28 mt-6 ">
      <div class="lg:w-1/2 md:w-1/2 w-full  bg-white flex items-center justify-center mt-5 shadow-md rounded-lg">
        <img src="@/assets/bunner.jpg" alt="" class="p-2 w-full  lg:w-8/12  " />
      </div>
      <ul class="flex items-center gap-2 mt-3">
        <div class="mt-5">
          <li class=" bg-emerald-600 hover:bg-emerald-400 shadow-md w-full rounded-md box-border  text-center flex items-center justify-center flex-col p-4">
            <router-link to="/home/admin" class="text-xxs lg:text-sm md:text-sm duration-500 uppercase font-medium text-white active:text-emerald-600"><i class="ri-user-4-fill"></i> <span>table siswa</span></router-link>
          </li>
          <li class="mt-3 bg-pink-600 hover:bg-pink-400 shadow-md w-full rounded-md box-border  text-center flex items-center justify-center flex-col p-4">
            <router-link to="/home/menu-info" class="text-xxs lg:text-sm md:text-sm duration-500 uppercase font-medium text-white active:text-purple-600"><span class="mr-2">menu info</span><i class="ri-file-info-fill"></i></router-link>
          </li>
        </div>
        <div class="mt-5">
          <li class="bg-indigo-600 hover:bg-indigo-400 shadow-md w-full rounded-md box-border  text-center flex items-center justify-center flex-col p-4">
            <router-link to="/home/bill" class="text-xxs lg:text-sm md:text-sm duration-500 uppercase font-medium text-white active:text-indigo-600"><i class="ri-shopping-cart-2-fill"></i> <span>table tagihan</span></router-link>
          </li>
          <li class="mt-3 bg-orange-600 hover:bg-orange-400 shadow-md w-full rounded-md box-border  text-center flex items-center justify-center flex-col p-4">
            <router-link to="/home/major" class="text-xxs lg:text-sm md:text-sm duration-500 uppercase font-medium text-white active:text-orange-600"><span class="mr-2">table jurusan</span><i class="ri-radar-fill"></i></router-link>
          </li>
        </div>
      </ul>
    </div>
     <div class="bg-transparent p-5  mb-20"></div>
  </div>
</template>

<script>
import Nav from '@/components/admin/NavAdmin.vue';

export default {
  components: {
    Nav,
  },
  
};
</script>

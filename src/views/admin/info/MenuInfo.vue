<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>
    <div class="flex flex-col justify-center items-center p-4 lg:mt-16 md:mt-16 lg:ml-28 md:ml-28 mt-6 ">
      <div class="lg:w-1/2 md:w-1/2 w-full  bg-white flex items-center justify-center mt-5 shadow-md rounded-lg">
        <img src="@/assets/bunner.jpg" alt="" class="p-2 w-full  lg:w-8/12  " />
      </div>
      <ul class="flex justify-center gap-2 w-full mt-3">
        
         
          <li class="mt-3 bg-emerald-600 hover:bg-emerald-400 shadow-md  rounded-md   text-center flex items-center justify-center flex-col p-4 w-36">
            <router-link to="/admin/pengumuman" class="text-xs lg:text-sm md:text-sm duration-500  font-medium text-white active:text-purple-600 flex flex-col items-center"><i class="ri-error-warning-fill"></i><span class="">Pengumuman</span> </router-link>
          </li>
          <li class="mt-3 bg-pink-600 hover:bg-pink-400 shadow-md  rounded-md   text-center flex items-center justify-center flex-col p-4 w-36">
            <router-link to="/admin/kegiatan" class="text-xs lg:text-sm md:text-sm duration-500  font-medium text-white active:text-purple-600 flex flex-col"><i class="ri-slideshow-3-fill"></i><span class="">Kegiatan</span> </router-link>
          </li>
          
     
        
      </ul>
    </div>
     <div class="bg-transparent p-5  mb-20"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Nav from '@/components/admin/NavAdmin2.vue';
export default {
  components: {
    Nav,
  },
  setup() {
    const router = useRouter()
         const back = () =>{
             router.replace({name:'home'})
         }
         return{back}
  }
};
</script>
<style scoped>
.-mt-90{
  margin-top: -33px ;
}
</style>

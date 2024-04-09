<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
      <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>

    <div class="flex flex-wrap mt-2 justify-evenly lg:mt-24 md:mt-24 lg:ml-64 md:ml-52">
        <div v-for="(item,index) in news" :key="index" class="w-full flex flex-col justify-center items-center px-3 mb-5 mt-5">
         
        <div class="w-full lg:w-1/2 md:w-1/2 bg-white  shadow-lg flex flex-col px-4 lg:px-10 md:px-7 py-3  rounded-md">
          <div class="flex justify-between   my-3 font-medium">
            <span class="text-black text-xs lg:text-base md:text-base  w-9/12 text-left">{{item.title}}</span>
            <span class="text-rose-500 text-xxs lg:text-sm md:text-xs w-1/3 text-right">{{item.date}}</span>
          </div>
          <p class="text-xs lg:text-sm md:text-sm mt-2 mb-5 text-slate-700">{{item.body}}</p>
        </div>
      </div>
       <div v-if="paginate.prev || paginate.next" class="w-full lg:w-1/2 md:w-1/2 px-4 text-white mt-5  text-xs">
        <div class="w-1/6 grid grid-flow-col gap-1 text-center">
          <a :class="[{ hidden: !paginate.prev }]" @click.prevent="getNews(paginate.prev)" href="#" class="bg-sky-500 p-4 font-medium">Prev</a>
          <div class="bg-sky-500 p-4 font-bold">{{ paginate.current_page }}</div>
          <a :class="[{ hidden: !paginate.next }]" @click.prevent="getNews(paginate.next)" href="#" class="bg-sky-500 p-4 font-medium">Next</a>
        </div>
      </div>
    </div>
    <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Nav from '@/components/admin/navigasi/NavInfo.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { computed, onMounted} from '@vue/runtime-core';
export default {
  components: { Nav },
  setup() {
    const store = useStore();
 


    // get history
    onMounted(() => {
      getNews();
    });

    const getNews = async (value) => {
      let url = value || '/api/pengumuman';
      const response = await axios.get(url);
      store.commit('info/geAlltPengumuman', response.data.data);
      pagination(response.data.meta, response.data.links);
      // console.log(store.state.info.infoNews)
    };
    const news = computed(() => {
      return store.state.info.allPengumuman;
    });


    //  paginate
    const pagination = (meta, links) => {
      let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('info/setPaginatePengumuman', data);
    };

    const paginate = computed(() => {
      return store.state.info.paginatePengumuman;
    });
    //  paginate

    

    const router = useRouter()
         const back = () =>{
             router.replace({name:'info'})
         }

   

    return {
      news,
      paginate,
      getNews,
      back
    };
  },
};
</script>

<style scoped>
.-mt-90{
  margin-top: -65px;
}
</style>
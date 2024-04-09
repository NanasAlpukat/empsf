<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
    <Modal />
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>

    <div class="flex flex-wrap mt-8 justify-evenly lg:mt-24 md:mt-24 lg:ml-64 md:ml-52">
      <div class="w-full px-4 gap-1 mb-3 flex ">
         <button @click="toggleCreate('createPengumuman')" class="px-2 bg-sky-500 hover:bg-sky-300 active:bg-sky-600 uppercase text-white  rounded"><i class="ri-add-circle-fill"></i></button>
      </div>
      <div v-for="(item,index) in news" :key="index" class="w-full flex flex-col justify-center items-center px-3 mb-5 mt-5">
         
        <div class="w-full lg:w-1/2 md:w-1/2 bg-white  shadow-lg flex flex-col px-4 lg:px-10 md:px-7 py-3  rounded-md">
          <div class="flex justify-between   my-3 font-medium">
            <span class="text-black text-xs lg:text-base md:text-base w-9/12 text-left">{{item.title}}</span>
            <span class="text-rose-500 text-xxs lg:text-sm md:text-xs w-1/3 text-right">{{item.date}}</span>
          </div>
          <p class="text-xs lg:text-sm md:text-sm mt-2 mb-5 text-slate-700">{{item.body}}</p>


          <div class="flex w-full justify-center gap-1 mb-4 text-xs lg:text-base md:text-base">

          <button @click="set(item)" class="bg-indigo-500 text-center text-white py-1 px-3 rounded hover:bg-indigo-300 active:bg-indigo-500">Edit</button>
          <button  @click="drop(item)" class="bg-rose-500 text-center text-white py-1 px-3 rounded hover:bg-rose-300 active:bg-rose-500">Hapus</button>
          </div>
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
    <div  class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/admin/modal/ModalPengumuman.vue';
import Nav from '@/components/admin/navigasi/NavAdmin8.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core';
import Swal from 'sweetalert2'
export default {
  components: { Nav,Modal },
  setup() {
    const store = useStore();
    const data = reactive({
    });


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

    // get history



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


    // delete
    const drop = async (value) => {
      // console.log(value);
      // const tanya = confirm('Apakah kamu yakin akan menghapus nya ?');

      Swal.fire({
      title: 'Apakah kamu yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass:{
                    icon:'text-xs',
                    title:'text-mini',
                   }
    }).then( async(result) => {
      if (result.isConfirmed) {
       const res = await axios.post(`/api/pengumuman/delete/${value.id}`);
         if(res.status == 200){
           alert(res.data.meassage)
           store.commit('info/dropPengumuman',value)
           getNews()
         }
      }
    })



      
    };
    // delete

    // modal
    const  toggleCreate = (value)=>{
      store.commit('info/setModal', value);
      store.commit('info/setTogglePengumuman');
    }
    const  set = (value)=>{
      store.commit('info/setModal', 'setPengumuman');
      store.commit('info/setTogglePengumuman');
      store.commit('info/getPengumuman',value);
    }

    const router = useRouter()
         const back = () =>{
             router.replace({name:'menuinfo'})
         }
    
    // modal

    return {
      news,
      drop,
      set,
      paginate,
      getNews,
      ...toRefs(data),
      toggleCreate,
      back
    };
  },
};
</script>

<style scoped>
.text-mini{
  font-size:15px;
  
}
.-mt-90{
  margin-top: -65px;
}
</style>
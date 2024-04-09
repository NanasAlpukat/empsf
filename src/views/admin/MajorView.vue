<template>
  <div class="flex flex-col justify-center items-center">
    <Nav class="lg:hidden md:hidden block"  />
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>
    <div class="w-full lg:w-8/12 md:w-4/6 bg-white shadow-md text-center overflow-hidden py-4 mt-14 lg:mt-24 lg:ml-52 md:ml-48">
      <div class="flex justify-between mb-4 ml-4">
        <div class="gap-1 grid grid-flow-col">
          <button @click="create('major')" class="text-xxs lg:text-xs md:text-xs bg-sky-500 hover:bg-sky-300 active:bg-sky-600 uppercase text-white px-1 rounded"><i class="ri-add-circle-fill"></i></button>
         <a  :href="url" class=" bg-green-500 hover:bg-green-300 active:bg-green-600  text-white px-1 rounded flex items-center text-xxs lg:text-xs md:text-xs"><span>Excel</span></a>
          <!-- model -->
            <Modal/>
            <!-- model -->
          
        </div>
        <input v-model="cari" @keyup="filter" placeholder="Cari" type="text" class="text-xxs lg:text-xs md:text-xs border-2 border-stone-500 w-28 mr-4 rounded pl-1 focus:outline-sky-500 font-serif" />
      </div>
      <!--  table -->
      <TableMajor />

      <ul class="grid grid-flow-col gap-1 w-2/5 h mt-4 text-sky-500 text-center text-xxs lg:text-xs md:text-xs ml-4">
        <li :class="[{ hidden: !paginate.prev }]" class="text-slate-800 p-1 font-semibold">
          <a @click.prevent="getMajor(paginate.prev)" href="#"> Prev </a>
        </li>
        <li class="bg-slate-800 p-1 rounded-full text-white font-semibold">
          <a href="#">Page {{ paginate.current_page }} of {{ paginate.last_page }}</a>
        </li>

        <li :class="[{ hidden: !paginate.next }]" class="text-slate-800 p-1 font-semibold">
          <a @click.prevent="getMajor(paginate.next)" href="#">Next</a>
        </li>
      </ul>
    </div>
     <div class="bg-transparent p-5  mb-20"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/admin/modal/ModalMajor.vue';
import TableMajor from '@/components/admin/TableMajor.vue';
import Nav from "@/components/admin/NavAdmin2.vue";
import { useStore } from 'vuex';
import axios from 'axios';
import { computed, onMounted, ref } from '@vue/runtime-core';
export default {
  components:{
    Nav,TableMajor,Modal
  },
    setup() {
    const store = useStore();
    const cari = ref('')
    const url = ref('http://localhost:8000/api/major/export/excel-major')
    onMounted(() =>{
      getMajor()
    })


    // getBill
    const getMajor = async (page_url) => {
      let url = page_url || '/api/major/majors'
      const response = await axios.get(url);
      // console.log(response)
      store.commit('admin/getMajors', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
      // getmajor



    //  paginate
     const pagination = (meta, links) => {
       let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('admin/setPaginateMajor', data);
    };

    const paginate = computed(() => {
      return store.state.admin.paginateMajor;
    });
    //  paginate



    // create 
     const create = (value) =>{
      // console.log(value)
      store.commit('option/setModal', value);
      store.commit('option/majorToggle');
      // console.log(store.state.option.toggleMajor)
      }
    // create 


    // filter
    const filter = async () => {
      let response = await axios.get(`/api/major/majors?major=${cari.value}`);
      store.commit('admin/getMajors', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
    // filter

    const router = useRouter()
         const back = () =>{
             router.replace({name:'home'})
         }

    return{
        paginate,
        getMajor,
        cari,
        filter,
        create,
        back,
        url
    }
  }
};
</script>
<style scoped>
.-mt-90{
  margin-top: -502px ;
}
</style>

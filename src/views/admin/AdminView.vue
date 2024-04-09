<template>
  <div class="flex flex-col justify-center items-center">
    <Nav class="lg:hidden md:hidden block" />
     <!-- model -->
            <Modal/>
            <!-- model -->
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>
    <div class="w-full lg:w-8/12 md:w-4/6 bg-white shadow-md text-center overflow-hidden py-4  mt-14  lg:mt-24 lg:ml-52 md:ml-48 text-xxs lg:text-xs md:text-xs">
      <div class="flex justify-between mb-4 ml-4 ">
        <div class="gap-1 grid grid-flow-col">
          <button @click="toggleCreate('create')" class=" bg-sky-500 hover:bg-sky-300 active:bg-sky-600 uppercase text-white px-1 rounded"><i class="ri-add-circle-fill"></i></button>
            <a  :href="url" class=" bg-green-500 hover:bg-green-300 active:bg-green-600  text-white px-1 rounded flex items-center text-xxs lg:text-xs md:text-xs"><span>Excel</span></a>
           

          <button @click="dropdownClass" class="relative flex justify-center items-center bg-orange-500 active:bg-orange-600 text-white rounded ">
            <p class="px-1 ">Class</p>
            <span class="border-l p-1 hover:bg-orange-300 rounded "><i class="ri-arrow-down-circle-fill"></i></span>
            <div v-if="toggleClass" class="rounded absolute top-full min-w-full w-max bg-white shadow-md mt-1 text-black">
              <ul class="text-left border rounded">
                <li @click="filterClass(' ')" class="text-xxs px-2 py-1 border-b active:bg-orange-400 active:text-white">
                  {{ "-" }}
                </li>
              </ul>
              <ul class="text-left border rounded" v-for="(item, index) in kelas" :key="index">
                <li @click="filterClass(item.kelas)" class=" px-2 py-1 border-b active:bg-orange-400 active:text-white">{{ item.kelas }}</li>
              </ul>
            </div>
          </button>
          <button @click="dropdownMajor" class="mr-1 lg:mr-0 md:mr-0 relative flex justify-center items-center bg-emerald-500 active:bg-emerald-600 text-white rounded ">
            <p class="px-1 ">Major</p>
            <span class="border-l p-1 hover:bg-emerald-300 rounded "><i class="ri-arrow-down-circle-fill"></i></span>
            <div v-if="toggleMajor" class="rounded absolute top-full min-w-full w-max bg-white shadow-md mt-1 text-black max-h-40 overflow-y-auto">
              <ul class="text-left border rounded">
                <li @click="filterMajor(' ')" class="text-xxs px-2 py-1 border-b active:bg-orange-400 active:text-white">
                  {{ "-" }}
                </li>
              </ul>
              
              <ul class="text-left border rounded" v-for="(item, index) in majors" :key="index">
                <li @click="filterMajor(item.id)" class=" px-2 py-1 border-b active:bg-emerald-400 active:text-white">{{ item.major_name }}</li>
              </ul>
            </div>
          </button>
        </div>
        <input v-model="cari" @keyup="filter" placeholder="Cari" type="text" class=" border-2 border-stone-500 w-28 mr-4 rounded pl-1 focus:outline-sky-500 font-serif" />
      </div>
      <!--  table -->
      <TableStudent />
      <!--  table -->

      <ul class="grid grid-flow-col gap-1 w-2/5 h mt-4 text-sky-500 text-center text-xxs lg:text-xs md:text-xs ml-4">
        <li :class="[{ hidden: !paginate.prev }]" class="text-slate-800 p-1 font-semibold">
          <a @click.prevent="getStudents(paginate.prev)" href="#"> Prev </a>
        </li>
        <li class="bg-slate-800 p-1 rounded-full text-white font-semibold">
          <a href="#">Page {{ paginate.current_page }} of {{ paginate.last_page }}</a>
        </li>

        <li :class="[{ hidden: !paginate.next }]" class="text-slate-800 p-1 font-semibold">
          <a @click.prevent="getStudents(paginate.next)" href="#">Next</a>
        </li>
      </ul>
    </div>
     <div class="bg-transparent p-5  mb-20"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Nav from '@/components/admin/NavAdmin2.vue';
import Modal from '@/components/admin/modal/ModalStudent.vue';
import TableStudent from '@/components/admin/TableStudent.vue';
import { useStore } from 'vuex';
import { reactive, ref, toRefs } from '@vue/reactivity';
import { computed, onMounted} from '@vue/runtime-core';
import axios from 'axios';
export default {
  components: {
    TableStudent,
    Nav,
    Modal
  },
  setup() {
    const store = useStore();
    const data = reactive({
      cari:'',
      kelas: [{ kelas: 10 }, { kelas: 11 }, { kelas: 12 }],
    });
    const url = ref('http://localhost:8000/api/student/export/exel')


    const dropdownClass = () => {
      store.commit('option/setToggle');
      // console.log(store.state.option.dropdownClass)
    };
    const dropdownMajor = () => {
      store.commit('option/updateToggle');
      // console.log(store.state.option.dropdownClass)
    };



    // toggle
    const toggleClass = computed(() => {
      return store.state.option.dropdownClass;
    });
    const toggleMajor = computed(() => {
      return store.state.option.dropdownMajor;
    });
      // toggle

   
  // get 
    onMounted(() => {
      getStudents();
      getMajor()
    });
    

    const getMajor = async() =>{
      const response = await axios.get('/api/major/data-major')
          // console.log(response)
          store.commit('admin/getMajorAll',response.data.data)
    }

    const getStudents = async (page_url) => {
      let url = page_url || '/api/student/students'
      const response = await axios.get(url);
      store.commit('admin/getStudents', response.data.data);
      pagination(response.data.meta, response.data.links);
    };


    // watch(getStudents, async () => {
    //   console.log('hallo')
    //   const response = await axios.get('/api/student/students');
    //   store.commit('students/getStudents', response.data.data);
    //   pagination(response.data.meta, response.data.links);
    // });

     const pagination = (meta, links) => {
       let data = {
         current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('admin/setPaginateStudent', data);
    };
      // get 



    //  filter
    const filter = async () => {
      let response = await axios.get(`/api/student/students?name=${data.cari}`);
      store.commit('admin/getStudents', response.data.data);
      pagination(response.data.meta, response.data.links);
    };

     const filterClass = async(value) => {
      let response = await axios.get(`/api/student/students?class=${value}`);
      store.commit('admin/getStudents', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
     const filterMajor = async(value) => {
      let response = await axios.get(`/api/student/students?major=${value}`);
      store.commit('admin/getStudents', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
    //  filter


    // tampilan
    const paginate = computed(() => {
      return store.state.admin.paginateStudent;
    });
    const majors = computed(() => {
      return store.state.admin.majorAll;
    });
      // tampilan


    // modal
    const  toggleCreate = (value)=>{
      store.commit('option/setModal', value);
      store.commit('option/studentToggle');
    }
    
    // modal

const router = useRouter()
         const back = () =>{
             router.replace({name:'home'})
         }

    return { dropdownClass,
     dropdownMajor,
      ...toRefs(data),
       toggleClass, 
       toggleMajor, 
       paginate,
       majors,
       filter,
       filterClass, 
       filterMajor,
       toggleCreate,
       getStudents,
       back,
       url
        };
  },
};
</script>
<style scoped>
  .-mt-90{ margin-top:-320px;}
</style>
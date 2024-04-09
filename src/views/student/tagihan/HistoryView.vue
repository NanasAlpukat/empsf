<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
  <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>

    <div class="flex flex-wrap  mt-8 justify-start  lg:items-center md:item-center lg:mt-24  md:mt-24 lg:ml-56 md:ml-56">
      <div v-for="(item,index) in wadah" :key="index" class="w-1/2  flex   justify-center items-center px-3 mb-5 mt-5" >
        
        <div  class="w-full lg:w-1/2 md:w-3/4 bg-white py-4 px-3  shadow-lg rounded-md rounded-bl-md flex flex-col">
           <div class="text-right">
          <i @click="drop(item)" class="ri-close-fill text-right text-slate-700 hover:text-emerald-400 focus:outline-emerald-600 font-bold"></i>
          </div>
          <div class="flex justify-between text-2xs mt-1 lg:text-sm md:text-sm">
            <span class="text-rose-500">{{item.history_time}}</span>
            <span class="text-emerald-500">{{item.published}}</span>
          </div>
          <span class="text-xxs lg:text-sm md:text-sm mt-2 font-semibold uppercase">{{item.name}}</span>
          <span class="text-xxs lg:text-sm md:text-sm mt-2 uppercase">{{item.bill_name}}</span>
          <span class="text-xxs lg:text-sm md:text-sm mt-2">{{ item.major_name }}</span>
          <span class="text-xxs  lg:text-sm md:text-sm font-medium mb-4 mt-2">IDR.{{item.price}}</span>
          <button @click.prevent="update" class="text-xs lg:text-base md:text-sm bg-emerald-500 text-center text-white py-1 rounded hover:bg-emerald-300 active:bg-emerald-500 uppercase"><span class="cursor-pointer">Lunas</span> </button>
        </div>
      </div>
      
    </div>
       <div v-if="paginate.prev || paginate.next" class="w-full lg:w-2/5 lg:ml-96 md:ml-72   px-4 text-white mt-5 text-xxs lg:text-sm md:text-sm">
          <div  class="w-1/6 grid grid-flow-col gap-1 text-center ">
          <a :class="[{ hidden: !paginate.prev }]" @click.prevent="getHistory(paginate.prev)" href="#" class="bg-sky-500 p-4 font-medium">Prev</a>
          <div class="bg-sky-500 p-4 font-bold ">{{ paginate.current_page }}</div>
          <a :class="[{ hidden: !paginate.next }]"  @click.prevent="getHistory(paginate.next)" href="#" class="bg-sky-500 p-4 font-medium">Next</a>
          </div>
      </div>
    <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import Nav from '@/components/student/nav/NavStudent2.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRoute ,useRouter} from 'vue-router';
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core';
import Swal from 'sweetalert2'
export default {
  components: { Nav },
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = route.params.id
    const data = reactive({
        'historyAll':{},
        
    })

  // get history
    onMounted(() =>{
      getHistory()
    })

    const getHistory = async(value) =>{
      
       let url = value || `/api/frontend/history/${id}`
      const response = await axios.get(url)
      store.commit('student/getHistory',response.data.data)
      pagination(response.data.meta, response.data.links);
      console.log(store.state.student.history)
    }
    const wadah = computed(() =>{
      return store.state.student.history
    })

      // get history





    //  paginate
     const pagination = (meta, links) => {
       let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('student/setPaginateHistory', data);
    };

    const paginate = computed(() => {
      return store.state.student.paginateHistory;
    });
    //  paginate

    const update = () =>{
      getHistory()
    }
    // delete
      const drop = async(value) =>{
        console.log(value)
        // const tanya = confirm('Apakah kamu yakin akan menghapus nya ?')

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
       await axios.post(`/api/frontend/delete/${value.id}`)
          getHistory()
      }
    })
      }
    // delete

     const router = useRouter()
         const back = () =>{
             router.replace({name:'payment'})
         }

    return {
      wadah,
      drop,
      paginate,
      getHistory,
      ...toRefs(data),
      back,
      update
    }
  }
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

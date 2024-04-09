<template>
  <div>
    <Nav class="lg:hidden md:hidden block" />
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>

    <div class="flex flex-wrap mt-8 justify-start lg:items-center md:item-center lg:mt-24  md:mt-24 lg:ml-56 md:ml-56"> 

      <div class="w-1/2  flex flex-col justify-center items-center px-3 mb-5" v-for="(item, index) in pending" :key="index">
        <div class="w-full lg:w-1/2 md:w-3/4 bg-white p-3 lg:p-5 md:p-4 shadow-lg rounded-md rounded-bl-md flex flex-col">
        <div class="text-right">
          <i @click="cencel(item)" class="ri-close-fill text-right text-slate-700 hover:text-emerald-400 focus:outline-emerald-600 font-bold"></i>
          </div>
          <span class="text-xxs lg:text-sm md:text-sm mt-2 font-semibold">{{ item.name }}</span>
          <span class="text-xxs lg:text-sm md:text-sm  mt-2">{{ item.bill_name }}</span>
          <span v-if="item.bank" class="text-xxs lg:text-sm md:text-sm  mt-2 uppercase">{{ item.bank }}</span>
          <span v-if="item.no_va" class="text-xxs lg:text-sm md:text-sm  mt-2">{{ item.no_va }}</span>

          <span class="text-xxs lg:text-sm md:text-sm  font-medium mt-1">IDR.{{ item.price }}</span>
          <!-- <span class="text-xxs lg:text-sm md:text-sm  font-medium mt-1 text-rose-500">{{ item.expiration_date }}</span> -->
           <div class="flex justify-between text-2xs mt-1 lg:text-sm md:text-sm" >
            <span class="text-rose-500">{{ item.transaction_time }}</span>
            <!-- <span class="text-rose-500">{{ item.order_time }}</span> -->
          </div> 
          <span @click="update"  v-if="item.status == 'belum lunas'" class="text-2xs lg:text-sm md:text-sm   mt-2 bg-amber-400 text-center text-white py-1 lg:py-2 md:py-2 rounded hover:bg-amber-200 active:bg-amber-400 uppercase cursor-pointer">menunggu pembayaran</span>
        </div>
      </div>
    </div>
    <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import Nav from '@/components/student/nav/NavStudent2.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { computed, onMounted, reactive, watch } from '@vue/runtime-core';
export default {
  components: { Nav },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const data = reactive({
      order: {},
    });

    onMounted(() => {
      getPending();
    });
    const getPending = async () => {
      const response = await axios.get(`/api/payment/${id}`);
      data.order = response.data.data;
      store.commit('student/getPending', response.data.data);
    };

   

    watch(data, async () => {
      console.log('hallo');
      //   const response = await axios.post('/api/handle-payment')
      // console.log(response)
    });

    const cencel = async (value) => {
      // console.log(value.order_id);

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
       const response = await axios.post('/api/cencel-payment',value)
      if(response.status == 200){
        alert(response.data.message)
        router.replace({name:'payment-tagihan'})
      }
      }
    })
    };

    const update = () =>{
      getPending()
      // router.replace({name:'payment-history'})
    }

    const pending = computed(() => {
      return store.state.student.pending;
    });


     const drop = async(item) =>{
        console.log(item)
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
      const response = await axios.post(`/api/frontend/xendit/cencel/${item}`)
      if(response.status == 200){
        alert(response.data.message)
        router.replace({name:'payment-tagihan'})
      }
      }
    })
        

    }

         const back = () =>{
             router.replace({name:'payment'})
         }

    return {
      pending,
      cencel,
      update,
      back,
      drop
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
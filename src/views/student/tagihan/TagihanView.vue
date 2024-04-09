<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
    <Modal />
  <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>

    <div class="flex flex-wrap mt-8 justify-start px-1  lg:items-center md:item-center lg:mt-24  md:mt-24 lg:ml-56 md:ml-56">
      <div class="w-1/2  flex flex-col justify-center items-center px-1 mb-5" v-for="(item,index) in order" :key="index">
        
        <div class="w-full lg:w-1/2 md:w-3/4 bg-white px-3 py-4 shadow-lg rounded-md rounded-bl-md flex flex-col ">
          <span class=" mt-2 font-semibold text-xxs lg:text-sm md:text-sm">{{ item.name }}</span>
          <span class=" mt-2 text-xxs lg:text-sm md:text-sm"> {{ item.bill_name }}</span>
          <span class=" mt-2 text-xxs lg:text-sm md:text-sm"> {{item.major_name}}</span>
          <div class="flex justify-between  my-2 text-2xs lg:text-sm md:text-sm">
            <span class="font-medium">IDR.{{ item.price }}</span>
            <span class="text-rose-500"> {{item.expired_date}}</span>
          </div>
          <button @click="pay(item)" class="text-xxs lg:text-sm md:text-sm bg-rose-500 text-center text-white py-1 lg:py-2 md:py-2 rounded hover:bg-rose-300 active:bg-rose-500 mt-4 uppercase">{{item.status}}</button>
        </div>
      </div>
    </div>
    <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import Modal from '@/components/student/modal/ModalPay.vue';
import Nav from '@/components/student/nav/NavStudent2.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { computed, onMounted } from '@vue/runtime-core';
export default {
  components: { Nav,Modal },
  setup() {
    const router = useRoute();
    const store = useStore();
    const id = router.params.id;

    // get
       onMounted(() =>{
          orders()
        })
        const orders = async() =>{
          const response = await axios.get(`/api/frontend/order/${id}`)
           store.commit('student/getOrders',response.data.data)
        }
        const order = computed(() => {
        return store.state.student.orders;
        });
    // get

    // const pay = async (item) =>{
    //   console.log(item)
    //         // window.postMessage('text', '*')
    //         // const formData = new FormData()
    //         // formData.append('id',item.student_id)
    //         const data = {
    //           id:item.student_id,
    //           price:item.price,
    //         }
    //         const response = await axios.post('/api/frontend/student-payment',data)
    //         console.log(response)
    //         // window.snap.pay(response.data.token)
    //         complete(response.data.token)
    //     }

    //     const complete = (param) =>{
    //         window.snap.pay(param, {
    //             // onSuccess: (result) =>{
    //             //      alert("payment success!"); 
    //             //      getOrder(result)
    //             // },
    //             onPending: (result) =>{
    //                  alert("payment pending!"); 
    //                  console.log(result);
    //                 getOrder(result)
    //             },
    //             // onError: (result) =>{
    //             //      alert("payment error!"); 
    //             //      getOrder(result)
    //             // },
    //             // onClose: (result) =>{
    //             //      alert("payment onClose!"); 
    //             //      console.log(result);
    //             // },
    //         })
    //     }


    //   const getOrder = async (param) => {

    //         console.log(param)
    //         // try{
    //         //     const user = store.state.users.user
    //         //     data.order = param
    //         //     console.log(data.order)
    //         //     console.log(user)
    //         //     const response = await axios.post(`create-payment/${user.id}`,data.order)
    //         //     if(response.status == 201){
    //         //         console.log(response.data.data)
    //         //         getTransaction()
    //         //     }
    //         // }catch(e){
    //         //     // console.log(e.response.data)
    //         //     alert(e.response.data)
    //         // }
            
    //     }





    const pay = (value) =>{
      console.log(value)
      store.commit('student/payToggle')
      store.commit('student/getPay',value)
      store.commit('student/setModal','payment')
      // console.log(store.state.student.payToggle)
      // console.log(store.state.student.detailPay)
      // console.log(store.state.student.modalType)
    }

    const route = useRouter()
         const back = () =>{
             route.replace({name:'payment'})
         }

    return {
      order,
      pay,
      back
    }
  }
};
</script>

<style scoped>
    .-mt-90{
      margin-top: -65px;
    }
</style>
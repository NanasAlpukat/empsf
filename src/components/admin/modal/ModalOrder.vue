<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2  w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-8 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span v-if="typeText == 'order'" class="text-xs lg:text-base md:text-base font-medium">Form Tambah Data</span>
            <span v-if="typeText == 'setOrder'" class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
             <div class="mb-7 flex flex-col items-start ">
                <label for="tagihan" class=" text-xs lg:text-sm md:text-sm mb-2">Tagihan</label>
                <select id="tagihan" v-model="orders.bill_id" class="focus:border-red-500 text-xs lg:text-sm md:text-sm">
                  <option value="">Please select one</option>
                  <option v-for="(item,index) in bills" :key="index" :value="item.id" >{{item.bill_name}}</option>
                </select>
                <div v-if="theError.bill_id" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs ">
                  {{ theError.bill_id[0] }}
                </div>
              </div>
    
              <div class="mb-5 flex flex-col items-start ">
                <label for="price" class=" text-xs lg:text-sm md:text-sm mb-2">Price</label>
                <input v-model="orders.price" type="text" id="price"  class="text-xs lg:text-sm md:text-sm w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.price" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.price[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="date" class=" text-xs lg:text-sm md:text-sm mb-2">Batas Waktu</label>
                <input v-model="orders.expired_date" type="date" id="date"  class="text-xs lg:text-sm md:text-sm w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.expired_date" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.expired_date[0] }}
                </div>
              </div>
            
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button v-if="typeText == 'order'"  class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Tambah</button>
                <button  v-if="typeText == 'setOrder'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
                <button @click="close('closeMajor')" class="bg-fuchsia-500 p-2  mt-2 mb-2 text-white rounded-md" >Kembali</button>
                </div>
              </form>
        </div>
      </div>
    </div>
    <div v-if="toggle" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, toRefs, watch } from '@vue/runtime-core';
import { useStore } from 'vuex'; 
import axios from 'axios';
// import Swal from 'sweetalert2'
export default {
    setup() {
        const store = useStore();
        const form = reactive({
           orders:{
            id:'',
            student_id:'',
            name:'',
            price:'',
            expired_date:'',
            status:'',
            bill_id:'',
            bill_name:'',
            major_id:'',
            major_name:'',
           }
        })
        const error = reactive({
        theError: [],
        });

        const data = reactive({
        bills:{},
        majors:{},
        })

        // get
            onMounted(() =>{
                bills()
                majors()
            })

            const bills = async() =>{
                const response = await axios.get('/api/bill/data-bill')
                data.bills = response.data.data
            }
            const majors = async() =>{
                const response = await axios.get('/api/major/data-major')
                data.majors = response.data.data
            }
        // get



        // computed
           
            const toggle = computed(() =>{
            return store.state.option.toggleOrder
            })

            const typeText = computed(() =>{
            return store.state.option.modalType
            })
        // computed


        // watch
            watch(typeText, async() =>{
                if(typeText.value == 'setOrder'){
                    // console.log('hallo')
                    const order = store.state.admin.order
                    // console.log(bill)
                     form.orders.id = order.id
                    form.orders.student_id = order.student_id
                    form.orders.name = order.name
                    form.orders.major_name = order.major_name
                    form.orders.major_id = order.major_id
                    form.orders.bill_id = order.bill_id
                    form.orders.bill_name = order.bill_name
                    form.orders.status = order.status
                    form.orders.price = order.price
                    form.orders.expired_date = order.expired_date
                     
                }
                if(typeText.value == 'order'){
                    // console.log('hallo')
                    const student = store.state.admin.studentId
                    // console.log(bill)
                    form.orders.student_id = student.id 
                    form.orders.status = 'belum lunas' 
                    form.orders.major_id = student.major_id 
                     
                }
            })
        // watch



        // toggle
            const close = (value) =>{
            store.commit('option/orderToggle');
            store.commit('option/setModal', value);
            reset()
            }
        // toggle


        // function
        const post = async() =>{
             if(typeText.value == 'order'){
                 console.log(form.orders)
                 try{
                     await store.dispatch('admin/createOrder',form.orders)
                    //  console.log(response)
                     const response = await axios.get( `/api/order/${form.orders.student_id}`);
                     store.commit('admin/getOrders', response.data.data);
                     pagination(response.data.meta, response.data.links);
                     store.commit('option/orderToggle');
                     reset()
                     store.commit('option/setModal', 'closeOrder');
                 }catch(e){
                     error.theError = e.response.data
                 }
             } else if(typeText.value == 'setOrder'){
                  try{
                    await store.dispatch('admin/setOrder',form.orders)
                    //  console.log(response)
                     store.commit('option/orderToggle');
                     reset()
                     store.commit('option/setModal', 'closeOrder')
                 }catch(e){
                     error.theError = e.response.data
                 }
             }
        }
        // function


        const pagination = (meta, links) => {
        let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
        };
        store.commit('admin/setPaginateOrder', data);
      };


        // reset
        const reset = ()=>{
            form.orders.id = ''
            form.orders.student_id = ''
            form.orders.name = ''
            form.orders.major_name = ''
            form.orders.major_id = ''
            form.orders.bill_id = ''
            form.orders.bill_name = ''
            form.orders.status = ''
            form.orders.price = ''
            form.orders.expired_date = ''
            error.theError = []
        }
        // reset

        return{toggle, typeText,close,post,...toRefs(error),...toRefs(form),...toRefs(data)}
    }
}
</script>
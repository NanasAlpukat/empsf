<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2 w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-8 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span v-if="typeText == 'bill'" class="text-xs lg:text-base md:text-base font-medium">Form Tambah Data</span>
            <span v-if="typeText == 'setBill'" class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
              <div class="mb-5 flex flex-col items-start ">
                <label for="name-bill" class="text-xs lg:text-sm md:text-sm mb-2">Nama Tagihan</label>
                <input v-model="bill_name" type="text" id="name-bill"  class="text-xs lg:text-sm md:text-sm w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.bill_name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs ">
                  {{ theError.bill_name[0] }}
                </div>
              </div>
            
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button v-if="typeText == 'bill'"  class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Tambah</button>
                <button  v-if="typeText == 'setBill'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
                <button @click="close('closeBill')" class="bg-fuchsia-500 p-2  mt-2 mb-2 text-white rounded-md" >Kembali</button>
                </div>
              </form>
        </div>
      </div>
    </div>
    <div v-if="toggle" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
  </div>
</template>
<script>
import { computed, reactive, toRefs, watch } from '@vue/runtime-core';
import { useStore } from 'vuex'; 
import axios from 'axios';
// import Swal from 'sweetalert2'
export default {
    setup() {
        const store = useStore();
        const form = reactive({
            bill_name:'',
            id:''
        })
        const error = reactive({
        theError: [],
        });

        // computed
            const toggle = computed(() =>{
            return store.state.option.toggleBill
            })

            const typeText = computed(() =>{
            return store.state.option.modalType
            })
        // computed


        // watch
            watch(typeText, async() =>{
                if(typeText.value == 'setBill'){
                    // console.log('hallo')
                    const bill = store.state.admin.bill
                    // console.log(bill)
                    form.bill_name = bill.bill_name 
                    form.id = bill.id 
                }
            })
        // watch



        // toggle
            const close = (value) =>{
            store.commit('option/billToggle');
            store.commit('option/setModal', value);
            error.theError = []
            form.bill_name = ''
            }
        // toggle


        // function
        const post = async() =>{
             if(typeText.value == 'bill'){
                 try{
                     await store.dispatch('admin/createBill',form)
                    //  console.log(response)
                    const response = await axios.get('api/bill/bills')
                    // if(response.status == 201){
                      //  Swal.fire({
                      //       icon: 'success',
                      //       text: response.data.message,
                      //       confirmButtonText: 'Berhasil',
                      //       confirmButtonColor: '#3085d6',
                      //       customClass:{
                      //         icon:'text-xs',
                      //       }
                      //   })
                      store.commit('admin/getBills', response.data.data);
                     pagination(response.data.meta, response.data.links);
                     
                     store.commit('option/billToggle');
                     form.bill_name = ''
                     error.theError = []
                     store.commit('option/setModal', 'closeBill');
                    // }
                 }catch(e){
                     error.theError = e.response.data
                 }
             } else if(typeText.value == 'setBill'){
                  try{
                    await store.dispatch('admin/setBill',form)
                    //  console.log(response)
                     store.commit('option/billToggle');
                     form.bill_name = ''
                     store.commit('option/setModal', 'closeBill');
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
          store.commit('admin/setPaginateBill', data);
        };

        return{toggle, typeText,close,post,...toRefs(error),...toRefs(form)}
    }
}
</script>
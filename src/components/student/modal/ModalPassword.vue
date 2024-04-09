<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2  w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-6 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
           
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
              <div class="mb-5 flex flex-col items-start ">
                <label for="email" class=" text-xs lg:text-sm md:text-sm  mb-2">Email</label>
                <input v-model="email" type="text" id="email"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.email" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.email[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="old_password" class=" text-xs lg:text-sm md:text-sm  mb-2">Old password</label>
                <input v-model="old_password" type="password" id="old_password"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.old_password" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.old_password[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="new_password" class=" text-xs lg:text-sm md:text-sm  mb-2">New password</label>
                <input v-model="new_password" type="text" id="new_password"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.new_password" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.new_password[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="confirm_password" class=" text-xs lg:text-sm md:text-sm  mb-2">Confirm password</label>
                <input v-model="confirm_password" type="text" id="confirm_password"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.confirm_password" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.confirm_password[0] }}
                </div>
              </div>
            
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base ">
                
                <button  class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah Password</button>
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
import { computed, reactive, toRefs } from '@vue/runtime-core';
import { useStore } from 'vuex'; 

// import axios from 'axios';
export default {
    setup() {
        const store = useStore();
        const form = reactive({
            email:'',
            old_password:'',
            new_password:'',
            confirm_password:''
        })
        const error = reactive({
        theError: [],
        });

        // computed
            const toggle = computed(() =>{
            return store.state.users.toggle
            })

           



        // toggle
            const close = () =>{
            store.commit('users/togglePass');
            resetModal
            }
        // toggle


        // function
        const post = async() =>{
                 try{
                     await store.dispatch('users/reset',form)
                     store.commit('users/togglePass');
                     resetModal()
                 }catch(e){
                     error.theError = e.response.data
                 }
             
        }

        const resetModal = () =>{
            form.email = ''
            form.old_password = ''
            form.new_password = ''
            form.confirm_password = ''
            error.theError = []
        }

        return{toggle,close,post,...toRefs(error),...toRefs(form)}
    }
}
</script>
<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2 w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-8 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span v-if="typeText == 'major'" class="text-xs lg:text-base md:text-base font-medium">Form Tambah Data</span>
            <span v-if="typeText == 'setMajor'" class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
              <div class="mb-5 flex flex-col items-start ">
                <label for="name-bill" class=" text-xs lg:text-sm md:text-sm mb-2">Nama Jurusan</label>
                <input v-model="major_name" type="text" id="name-bill"  class="text-xs lg:text-sm md:text-sm w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.major_name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.major_name[0] }}
                </div>
              </div>
            
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button v-if="typeText == 'major'"  class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Tambah</button>
                <button  v-if="typeText == 'setMajor'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
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
import { computed, reactive, toRefs, watch } from '@vue/runtime-core';
import { useStore } from 'vuex'; 
import axios from 'axios';
// import Swal from 'sweetalert2'
export default {
    setup() {
        const store = useStore();
        const form = reactive({
            major_name:'',
            id:''
        })
        const error = reactive({
        theError: [],
        });

        // computed
            const toggle = computed(() =>{
            return store.state.option.toggleMajor
            })

            const typeText = computed(() =>{
            return store.state.option.modalType
            })
        // computed


        // watch
            watch(typeText, async() =>{
                if(typeText.value == 'setMajor'){
                    // console.log('hallo')
                    const major = store.state.admin.major
                    // console.log(bill)
                    form.major_name = major.major_name 
                    form.id = major.id 
                }
            })
        // watch



        // toggle
            const close = (value) =>{
            store.commit('option/majorToggle');
            store.commit('option/setModal', value);
            reset()
            }
        // toggle


        // function
        const post = async() =>{
             if(typeText.value == 'major'){
                 try{
                     await store.dispatch('admin/createMajor',form)
                    //  console.log(response)
                     const response = await axios.get('api/major/majors')
                    //  if(response.status == 201){
                    //     Swal.fire({
                    //         icon: 'success',
                    //         text: response.data.message,
                    //         confirmButtonText: 'Berhasil',
                    //         confirmButtonColor: '#3085d6',
                    //         customClass:{
                    //           icon:'text-xs',
                    //         }
                    //     })
                      store.commit('admin/getMajors', response.data.data);
                     pagination(response.data.meta, response.data.links);
                     store.commit('option/majorToggle');
                     reset()
                     store.commit('option/setModal', 'closeMajor');
                    //  }
                 }catch(e){
                     error.theError = e.response.data
                 }
             } else if(typeText.value == 'setMajor'){
                  try{
                    await store.dispatch('admin/setMajor',form)
                    //  console.log(response)
                     store.commit('option/majorToggle');
                     reset()
                     store.commit('option/setModal', 'closeMajor')
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
          store.commit('admin/setPaginateMajor', data);
        };


        // reset
        const reset = ()=>{
            form.major_name = ''
            form.id = ''
            error.theError = []
        }
        // reset

        return{toggle, typeText,close,post,...toRefs(error),...toRefs(form)}
    }
}
</script>
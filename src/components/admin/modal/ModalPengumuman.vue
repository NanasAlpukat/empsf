<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2 w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-6 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span v-if="typeText == 'createPengumuman'" class="text-xs lg:text-base md:text-base font-medium">Form Tambah Data</span>
            <span v-if="typeText == 'setPengumuman'" class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
              <div class="mb-5 flex flex-col items-start ">
                <label for="title" class=" text-xs lg:text-sm md:text-sm  mb-2">Title</label>
                <input v-model="title" type="text" id="title"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.title" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.title[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="body" class=" text-xs lg:text-sm md:text-sm  mb-2">Body</label>
                <input v-model="body" type="text" id="body"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.body" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.body[0] }}
                </div>
              </div>
              
              <div class="mb-5 flex flex-col items-start ">
                <label for="date" class=" text-xs lg:text-sm md:text-sm  mb-2">Tanggal</label>
                <input v-model="date" type="date" id="date"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.date" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.date[0] }}
                </div>
              </div>
             
             
             
            
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button  v-if="typeText == 'createPengumuman'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Tambah</button>
                <button  v-if="typeText == 'setPengumuman'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
                <button @click="close('close')" class="bg-fuchsia-500 p-2  mt-2 mb-2 text-white rounded-md" >Kembali</button>
                </div>
              </form>
        </div>
      </div>
    </div>
    <div v-if="toggle" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch} from '@vue/runtime-core';
import { useStore } from 'vuex'; 
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  setup() {
    const form = reactive({
      title:'',
      body:'',
      date:'',
    })

    const error = reactive({
      theError: [],
    });

    const store = useStore();


    // computed 
    const toggle = computed(() =>{
      return store.state.info.togglePengumuman
    })

    const typeText = computed(() =>{
      return store.state.info.modalType
    })


      // computed
      
    
     // watch

        watch(typeText, async () =>{
          if(typeText.value == 'setPengumuman'){
              const pengumuman = store.state.info.pengumuman
            //   console.log(student.image)
              form.title= pengumuman.title
              form.body= pengumuman.body
              form.date= pengumuman.date
              
          }
        })
    
    // watch



    // fungsi


      const close = (value) =>{
       store.commit('info/setTogglePengumuman');
        console.log(store.state.info.togglePengumuman)
        reset()
        store.commit('info/setModal', value);
      }


  const post = async() =>{
        // console.log(form)
        // console.log(typeText.value)
      if(typeText.value == 'createPengumuman'){

        try{
          
        const formData = new FormData()
        formData.append('body',form.body)
        formData.append('title',form.title)
        formData.append('date',form.date)
        

        const response = await axios.post('/api/create/pengumuman',formData)
         if(response.status == '201'){
        store.commit('info/createPengumuman',response.data.data)
        // alert(response.data.message)
         Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                            confirmButtonText: 'Berhasil',
                            confirmButtonColor: '#3085d6',
                            customClass:{
                              icon:'text-xs',
                            }
                        })
        const result = await axios.get('api/pengumuman')
        store.commit('info/geAlltPengumuman',result.data.data)
        pagination(result.data.meta, result.data.links);
         store.commit('info/setTogglePengumuman');
        reset()
        store.commit('info/setModal', 'close');
        console.log(response)
         }
          }catch(e){
            error.theError = e.response.data
            console.log(error.theError)
            }
          }
          else if(typeText.value == 'setPengumuman'){
              try{

                const formData = new FormData()
                formData.append('body',form.body)
                formData.append('title',form.title)
                formData.append('date',form.date)


                const info = store.state.info.pengumuman
                console.log(info)
                const response = await axios.post(`/api/pengumuman/set/${info.id}`, formData)
                if(response.status == '200'){
                    store.commit('info/updatePengumuman',response.data.data)
                  // alert(response.data.message)
                   Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                            confirmButtonText: 'Berhasil',
                            confirmButtonColor: '#3085d6',
                            customClass:{
                              icon:'text-xs',
                            }
                        })
                    store.commit('info/setTogglePengumuman');
                    reset()
                    store.commit('info/setModal', 'close');
                }
              }catch(e){
              error.theError = e.response.data
              console.log(error.theError)
              }
          }
      }


     const reset = () =>{
        form.title=''
        form.body=''
        form.date=''
        error.theError = []
     }

    // fungsi


      const pagination = (meta, links) => {
       let data = {
         current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('info/setPaginatePengumuman', data);
    };

    return { 
      toggle,
      typeText,
      ...toRefs(form),
      close,
      ...toRefs(error),
      post,
       };
  },
};
</script>


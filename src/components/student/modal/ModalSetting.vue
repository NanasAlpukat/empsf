<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2  w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-4 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center">
            <span  class="text-xs lg:text-base md:text-base font-medium ">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
             
             <input type="hidden" v-model="student.oldimg">
             
              <div class="mb-5 flex flex-col items-start ">
                <label for="nama" class=" text-xs lg:text-sm md:text-sm  mb-2">Nama</label>
                <input v-model="student.name" type="text" id="nama"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.name[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="email" class=" text-xs lg:text-sm md:text-sm  mb-2">Email</label>
                <input v-model="student.email" type="email" id="email"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.email" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.email[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="umur" class=" text-xs lg:text-sm md:text-sm  mb-2">Tanggal Lahir</label>
                <input v-model="student.date" type="date" id="umur"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.date_of_birth" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.date_of_birth[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="umur" class="text-xs lg:text-sm md:text-sm  mb-2">Umur</label>
                <input v-model="student.age" type="text" id="umur"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.age" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.age[0] }}
                </div>
              </div>
              <div class="mb-6 flex flex-col items-start ">
                <div class="flex flex-col items-start">
                <div>

               <label for="Gender" class="block text-xs lg:text-sm md:text-sm  mb-2">Gender</label>
                </div>
                <div>
                <label for="l" class="text-xs lg:text-sm md:text-sm  mr-2">Laki laki</label>
                <input type="radio" class="text-xxs md:text-xxs active:accent-green-400 active:bg-emerald-500" id="l" v-model="student.gender" value="male" />

                <label for="p" class="text-xs lg:text-sm md:text-sm  mx-2">Prempuan</label>
                <input type="radio" class="text-xxs md:text-xxs active:outline-emerald-500"  id="p" v-model="student.gender" value="female" />
                </div>
                </div>
                <div v-if="theError.gender" class="block mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.gender[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="phone" class=" text-xs lg:text-sm md:text-sm  mb-2">No Phone</label>
                <input v-model="student.no_phone" type="text" id="phone"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.no_phone" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.no_phone[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="nama-wali" class=" text-xs lg:text-sm md:text-sm  mb-2">Nama Wali</label>
                <input v-model="student.parents_name" type="text" id="nama-wali"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.parents_name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.parents_name[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="alamat" class=" text-xs lg:text-sm md:text-sm  mb-2">Alamat</label>
                <input v-model="student.address" type="text" id="alamat"  class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.address" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.address[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label  class=" text-xs lg:text-sm md:text-sm  mb-2">Image</label>
                <!-- <img v-if="typeText == 'setStudent' && student.image" :src="student.image" class="w-40 h-40 "> -->
                <input @change="handle"  type="file" accept="img/*" class="text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.image" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.image[0] }}
                </div>
              </div>
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button  class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
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
import { computed, reactive, toRefs, watch } from '@vue/runtime-core';
import { useStore } from 'vuex'; 
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    setup() {
        const store = useStore();
        const form = reactive({
        student:{
          
            name:'',
            age:'',
            date:'',
            gender:'',
            no_phone:'',
            parents_name:'',
            address:'',
            image:'',
            email:'',
            oldimg:''
            }
        })
        const error = reactive({
        theError: [],
        });

        // computed
            const toggle = computed(() =>{
            return store.state.student.studentToggle
            })

            const typeText = computed(() =>{
            return store.state.student.modalType
            })
        // computed


        // watch
            watch(typeText, async() =>{
                if(typeText.value == 'setStudent'){
                    // console.log('hallo')
                    const student = store.state.student.student
                    form.student.name= student.name
                    form.student.age= student.age
                    form.student.date= student.date
                    form.student.gender= student.gender
                    form.student.no_phone= student.no_phone
                    form.student.parents_name= student.parents_name
                    form.student.address= student.address
                    form.student.image= student.image
                    form.student.oldimg= student.image
                    form.student.email= student.email
                }
            })
        // watch






        // toggle
            const close = (value) =>{
            store.commit('student/studentToggle');
            store.commit('student/setModal', value);
            reset()
            }

            const handle = (e) =>{
            console.log(e)
            form.student.image  = e.target.files[0]
        
      }
        // toggle


        // function
        const post = async() =>{     
                  try{
                    const formData = new FormData()
                  
                    formData.append('image',form.student.image)
                    formData.append('oldimg',form.student.oldimg)
                    formData.append('gender',form.student.gender)
                    formData.append('name',form.student.name)
                    formData.append('address',form.student.address)
                    formData.append('date_of_birth',form.student.date)
                    formData.append('no_phone',form.student.no_phone)
                    formData.append('parents_name',form.student.parents_name)
                    formData.append('age',form.student.age)
                    formData.append('email',form.student.email)
                    const student = store.state.student.student
                    const response = await axios.post(`/api/frontend/student/${student.id}`, formData)
                if(response.status == 200){
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
                    console.log(response)
                    store.commit('student/setStudent',response.data.data)
                    store.commit('student/studentToggle');
                     reset()
                     store.commit('student/setModal', 'closeSetting')
                }
                 }catch(e){
                     error.theError = e.response.data
                     console.log(error.theError)
                 }
        }
        // function

      


        // reset
         const reset = () =>{
            form.student.name=''
            form.student.age=''
            form.student.date=''
            form.student.gender=''
            form.student.no_phone=''
            form.student.parents_name=''
            form.student.address=''
            form.student.image=''
            form.student.email=''
            error.theError = []
            }
        // reset


        

        return{toggle, typeText,close,post,...toRefs(error),...toRefs(form),handle,
         }
    }
}
</script>
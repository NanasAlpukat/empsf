<template>
  <div>
    <div v-if="toggle" class="fixed  inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2 w-11/12 max-h-96 bg-white p-2 rounded-md shadow -mt-44 ">
        <div class="bg-white px-8 lg:px-11 py-2  max-h-80 overflow-y-auto">

            <div class="m-10 text-center ">
            <span v-if="typeText == 'create'" class="text-xs lg:text-base md:text-base font-medium">Form Tambah Data</span>
            <span v-if="typeText == 'set'" class="text-xs lg:text-base md:text-base font-medium">Form Ubah Data</span>
            </div>

            <form action="#" method="post" @submit.prevent="post" enctype="multipart/form-data">
              <input type="hidden" v-model="oldimg">
              <div class="mb-5 flex flex-col items-start ">
                <label for="nis" class=" text-xs lg:text-sm md:text-sm  mb-2">Nis</label>
                <input v-model="nis" type="text" id="nis"  class=" text-xs lg:text-sm md:text-sm  w-full p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.nis" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.nis[0] }}
                </div>
              </div>
              <div class="mb-7 flex flex-col items-start ">
                <label for="major" class=" text-xs lg:text-sm md:text-sm  mb-2">Jurusan</label>
                <select id="major" v-model="major_id" class="focus:border-red-500 text-xs lg:text-sm md:text-sm ">
                  <option value="">Please select one</option>
                  <option v-for="(item,index) in majors" :key="index" :value="item.id">{{item.major_name}}</option>
                </select>
                <div v-if="theError.major_id" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.major_id[0] }}
                </div>
              </div>
              <div class="mb-7 flex flex-col items-start ">
                <label for="kelas" class=" text-xs lg:text-sm md:text-sm  mb-2">Kelas</label>
                <select id="kelas" v-model="kelas" class="focus:border-red-500 text-xs lg:text-sm md:text-sm ">
                  <option value="">Please select one</option>
                  <option v-for="index in 3" :key="index" :value="index+9" >{{index+9}}</option>
                </select>
                <div v-if="theError.kelas" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.kelas[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="nama" class=" text-xs lg:text-sm md:text-sm  mb-2">Nama</label>
                <input v-model="name" type="text" id="nama"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.name[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="email" class=" text-xs lg:text-sm md:text-sm  mb-2">Email</label>
                <input v-model="email" type="email" id="email"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.email" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.email[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="umur" class=" text-xs lg:text-sm md:text-sm  mb-2">Tanggal Lahir</label>
                <input v-model="date_of_birth" type="date" id="umur"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.date_of_birth" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.date_of_birth[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="umur" class=" text-xs lg:text-sm md:text-sm  mb-2">Umur</label>
                <input v-model="age" type="text" id="umur"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
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
                <label for="l" class="text-xxs lg:text-sm md:text-xs mr-2">Laki laki</label>
                <input type="radio" class="text-2xs active:accent-green-400 active:bg-emerald-500" id="l" v-model="gender" value="male" />

                <label for="p" class="text-xxs lg:text-sm md:text-xs mx-2">Prempuan</label>
                <input type="radio" class="text-2xs active:outline-emerald-500"  id="p" v-model="gender" value="female" />
                </div>
                </div>
                <div v-if="theError.gender" class="block mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.gender[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="phone" class=" text-xs lg:text-sm md:text-sm  mb-2">No Phone</label>
                <input v-model="no_phone" type="text" id="phone"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.no_phone" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.no_phone[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="nama-wali" class=" text-xs lg:text-sm md:text-sm  mb-2">Nama Wali</label>
                <input v-model="parents_name" type="text" id="nama-wali"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.parents_name" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.parents_name[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label for="alamat" class=" text-xs lg:text-sm md:text-sm  mb-2">Alamat</label>
                <input v-model="address" type="text" id="alamat"  class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.address" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.address[0] }}
                </div>
              </div>
              <div class="mb-5 flex flex-col items-start ">
                <label  class=" text-xs lg:text-sm md:text-sm  mb-2">Image</label>
                <input @change="handle"  type="file" accept="img/*" class="w-full text-xs lg:text-sm md:text-sm  p-1 focus:outline-none border-b-2 border-sky-400" />
                <div v-if="theError.image" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                  {{ theError.image[0] }}
                </div>
              </div>
                <div class="flex gap-2 justify-center text-xs lg:text-base md:text-base">
                <button  v-if="typeText == 'create'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Tambah</button>
                <button  v-if="typeText == 'set'" class="bg-sky-500 p-2  mt-2 mb-2 text-white rounded-md" >Ubah</button>
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
      major_id:'',
      nis:'',
      name:'',
      age:'',
      date_of_birth:'',
      kelas:'',
      gender:'',
      no_phone:'',
      parents_name:'',
      address:'',
      image:'',
      oldimg:'',
      email:'',
    })

    

    const error = reactive({
      theError: [],
    });

    const store = useStore();


   



    // computed 
    const toggle = computed(() =>{
      return store.state.option.toggleStudent
    })

    const typeText = computed(() =>{
      return store.state.option.modalType
    })

   const majors = computed(() => {
      return store.state.admin.majorAll;
    });

      // computed
      
    
     // watch

        watch(typeText, async () =>{
          if(typeText.value == 'set'){
              const student = store.state.admin.student
              // console.log(student.image)
              form.major_id= student.major_id
              form.nis= student.nis
              form.name= student.name
              form.age= student.age
              form.date_of_birth= student.date
              form.kelas= student.class
              form.gender= student.gender
              form.no_phone= student.no_phone
              form.parents_name= student.parents_name
              form.address= student.address
              form.image =  student.image
              form.oldimg =  student.image
              form.email= student.email
              
              // images.value = `@/assets/img/${form.image}`
          }
        })
    
    // watch



    // fungsi

      const handle = (e) =>{
        console.log(e)
        form.image  = e.target.files[0]
     
      }

      const close = (value) =>{
      store.commit('option/studentToggle');
      reset()
      store.commit('option/setModal', value);
      }


  const post = async() =>{
        console.log(form)
        console.log(typeText.value)
      if(typeText.value == 'create'){

        try{
          
        const formData = new FormData()
        formData.append('image',form.image)
        formData.append('gender',form.gender)
        formData.append('major_id',form.major_id)
        formData.append('name',form.name)
        formData.append('nis',form.nis)
        formData.append('kelas',form.kelas)
        formData.append('address',form.address)
        formData.append('date_of_birth',form.date_of_birth)
        formData.append('no_phone',form.no_phone)
        formData.append('parents_name',form.parents_name)
        formData.append('age',form.age)
        formData.append('email',form.email)

        const response = await axios.post('/api/student/create/student',formData)
         if(response.status == '201'){
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
        const result = await axios.get('api/student/students')
        store.commit('admin/getStudents',result.data.data)
        pagination(result.data.meta, result.data.links);
        store.commit('option/studentToggle');
        reset()
        store.commit('option/setModal', 'close');
        console.log(response)
         }
          }catch(e){
            error.theError = e.response.data
            console.log(error.theError)
            }
          }
          else if(typeText.value == 'set'){
              try{

                const formData = new FormData()
                formData.append('image',form.image)
                formData.append('oldimg',form.oldimg)
                formData.append('gender',form.gender)
                formData.append('major_id',form.major_id)
                formData.append('name',form.name)
                formData.append('nis',form.nis)
                formData.append('kelas',form.kelas)
                formData.append('address',form.address)
                formData.append('date_of_birth',form.date_of_birth)
                formData.append('no_phone',form.no_phone)
                formData.append('parents_name',form.parents_name)
                formData.append('age',form.age)
                formData.append('email',form.email)


                const student = store.state.admin.student
                const response = await axios.post(`/api/student/${student.id}`, formData)
                if(response.status == '200'){
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
                    store.commit('admin/updateStudent',response.data.data)
                    store.commit('option/studentToggle');
                    reset()
                    store.commit('option/setModal', 'close');
                }
              }catch(e){
              error.theError = e.response.data
              console.log(error.theError)
              }
          }
      }


     const reset = () =>{
      form.major_id=''
      form.nis=''
      form.name=''
      form.age=''
      form.date_of_birth=''
      form.kelas=''
      form.gender=''
      form.no_phone=''
      form.parents_name=''
      form.address=''
      form.image=''
      form.email=''
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
      store.commit('admin/setPaginateStudent', data);
    };

    return { 
      toggle,
      typeText,
      ...toRefs(form),
      close,
      handle,
      majors,
      ...toRefs(error),
      post,
       };
  },
};
</script>


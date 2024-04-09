<template>
  <div>
    <Nav class="lg:hidden md:hidden block" />
     <!-- model -->
       <Modal />
      <!-- model -->

    <div class="flex flex-col items-center w-full  lg:w-1/2 md:w-1/2 md:ml-auto lg:ml-auto lg:mr-60  md:mr-44">
    <div class="shadow-md relative w-full max-h-80 bg-gradient-to-tr from-sky-700 to-sky-300 flex flex-col justify-center items-center rounded-bl-3xl rounded-br-3xl">
      <img v-if="student.image" :src="student.image" alt="" class="w-36 lg:w-40  h-36 lg:h-40 rounded-full mt-8 mb-11 shadow-lg border-2 border-white object-cover" />
      <img v-if="!student.image" src="@/assets/news1.jpg" alt="" class="w-40 h-40 rounded-full mt-8 mb-11 shadow-lg border-2 border-white object-cover" />
      <div class="w-11/12 bg-white p-5 rounded-br-3xl rounded absolute top-52 text-center shadow-md">
        <span class="text-xs font-medium uppercase">{{student.name}}</span>
      </div>
    </div>

    <div class="bg-white p-5 mt-14 w-11/12 rounded-lg shadow-md flex flex-col justify-center text-xxs  lg:text-sm md:text-sm">
      <ul>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28 "
              ><p>Email</p>
              <p class="mr-1">:</p></span
            >
            <p class="w-3/5   break-all text-right font-medium  ">{{student.email}}</p>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Nis</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 break-all text-right font-medium">{{ student.nis }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Jurusan</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 break-all text-right font-medium">{{ student.major_name }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Umur</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 break-all text-right font-medium">{{ student.age }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Tanggal Lahir</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 break-all text-right font-medium">{{ student.date }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Kelas</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 break-all text-right font-medium">{{ student.class }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Jenis kelamin</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 text-right font-medium">{{ student.gender }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>No Hp</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 text-right font-medium">{{ student.no_phone }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Nama Wali</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 text-right font-medium">{{ student.parents_name }}</span>
          </li>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28"
              ><p>Alamat</p>
              <p class="mr-1">:</p></span
            >
            <span class="w-3/5 text-right font-medium break-all">{{ student.address }}</span>
          </li>
        </ul>
        <div class="w-full text-center mb-4 mt-7">
           <button @click="set(student)" class="btn-sky"><i class="ri-settings-4-fill"></i> <span class="">Setting</span></button>
        </div>
    </div>
    </div>
     <div class="bg-transparent p-5 mb-20"></div>
  </div>
</template>

<script>
import Modal from '@/components/student/modal/ModalSetting.vue';
import Nav from "@/components/student/nav/NavStudent.vue";
import { useStore } from 'vuex';
import axios from 'axios';
import { computed, onMounted } from '@vue/runtime-core';

export default {
  components:{Nav,Modal},
  setup() {
    const store = useStore()

    // get
        onMounted(() =>{
          authUser()
        })
        const authUser = async () =>{
              const user = store.state.users.user
              const response = await axios.get(`api/frontend/user/${user.id}`)
              store.commit('student/authStudent',response.data.data)
              console.log(response.data.data)
        }

        const student = computed(() => {
        return store.state.student.authStudent;
        });
    // get

    // modal
      const  set = (value)=>{
      // console.log(value)
      store.commit('student/getStudent',value);
      store.commit('student/setModal','setStudent');
      store.commit('student/studentToggle');
    }
    // modal

   

    return {
      student,
      set,
    }
  }
};
</script>


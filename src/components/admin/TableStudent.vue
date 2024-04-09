<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center text-xxs lg:text-xs md:text-xs">
      <tr class="bg-stone-800 text-white w-full">
        <th class="p-3"><i class="ri-pushpin-fill"></i></th>
        <th class="p-3"><span class="md:px-0 px-11">Nama</span></th>
        <th class="p-3">Kelas</th>
        <th class="p-3"><span class="md:px-0 px-20">Jurusan</span></th>
        <th class="p-3">Options</th>
      </tr>
      <!-- thebody -->
      <tr class="odd:bg-slate-200 bg-white" v-for="(item, index) in student" :key="index">
        <td class="p-3 font-medium">{{ index + 1 }}</td>
        <td class="p-3  font-medium "><router-link :to="`/home/about/${item.id}`" class="hover:text-sky-500 active:text-sky-600">{{ item.name }}</router-link></td>
        <td class="p-3 font-medium">{{ item.class }}</td>
        <td class="p-3 font-medium">{{ item.major_name }}</td>
        <td class="flex justify-center p-3 gap-1 text-white font-medium">
          <button @click="toggleSet(item)" class="bg-teal-500 px-3 py-1 lg:py-2 md:py-2 rounded shadow-md active:bg-teal-600 hover:bg-teal-400"><i class="ri-settings-4-fill"></i></button>
          <button  @click="drop(item)" class="bg-rose-500 px-3 py-1 lg:py-2 md:py-2 rounded shadow-md active:bg-rose-600 hover:bg-rose-400"><i class="ri-delete-bin-7-fill"></i></button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  setup() {
    const store = useStore();
    const student = computed(() => {
      return store.state.admin.students;
    });

    const  toggleSet = (value)=>{
      // console.log(value)
      // let token = sessionStorage.getItem('token')
      let token = sessionStorage.setItem('token')
      store.commit('admin/getStudent',value);
      store.commit('option/setModal','set');
      store.commit('option/studentToggle');
    }

    const drop = (value) => {
    // let tanya = confirm('Apakah anda yakin?');

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
        const res = await axios.post(`api/student/delete/${value.id}`)
        // console.log(result.data.data) 
    if(res.status == 200){
        alert('berhasil')
        const response = await axios.get('api/student/students')
        store.commit('admin/getStudents',response.data.data)
        pagination(response.data.meta, response.data.links);
        }
      }
    })



    // if (tanya) {
    //   const result = await axios.post(`api/student/delete/${value.id}`)
    //   console.log(result.data.data) 
    //   const response = await axios.get('api/student/students')
    //   store.commit('admin/getStudents',response.data.data)
    //   pagination(response.data.meta, response.data.links);
    //   }
    };

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
      student,
      toggleSet,
      drop
    };
  },
};
</script>
<style>
.text-mini{
  font-size:15px;
}
</style>
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
        <td class="p-3 font-medium">{{ item.name }}</td>
        <td class="p-3 font-medium">{{ item.class }}</td>
        <td class="p-3 font-medium">{{ item.major_name }}</td>
        <td class="flex justify-center p-3 gap-1 text-white">
          <router-link :to="`/admin/show/order/${item.id}`" class="bg-teal-500 px-3 py-1 lg:py-2 md:py-2 rounded shadow-md active:bg-teal-600 hover:bg-teal-400"><i class="ri-file-list-fill"></i></router-link>
         
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
  setup() {
    const store = useStore();
    const student = computed(() => {
      return store.state.admin.students;
    });
     
    return {
      student,
    };
  },
};
</script>

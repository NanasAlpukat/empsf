<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center text-xxs lg:text-xs md:text-xs">
      <tr class="bg-stone-800 text-white ">
        <th class="p-3 "><i class="ri-pushpin-fill"></i></th>
        <th class="p-3"><span class="md:px-0 px-10">Tagihan</span></th>
        <th class="p-3"><span class="md:px-0 px-6">Status</span></th>
        <th class="p-3">Price</th>
        <th class="p-3"><span class="md:px-0 px-6">Tanggal</span></th>
        <th class="p-3">Options</th>
      </tr>
      <!-- thebody -->
      <tr class="odd:bg-slate-200 bg-white " v-for="(item,index) in orders" :key="index ">
        <td class="p-3 font-medium">{{ index+1  }}</td>
        <td class="p-3 font-medium">{{item.bill_name}}</td>
        <td class="p-3 font-medium">{{item.status}}</td>
        <td class="p-3 font-medium">IDR.{{item.price}}</td>
        <td class="p-3 font-medium">{{item.expired_date}}</td>
        <td class="flex justify-center p-3 lg:p-4 md:p-4 gap-1 text-white">
          <button @click="set(item)" class="bg-teal-500 px-3 py-1 lg:py-2 md:py-2 rounded shadow-md active:bg-teal-600 hover:bg-teal-400"><i class="ri-settings-4-fill"></i></button>
          <button @click="drop(item)" class="bg-rose-500 px-3 py-1 lg:py-2 md:py-2 rounded shadow-md active:bg-rose-600 hover:bg-rose-400"><i class="ri-delete-bin-7-fill"></i></button>
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
    const orders = computed(() => {
      return store.state.admin.orders;
    });

    

    // function set 
     const set = (value) =>{
      store.commit('admin/getOrder',value);
      store.commit('option/setModal','setOrder');
      store.commit('option/orderToggle');
     }

     const drop = async (value) => {
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
       await store.dispatch('admin/dropOrder', value);
        const response = await axios.get( `/api/order/${value.student_id}`);
         store.commit('admin/getOrders', response.data.data);
          pagination(response.data.meta, response.data.links);
      }
    })


      
      };
    // function set 

        const pagination = (meta, links) => {
        let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
        };
        store.commit('admin/setPaginateOrder', data);
      };


     

    return {orders, set, drop }
  }
};
</script>
<style>
.text-mini{
  font-size:15px;
}
</style>
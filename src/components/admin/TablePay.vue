<template>
  <div class="overflow-auto">
    <table class="w-full text-center tx ">
      <tr class="bg-stone-800 text-white w-full">
        <th class="p-3"><i class="ri-pushpin-fill"></i></th>
        <th class="p-3">Nama </th>
        <th class="p-3">Email </th>
        <th class="p-3">Transaction Id </th>
        <th class="p-3">Order Id </th>
        <th class="p-3">Transaction Status </th>
        <th class="p-3">Gross Amount </th>
        <th class="p-3">Payment Type </th>
        <th class="p-3">No VA </th>
      </tr>
      <!-- thebody -->
      <tr class="odd:bg-slate-200  bg-white" v-for="(item,index) in payments" :key="index">
        <td class="p-3">{{index+1}}</td>
        <td class="p-3">{{item.name}}</td>
        <td class="p-3">{{item.email}}</td>
        <td class="p-3">{{item.transaction_id}}</td>
        <td class="p-3">{{item.order_id}}</td>
        <td class="p-3">{{item.transaction_status}}</td>
        <td class="p-3">{{item.gross_amount}}</td>
        <td class="p-3">{{item.payment_type}}</td>
        <td class="p-3">8888 88888</td>
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
    const payments = computed(() => {
      return store.state.admin.payments;
    });

    return {payments}
  }
};
</script>
<style>
    .tx{
        font-size: 10px;
        line-height: 13px;
    }
</style>
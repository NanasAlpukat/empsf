<template>
  <div>
    <div v-if="toggle" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="relative lg:w-2/6 md:w-1/2 w-11/12 max-h-96 bg-slate-100 p-2 rounded-md shadow -mt-44">
        <div class="bg-slate-100 px-8 lg:px-11 py-2 max-h-80 overflow-y-auto">
          <div class="text-center mb-5">
            <span class="text-sm lg:text-base md:text-base font-medium">Pilih Pembayaran</span>
          </div>

          <form action="#" method="post" @submit.prevent="post">
            <div :class="lihat ? 'h-full' : 'h-12'" class="bg-white w-full rounded-md shadow-md p-3 overflow-y-hidden">
              <ul>
                <li class="flex justify-between">
                  <div class="flex flex-col">
                    <label for="" class="text-xs">Total Tagihan</label>
                    <span class="font-medium text-xxs">IDR.{{ detail.price }}</span>
                  </div>
                  <div class="flex items-center mr-2">
                    <a @click="see" class="text-xxs">Detail</a>
                  </div>
                </li>
                <li class="flex flex-col mt-2">
                  <label for="" class="text-xs">Nama</label>
                  <span class="font-medium text-xxs">{{ detail.name }}</span>
                </li>
                <li class="flex flex-col mt-2">
                  <label for="" class="text-xs">Tagihan</label>
                  <span class="font-medium text-xxs">{{ detail.bill_name }}</span>
                </li>
              </ul>
            </div>

            <div class="text-xs bg-white w-full rounded-md shadow-md p-3 mt-3 overflow-y-hidden">
              <div>
                <ul>
                  <li class="flex">
                    <div class="flex flex-col">
                      <span class="font-medium">Bank Transfer</span>
                    </div>
                  </li>
                  <li class="flex flex-col gap-2 mt-3 uppercase">
                    <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/bca.png" class="w-5 h-5 rounded-full" />
                        <label for="bca" class="text-xxs mx-2">Bank Central Asia</label>
                      </div>
                      <input type="radio" class="active:bg-emerald-500 text-xxs" id="bca" v-model="bank" value="bca" />
                    </div>

                    <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/bni.png" class="w-5 h-5 rounded-full" />
                        <label for="bni" class="text-xxs mx-2">Bank Negara Indonesia</label>
                      </div>
                      <input type="radio" class="active:outline-emerald-500" id="bni" v-model="bank" value="bni" />
                    </div>

                    <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/bri.png" class="w-5 h-5 rounded-full" />
                        <label for="bri" class="text-xxs mx-2">Bank Rakyat Indonesia</label>
                      </div>
                      <input type="radio" class="active:outline-emerald-500" id="bri" v-model="bank" value="bri" />
                    </div>

                    <!-- <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/mandiri.png" class="w-5 h-5 rounded-full" />
                        <label for="bri" class="text-xxs mx-2">BANk MANDIRI</label>
                      </div>
                      <input type="radio" class="active:outline-emerald-500" id="bri" v-model="bank_code" value="MANDIRI" />
                    </div> -->

                    <!-- <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/permata.png" class="w-5 h-5 rounded-full" />
                        <label for="bri" class="text-xxs mx-2">BANK PERMATA</label>
                      </div>
                      <input type="radio" class="active:outline-emerald-500" id="bri" v-model="bank_code" value="PERMATA" />
                    </div> -->

                    <!-- <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img src="@/assets/bsi.png" class="w-5 h-5 rounded-full" />
                        <label for="bri" class="text-xxs mx-2">Bank Syariah Indonesia</label>
                      </div>
                      <input type="radio" class="active:outline-emerald-500" id="bri" v-model="bank_code" value="BSI" />
                    </div> -->
                  </li>
                </ul>
              </div>
              <div></div>
            </div>

            <div class="flex gap-2 justify-center mt-5 text-xs lg:text-sm">
              <button class="bg-sky-500 p-2 mt-2 mb-2 text-white rounded-md">Bayar</button>

              <button @click="close('closePay')" class="bg-fuchsia-500 p-2 mt-2 mb-2 text-white rounded">Kembali</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="toggle" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
  </div>
</template>
<script>
import { computed, reactive, ref, toRefs, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      bank: '',
      price: '',
      id: '',
      student_id: '',
      name: '',
      bill_name: '',
    });

    const mid = reactive({
        id:'',
        transaction_id:'',
        order_id:'',
        transaction_status:'',
        transaction_time:'',
        fraud_status:'',
        payment_type:'',
        bank:'',
        va:''
    });

    const lihat = ref(false);
    const sea = reactive({
      va: false,
    });
    // computed
    const toggle = computed(() => {
      return store.state.student.payToggle;
    });
    const detail = computed(() => {
      return store.state.student.detailPay;
    });

    const typeText = computed(() => {
      return store.state.student.modalType;
    });
    // computed

    watch(typeText, () => {
      if (typeText.value == 'payment') {
        // console.log(store.state.student.detailPay)
        const order = store.state.student.detailPay;
        data.price = order.price;
        data.id = order.id;
        data.student_id = order.student_id;
        data.name = order.name;
        data.bill_name = order.bill_name;
      }
    });

    const close = (value) => {
      store.commit('student/payToggle');
      store.commit('student/setModal', value);
      lihat.value = false;
      sea.va = false;
    };

    // utility
    const see = () => {
      lihat.value = !lihat.value;
    };

    const bank = () => {
      sea.va = !sea.va;
    };

    // utility

    const post = async () => {
      const result = await axios.post('api/frontend/payment',data);
      midtrans(result.data.data)
      console.log(mid)

      const response = await axios.post('api/frontend/pesan-midtrans',mid)

      console.log(response);
      if (response.status == 201) {
        store.commit('student/setPending', response.data.data);
        const res = await axios.get(`/api/order/${data.student_id}`);
        store.commit('student/getOrders', res.data.data);
        Swal.fire({
          icon: 'success',
          text: response.data.message,
          confirmButtonText: 'Berhasil',
          confirmButtonColor: '#3085d6',
          customClass: {
            icon: 'text-xs',
          },
        });
        store.commit('student/payToggle');
        store.commit('student/setModal', 'closePay');
        router.replace({ name: 'payment-pembayaran' });
        lihat.value = false;
        sea.va = false;
      }

      if (response.status == 202) {
        Swal.fire({
          icon: 'error',
          text: response.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Gagal',
          customClass: {
            icon: 'text-xs',
          },
        });
      }
    };

    const midtrans = (item) =>{
        mid.id = data.id
        mid.transaction_id = item.transaction_id
        mid.order_id = item.order_id
        mid.transaction_status = item.transaction_status
        mid.transaction_time = item.transaction_time
        mid.fraud_status = item.fraud_status
        mid.payment_type = item.payment_type
        mid.bank = item.va_numbers[0].bank
        mid.va = item.va_numbers[0].va_number

    }

    return { toggle, typeText, close, see, lihat, ...toRefs(sea), bank, ...toRefs(data), detail, post };
  },
};
</script>

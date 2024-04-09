<template>
  <div>
    <Nav class="lg:hidden md:hidden block"/>
    <i @click.prevent="back" class="-mt-90 lg:block md:block hidden ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28  text-sky-600 font-medium text-lg hover:text-2xl  hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i>
    <!-- model -->
    <!-- <Modal/> -->
    <!-- model -->
    <div class="flex flex-col items-center w-full lg:w-1/2 md:w-1/2 md:ml-auto lg:ml-auto lg:mr-60  md:mr-44">
      <div class="shadow-md relative w-full max-h-80 bg-gradient-to-tr from-sky-700 to-sky-300 flex flex-col justify-center items-center rounded-bl-3xl rounded-br-3xl">
      <img v-if="student.image" :src="student.image" alt="" class="w-36 lg:w-40 h-36 lg:h-40 rounded-full mt-8 mb-11 shadow-lg border-2 border-white object-cover" />
      <img v-if="!student.image" src="@/assets/news1.jpg" alt="" class="w-40 h-40 rounded-full mt-8 mb-11 shadow-lg border-2 border-white object-cover" />
      <div class="w-11/12 bg-white p-5  rounded-md absolute top-52 text-center shadow-md">
        <span class="text-xs font-medium uppercase">{{student.name}}</span>
      </div>
    </div>

   <div class="bg-white p-5 mt-14 w-11/12 rounded-lg shadow-md flex flex-col justify-center text-xxs lg:text-xs md:text-xs">
      <ul>
          <li class="flex justify-between mb-2">
            <span class="flex justify-between w-28 "
              ><p>Email</p>
              <p class="mr-1">:</p></span
            >
            <p class="w-3/5   break-all text-right font-medium">{{student.email}}</p>
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
    </div>

      <div class="flex justify-start mt-3 w-full md:px-10 px-5 ">
        <div class="gap-1 grid grid-flow-col">
          <button @click="toggleCreate('order')" class="bg-sky-500 hover:bg-sky-300 active:bg-sky-600 uppercase text-white px-1 rounded text-xxs lg:text-xs md:text-xs">
            <i class="ri-add-circle-fill"></i>
          </button>
          <a  :href="url" class=" bg-green-500 hover:bg-green-300 active:bg-green-600  text-white px-1 rounded flex items-center text-xxs lg:text-xs md:text-xs"><span>Excel</span></a>
          <!-- model -->
          <Modal />
          <!-- model -->

          <button @click="dropdownPrice" class="relative flex justify-center items-center bg-orange-500 active:bg-orange-600 text-white rounded text-xs">
            <p class="px-1 text-xxs">Tagihan</p>
            <span class="border-l p-1 hover:bg-orange-300 rounded text-xxs"><i class="ri-arrow-down-circle-fill"></i></span>
            <div v-if="togglePrice" class="rounded absolute top-full min-w-full w-max h-12 bg-white shadow-md mt-1 text-black overflow-y-auto">
              <ul class="text-left border rounded">
                <li @click="filterPrice(' ')" class="text-xxs px-2 py-1 border-b active:bg-orange-400 active:text-white">
                  {{ "-" }}
                </li>
              </ul>
              <ul class="text-left border rounded" v-for="(item, index) in orderAll" :key="index">
                <li @click="filterPrice(item.bill_id)" class="text-xxs px-2 py-1 border-b active:bg-orange-400 active:text-white">
                  {{ item.bill_name }}
                </li>
              </ul>
            </div>
          </button>
          <!-- <button @click="dropdownDate" class="relative flex justify-center items-center bg-rose-500 active:bg-emerald-600 text-white rounded text-xs">
            <p class="px-1 text-xxs">Expired Date</p>
            <span class="border-l p-1 hover:bg-emerald-300 rounded text-xxs"><i class="ri-arrow-down-circle-fill"></i></span>
            <div v-if="toggleDate" class="rounded absolute top-full min-w-full w-max bg-white shadow-md mt-1 text-black h-12 overflow-y-auto">
              <ul class="text-left border rounded" v-for="(item, index) in orderAll" :key="index">
                <li @click="filterDate(item.expired_date)" class="text-xxs px-2 py-1 border-b active:bg-emerald-400 active:text-white">
                  {{ item.expired_date }}
                </li>
              </ul>
            </div>
          </button> -->
        </div>
      </div>

      <div class="bg-white p-1 w-11/12 mt-2">
        <!--  table -->
        <TableOrder />
        <!--  table -->
        <ul class="grid grid-flow-col gap-1 w-2/5 h mt-4 text-sky-500 text-center text-xxs ml-4">
          <li :class="[{ hidden: !paginate.prev }]" class="text-slate-800 p-1 font-semibold">
            <a @click.prevent="getOrder(paginate.prev)" href="#"> Prev </a>
          </li>
          <li class="bg-slate-800 p-1 rounded-full text-white font-semibold">
            <a href="#">Page {{ paginate.current_page }} of {{ paginate.last_page }}</a>
          </li>

          <li :class="[{ hidden: !paginate.next }]" class="text-slate-800 p-1 font-semibold">
            <a @click.prevent="getOrder(paginate.next)" href="#">Next</a>
          </li>
        </ul>
      </div>
      <div class="bg-transparent p-5 mb-20"></div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/admin/modal/ModalOrder.vue';
import axios from 'axios';
import { useRoute ,useRouter} from 'vue-router';
import Nav from '@/components/admin/navigasi/NavAdmin3.vue';
import TableOrder from '@/components/admin/table/TableOrder.vue';
import { reactive, ref} from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  components: { Nav, TableOrder, Modal },
  setup() {
    const router = useRoute();
    const store = useStore();
    const id = router.params.id;
    const url = ref('http://localhost:8000/api/order/export/excel-order')

    const data = reactive({
      orders: {},
    });

    // toggle

    const dropdownPrice = () => {
      store.commit('option/setTogglePrice');
      // console.log(store.state.option.dropdownClass)
    };
    const dropdownDate = () => {
      store.commit('option/setToggleDate');
      // console.log(store.state.option.dropdownClass)
    };

    // toggle
    const togglePrice = computed(() => {
      return store.state.option.dropdownPrice;
    });
    const toggleDate = computed(() => {
      return store.state.option.dropdownDate;
    });
    const orderAll = computed(() => {
      return store.state.admin.ordersAll;
    });
    // toggle

    // toggle

    // get siswa

    onMounted(() => {
      getStudent();
      getOrder();
      getOrders();
    });

    const getStudent = async () => {
      let response = await axios.get(`/api/student/${id}`);
      store.commit('student/authStudent',response.data.data)
      
    };

    const student = computed(() => {
        return store.state.student.authStudent;
        });



    const getOrders = async () => {
      let response = await axios.get(`/api/order/${id}/all`);
      data.orders = response.data.data;
      store.commit('admin/getAllOrder', response.data.data);
    };

    // get siswa

    // getOrder
    const getOrder = async (page_url) => {
      let url = page_url || `/api/order/${id}`;
      const response = await axios.get(url);
      // console.log(response)
      store.commit('admin/getOrders', response.data.data);
      pagination(response.data.meta, response.data.links);
    };

    // getOrder

    // paginate
    const pagination = (meta, links) => {
      let data = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next: links.next,
        prev: links.prev,
      };
      store.commit('admin/setPaginateOrder', data);
    };

    const paginate = computed(() => {
      return store.state.admin.paginateOrder;
    });
    // paginate

    // modal
    const toggleCreate = (value) => {
      store.commit('admin/getIdStudent', student.value);
      store.commit('option/setModal', value);
      store.commit('option/orderToggle');
    };

    // modal

    // filter
    const filterPrice = async (value) => {
      let response = await axios.get(`/api/order/${id}?price=${value}`);
      store.commit('admin/getOrders', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
    const filterDate = async (value) => {
      let response = await axios.get(`/api/order/${id}?date=${value}`);
      store.commit('admin/getOrders', response.data.data);
      pagination(response.data.meta, response.data.links);
    };
    // filter

  const route = useRouter()
         const back = () =>{
             route.replace({name:'admin'})
         }

    return {
      student,
      paginate,
      toggleCreate,
      dropdownPrice,
      dropdownDate,
      togglePrice,
      toggleDate,
      orderAll,
      filterPrice,
      filterDate,
      getOrder,
      back,
      url
    };
  },
};
</script>

<style scoped>
.-mt-90{
  margin-top: 31px ;
}
</style>

<template>
  <div class="flex justify-center ">
     <!-- model -->
            <Modal/>
            <!-- model -->
    <div id="img">
    <div class="w-full h-screen  bg-sky-600  rounded-br-full lg:hidden md:hidden sm:rounded-none " id="opc">
    </div>
 <form action="#" method="post" @submit.prevent="login" class="absolute lg:top-10 md:top-0 lg:left-12 md:left-14 top-0 left-0 w-full">
      <div class="">
        <div class="flex items-center justify-center h-screen  ">
          <div class="w-full lg:bg-sky-600 md:bg-sky-600 bg-transparent  max-w-md md:max-w-lg items-center px-12 py-9 rounded-md lg:shadow-lg">
            <div class="flex flex-col justify-center items-center mb-14">
              <img src="@/assets/arm.png" alt="" class="w-16 h-16 mb-2 -mt-14">
              <h1 class="uppercase lg:text-sm md:text-sm text-xxs text-white text-center font-medium mb-3">Selamat Datang di SMK Armaniyyah Mobile Payment</h1>
              <div class="h-0.5 bg-white w-full shadow-md"></div>
            </div>

            <div class="mb-5 text-white">
              <label for="email" class="block text-xs font-medium lg:text-sm md:text-sm  mb-2 text-white ">Email</label>
              <input v-model="email"  type="text" class="w-full text-xs  lg:text-sm md:text-sm p-1 focus:outline-none border-b-2  bg-transparent " />
              <div v-if="theError.email" class="mt-2 text-red-500 text-xxs lg:text-sm md:text-xs">
                {{ theError.email[0] }}
              </div>
            </div>
            <div class="mb-5 text-white">
              <label for="password" class="block text-xs font-medium lg:text-sm md:text-sm  mb-2 text-white ">Password</label>
              <input v-model="password"  type="password" class="w-full text-xs lg:text-sm md:text-sm p-1 focus:outline-none border-b-2  bg-transparent "/>
              <div v-if="theError.password" class="mt-2 text-red-500  text-xxs lg:text-sm md:text-xs">
                {{theError.password[0] }}
              </div>
            </div>
           
            <div class="flex flex-col justify-center mt-16 ">
              <button type="submit" class="rounded-md shadow-lg uppercase bg-white hover:bg-slate-100 active:bg-black active:text-white w-full h-10 text-black  text-xs lg:text-sm font-medium">login</button>
              <button @click.prevent="modal"  class="text-white mt-2 text-xs lg:text-sm lg:text-center text-left">Lupa Password?</button>            
            </div>
            
          
          </div>
        </div>
      </div>
    <!-- <div class="bg-transparent p-5  mb-20"></div> -->
    </form>
    </div>
    
  </div>
</template>


<script>
import Modal from '@/components/student/modal/ModalPassword.vue';
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components:{
    Modal
  },
  setup() {
    const store = useStore();
    console.log(store)
    const router = useRouter();
    const form = reactive({
      email: '',
      password: '',
    });
    const error = reactive({
      theError: [],
    });
    

    const login = async() => {
      try{
        const response = await store.dispatch('users/login',form)
        console.log(response)
        
        router.replace({name:'home'})
    }catch(e){
        error.theError = e.response.data
        console.log(error.theError)
    }
    };

    const modal = () =>{
      store.commit('users/togglePass')
    }
    

    return {login, ...toRefs(form),...toRefs(error),modal}
  },
};
</script>
<style>
#img{
  background:url('../../assets/arm.png');
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: 50% 20%;
  background-size: contain;
}
#opc{
  opacity: 0.98;
  /* color: #0ea5e9; */
}
</style>

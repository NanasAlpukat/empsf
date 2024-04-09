<template>
  <div>
    <div class="l_nav hidden lg:block md:block w-1/6 bg-gradient-to-tr from-sky-700 to-sky-500 ">
      <nav class="nav">
        <div class="grid justify-center mb-5">
          <div class="mr-6">
            <img src="@/assets/arm.png" alt="" class="w-12 h-12" />
          </div>
          <!-- <i class="ri-arrow-left-circle-fill fixed  lg:left-64 md:left-44 sm:left-28 mt-4 text-sky-600 font-medium text-lg hover:text-2xl hover:mt-2 hover:text-sky-300 active:text-sky-700  text-shadow duration-500"></i> -->
        </div>
        <div class="nav_list ">
          <div v-if="user && user.role == 'admin'" class="nav_link ">
            <div class="flex items-center gap-4 mb-2 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500">
             <i class="ri-home-5-fill nav_icon"></i>
              <router-link to="/home" class="font-medium ">Home</router-link>
            </div>
            <div class="lg:block md:hidden">
                <ul>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/home/admin">Table Siswa</router-link></li>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/home/bill">Table Tagihan</router-link></li>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/home/major">Table Jurusan</router-link></li>
                  <li class="w-full ml-10 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/home/menu-info">Menu Berita</router-link></li>
                </ul>
            </div>
          </div>
          <div class="nav_link collapse">
            <div class="flex items-center gap-4 mb-2 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500">
             <i class="ri-rss-fill nav_icon"></i>
              <router-link exact-active-class="indicator" to="/" class="font-medium ">Berita</router-link>
            </div>
            <div class="lg:block md:hidden">
                <ul>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/kegiatan" >Kegiatan</router-link></li>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/pengumuman">Pengumuman</router-link></li>
                </ul>
            </div>
          </div>
          <div v-if="user && user.role == 'student'" class="nav_link collapse">
            <div class="flex items-center gap-4 mb-2 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500">
             <i class="ri-user-3-fill"></i>
              <router-link to="/home" class="font-medium  ">Profile</router-link>
            </div>
          </div>
          <div v-if="user && user.role == 'student'" class="nav_link collapse">
            <div class="flex items-center gap-4 mb-2 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500">
             <i class="ri-money-dollar-box-fill nav_icon"></i>
              <router-link to="/pay" class="font-medium ">Bayar</router-link>
            </div>
          </div>
          <div v-if="user && user.role == 'admin'" class="nav_link collapse">
            <div class="flex items-center gap-4 mb-2 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500">
             <i class="ri-money-dollar-box-fill nav_icon"></i>
              <router-link to="/pay" class="font-medium ">Bayar</router-link>
            </div>
            <div class="lg:block md:hidden">
                <ul>
                  <li class="w-full ml-10 mb-3  hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/pay/transaction">Pembayaran</router-link></li>
                  <li class="w-full ml-10 mb-3 hover:text-sky-300 active:text-sky-700 hover:text-base hover:mt-2 duration-500 text-sm"><router-link to="/pay/history">History</router-link></li>
                </ul>
            </div>
          </div>
        </div>
        
        <a v-if="user" @click.prevent="logout" class="nav_link md:font-medium flex items-center justify-center hover:text-sky-300 active:text-sky-700 hover:text-base  duration-500 text-sm ">
          <!-- <img src="@/assets/arm.png" alt="" class="w-6 h-6 mb-1 rounded-full" /> -->
          <i class="ri-arrow-left-circle-fill"></i>
          <span class="-ml-2 mr-4">Logout</span>
        </a>
        <router-link to="/login"   v-if="!user" class="nav_link md:font-medium flex items-center justify-center hover:text-sky-300 active:text-sky-700 hover:text-base  duration-500 text-sm ">
          <!-- <img src="@/assets/arm.png" alt="" class="w-6 h-6 mb-1 rounded-full" /> -->
          <i class="ri-arrow-right-circle-fill"></i>
          <span class="-ml-2 mr-4">Login</span>
        </router-link>
      </nav>
    </div>
    <router-view></router-view>

    <nav class="bg-sky-600 fixed bottom-0 left-0 right-0 lg:w-4/6 w-full h-20 shadow-md m-auto px-6 py-2 lg:hidden md:hidden">
      <ul class="text-white flex justify-evenly gap-x-8">
        <li v-if="!user" class="relative w-16 h-16 z-10">
          <router-link to="/login" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md"><i class="ri-arrow-right-circle-fill"></i></span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Login</span>
          </router-link>
        </li>
        <li v-if="user" class="relative w-16 h-16 z-10">
          <a @click.prevent="logout" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md"><i class="ri-arrow-left-circle-fill"></i></span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Logout</span>
          </a>
        </li>

        <li class="relative w-16 h-16 z-10">
          <router-link exact-active-class="indicator" to="/" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md">
              <i class="ri-rss-fill"></i>
            </span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Berita</span>
          </router-link>
        </li>

        <li v-if="user && user.role == 'admin'" class="relative w-16 h-16 z-10">
          <router-link to="/home" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md"><i class="ri-home-5-fill"></i></span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Rumah</span>
          </router-link>
        </li>
        <li v-if="user && user.role == 'student'" class="relative w-16 h-16 z-10">
          <router-link to="/home" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md"><i class="ri-user-3-fill"></i></span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Profil</span>
          </router-link>
        </li>

        <li class="relative w-16 h-16 z-10">
          <router-link to="/pay" class="relative flex justify-center items-center flex-col w-full text-center font-medium duration-500">
            <span class="relative block text-md"><i class="ri-money-dollar-box-fill"></i></span>
            <span class="absolute text-xxs translate-y-9 duration-300 tracking-wider">Bayar</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = async () => {
      await store.dispatch('users/logout');
      router.replace('/login');
    };
    const user = computed(() => {
      return store.state.users.user;
    });

    return {
      logout,
      user,
    };
  },
};
</script>

<style>
.text-shadow {
  text-shadow: 0 4px 6px -1px rgb(0 0 0 50);
}

.aktive {
  background-color: white;
  color: dodgerblue;
}




@media screen and (max-width: 700px) {
  
  .indicator {
    position: absolute;
  width: 52px;
  height: 52px;
  background-color: rgb(56 189 248);
  border-radius: 50%;
  border: 3px solid rgb(245, 251, 251);
  transform: translateY(-36px);
}
}

@media screen and (min-width: 750px) {
  .indicator{
    color: rgb(125 211 252);
    font-size: 1rem;
    line-height: 1.5rem;
    /* margin-top: 8px; */
  }
}

.l_nav {
  padding: 1.5rem 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  /* background-color: rgb(2 132 199); */
  color: white;
  z-index: 40;
}

.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  overflow: hidden;
}
.nav_brand {
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.nav_toggle {
  font-size: 1.25rem;
  padding: 0.75rem;
  cursor: pointer;
}

.nav_link {
  /* display: grid; */
  /* grid-template-columns: max-content max-content; */
  align-items: center;
  column-gap: 0.75rem;
  padding: 0.75rem;
  /* color: white;
   */
   background-color: white;
  color: rgb(2 132 199);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

/* .nav_link:hover {
  background-color: white;
  color: rgb(2 132 199);
} */

.nav_icon {
  font-size: 1.25rem;
}
.nav_name {
  font-size: 1rem;
}

.collapse {
  grid-template-columns: 20px max-content 1fr;
}

.collapse_link {
  justify-self: flex-end;
  transition: 0.5s;
}
.collapse_menu {
  /* display: none; */
  padding: 0.75rem 2.25rem;
}
.collapse.sublink {
  font-size: small;
  color: white;
}
.collapse.sublink:hover {
  color: dodgerblue;
}



</style>

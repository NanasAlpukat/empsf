<template>
  <div>
      <Admin v-if="user.role == 'admin'"/>
      <Student v-if="user.role == 'student'"/>
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import { computed } from 'vue';
import Admin from "@/components/admin/view/PaymentView.vue";
import Student from "@/components/student/view/PayStudent.vue";
export default {
    components: {
    Admin,Student
  },
  setup() {
    const store = useStore();
    // const router = useRouter();
    const user = computed(() =>{
        return store.state.users.user
    })
    return {

        user,
         
    }
  }
};
</script>

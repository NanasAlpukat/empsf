import { createStore } from 'vuex'
import users from './modules/users'
import option from './modules/option'
import admin from './modules/admin'
import student from './modules/student'
import info from './modules/info'
export const store = createStore({
  modules:{
      users,
      option,
      admin,
      student,
      info,
  }
})
export default store
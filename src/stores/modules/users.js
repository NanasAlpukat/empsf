import axios from 'axios'
import { setHeaderToken } from '../../auth'
import Swal from 'sweetalert2'
import { removeHeaderToken } from '../../auth'
export default {
    namespaced:true,
    state(){
        return{
            authUser : false,
            user: null,
            toggle:false,
            password:''
        }
    },
    mutations:{
        setAuth(state,value){
            state.authUser = value
            // console.log(state.authUser)
        },
        setUser(state,value){
            state.user = value
            // console.log(state.user)
        },
        setPass(state,value){
            state.password = value
            // console.log(state.user)
        },
        togglePass(state){
            state.toggle = !state.toggle
        }
    },
    actions:{
        reset({commit},form){
            return new Promise((resolve,reject) =>{
                 axios.post('api/reset-password',form)
                .then(response =>{
                        if(response.status == 200){
                            // alert(response.data.message)
                            Swal.fire({
                                icon: 'success',
                                text: response.data.message,
                                confirmButtonText: 'Berhasil',
                                confirmButtonColor: '#3085d6',
                                customClass:{
                                  icon:'text-xs',
                                }
                            })
                            commit('setPass',response.data.message)
                            resolve(response.data.message)
                        }
                }).catch(err =>{
                    reject(err)
                })
            })
        },

        login({ dispatch, commit }, data) {
            return new Promise((resolve, reject) => { 
                 axios.post('/api/login',data)
                .then(response =>{
                    if(response.status == 200){
                        // alert(response.data.message)
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                            confirmButtonText: 'Berhasil',
                            confirmButtonColor: '#3085d6',
                            customClass:{
                              icon:'text-xs',
                            }
                        })
                        const token = response.data.token  
                        console.log(token)
                        localStorage.setItem('token',token)
                        setHeaderToken(token) 
                        dispatch('user')
                        resolve(response)
                    }
                    else if(response.status == 202){
                        // alert(response.data.message)
                        Swal.fire({
                            icon: 'error',
                            text: response.data.message,
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'Gagal',
                            customClass:{
                              icon:'text-xs',
                            }
                        })
                    }
                }).catch(err => {
                    commit('setAuth', false);
                    commit('setUser', null); 
                       localStorage.removeItem('token')
                       reject(err)
                    })
                    })
            },

            logout({ commit }) {
                return new Promise((resolve) => {
                commit('setAuth', false);
                commit('setUser', null);
                 axios.get('/api/user/logout')
                //  .then(response =>{
                    //  if(response.status == 200){
                        Swal.fire({
                            icon: 'success',
                            text: 'berhasil logout',
                            confirmButtonText: 'Berhasil',
                            confirmButtonColor: '#3085d6',
                            customClass:{
                              icon:'text-xs',
                            }
                        })
                         localStorage.removeItem('token')
                         removeHeaderToken()
                         resolve()
                        // }
                    // })
                })
               },

        async user({commit}){
            if(!localStorage.getItem('token')){
                return
              }
            try {
                let response = await axios.get('/api/user/user')
                // console.log(response)
                    if(response.status == 200){
                        commit('setAuth', true);
                        commit('setUser', response.data.data);
                    }
                
            } catch (e) {
                commit('setAuth', false);
                commit('setUser', null);
                removeHeaderToken()
                localStorage.removeItem('token')
                return e
            }
        }
    }
}
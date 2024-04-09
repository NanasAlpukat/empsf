import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    namespaced:true,
    state(){
        return{
           studentId:{},
           orders:{},
           ordersAll:{},
           majorAll:{},
           order:{},
           students:{},
           student:{},
           bills:{},
           bill:{},
           majors:{},
           major:{},
           payments:{},
           paginatePayment:{},
           paginateOrder:{},
           paginateStudent:{},
           paginateMajor:{},
           paginateBill:{},
        }
    },
    mutations:{
        getIdStudent(state,value){
            state.studentId = value
        },

        setPaginateStudent(state,value){
            state.paginateStudent = value
        },
        setPaginateBill(state,value){
            state.paginateBill = value
        },
        setPaginateOrder(state,value){
            state.paginateOrder = value
        },
        setPaginatePayment(state,value){
            state.paginatePayment = value
        },
        setPaginateMajor(state,value){
            state.paginateMajor = value
        },
        getPayments(state,value){
            state.payments = value 
        },
        getStudents(state,value){
            state.students = value 
        },
        getMajors(state,value){
            state.majors = value
        },
        getMajorAll(state,value){
            state.majorAll = value
        },
        getBills(state,value){
            state.bills = value
        },
        getOrders(state,value){
            state.orders = value
        },
        getAllOrder(state,value){
            state.ordersAll = value
        },
        getOrder(state,value){
            state.order = value
            console.log(state.order)
        },
        getStudent(state,value){
            state.student = value
        },
        getBill(state,value){
            state.bill = value
        },
        getMajor(state,value){
            state.major = value
        },
        majorCreate(state,value){
            state.majors.unshift(value)
            // state.majorAll.unshift(value)
        },
        orderCreate(state,value){
            state.orders.unshift(value)
            state.ordersAll.unshift(value)
        },
        createStudent(state,value){
            state.students.unshift(value)
        },
        billCreate(state,value){
            state.bills.unshift(value)
        },
        updateStudent(state,value){
            const index = state.students.findIndex((student) => student.id == value.id)
            state.students.splice(index, 1 , value)
        },
        setOrder(state,value){
            const index = state.orders.findIndex((order) => order.id == value.id)
            state.orders.splice(index, 1 , value)
            const index1 = state.ordersAll.findIndex((orderAll) => orderAll.id == value.id)
            state.ordersAll.splice(index1, 1 , value)
        },
        setBill(state,value){
            const index = state.bills.findIndex((bill) => bill.id == value.id)
            state.bills.splice(index, 1 , value)
        },
        setMajor(state,value){
            const index = state.majors.findIndex((major) => major.id == value.id)
            state.majors.splice(index, 1 , value)
            // const index1 = state.majorAll.findIndex((majorAll) => majorAll.id == value.id)
            // state.majorAll.splice(index1, 1 , value)
        },
        delete(state,value){
            const index = state.students.findIndex((student) => student.id !== value.id)
            state.students.splice(index, 1)
            
          },
        deleteBill(state,value){
            const index = state.bills.findIndex((bill) => bill.id !== value.id)
            state.bills.splice(index, 1)
            
          },
        deleteOrder(state,value){
            const index = state.orders.findIndex((order) => order.id !== value.id)
            state.orders.splice(index, 1)
            const index1 = state.ordersAll.findIndex((orderAll) => orderAll.id !== value.id)
            state.ordersAll.splice(index1, 1)
            
          },
        deleteMajor(state,value){
            const index = state.majors.findIndex((major) => major.id !== value.id)
            state.majors.splice(index, 1)
            // const index1 = state.majorAll.findIndex((majorAll) => majorAll.id !== value.id)
            // state.majorAll.splice(index1, 1)
            
          },
    },
    actions:{
        createStudent({commit},form){
            return new Promise((resolve, reject) =>{
                axios.post('/api/student/create/student',form)
                .then(response =>{
                    if (response.status == 201) {
                        commit('createStudent',response.data.data)
                        resolve(response.data.data)
                    }
                    }).catch(err =>{
                            reject(err)
                    })
                })
             },
        async dropStudent({commit},data){
            await axios.post(`/api/student/delete/${data.id}`)
            .then(() =>{
              commit('delete',data)
            })
            
          },
        async dropOrder({commit},data){
            await axios.post(`/api/order/delete/${data.id}`)
            .then(response =>{
                if(response.status == 200){
                    Swal.fire({
                        icon: 'success',
                        text: response.data.meassage,
                        confirmButtonText: 'Berhasil',
                        confirmButtonColor: '#3085d6',
                        customClass:{
                          icon:'text-xs',
                        }
                    })
                    commit('deleteOrder',data)
                }
            })
            
          },
        async dropBill({commit},data){
            await axios.post(`/api/bill/hapus/bill/${data.id}`)
            .then(response =>{
                if(response.status == 200){
                    // alert(response.data.meassage)
                    Swal.fire({
                        icon: 'success',
                        text: response.data.meassage,
                        confirmButtonText: 'Berhasil',
                        confirmButtonColor: '#3085d6',
                        customClass:{
                          icon:'text-xs',
                        }
                    })
                    console.log(response)
              commit('deleteBill',data)
                }if(response.status == 202){
                    console.log(response)
                    // alert(response.data.meassage)
                    Swal.fire({
                        icon: 'error',
                        text: response.data.meassage,
                        confirmButtonText: 'Gagal',
                        confirmButtonColor: '#d33',
                        customClass:{
                          icon:'text-xs',
                        }
                    })
                }
            })
            
          },
        async dropMajor({commit},data){
            await axios.post(`/api/major/delete/${data.id}`)
            .then(response =>{
            if(response.status == 200){
                // alert(response.data.meassage)
                Swal.fire({
                    icon: 'success',
                    text: response.data.meassage,
                    confirmButtonText: 'Berhasil',
                    confirmButtonColor: '#3085d6',
                    customClass:{
                      icon:'text-xs',
                    }
                })
              commit('deleteMajor',data)
            }if(response.status == 202){
                console.log(response)
                // alert(response.data.meassage)
                Swal.fire({
                    icon: 'error',
                    text: response.data.meassage,
                    confirmButtonText: 'Gagal',
                    confirmButtonColor: '#d33',
                    customClass:{
                      icon:'text-xs',
                    }
                })
            }
            })

            
          },
         async createBill({commit},form){
                 await axios.post('/api/bill/create',form)
                .then(response =>{
                    if(response.status == 201){
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
                        commit('billCreate',response.data.data)
                    }
                })
        },
         async createMajor({commit},form){
                 await axios.post('/api/major/create',form)
                .then(response =>{
                    if(response.status == 201){
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
                        commit('majorCreate',response.data.data)
                    }
                })
        },
         async createOrder({commit},form){
                 await axios.post(`/api/order/${form.student_id}`,form)
                .then(response =>{
                    if(response.status == 201){
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
                        commit('orderCreate',response.data.data)
                    }
                })
        },
        setBill({commit},form){
            return new Promise((resolve,reject) =>{
                 axios.post(`api/bill/${form.id}`,form)
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
                            commit('setBill',response.data.data)
                            resolve(response.data)
                        }
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        
        setMajor({commit},form){
            return new Promise((resolve,reject) =>{
                 axios.post(`api/major/${form.id}`,form)
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
                        commit('setMajor',response.data.data)
                        resolve(response.data)
                    }
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        setOrder({commit},form){
            return new Promise((resolve,reject) =>{
                 axios.post(`api/order/set/${form.id}`,form)
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
                        commit('setOrder',response.data.data)
                        resolve(response.data)
                    }
                }).catch(err =>{
                    reject(err)
                })
            })
        },
    }
   
}
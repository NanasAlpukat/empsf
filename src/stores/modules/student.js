
export default {
    namespaced:true,
    state(){
        return{
           authStudent:{},
           studentToggle:false,
           payToggle:false,
           modalType:'',
           student:{},
           orders:{},
           detailPay:{},
           pending:{},
           history:{},
           paginateHistory:{}
        }
    },
    mutations:{
        authStudent(state,value){
            state.authStudent = value
        },
        studentToggle(state){
            state.studentToggle = !state.studentToggle 
        },
        payToggle(state){
            state.payToggle = !state.payToggle 
        },
        setModal(state,value){
            state.modalType = value 
        },
        getStudent(state,value){
            state.student = value 
        },
        setStudent(state,value){
            state.authStudent = value
        },
        getOrders(state,value){
            state.orders = value
        },
        setPending(state,value){
            state.pending = value
        },
        getPay(state,value){
            state.detailPay = value
        },
        getPending(state,value){
            state.pending = value
        },
        getHistory(state,value){
            state.history = value
        },
        setPaginateHistory(state,value){
            state.paginateHistory = value
        }
       
    },
    
}
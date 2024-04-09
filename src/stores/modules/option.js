export default {
    namespaced:true,
    state(){
        return{
            dropdownClass:false,
            dropdownPrice:false,
            dropdownDate:false,
            dropdownMajor:false,
            toggleStudent:false,
            toggleBill:false,
            toggleMajor:false,
            toggleOrder:false,
            modalType:''
        }
    },
    mutations:{
        setToggle(state,){
            state.dropdownClass = !state.dropdownClass 
        },
        setTogglePrice(state,){
            state.dropdownPrice = !state.dropdownPrice 
        },
        setToggleDate(state,){
            state.dropdownDate = !state.dropdownDate 
        },
        updateToggle(state,){
            state.dropdownMajor = !state.dropdownMajor 
        },
        billToggle(state,){
            state.toggleBill = !state.toggleBill 
        },
        majorToggle(state,){
            state.toggleMajor = !state.toggleMajor 
        },
        studentToggle(state,){
            state.toggleStudent = !state.toggleStudent 
        },
        orderToggle(state,){
            state.toggleOrder = !state.toggleOrder 
        },
        setModal(state,value){
            state.modalType = value 
        },
    }
}
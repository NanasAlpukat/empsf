export default {
    namespaced:true,
    state(){
        return{

            paginateKegiatan : {},
            allKegiatan: {},
            kegiatan: {},
            allPengumuman: {},
            pengumuman: {},
            paginatePengumuman:{},
            modalType: {},
            toggleKegiatan: false,
            togglePengumuman: false,
        }
    },
    mutations:{
        setPaginateKegiatan(state,value){
            state.paginateKegiatan = value
        },
        setPaginatePengumuman(state,value){
            state.paginatePengumuman = value
        },
        setModal(state,value){
            state.modalType = value
        },
        setToggleKegiatan(state){
            state.toggleKegiatan = !state.toggleKegiatan 
        },
        setTogglePengumuman(state){
            state.togglePengumuman = !state.togglePengumuman 
        },
        
        getAllKegiatan(state,value){
            state.allKegiatan = value
        },
        getKegiatan(state,value){
            state.kegiatan = value
        },
        geAlltPengumuman(state,value){
            state.allPengumuman = value
        },
        getPengumuman(state,value){
            state.pengumuman = value
        },
        createKegiatan(state,value){
            state.allKegiatan.unshift(value)
        },
        createPengumuman(state,value){
            state.allPengumuman.unshift(value)
        },
        updateKegiatan(state,value){
            const index = state.allKegiatan.findIndex((allKegiatan) => allKegiatan.id == value.id)
            state.allKegiatan.splice(index, 1 , value)
        },
        updatePengumuman(state,value){
            const index = state.allPengumuman.findIndex((allPengumuman) => allPengumuman.id == value.id)
            state.allPengumuman.splice(index, 1 , value)
        },
        dropKegiatan(state,value){
            const index = state.allKegiatan.findIndex((allKegiatan) => allKegiatan.id !== value.id)
            state.allKegiatan.splice(index, 1)
        },
        dropPengumuman(state,value){
            const index = state.allPengumuman.findIndex((allPengumuman) => allPengumuman.id !== value.id)
            state.allPengumuman.splice(index, 1)
        },

    }
}
import { createRouter, createWebHistory } from 'vue-router'
import {store} from '../stores'
const routes = [
  {
    path: '/',
    name: 'nav',
    component: () => import('../views/layouts/NavView.vue'),
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/pages/HomeView.vue'),
        meta:{
          requireAuth:true,
        },
      },

      {
        path:'/home/admin',
        name:'admin',
        component: () => import('../views/admin/AdminView.vue'),
        meta:{
          requireAuth:true, 
          // authRole:true
        },
      },
      
      {
        path:'/home/menu-info',
        name:'menuinfo',
        component: () => import('../views/admin/info/MenuInfo.vue'),
        meta:{
          requireAuth:true, 
          // authRole:true
        },
      },
      {
        path:'/admin/pengumuman',
        name:'adminpengumuman',
        component: () => import('../components/admin/info/PengumumanView.vue'),
        meta:{
          requireAuth:true, 
        },
      },
      {
        path:'/pengumuman',
        name:'pengumuman',
        component: () => import('../components/Info/PengumumanView.vue'),
        meta:{
          info:true,
        },
      },
      {
        path:'/kegiatan',
        name:'kegiatan',
        component: () => import('../components/Info/KegiatanView.vue'),
        meta:{
          info:true,
        },
      },
      {
        path:'/admin/kegiatan',
        name:'adminkegiatan',
        component: () => import('../components/admin/info/KegiatanView.vue'),
        meta:{
          requireAuth:true,
        },
      },
      {
        path:'/home/bill',
        name:'admin-bill',
        component: () => import('../views/admin/BillView.vue'),
        meta:{
          requireAuth:true, 
          // authRole:true
        },
      },
      {
        path:'/home/major',
        name:'admin-major',
        component: () => import('../views/admin/MajorView.vue'),
        meta:{
          requireAuth:true, 
          // authRole:true
        },
      },
      {
        path:'/home/about/:id',
        name:'admin-about-student',
        component: () => import('../views/admin/about/StudentView.vue'),
        meta:{
          requireAuth:true, 
          // authRole:true
        },
      },
      

      {
        path: '',
        name: 'info',
        component: () => import('../views/pages/InfoView.vue'),
        meta:{
          info:true,
         
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/LoginView.vue'),
        meta:{
          authPage:true,
          
        }
      },
      {
        path: '/pay',
        name: 'payment',
        component: () => import('../views/pages/PaymentView.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/pay/transaction',
        name: 'payment-transaction',
        component: () => import('../views/admin/TransactionView.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/pay/history',
        name: 'admin-history',
        component: () => import('../views/admin/HistoryView.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/student/tagihan/:id',
        name: 'payment-tagihan',
        component: () => import('../views/student/tagihan/TagihanView.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/admin/show/order/:id',
        name: 'show-admin-order',
        component: () => import('../components/admin/view/ShowOrder.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/admin/show/history/:id',
        name: 'show-admin-history',
        component: () => import('../components/admin/view/ShowHistory.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/student/history/:id',
        name: 'payment-history',
        component: () => import('../views/student/tagihan/HistoryView.vue'),
        meta:{
          requireAuth:true,
        }
      },
      {
        path: '/student/pay/:id',
        name: 'payment-pembayaran',
        component: () => import('../views/student/tagihan/PembayaranView.vue'),
        meta:{
          requireAuth:true,
        }
      },
    ]
  },
  
]

const router = createRouter({
  linkActiveClass: 'indicator',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.meta.info){
    
    next()
  }

  if(to.meta.authRole){
    await store.dispatch('users/user');
    const user = store.state.users.user;
    console.log(user.role)
    if(user.role == "admin"){
      next()
    }else{
      next(from)
    }
  }

  if(to.meta.requireAuth){
    await store.dispatch('users/user');
    const isAuth = store.state.users.authUser;
    if(isAuth){
      next()
    }else{
      next({
        name:'login'
      })
    }
  }

  if(to.meta.authPage){
    await store.dispatch('users/user');
    const isAuth = store.state.users.authUser;
    if(!isAuth){
      next()
    }else{
      next(from)
    }
  }
 
});


export default router

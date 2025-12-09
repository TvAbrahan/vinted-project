import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UploadView from '../views/UploadView.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/producto/:id',
    name: 'product',
    component: ProductView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
   path: '/subir',
    name: 'upload',
    component: UploadView,
    // Opcional: Proteger la ruta para que solo entren logueados
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('active_session')) {
        alert("Debes iniciar sesión para publicar un artículo");
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/checkout/:id', // Ruta dinámica para saber qué producto se compra
    name: 'checkout',
    component: Checkout,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Opcional: Guard de navegación para evitar que un usuario logueado 
// entre a /login o /register de nuevo
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('active_session')
  
  if ((to.name === 'login' || to.name === 'register') && loggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})
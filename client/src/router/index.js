import { createRouter, createWebHistory } from 'vue-router'
import LoginCompte from '../views/LoginCompte.vue'
import MonGarage from '../views/MonGarage.vue' // <-- 1. N'oublie pas cet import !
import MotoCustomisation from '../views/MotoCustomisation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/customisation',
    },
    {
      path: '/customisation',
      name: 'customisation',
      component: MotoCustomisation,
    },
    // bloc pour le garage
    {
      path: '/garage',
      name: 'garage',
      component: MonGarage,
    },
    // pour login
    {
      path: '/login',
      name: 'login',
      component: LoginCompte,
    },
  ],
})

export default router

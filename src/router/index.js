import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import test from '@/views/Test.vue'
import trie from '@/views/Trie.vue'
import resultat from '@/views/Resultat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'test_page',
      component : test
    },
    {
      path:'/trie',
      name:'trie_page',
      component: trie
    },
    {
      path:'/resultat',
      name:'resultat_page',
      component: resultat
    }
  ]
})

export default router

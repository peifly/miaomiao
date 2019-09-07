import Vue from 'vue'
import Router from 'vue-router'
import movie from './Movie'
import cinema from './Cinema'
import mine from './Mine'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movie,
    cinema,
    mine,
    {
      path: '/*',
      redirect: movie
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')

  ]
})

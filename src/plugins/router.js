import Vue from 'vue';
import VueRouter from 'vue-router'
import Editor from '@/components/Editor'
import About from '@/components/About'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Editor },
    { path: '/about', component: About }
  ]

export default new VueRouter({
    routes
})
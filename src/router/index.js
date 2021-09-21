import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '../views/Student.vue'
import Teacher from '../views/Teacher.vue'
import House from '../views/House.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Student',
    component: Student
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  },
  {
    path: '/house',
    name: 'House',
    component: House
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

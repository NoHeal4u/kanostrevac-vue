import Vue from 'vue'

import Contacts from '../pages/Contacts.vue'
import AddContact from '../pages/AddContact.vue'
import Login from '../pages/Login.vue'
import VueRouter from 'vue-router'

import {
	requiresAuth,
	guestOnly
} from './guards'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/contacts' },
  { path: '/contacts', component: Contacts, name: 'contacts', meta : {requiresAuth : true} },
  { path: '/contacts/:id', component: Contacts, name: 'contact-details' },
  { path: '/add-contact', component: AddContact, name: 'add-contact', meta : {requiresAuth : true} },
  {path: '/login', component:Login, name: 'login', meta : {guestOnly : true}},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next)=>{
	// console.log('router.beforeEach',to)
	// console.log('router.beforeEach',from)
	// console.log('router.beforeEach',next)
	Promise.resolve(to)
		.then(requiresAuth)
		.then(guestOnly)
		.then(()=>{
			next()
		})
		.catch(redirect=>{
			//console.log('router.beforeEach-')
			next(redirect);
		})
})

export default router 
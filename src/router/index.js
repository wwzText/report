import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
import {
  routes
} from './routes';

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  next();
})


export default router

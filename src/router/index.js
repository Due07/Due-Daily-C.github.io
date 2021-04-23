import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Classify from '../views/Classify.vue';
import Shopping from '../views/Shopping.vue';
import versions from '../util/testing';
import Search from '../views/Search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};

Vue.use(VueRouter);

const routes = [{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: 'classify',
    name: 'Classify',
    component: Classify,
  },
  {
    path: 'shopping',
    name: 'Shopping',
    component: Shopping,
  },
  ],
}, {
  path: '/search',
  name: 'Search',
  component: Search,
}, {
  path: '*',
  redirect: 'home/classify',
}];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (versions) {
    next();
    return;
  }
  alert('请按F12转为移动界面再打开,谢谢!!');
});

export default router;

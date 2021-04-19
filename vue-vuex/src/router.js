import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './components/LoginPage'
import LoginPageDoctor from './components/LoginPageDoctor'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Registr from './components/Registr'
import RegistrClient from './components/RegistrClient'
import RegistrDoctor from './components/RegistrDoctor'
import HomePageDoctor from './components/HomePageDoctor'
import ClientRecords from './components/ClientRecords'
import ActiveRecordsClient from './components/ActiveRecordsClient'
import ArchiveRecordsClient from './components/ArchiveRecordsClient'
import ActiveRecordsDoctor from './components/ActiveRecordsDoctor'
import FreeRecordsDoctor from './components/FreeRecordsDoctor'
import ArchiveRecordsDoctor from './components/ArchiveRecordsDoctor'
import CreateRecordDoctor from './components/CreateRecordDoctor'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/client', component: HomePage },
    { path: '/client/records', component: ClientRecords },
    { path: '/client/active', component: ActiveRecordsClient },
    { path: '/client/archive', component: ArchiveRecordsClient },
    { path: '/doctor', component: HomePageDoctor},
    { path: '/doctor/active', component: ActiveRecordsDoctor},
    { path: '/doctor/free', component: FreeRecordsDoctor},
    { path: '/doctor/archive', component: ArchiveRecordsDoctor},
    { path: '/doctor/create', component: CreateRecordDoctor},
    { path: '/login', component: Login },
    { path: '/login/client', component: LoginPage },
    { path: '/login/doctor', component: LoginPageDoctor },
    { path: '/registration', component: Registr },
    { path: '/registration/client', component: RegistrClient },
    { path: '/registration/doctor', component: RegistrDoctor },


    // otherwise redirect to home
    { path: '*', redirect: '/login' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login','/login/client','/login/doctor','/registration','/registration/client','/registration/doctor'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }


  next();
})
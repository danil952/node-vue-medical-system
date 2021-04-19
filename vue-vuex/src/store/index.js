import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import alert from './modules/alert'
import doctor from './modules/doctor'
import client from './modules/client'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    auth,
    alert,
    doctor,
    client
  }
})
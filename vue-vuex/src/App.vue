<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-if="!loggedIn" class="nav-item">
              <router-link to="login" class="nav-link">Войти</router-link>
            </li>
            <li v-if="!loggedIn" class="nav-item">
              <router-link to="registration" class="nav-link">Регистрация</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link to="login" class="nav-link">Выйти</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="alert.message" :class="'alert ' + alert.type">{{alert.message}}</div>
    <router-view>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed:
  {
    loggedIn()
    {
      return this.$store.state.auth.status.loggedIn
    },
    alert () {
            return this.$store.state.alert
    }
  },
  watch:{
        $route (){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

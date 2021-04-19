<template>
  <div>
      <h1>Личный кабинет</h1>
    <div class="profile">
      <div class="profileInfo">
        <h1><strong>Имя: </strong>{{ user.name }}</h1>
        <h2><strong>Фамилия: </strong>{{ user.surname }}</h2>
        <h3><strong>Возраст: </strong>{{ user.age }}</h3>
      </div>
      <div class="profileActions">
          <router-link to="client/records" class="action-link">Записаться</router-link>
          <router-link to="client/active" class="action-link">Активные записи</router-link>
          <router-link to="client/archive" class="action-link">Архив</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isClient() {
      const user = this.$store.state.auth.user;
      return user.type == "client";
    },
  },
};
</script>
<style>
.profile {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.profileInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.action-link
{
    font-size: 30px;
    text-decoration: none;
}
.profileActions
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

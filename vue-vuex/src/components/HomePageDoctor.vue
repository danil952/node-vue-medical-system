<template>
  <div>
      <h1>Личный кабинет</h1>
    <div class="profile">
      <div class="profileInfo">
        <h1><strong>Имя: </strong>{{ user.name }}</h1>
        <h2><strong>Фамилия: </strong>{{ user.surname }}</h2>
        <h3><strong>Медицинская категория: </strong>{{ type }}</h3>
      </div>
      <div class="profileActions">
          <router-link to="doctor/create" class="action-link">Создать запись</router-link>
          <router-link to="doctor/active" class="action-link">Активные записи</router-link>
          <router-link to="doctor/free" class="action-link">Свободные записи</router-link>
          <router-link to="doctor/archive" class="action-link">Архив</router-link>
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
    categories()
    {
        return this.$store.state.doctor.categories;
    },
    type()
    {
        if(this.categories.length>0) return this.categories.filter(e=>e.id==this.user.type_id)[0].name;
        else return "";
    }
  },
  created()
    {   
        this.$store.dispatch('doctor/getCategories');
    }
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

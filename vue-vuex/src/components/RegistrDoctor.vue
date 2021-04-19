<template>
    <div class="containerForm">
          <h2>Регистрация</h2>
          <form @submit.prevent="handleSubmit">
              <div class="form-group">
                  <label for="username">Имя пользователя</label>
                  <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                  <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
              </div>
              <div class="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                  <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
              </div>
              <div class="form-group">
                  <label htmlFor="name">Имя</label>
                  <input type="text" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                  <div v-show="submitted && !name" class="invalid-feedback">Name is required</div>
              </div>
              <div class="form-group">
                  <label htmlFor="name">Фамилия</label>
                  <input type="text" v-model="surname" name="surname" class="form-control" :class="{ 'is-invalid': submitted && !surname }" />
                  <div v-show="submitted && !surname" class="invalid-feedback">Surname is required</div>
              </div>
              <div class="form-group">
                  <label htmlFor="category">Медицинское направление</label>
                  <select class="form-control" v-model="type_id">
                        <option v-for="option in categories" v-bind:value="option.id" v-bind:key="option.id">
                                {{ option.name }}
                        </option>
                    </select>
              </div>
              <div class="form-group">
                  <button class="btn btn-primary">Регистрация</button>
              </div>
          </form>
      </div>
</template>
<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            name: '',
            surname: '',
            type_id: '',
            submitted: false
        }
    },
    created()
    {   
        this.$store.dispatch('doctor/getCategories')
    },
    computed:
    {
        categories()
        {
            return this.$store.state.doctor.categories
        }
    },
    methods: {
        handleSubmit () {
            this.submitted = true;
            const { username, password,name,surname,type_id } = this;
            const { dispatch } = this.$store;
            if (username && password && name && username && type_id) {
                dispatch('auth/registrDoctor', { username, password,name,surname,type_id });
            }
        }
    }
}
</script>
<style>
    .containerForm
    {
        width: 50%;
        margin: 0 auto;
    }
    .form-group
    {
        margin-top: 20px;
    }
</style>
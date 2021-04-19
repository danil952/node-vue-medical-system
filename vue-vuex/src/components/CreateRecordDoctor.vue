<template>
    <div class="containerForm">
          <h2>Создать запись</h2>
          <router-link to="/doctor" class="action-link">Назад</router-link>
          <form @submit.prevent="handleSubmit">
              <div class="form-group">
                  <label for="username">Выбор услуги</label>
                  <select class="form-control" v-model="medtype">
                        <option v-for="option in medtypes" v-bind:value="option.id" v-bind:key="option.id">
                                {{ option.name }}
                        </option>
                    </select>
                  <div v-show="submitted && !medtype" class="invalid-feedback">Medtype is required</div>
              </div>
              <div class="form-group">
                  <p><label htmlFor="password">Выбор даты</label></p>
                  <date-picker v-model="time"
                        type="datetime"
                        :disabled-date="notBeforeToday">
                    </date-picker>
              </div>
              <div class="form-group">
                  <button class="btn btn-primary">Создать запись</button>
              </div>
          </form>
      </div>
</template>
<script>
import moment from 'moment-timezone';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
    components:
    {
        DatePicker
    },
    data () {
        return {
            medtype: '',
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            submitted: false,
            user_id: ""
        }
    },
    methods: {
        handleSubmit () {
            this.submitted = true;
            this.time=moment(this.time).tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss');
            this.user_id=this.user.id;
            const { medtype,time ,user_id} = this;
            const { dispatch } = this.$store;
            if (medtype && time) {
                dispatch('doctor/createRecord', { medtype, time ,user_id});
            }
        },
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        }
    },
    computed:
    {
        user() {
            return this.$store.state.auth.user;
        },
        medtypes()
        {
            return this.$store.state.doctor.medtypes;
        }
    },
    created()
    {
        const id=this.user.type_id
        this.$store.dispatch('doctor/getMedtypeByTypeId',{id});
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
    .mx-datepicker
    {
        width: 100%;
    }
</style>
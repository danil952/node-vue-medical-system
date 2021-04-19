<template>
    <div class="board">
        <div class="cButtons">
             <router-link to="/client" class="action-link">Назад</router-link>
            <button class="btn btn-primary" v-for="c in categories" v-bind:key="c.id" v-on:click="setCategory(c.id)">{{c.name}}</button>
        </div>
        <div class="recordsContainer">
            <div class="record" v-for="record in records" v-bind:key="record.id">
                <h2>{{record.name}}</h2>
                <h3>Цена:{{record.price}}</h3>
                <h4>Имя доктора:{{record.doctor_name}}</h4>
                <h4>Фамилия доктора:{{record.doctor_surname}}</h4>
                <p>{{record.description}}</p>
                <p>{{record.time}}</p>
                <button class="btn btn-primary" v-on:click="createUserRecord(record.id)" >Записаться</button>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data()
    {
        return{
            type_id: ''
        }
    },
    created()
    {   
        this.$store.dispatch('doctor/getCategories')
    },
    methods:
    {
        setCategory(id)
        {
            const { dispatch } = this.$store;
            dispatch('client/getRecords',{id})
        },
        createUserRecord(id)
        {
            const { dispatch } = this.$store;
            dispatch('client/createUserRecord',{id})
        }
    },
    computed:
    {
        categories()
        {
            return this.$store.state.doctor.categories
        },
        records()
        {
            return this.$store.state.client.records
        },
        console: ()=>console
    }
}
</script>
<style>
    .record{
        margin:10px;
        border: 2px solid rgb(117, 162, 221);
        height: 310px;
        padding: 10px;
        border-radius: 10px;
        text-align: left;
    }
    .board
    {
        display: flex;
    }
    .recordsContainer
    {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        justify-content:flex-start;
    }
    .cButtons
    {
        padding: 10px;
        width: 20%;
        background-color: rgb(233, 233, 233);
        display: flex;
        flex-direction: column;
        align-content: flex-end;
        height: 100vh;
    }
    .btn
    {
        margin-bottom: 10px;
    }
</style>

<template>
<div>
    <h1>Архив</h1>
    <router-link to="/doctor" class="action-link">Назад</router-link>
    <div class="board">
        <div class="recordsContainer">
            <div class="record" v-for="record in records" v-bind:key="record.id">
                <h2>{{record.name}}</h2>
                <h3>Цена:{{record.price}}</h3>
                <p>{{record.description}}</p>
                <h4>Имя клиента:{{record.user_name}}</h4>
                <h4>Фамилия клиента:{{record.user_surname}}</h4>
                <p>{{record.time}}</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default{
    created()
    {   
        this.$store.dispatch('doctor/getArchiveRecords')
    },
    computed:
    {
        records()
        {
            return this.$store.state.doctor.archiveRecords
        }
    }
}
</script>
<style>
    .record{
        margin:10px;
        border: 2px solid rgb(117, 162, 221);
        height: 300px;
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
        margin: 0 auto;
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

<template>
    <div class="container">
        <p><router-link to="login/client" class="link">Войти как Клиент</router-link></p>
        <p><router-link to="login/doctor" class="link">Войти как Доктор</router-link></p>
    </div>
</template>
<script>
export default {
    created () {
        // reset login status
        this.$store.dispatch('auth/logout');
    }
}
</script>
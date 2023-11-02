<template>
    <div>
        <input v-model="loginName" type="text" placeholder="ім'я студента" required />
        <button @click="login">Ввійти</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginName: '',
        }
    },
    methods: {
        login() {
            axios.get("http://34.82.81.113:3000/students/name/" + this.loginName).then((response) => {
                this.$store.commit('setUser', response.data)
                this.$router.push('/students');
            })
        }
    }
}
</script>
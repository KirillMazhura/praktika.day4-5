<template>
    <p>
        {{ studentNumber }}
    </p>
    <h2>{{ student.name }}</h2>
    <img :src="student.photo" :alt="student.name">
</template>
<script>
    import axios from 'axios'
    import {useStore} from 'vuex'

    export default {
        props: {
            id: ''
        },
        data () {
            return {
                student: {},
                store: useStore, 
            }
        },
        computed: {
            studentNumber() {
                return this.$store.getters.getCount;
            }
        },
        mounted: function() {
            axios.get("http://34.82.81.113:3000/students/"+this.id)
            .then((response) => {
                this.student = response.data;
            })
        }
    }
</script>
<style>
    h2 {
        color: red;
    }
</style>
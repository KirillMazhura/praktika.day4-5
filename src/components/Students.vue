<template>
    <div id="app" class="container theme" :class="{'dark-theme': selectedTheme === 'dark-theme'}" >
        <div>
            <input type="radio" v-model="selectedTheme" value="light-theme" @change="changeTheme()" /> Світла тема
            <input type="radio" v-model="selectedTheme" value="dark-theme" @change="changeTheme()" /> Темна тема
        </div>
        <input type="text" v-model="search" placeholder="search">
        <div class="addButtonBlock">
            <input id="inputId" type="text" placeholder="studentslength" v-model="studentslength" disabled>
            <input type="text" placeholder="ПІБ" v-model="student.name">
            <select v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
            <input type="text" placeholder="mark" v-model="student.mark">

            <button @click="addStudent()">
                Додати
            </button>
        </div>
        <div class="">
            {{ studentNumber }}
            <p>Ви війшли як {{ user.name }} <br> ваша група {{ user.group }}</p>
        </div>
        <table :class="{ 'dark-table': selectedTheme === 'dark-theme' }" class="style-table">
            <tr v-for="s in students" v-bind:class="search!==''&&s.name.toLowerCase().includes(search.toLowerCase()) ? 'red' : 'black'" v-bind:key="s._id" class="active-row">
                <td v-if="s._id!=editingStudent._id">
                    <router-link :to='"/student-info/" + s._id'>
                        {{ s.name }}
                    </router-link>
                </td>
                <td v-else>
                    <input type="text" v-model="editingStudent.name">
                </td>
                <td v-if="s._id!=editingStudent._id">
                    {{ s.group }}
                </td>
                <td v-else>
                    <select v-model="editingStudent.group">
                        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
                        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
                    </select>
                </td>
                <td v-if="s._id!=editingStudent._id">
                    {{ s.mark }}
                </td>
                <td v-else>
                    <input type="text" v-model="editingStudent.mark">
                </td>
                <td>
                    <input type="checkbox" id="checkbox" v-model="s.isDonePr">
                </td>
                <td>
                    <button @click="deleteStudent(s._id)">Видалити</button>
                </td>
                <td v-if="s._id!=editingStudent._id && s.group==user.group">
                    <button @click="editStudent(s)"><i class='fas fa-pencil-alt blue'></i></button>
                </td>
                <td v-else-if="s._id==editingStudent._id && isEdit==true">
                    <button @click="confirmEdit()">confirm</button>
                    <button @click="endEdit()">cancel</button>
                </td>
                <!-- <td v-else-if="s.group!=user.group">

                </td> -->
            </tr>
        </table>
        <h3>{{ user }}</h3>
        <h3 v-for="s in students">
            {{ s }}
        </h3>
        <h3>---------------</h3>
        <h3 v-for="st in editingStudent">{{ st }}</h3>
        <div id="colorfullBlock" v-bind:style="{width: '100px',height: '100px', backgroundColor: 'red'}" onmouseover="document.getElementById('colorfullBlock').style.backgroundColor = 'black'" onmouseout="document.getElementById('colorfullBlock').style.backgroundColor = 'red'"></div>
    </div>
</template>

<script >
import axios from 'axios'
// const { createApp } = Vue;
import {ref, onMounted} from 'vue'
import { useStore } from 'vuex'

export default {
    data () {
        return {
            students: [],
            student: {name:'', zdav: false,mark: null, group:''},
            search:'',
            studentslength: 0,
            isEdit: false,
            store: useStore,
            selectedTheme: this.$store.getters.getSelectedTheme,
            user: this.$store.getters.getUser,
            editingStudent: {_id: '', name:'', zdav: false,mark: null, group: ''},
        }
    },
    mounted () {
        this.getStudents()
    },
    computed: {
        studentNumber() {
            return this.$store.getters.getCount;
        },
    },
    methods: {
        deleteStudent(studId) {
            axios.delete(`http://34.82.81.113:3000/students/${studId}`)
            .then(data => {
            console.log(data);
            this.getStudents();
            this.$store.commit('setCount', this.students.length);
        })
        },
        addStudent() {
            axios.post("http://34.82.81.113:3000/students", this.student)
           .then(response => {
                console.log(response.data);
                this.getStudents();
                this.student = {name:'', zdav: false,mark: null, group:''}
                store.commit('setCount', this.students.length);
           })
        },
        changeTheme() {
            this.$store.commit('setTheme', this.selectedTheme);
        } ,
        getStudents() {
            axios.get('http://34.82.81.113:3000/students').then((response) => {
                console.log(response.data);
                this.students=response.data
                this.studentslength = this.students.length+1;
                this.$store.commit('setCount', this.students.length);
            })
            .catch((error) => {
                console.error(error)
            })
        },
        editStudent(stud) {
            this.isEdit = true;
            this.editingStudent = stud
        },
        confirmEdit() {
            this.updateStudents();
            this.editingStudent = {_id: ""}
        },
        endEdit() {
            this.isEdit = false;
        },
        updateStudents() {
            axios.put(`http://34.82.81.113:3000/students/${this.editingStudent._id}`, this.editingStudent)
            .then((data) =>{
                console.log(data);
                this.getStudents();
            })
            .catch((error) => {
                console.error(error)
            })
        }
    },
 };
</script>
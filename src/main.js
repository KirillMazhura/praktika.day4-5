import {createApp} from 'vue'
import App from '/components/App.vue'
import Students from '/components/Students.vue'
import StudentInfo from '/components/StudentInfo.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {path: "/", component: Students},
    {path: "/student-info/:id", component: StudentInfo, props: true},
]
const router = new createRouter({history: createWebHashHistory(), routes})

createApp(App).use(router).mount('#app');
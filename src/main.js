import {createApp} from 'vue'
import App from '/components/App.vue'
import Login from "./components/Login.vue";
import Students from '/components/Students.vue'
import StudentInfo from '/components/StudentInfo.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from './store.js'

const routes = [
    {path: "/students", component: Students},
    {path: "/student-info/:id", component: StudentInfo, props: true},
    {path: '/', component: Login},
]
const router = new createRouter({history: createWebHashHistory(), routes})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.getUser === null) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
 })

createApp(App).use(router).use(store).mount('#app');
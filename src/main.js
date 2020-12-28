import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from 'vuex'
import axios from 'axios'
import VueFormulate from '@braid/vue-formulate'
import VTooltip from 'v-tooltip'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/formulate.css";

import App from "@/App.vue";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Profile from "@/views/Profile.vue";
import CreateQuizz from "./views/admin/CreateQuizz";
import QuizBuilder from "./views/admin/QuizBuilder";
import QuizEditor from "./views/admin/QuizEditor";
import QuestionEditor from "./views/admin/QuestionEditor";

// routes

const routes = [
    {
        path: "/",
        component: Admin,
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: "/setting",
                component: Settings,
            },
            {
                path: "/mycollection",
                component: Tables,
            },
            {
                path: "/maps",
                component: Tables,
            },
            {
                path: "/quizz/create",
                component: CreateQuizz
            },
            {
                path: "/quiz/:id/question/new",
                component: QuestionEditor,
                props: true
            },
            {
                path: "/quiz/:id/question/:question_id",
                component: QuestionEditor,
                props: true
            },
            {
                path: "/quiz/:id",
                component: QuizEditor
            }

        ],
    },
    {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                component: Login,
            },
            {
                path: "/auth/register",
                component: Register,
            },
        ],
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/game/join",
        component: Profile,
    },
    {
        path: "/quizz/build",
        component: QuizBuilder
    },
    {path: "*", redirect: "/"},
];

// app config

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFormulate)
Vue.use(VTooltip)


const apiUrl = 'https://quizzy-api-v1.herokuapp.com/api';

const store = new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        username: state => state.user.username,
        user_id: state => state.user.id
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: apiUrl + '/auth/signin', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.accessToken
                        const user = resp.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('username', user.username)
                        localStorage.setItem('user_id',user.id)
                        console.log(user);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('user_id')
                delete axios.defaults.headers.common['Authorization']
                resolve()
                router.push('/auth/login')
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: apiUrl + '/auth/signup', data: user, method: 'POST'})
                    .then(
                        router.push('/auth/login')
                    )
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
    },
    modules: {},
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    }
})

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/auth/login')
    } else {
        next()
    }
})

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

}

new Vue({
    router,
    store,
    apiUrl,
    render: (h) => h(App),
}).$mount("#app");

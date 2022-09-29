import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import HomePage from '../views/HomePage'

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
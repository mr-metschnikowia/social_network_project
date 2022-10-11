import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import HomePage from '../views/HomePage'
import ProfilePage from "../views/ProfilePage"

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
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
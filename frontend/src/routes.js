
import { ToyDetails } from './pages/toy-details.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { ToyApp } from './pages/toy-app.jsx'
import { HomePage } from './pages/home-page.jsx'
import { AboutPage } from './pages/about-page.jsx'
// import { ToyLogin } from './pages/toy-login.jsx'

export default [
    // {
    //     path: '/login',
    //     component: ToyLogin,
    // },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/toy/edit/:toyId?',
        component: ToyEdit,
    },
    {
        path: '/toy/details/:toyId?',
        component: ToyDetails,
    }


]
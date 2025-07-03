import {useAuth} from "~/composables /UseAuth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie('session_token', {
        sameSite: 'strict',
        secure: false
    })

    const user = useAuth()

    if(!authToken.value) {
        return navigateTo('/auth/login')
    }


    const requiredRole = to.meta.role;

    if (requiredRole && user.value?.role !== requiredRole) {
        return navigateTo('/dashboard');
    }
})

import {useAuth} from "~/composables/UseAuth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie('session_token', {
        sameSite: 'strict',
        secure: false
    })

    const {user} = useAuth()

    if(!authToken.value) {
        return navigateTo('/auth/login')
    }


    const requiredRoles = to.meta.role;

    if (
        requiredRoles &&
        Array.isArray(requiredRoles) &&
        !requiredRoles.includes(user.value?.role)
    ) {
        return navigateTo('/dashboard');
    }
})

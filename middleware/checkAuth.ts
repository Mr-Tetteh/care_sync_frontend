import {useAuth} from "~/composables /UseAuth";
import {Cookie} from "lucide-vue-next";

export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie('session_token', {
        sameSite: 'strict',
        secure: false
    })
    if(!authToken.value) {
        return navigateTo('/auth/login')
    }
})

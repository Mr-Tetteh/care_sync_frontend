import {toast} from "vue-sonner";
import {jwtDecode} from 'jwt-decode'

export const useAuth = () => {

    const form = ref({
        email: '',
        password: '',
    })

    const input = ref({
        first_name: '',
        last_name: '',
        other_names: '',
        gender: '',
        date_of_birth: '',
        email: '',
        phone: '',
        password: '',
    })

    const register = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api+`/auth/register`, {
                method: 'POST',
                body: input.value
            })
            toast.success('User registered successfully')
            setTimeout(() => {
                navigateTo('/auth/login')
            }, 2000);
        } catch (error) {
            return toast.error(error.data.message)
        }

    }

    const authToken = useCookie('session_token', {
        sameSite: 'strict',
        secure: false
    })


    const login = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/auth/login`, {
                method: 'POST',
                body: form.value,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (error.value) {
                throw error.value
            }
            authToken.value = data.value.access_token

            toast.success('Login successful')
            navigateTo('/dashboard')
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const logout = async => {

        token.value = null
        navigateTo('/auth/login')


    }

    interface JwtPayload {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string,
        profile_picture: string
        date_of_birth: string
        phone: string
        iat: number;
        exp: number;
    }

    const payloadToken = useCookie('session_token', {
        sameSite: 'lax',
        secure: false, // true if using HTTPS
    })

    const user = computed<JwtPayload | null>(() => {

        if (!payloadToken.value) {
            return null
        }
        try {
            return jwtDecode<JwtPayload>(payloadToken.value)
        } catch (err) {
            return null
        }
    })


    const token = useCookie('session_token', {
        sameSite: 'lax',
        secure: false,
    })


    return {
        form,
        input,
        register,
        login,
        authToken,
        logout,
        user
    }
}


import {toast} from "vue-sonner";
import { jwtDecode } from 'jwt-decode'

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
            const {data, error} = await useFetch('http://localhost:8080/users', {
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
            const {data, error} = await useFetch('http://localhost:8080/auth/login', {
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
            // navigateTo()
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    interface JwtPayload {
        sub: string;
        email: string;
        first_name: string;
        last_name: string;
        other_names: string;ll
        iat: number;
        exp: number;
    }


    return {
        form,
        input,
        register,
        login
    }
}


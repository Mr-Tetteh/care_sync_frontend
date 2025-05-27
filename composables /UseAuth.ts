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
        role: ''
    })


    const register = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/auth/register`, {
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
    const userById = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/staff/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                throw new Error(error.value.message)
            }
            // Make sure to return the data
            return data.value
        } catch (error) {
            toast.error(error.message)
            throw error
        }
    }

    const updateUser = async (id) => {
        try {
            const { data, error } = await useFetch(useRuntimeConfig().public.api + `/users/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                },
            });

            if (error.value) {
                // Display error safely
                toast.error(error.value.data?.message || 'An error occurred while updating the user.');
                return;
            }

            toast.success('User updated successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.error(err); // Log for debugging
            toast.error(err?.message || 'Unexpected error occurred.');
        }
    };



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
        user,
        userById,
        updateUser
    }
}


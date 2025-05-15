import {toast} from "vue-sonner";

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

        const {data,error} =  await useFetch('http://localhost:8080/users', {
            method: 'POST',
            body: input.value
        })
        toast.success('User registered successfully')
        setTimeout (() => {
            navigateTo('/auth/login')
        }, 2000);

    }


    return {
        form,
        input,
        register
    }
}


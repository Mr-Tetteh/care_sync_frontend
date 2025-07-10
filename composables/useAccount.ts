import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";

export const useAccount = () => {
    const input = ref({
        first_name: '',
        last_name: '',
        other_names: '',
        phone: '',
        gender: '',
        email: '',
        date_of_birth: '',
    })

    const params = useRoute().params

    const {logout} = useAuth()
    const get_user_details = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/staff/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
            }
            input.value = data.value
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateProfile = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error){
                return (error.value.message)
            }
            toast.success('Profile Updated Successfully')
            setTimeout(() => {
                logout();
            }, 3000)
        } catch (error) {
            toast.error(error.value.data.message)
        }
    }


    return {
        input,
        get_user_details,
        updateProfile
    }
}
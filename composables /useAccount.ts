import {toast} from "vue-sonner";
import {useAuth} from "~/composables /UseAuth";

export const useAccount = () => {
    const input = ref ({
        first_name: '',
        last_name: '',
        other_names: '',
        phone: '',
        gender: '',
        email: '',
        date_of_birth: '',
    })

    const params = useRoute().params


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


    return{
        input,
        get_user_details
    }
}
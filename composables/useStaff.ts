import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const useStaff = () => {

    const {authToken} = useAuth()
    const getStaff = async () => {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.api}/users/staff`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        })
        return data
    }

    const deleteUser = async (id) => {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.api}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        })
        toast.success('Staff deleted Successfully  ')
        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }

    return {
        getStaff,
        deleteUser
    }
}
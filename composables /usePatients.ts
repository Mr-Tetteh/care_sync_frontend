import {useAuth} from "~/composables /UseAuth";
import {toast} from "vue-sonner";

export const usePatients = () => {

    const {authToken} = useAuth()


    const getPatients = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patient`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                toast('Sorry and error occurred')
            }
            return data
        } catch (error) {
            alert(error.data.message)
        }
    }




    return {
        getPatients,
    }

}
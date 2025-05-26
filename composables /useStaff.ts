import {useAuth} from "~/composables /UseAuth";

export const useStaff = () => {

    const {authToken}= useAuth()
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

    return {
        getStaff
    }
}
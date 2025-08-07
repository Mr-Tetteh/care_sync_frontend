import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const usePatients = () => {
    const is_loading = ref(false)

    const {authToken} = useAuth()
    const input = ref(
        {
            first_name: "",
            last_name: "",
            other_names: "",
            phone: "",
            email: "",
            age: "",
            gender: "",
            address: "",
            date_of_birth: "",
            ghana_card_number: "GHA-",
            emergency_personal_name: "",
            emergency_personal_contact: "",
            patient_id: ""
        }
    )


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
        } catch (error: any) {
            alert(error.data.message)
        }
    }

    const uploadPatient = async () => {
        const characters = 'ABCDEFGHIJK456789LMNOPQRSTUVWXYZ0123';
        let result = '';
        for (let i = 0; i < 2; i++) {
            result += (input.value.first_name[0] || '') + characters.charAt(Math.floor(Math.random() * characters.length)) + (input.value.last_name[0] || '');
        }
        is_loading.value = true
        try {
            input.value.patient_id = result
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/patient', {
                method: "POST",
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                const messages = error.value.data.message;

                if (Array.isArray(messages)) {
                    messages.forEach((msg) => toast.error(msg));
                    is_loading.value = false
                } else {
                    toast.error(messages || 'An unknown error occurred');
                }
                return;
            }

            toast.success('Patient Registered successfully')
            window.setTimeout(() => {
                window.location.href = '/patients/patients'

            }, 1000)
        } catch (error: any) {
            toast.error(error)
        }
    }


    return {
        getPatients,
        uploadPatient,
        input,
        is_loading
    }

}
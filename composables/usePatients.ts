import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const usePatients = () => {
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
            NHIS: "",
            guardian_1_first_name: "",
            guardian_1_last_name: "",
            guardian_1_relation: "",
            guardian_1_contact: "",
            guardian_1_residence: "",
            guardian_2_first_name: "",
            guardian_2_last_name: "",
            guardian_2_relation: "",
            guardian_2_contact: "",
            guardian_2_residence: ""
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
        } catch (error) {
            alert(error.data.message)
        }
    }

    const uploadPatient = async () => {
        try {
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
                } else {
                    toast.error(messages || 'An unknown error occurred');
                }
                return;
            }

            toast.success('Patient Registered successfully')
            window.setTimeout(() => {
                window.location.href = '/patients/patients'

            }, 1000)
        } catch (error) {
            toast.error(error)
        }
    }


    return {
        getPatients,
        uploadPatient,
        input
    }

}
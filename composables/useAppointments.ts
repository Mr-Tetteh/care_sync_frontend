import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";

export const useAppointments = () => {
    const input = ref({
        full_name: '',
        phone_number: '',
        appointment_time: '',
        appointment_date: '',
        reason: '',
        status: ''
    })
    const appoointment = ref()
    const is_loading = ref(false)

    const {authToken} = useAuth()
    const appointment = async () => {
        is_loading.value = true
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-appointment`, {
                method: 'POST',
                body: input.value
            })
            if (error.value) {
                const message = error.value.data.message;

                if (Array.isArray(message)) {
                    // Show each validation message separately
                    message.forEach((msg: string) => toast.error(msg));
                    is_loading.value = false;
                } else {
                    // Fallback for other errors
                    toast.error(message || 'Appointment creation failed');
                }

                return;

            }
            toast.success('Appointment created successfully')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            toast.error(error.data.message)
        }

    }


    const editAppointment = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-appointment/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                throw new error
            }
            input.value = data.value
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const updateAppointment = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-appointment/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                throw new error
            }
            toast.success('Appointment deleted successfully')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const readAppointment = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-appointment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,

                }
            })
            return data
        } catch (err) {
            toast.error(err)
        }

    }


    return {
        input,
        appointment,
        readAppointment,
        editAppointment,
        updateAppointment,
        is_loading
    }
}
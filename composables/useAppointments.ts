import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";

export const useAppointments = () => {

    const {authToken, user} = useAuth()

    interface AppointmentInput {
        full_name: string;
        phone_number: string;
        appointment_time: string;
        appointment_date: string;
        reason: string;
        status: string;
        selected_doctor_contact?: string;
    }

    const input = ref<AppointmentInput>({
        full_name: '',
        phone_number: '',
        appointment_time: '',
        appointment_date: '',
        reason: '',
        status: '',
        selected_doctor_contact: '',
    })

    const appointments = ref()
    const is_loading = ref(false)

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
            const receptionistEmail = (await readReceptionist());
            console.log(receptionistEmail)
            if (receptionistEmail) {
                await useFetch(useRuntimeConfig().public.api + `/mail/email`, {
                    method: 'POST',
                    body: {
                        to: receptionistEmail,
                        subject: 'New Appointment',
                        message: `A new appointment has been scheduled.`
                    }
                });
            }
            toast.success('Appointment created successfully')
               setTimeout(() => {
                   window.location.reload()
               }, 1000);
        } catch (error: any) {
            toast.error(error.data.message)
        }

    }

    const readReceptionist = async () => {
        const {data} = await useFetch(useRuntimeConfig().public.api + `/users/receptionist`, {
            method: 'GET',
        })
        return data.value?.[0].email || null
    }


    const editAppointment = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/patients-appointment/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error)
            }
            input.value = data.value as AppointmentInput
        } catch (error: any) {
            toast.error(error.data.message)
        }
    }

    const updateAppointment = async (id: number) => {
        is_loading.value = true

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
                toast.error(error)
            }
            toast.success('Appointment deleted successfully')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error: any) {
            is_loading.value = false
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
        } catch (error: any) {
            toast.error(error)
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
import {toast} from "vue-sonner";

export const useAppointments = () => {
    const input = ref({
        full_name: '',
        phone_number: '',
        appointment_time: '',
        appointment_date: '',
        reason: '',
    })

    const appointment = async () => {
        try {
            const {data, error} = await useFetch('http://localhost:8080/patients-appointment', {
                method: 'POST',
                body: input.value
            })
            if (error.value) {
                throw  new error
            }
            toast.success('Appointment created successfully')
        }catch (error) {
            toast.error(error.data.message)
        }

    }


    return {
        input,
        appointment
    }
}
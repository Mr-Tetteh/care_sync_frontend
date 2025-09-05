import {useAuth} from "~/composables/UseAuth";

export const usePayments = () => {
    interface Payment {
        id?: number
        reason_for_payment?: string
        insurance_cover?: string
        price: number
        lab: number,
        NHIS: boolean
    }

    const Payments = ref({
        reason_for_payment: '',
        insurance_cover: null as boolean | null, // null until user chooses
        price: 0,

    })

    const consultationTrue = ref<Payment | null>(null)
    const consultationFalse = ref<Payment | null>(null)
    const labsTrue = ref<Payment | null>(null)
    const labsFalse = ref<Payment | null>(null)


    const consultationPaymentsTrue = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/hospital-service/nhis/true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            consultationTrue.value = data.value // take first match
            return consultationTrue.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    const consultationPaymentsFalse = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/hospital-service/nhis/false', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },

            })
            consultationFalse.value = data.value
            return consultationFalse.value
        } catch (error) {
            console.error('Error fetching consultation payments without NHIS cover:', error)
        }
    }

    const LabsTrue = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/lab-service/nhis/true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },

            })
            labsTrue.value = data.value // take first match
            return consultationTrue.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    const LabsFalse = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/lab-service/nhis/false', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            labsFalse.value = data.value // take first match
            return consultationTrue.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    return {
        consultationTrue,
        consultationFalse,
        consultationPaymentsTrue,
        consultationPaymentsFalse,
        Payments,
        labsTrue,
        labsFalse,
        LabsTrue,
        LabsFalse
    }
}

export const usePayments = () => {
    interface Payment {
        id?: number
        reason_for_payment?: string
        insurance_cover?: string
        price: number
        NHIS: boolean
    }

    const Payments = ref({
        reason_for_payment: '',
        insurance_cover: null as boolean | null, // null until user chooses
        price: 0,

    })

    const consultationTrue = ref<Payment | null>(null)
    const consultationFalse = ref<Payment | null>(null)

    const consultationPaymentsTrue = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/hospital-service/nhis/true', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
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
                headers: {'Content-Type': 'application/json'},
            })
            consultationFalse.value = data.value
            return consultationFalse.value
        } catch (error) {
            console.error('Error fetching consultation payments without NHIS cover:', error)
        }
    }

    return {
        consultationTrue,
        consultationFalse,
        consultationPaymentsTrue,
        consultationPaymentsFalse,
        Payments
    }
}

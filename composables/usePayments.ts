import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const usePayments = () => {

    interface Payment {
        id?: number
        reasonForPayment?: string // Already correct
        insuranceCover: boolean | null // Already correct
        selectedLabsTrueIds: number[]
        selectedLabsFalseIds: number[]
        selectedDrugIds: number[]
        consultationTruePrice?: number
        consultationFalsePrice?: number
    }

    const Payments = ref<Payment>({
        reasonForPayment: '', // Already correct
        insuranceCover: null,
        selectedLabsTrueIds: [],
        selectedLabsFalseIds: [],
        selectedDrugIds: [],
        consultationTruePrice: undefined,
        consultationFalsePrice: undefined
    })


    const consultationTrue = ref<any | null>(null)
    const consultationFalse = ref<any | null>(null)
    const labsTrue = ref<any | null>(null)
    const labsFalse = ref<any | null>(null)
    const drugs = ref<any | null>(null)


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
            labsTrue.value = data.value || []// take first match
            return labsTrue.value
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
            labsFalse.value = data.value || [] // take first match
            return labsFalse.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    const FetchDrugs = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/pharmacy/drugs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            drugs.value = data.value // take first match
            return consultationTrue.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }


    const makePayment = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api +'/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
                body: Payments.value
            })
            if (error.value) {
                console.error('Error making payment:', error.value)
                throw new Error('Failed to make payment')
                toast.error(error.value)
            }
            toast.success('Payment made successfully')
            window.location.reload()
            return data.value
        } catch (error) {
            console.error('Error making payment:', error)
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
        FetchDrugs,
        drugs,
        LabsTrue,
        LabsFalse,
        makePayment
    }
}

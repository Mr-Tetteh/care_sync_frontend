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
        patient_id: string,
    }

    const Payments = ref<Payment>({
        reasonForPayment: '', // Already correct
        insuranceCover: null,
        selectedLabsTrueIds: [],
        selectedLabsFalseIds: [],
        selectedDrugIds: [],
        consultationTruePrice: undefined,
        consultationFalsePrice: undefined,
        patient_id: ''
    })


    const consultationTrue = ref<any | null>(null)
    const consultationFalse = ref<any | null>(null)
    const labsTrue = ref<any | null>(null)
    const labsFalse = ref<any | null>(null)
    const drugs = ref<any | null>(null)
    const labsPayments = ref<any | null>(null)
    const drugsPayments = ref<any | null>(null)
    const paymentss = ref()
    const latestRecord = ref()


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
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
                body: Payments.value
            })
            if (error.value) {
                let errMsg = 'Login failed'
                if (error.value?.data?.message) {
                    if (Array.isArray(error.value.data.message)) {
                        errMsg = error.value.data.message.join('\n')
                    } else {
                        errMsg = error.value.data.message
                    }
                }
                toast.error(errMsg)
                return
            }
            toast.success('Payment made successfully')
            window.location.href = '/payments/Receipt'
            return data.value
        } catch (error) {
            console.error('Error making payment:', error)
        }
    }

    const FetchLabPayments = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/payments/LabsPayment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            labsPayments.value = data.value // take first match
            return labsPayments.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    const FetchDrugsPayments = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/payments/DrugsPayment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            drugsPayments.value = data.value // take first match
            return drugsPayments.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }

    const FetchConsultationPayments = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/payments/ConsultationPayment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            paymentss.value = data.value
            return paymentss.value
        } catch (error) {
            console.error('Error fetching consultation payments with NHIS cover:', error)
        }
    }
    const FetchLatestPayment = async () => {
        try {
            const {data} = await useFetch(useRuntimeConfig().public.api + '/payments/LatestRequest', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                },
            })
            latestRecord.value = data.value // take first match
            return latestRecord.value
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
        FetchDrugs,
        drugs,
        LabsTrue,
        LabsFalse,
        makePayment,
        FetchLabPayments,
        FetchConsultationPayments,
        FetchDrugsPayments,
        paymentss,
        drugsPayments,
        labsPayments,
        FetchLatestPayment,
        latestRecord
    }
}

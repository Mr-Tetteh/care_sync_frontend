import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const usePharmacy = () => {
    const {authToken} = useAuth()

    const input = ref({
        drug_name: '',
        drug_price: '',
        drug_category: '',
        drug_quantity: '',
        drug_description: '',
        additional_note: ''
    })
    const drugs = ref()

    const upload_drug = async () => {

        const {data, error} = await useFetch(useRuntimeConfig().public.api + `/pharmacy`, {
            method: 'POST',
            body: input.value,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        });
        if (error.value) {
            toast.error(error.value.data?.message || 'An unexpected error occurred.');
        } else {
            toast.success('You have successfully uploaded the drug');
            console.log('Server response:', data.value);
        }
        window.location.href = "/pharmacy/uploaded_drugs"
    };

    const retrieve_drugs = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/pharmacy`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value)
            }
            return data
        } catch (error) {
            toast.error(error.value)
        }
    }

    return {
        input,
        upload_drug,
        drugs,
        retrieve_drugs
    }
}
import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const usePharmacy = () => {
    const {authToken} = useAuth()

    interface DrugInput {
        drug_name: string;
        drug_price: string;
        drug_category: string;
        drug_quantity: string;
        drug_description: string;
        additional_note?: string;
    }

    const input = ref<Partial<DrugInput>>({
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

    const edit_drug = async (id: number) => {
        try {
            const {data, error} = await useFetch(
                useRuntimeConfig().public.api + `/pharmacy/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken.value}`,
                    }
                }
            )

            if (error.value) {
                toast.error(error.value)
            }

            if (Array.isArray(data.value) && data.value.length > 0) {
                input.value = data.value[0] as DrugInput
            } else {
                input.value = data.value as DrugInput
            }

        } catch (error: any) {
            toast.error(error.message || "An error occurred")
        }
    }

    const update_drug = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/pharmacy/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
           setTimeout(() => {
               toast.success('You have successfully updated the drug');
                window.location.href = "/pharmacy/uploaded_drugs"
           }, 1000)
        } catch
            (error: any) {
            toast.error(error.value)
        }
    }


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
        } catch (error: any) {
            toast.error(error.value)
        }
    }

    return {
        input,
        upload_drug,
        drugs,
        retrieve_drugs,
        edit_drug,
        update_drug
    }
}
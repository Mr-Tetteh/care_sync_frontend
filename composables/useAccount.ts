import {toast} from "vue-sonner";
import {useAuth} from "~/composables/UseAuth";
import Swal from 'sweetalert2'

export const useAccount = () => {

     interface AccountInput{
        first_name: '',
        last_name: '',
        other_names: '',
        phone: '',
        gender: '',
        email: '',
        date_of_birth: '',
    }
    const input = ref<AccountInput>({
        first_name: '',
        last_name: '',
        other_names: '',
        phone: '',
        gender: '',
        email: '',
        date_of_birth: '',
    })

    const params = useRoute().params


    const {logout} = useAuth()
    const get_user_details = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/staff/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
            }
            input.value = data.value as AccountInput
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const finalUpdate = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message);
                return;
            }
            setTimeout(() => {
                logout();
            }, 20000)
        } catch (error: any) {
            toast.error(error.value.data.message)
        }
    }
    const updateProfile = (id: number) => {
        Swal.fire({
            title: "Are you sure you want to update your profile?",
            text: "You will be logged out after updating your profile",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your Profile has been updated.",
                    icon: "success"
                });
                finalUpdate(id)
            }
        });
    }

    return {
        input,
        get_user_details,
        updateProfile,
        finalUpdate
    }
}
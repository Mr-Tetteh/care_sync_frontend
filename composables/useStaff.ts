import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";
import Swal from 'sweetalert2'

export const useStaff = () => {

    const {authToken} = useAuth()
    const getStaff = async () => {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.api}/users/staff`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        })
        return data
    }

    const getDoc = async () => {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.api}/users/doctors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        })
        return data
    }

    const deleteUser = async (id: number) => {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.api}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken.value}`,
            }
        })
        toast.success('Staff deleted Successfully  ')
        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }

    const staff_delete = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                deleteUser(id)
            }
        });
    }

    return {
        getStaff,
        deleteUser,
        staff_delete,
        getDoc
    }
}
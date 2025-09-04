import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const useHospitalManagement = () => {
    const service = ref({
        name: '',
        price: '',
        NHIS: ''
    })

    const lab = ref({
        name: '',
        price: '',
        NHIS: ''
    })
    const postService = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/hospital-service', {
                method: 'POST',
                body: service.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            toast.success('Service created successfully')
            window.location.reload()
            return data.value
        } catch (err) {
            console.error('Error creating service:', err)
            throw err
        }
    }

    const PostLab = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/lab-service', {
                method: 'POST',
                body: lab.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            toast.success('Lab Management created successfully')
            window.location.reload()
            return data.value
        } catch (err) {
            console.error('Error creating Lab Management:', err)
            throw err
        }
    }

    const fetchServices = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/hospital-service', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            return data.value
        } catch (err) {
            toast.error('Error fetching services', err)
        }
    }

    const fetchLabs = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + '/lab-service', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            return data.value
        } catch (err) {
            toast.error('Error fetching Labs', err)
        }
    }
    const deleteService = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/hospital-service/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            toast.success('Service deleted successfully')
            window.location.reload()
            return data.value
        } catch (error) {
            toast.error('Error deleting service', error)
        }
    }

    const deleteLabManagement = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/lab-service/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuth().authToken.value}`,
                }
            })
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            toast.success('Lab management deleted successfully')
            window.location.reload()
            return data.value
        } catch (error) {
            toast.error('Error deleting service', error)
        }
    }

    return {
        service,
        postService,
        fetchServices,
        deleteService,
        lab,
        PostLab,
        fetchLabs,
        deleteLabManagement
    }
}
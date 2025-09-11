import {useAuth} from "~/composables/UseAuth";
import {toast} from "vue-sonner";

export const useHospitalManagement = () => {
    interface ServiceInput {
        name: string;
        price: string;
        NHIS: string;
    }
    const service = ref<ServiceInput>({
        name: '',
        price: '',
        NHIS: ''
    })

    interface LabInput {
        name: string;
        price: string;
        NHIS: string;
    }

    const lab = ref<LabInput>({
        name: '',
        price: '',
        NHIS: ''
    })
    const isEdit = ref(false)

    const fetchServices = async () => {
        try {
            const { data, error } = await useFetch(
                useRuntimeConfig().public.api + '/hospital-service',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuth().authToken.value}`,
                    },
                }
            )
            if (error.value) {
                toast.error(error.value.message)
                return []
            }
            return data.value || []
        } catch (err: any) {
            toast.error('Error fetching services')
            return []
        }
    }

    const postService = async () => {
        try {
            const { data, error } = await useFetch(
                useRuntimeConfig().public.api + '/hospital-service',
                {
                    method: 'POST',
                    body: service.value,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuth().authToken.value}`,
                    },
                }
            )
            if (error.value) {
                toast.error(error.value.message)
                return
            }
            toast.success('Service created successfully')
            return data.value
        } catch (err) {
            console.error('Error creating service:', err)
            throw err
        }
    }


    const updateService = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/hospital-service/${id}`, {
                method: 'PATCH',
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
            toast.success('Service Management updated successfully')
            window.location.reload()
        } catch (err: any) {
            toast.error('Error fetching Labs', err)
        }
    }
    const EditService = async (id: number) => {
        try {
            isEdit.value = true
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/hospital-service/${id}`, {
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
            if (Array.isArray(data.value) && data.value.length > 0) {
                service.value = data.value[0] as ServiceInput
            } else {
                service.value = data.value as ServiceInput
            }
        } catch (err: any) {
            toast.error('Error fetching Labs', err)
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
        } catch (err: any) {
            toast.error('Error fetching Labs', err)
        }
    }


    const updateLabs = async (id: number) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/lab-service/${id}`, {
                method: 'PATCH',
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
            toast.success('Lab Management updated successfully')
            window.location.reload()
        } catch (err: any) {
            toast.error('Error fetching Labs', err)
        }
    }
    const EditLab = async (id: number) => {
        try {
            isEdit.value = true
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/lab-service/${id}`, {
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
            if (Array.isArray(data.value) && data.value.length > 0) {
                lab.value = data.value[0] as LabInput
            } else {
                lab.value = data.value as LabInput
            }
        } catch (err: any) {
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
        } catch (error: any) {
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
        } catch (error: any) {
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
        deleteLabManagement,
        updateLabs,
        EditLab,
        EditService,
        updateService,
        isEdit
    }
}
import {toast} from "vue-sonner";
import {jwtDecode} from 'jwt-decode'

import Swal from 'sweetalert2'

export const useAuth = () => {

    const form = ref({
        email: '',
        password: '',
    })


    const input = ref({
        first_name: '',
        last_name: '',
        other_names: '',
        gender: '',
        date_of_birth: '',
        email: '',
        phone: '',
        role: '',
        password: 'password',
    })

    const password = ref({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const reset = ref({
        email: ''
    })

    const resetPassword = ref({
        resetToken: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const register = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users`, {
                method: 'POST',
                body: input.value
            })

            if (error.value) {
                const message = error.value.data?.message;

                if (Array.isArray(message)) {
                    // Show each validation message separately
                    message.forEach((msg: string) => toast.error(msg));
                } else {
                    // Fallback for other errors
                    toast.error(message || 'Registration failed');
                }

                return;
            }
            toast.success('User registered successfully')
            setTimeout(() => {
                navigateTo('/staff/staff')
            }, 2000)
        } catch (err: any) {
            return toast.error(err?.message || 'Unexpected error occurred')
        }
    }


    const authToken = useCookie('session_token', {
        sameSite: 'strict',
        secure: false
    })
    const userById = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/staff/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                }
            })
            if (error.value) {
                throw new Error(error.value.message)
            }
            // Make sure to return the data
            return data.value
        } catch (error) {
            toast.error(error.message)
            throw error
        }
    }

    const changePassword = async () => {
        if (password.value.newPassword !== password.value.confirmNewPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/change-password`, {
                method: 'PUT',
                body: password.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                },
            })
            if (error.value) {
                // Display error safely
                toast.error(error.value.data?.message || 'An error occurred while changing the password.');
                return;
            }
            toast.success('Password changed successfully');
            logout()
        } catch (err) {
            toast.error(err?.message || 'An error occurred while changing the password.');
        }

    }

    const finalChangePassword = (id) => {
        Swal.fire({
            title: "Are you sure you want to change your password?",
            text: "You will be logged out after changing your password!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change password!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Password Updated!",
                    text: "Your Password has been updated",
                    icon: "success"
                });
                changePassword(id)
            }
        });
    }


    const updateUser = async (id) => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/${id}`, {
                method: 'PATCH',
                body: input.value,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.value}`,
                },
            });

            if (error.value) {
                // Display error safely
                toast.error(error.value.data?.message || 'An error occurred while updating the user.');
                return;
            }

            toast.success('User updated successfully');
            setTimeout(() => {
                window.location.reload();
            });
        } catch (err) {
            console.error(err); // Log for debugging
            toast.error(err?.message || 'Unexpected error occurred.');
        }
    };


    const login = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/auth/login`, {
                method: 'POST',
                body: form.value,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (error.value) {
                throw error.value
            }
            authToken.value = data.value.access_token
            toast.success('Login successful')
            navigateTo('/dashboard')
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const logout = async => {

        token.value = null
        navigateTo('/auth/login')
    }

    interface JwtPayload {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string,
        profile_picture: string
        date_of_birth: string
        phone: string
        iat: number;
        exp: number;
    }

    const payloadToken = useCookie('session_token', {
        sameSite: 'lax',
        secure: false, // true if using HTTPS
    })

    const user = computed<JwtPayload | null>(() => {

        if (!payloadToken.value) {
            return null
        }
        try {
            return jwtDecode<JwtPayload>(payloadToken.value)
        } catch (err) {
            return null
        }
    })


    const token = useCookie('session_token', {
        sameSite: 'lax',
        secure: false,
    })

    const forgetPassword = async () => {
        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/forgot-password`, {
                method: 'POST',
                body: reset.value,
            })
            if (error.value) {
                toast.error(error.value.data?.message);
                return;
            }
            toast.success('A Reset password link has been sent to your email successfully');
        } catch (error) {
            toast.error(error.data.message || 'An error occurred while sending the reset password email.')
        }

    }

    const resetAccountPassword = async () => {
        if (resetPassword.value.newPassword !== resetPassword.value.confirmNewPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }
        if (!resetPassword.value.token) {
            const route = useRoute()
            resetPassword.value.resetToken = route.query.token as string
        }

        try {
            const {data, error} = await useFetch(useRuntimeConfig().public.api + `/users/reset-password`, {
                method: 'PUT',
                body: resetPassword.value,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (error.value) {
                toast.error(error.value.data?.message || 'An error occurred while resetting the password.');
                return;
            }
            toast.success('Password reset successfully');
            navigateTo('/auth/login')
        } catch (err) {
            toast.error(err?.message || 'An error occurred while resetting the password.');
        }
    }

    return {
        form,
        input,
        register,
        login,
        authToken,
        logout,
        user,
        userById,
        updateUser,
        changePassword,
        password,
        reset,
        forgetPassword,
        resetPassword,
        resetAccountPassword,
        finalChangePassword
    }
}


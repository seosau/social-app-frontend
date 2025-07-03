import { authApi } from "@/apis/auth.api"
import { clearUser } from "@/lib/redux/features/userSlice"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const useLogout = () => {
    const dispatch = useDispatch()

    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            dispatch(clearUser())
            toast.success('Logout successfully!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
        },
        onError: () => {
            toast.error('Logout failed!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
        }
    })

    return {
        logout: logoutMutation.mutate,
        isPending: logoutMutation.isPending,
    }
}
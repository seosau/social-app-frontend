import { instance } from "@/lib/axios"

const BASE_URL = '/notification'

export const notifApi = {
    deleteNotif: async (id: string) => {
        const resp = await instance.delete(`${BASE_URL}/${id}`)
        return resp.data
    },

    markAsReadNotif: async (id: string) => {
        const resp = await instance.patch(`${BASE_URL}/${id}/read`)
        return resp.data
    }
}
import { INotification } from "@/interfaces/notification.interfaces";
import { instance } from "@/lib/axios"

const GET_NOTIF_URL = '/user/notifications';

export const userApi = {
    getNotifications: async():Promise<INotification[]> => {
        const resq = await instance.get(GET_NOTIF_URL)

        return resq.data || []
    }
}
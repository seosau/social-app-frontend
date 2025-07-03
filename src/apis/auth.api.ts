import { IUser } from "@/interfaces/user.interfaces"
import { instance } from "@/lib/axios"

export const authApi = {
    me: async (): Promise<IUser> => {
        return (await instance.get('/auth/me')).data.user
    },
    logout: async(): Promise<string> => {
        return (await instance.post('/auth/logout')).data.message
    }
}
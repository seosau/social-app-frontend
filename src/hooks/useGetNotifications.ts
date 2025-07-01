import { userApi } from "@/apis/user.api"
import { INotification } from "@/interfaces/notification.interfaces"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useGetNotifications = () => {
    const { data, refetch } = useQuery({
        queryKey: ['getNotifications'],
        queryFn: () => userApi.getNotifications(),
    })

    const [notifList, setNotifList] = useState<INotification[]>();

    useEffect(() => {
        if (data && data.length > 0) {
            setNotifList(data);
        }
    }, [data]);

    return {
        notifList,
        setNotifList,
        refetch
    }
}
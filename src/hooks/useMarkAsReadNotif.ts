import { notifApi } from "@/apis/notif.api";
import { INotification } from "@/interfaces/notification.interfaces";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useMarkAsReadNotif = () => {
    const [idToMarkAsRead, setIdToMarkAsRead] = useState<string>('');
    const markAsReadMutation = useMutation<INotification, Error>({
        mutationKey: ['markAsReadNotif'],
        mutationFn: () => notifApi.markAsReadNotif(idToMarkAsRead),
        onSuccess: (data) => {
            setMarkedAsRead(data);
            queryClient.invalidateQueries({queryKey: ['getNotifications']})
        }
    })

    const [markedAsRead, setMarkedAsRead] = useState<INotification>();
    
    useEffect(() => {
        if (idToMarkAsRead) {
            markAsReadMutation.mutate();
        }
    }, [idToMarkAsRead]);

    return {
        idToMarkAsRead,
        setIdToMarkAsRead,
        markedAsRead,
        setMarkedAsRead
    }
}
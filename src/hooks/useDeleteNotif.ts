import { notifApi } from "@/apis/notif.api";
import { INotification } from "@/interfaces/notification.interfaces";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useDeleteNotif = () => {
    const [idToDelete, setIdToDelete] = useState<string>('');
    const deleteNotifMutation = useMutation({
        mutationKey: ['deleteNotif'],
        mutationFn: () => notifApi.deleteNotif(idToDelete),
        onSuccess: (data) => {
            setDeletedNotif(data)
            queryClient.invalidateQueries({
                queryKey: ['getNotifications']
            })
        }
    })

    const [deletedNotif, setDeletedNotif] = useState<INotification>();
    
    useEffect(() => {
        if(!!idToDelete) {
            deleteNotifMutation.mutate();
        }
    }, [idToDelete])

    return {
        idToDelete,
        setIdToDelete,
        deletedNotif,
        setDeletedNotif
    }
}
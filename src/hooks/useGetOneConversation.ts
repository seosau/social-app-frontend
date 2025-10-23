'use client'

import { chatApi } from "@/apis/chat.api";
import { IChat } from "@/interfaces/chat.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGetOneConversation () {
    const [converId, setConverId] = useState<string>("")

    const queryData = useQuery({
        queryKey: ['oneConversation'],
        queryFn: () => chatApi.getOneConversation(converId),
    })

    const [oneConversation, setOneConversation] = useState<IChat>()

    useEffect(() => {
        if(!!queryData.data) {
            setOneConversation(queryData.data)
        }
    }, [queryData])

    useEffect(() => {
        if(!!converId) {
            queryData.refetch()
        }
    }, [converId])
    return {
        oneConversation,
        setOneConversation,
        converId,
        setConverId
    }
}
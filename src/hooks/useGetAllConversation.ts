'use client'

import { chatApi } from "@/apis/chat.api";
import { IConversationList } from "@/interfaces/chat.interfaces";
import { IStory } from "@/interfaces/story.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGetAllConversation () {
    const queryData = useQuery({
        queryKey: ['allConversation'],
        queryFn: () => chatApi.getConversations(),
    })

    const [allConversation, setAllConversation] = useState<IConversationList>()

    useEffect(() => {
        if(!!queryData.data) {
            setAllConversation(queryData.data)
        }
    }, [queryData])

    return {
        allConversation,
        setAllConversation
    }
}
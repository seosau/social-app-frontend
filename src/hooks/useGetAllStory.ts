'use client'

import { storyApi } from "@/apis/story.api";
import { IStory } from "@/interfaces/story.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGetAllStory () {
    const queryData = useQuery({
        queryKey: ['allStory'],
        queryFn: () => storyApi.getAll(),
    })

    const [allStory, setAllStory] = useState<IStory[]>()

    useEffect(() => {
        if(!!queryData.data) {
            setAllStory(queryData.data)
        }
    }, [queryData])

    return {
        allStory,
        setAllStory
    }
}
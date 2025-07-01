"use client";

import { postApi } from "@/apis/post.api";
import { IPost } from "@/interfaces/post.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react"

export const useGetPost = () => {
  const params = useParams<{slug: string}>();
  const id = useMemo(() => {
    return params.slug
  }, [params.slug]);

    const [idToGet, setIdToGet] = useState<string>(id);
    console.log('0000000000000000000000000', idToGet, id)
    const {data, refetch} = useQuery({
        queryKey: ['getOne', idToGet],
        queryFn: () => postApi.getOne(idToGet),
        enabled: !!idToGet,
    })

    useEffect(() => {
        console.log('2222222222222222222', idToGet, id)
        if(!!idToGet) {
            refetch();
        }
    }, [idToGet])

    const [post, setPost] = useState<IPost>();
    useEffect(() => {
        if(!!data) {
            setPost(data);
        }
    }, [data])

    return {
        post,
        setPost,
        idToGet,
        setIdToGet
    }
}
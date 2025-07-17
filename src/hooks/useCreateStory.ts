import { storyApi } from "@/apis/story.api";
import { IStory } from "@/interfaces/story.interfaces";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useCreateStory() {
    const [formData, setFormData] = useState<FormData>()
    const [storyCreated, setStoryCreated] = useState<IStory>()
    const createMutation = useMutation({
        mutationKey: ['createStory'],
        mutationFn: (data:FormData) => storyApi.create(data),
        onSuccess: (data) => {
            setStoryCreated(data)
            queryClient.invalidateQueries({
                queryKey: ['allStory']
            })
            toast.success('Create successfully!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
        },
        onError: () => {
            toast.error('Create failed!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
        }
    })

    useEffect(() => {
        if(!!formData) {
            createMutation.mutate(formData)
        }
    }, [formData])

    return {
        setFormData,
        storyCreated,
        createStoryMuta: createMutation.mutate
    }
}
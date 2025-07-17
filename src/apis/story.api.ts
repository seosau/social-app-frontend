import { IStory } from "@/interfaces/story.interfaces"
import { instance } from "@/lib/axios"

export const storyApi = {
    getAll: async (firtId?: string):Promise<IStory[]> => {
        const resq = await instance.get('/story', {params: firtId ? {firtId} : {}})
        return resq.data.data.stories
    },
    create: async(formData: FormData): Promise<IStory> => {
        const resq = await instance.post('/story', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return resq.data.data.story
    }
}
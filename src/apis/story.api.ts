import { IStory } from "@/interfaces/story.interfaces"
import { instance } from "@/lib/axios"

export const storyApi = {
    getAll: async ():Promise<IStory[]> => {
        const resq = await instance.get('/story')
        return resq.data.data.stories
    }
}
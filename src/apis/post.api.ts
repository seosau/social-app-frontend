import { instance } from "@/lib/axios";

export const postApi = {
    getAll: async(keyword: string = "") => {
        const url = keyword.trim() ? `/post/search/${keyword}` : '/post';
        return instance.get(url);
    },
    delete: async(postId: string) => {
        return instance.delete(`/post/${postId}`);
    },
    toggleLike: async(postId: string) => {
        return instance.post(`/post/${postId}/toggleLike`);
    }
}
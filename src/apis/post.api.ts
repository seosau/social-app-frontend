import { ICommentCreateFormData, ICommentListExtra, IGetCommentRes } from "@/interfaces/comment.interfaces";
import { IPost } from "@/interfaces/post.interfaces";
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
    },
    getComments: async(postId: string): Promise<IGetCommentRes> => {
        return (await instance.get(`/post/comments/${postId}`)).data
    },
    createComment: async(data: ICommentCreateFormData): Promise<ICommentListExtra []> => {
        return (await instance.post(`/post/comment`, data)).data
    },
    getOne: async(postId: string): Promise<IPost> => {
        return (await instance.get(`/post/${postId}`)).data
    }
}
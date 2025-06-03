import { IUser } from "./user.interfaces";

export interface IPost {
    id: string,
    access: string,
    content: string,
    image: string,
    user: IUser,
    likedBy: [IUser],
    likeCount: number
}

export interface IPostFormData {
    access: string,
    content: string,
    image: File | null,
}
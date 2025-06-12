import { IUser } from "./user.interfaces";

export interface ICommentListExtra {
    content: string,
    createdAt: string,
    deletedAt: string,
    id: string,
    postId: string,
    updatedAt: string,
    user: IUser
    parentId: string,
    childs?: ICommentListExtra[]
}

export interface IGetCommentRes {
    parentWithChilds: ICommentListExtra[],
    total: number,
}

export interface ICommentCreateFormData {
    postId: string;
    // userId: string;
    content: string;
    parentId: string | null;
}


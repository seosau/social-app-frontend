import { IPost } from "./post.interfaces";
import { IUser } from "./user.interfaces";

export interface INotification {
    user: IUser
    post: IPost
    notifType: 'like' | 'comment' | 'share'
    createdAt: string
}

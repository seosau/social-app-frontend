import { IPost } from "./post.interfaces";
import { IUser } from "./user.interfaces";

export interface INotification {
  id: string;
  postId: string;
  creatorId: string;
  creatorAvtUrl: string;
  receiverId: string;
  notifType: 'like' | 'comment' | 'share';
  message: string;
  isRead: boolean,
  createdAt: string;
  deletedAt: string;
}

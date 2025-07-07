import { IUser } from "./user.interfaces";

export interface IStory {
    id: string;
    image: string;
    createdAt: string;
    updateAt: string;
    userId: string;
    deletedAt: string | null;
    user: IUser    
}
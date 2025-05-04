import { IUser } from "./user.interfaces";

export interface IPost {
    id: string,
    access: string,
    content: string,
    image: string,
    user: IUser
}
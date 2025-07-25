import { IUser } from "./user.interfaces";

export interface IConversation {
    id: string;
    name: string;
    type: 'PERSON_TO_PERSON' | 'GROUP_CONVERSATION';
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    members: IUser[];
}

export interface IMessage {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface IChat {
    id: string;
    conversation: IConversation;
    messages: IMessage[];
    // lastMessage?: IMessage | null;
    // unreadCount: number;
    createdAt: string;
    updatedAt: string;
}
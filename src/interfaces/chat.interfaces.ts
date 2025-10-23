import { IUser } from "./user.interfaces";

export interface IConversation {
  id: string;
  memberIds: string[];
  type: ConversationType;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  members: IUser[];
}

export interface IMessage {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}

export interface IChat {
    conversation: IConversation;
    messageList: IMessage[];
}

export interface IConversationList {
    conversations: IChat[];
}

export enum ConversationType {
  CONVERSATION_UNSPECIFIED = 0,
  PERSON_TO_PERSON = 1,
  GROUP_CONVERSATION = 2,
  UNRECOGNIZED = -1,
}
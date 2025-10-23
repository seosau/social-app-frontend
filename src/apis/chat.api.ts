import { instance } from "@/lib/axios"

export const chatApi = {
    async createConversation(memberIds: string[], type: 'PERSON_TO_PERSON' | 'GROUP_CONVERSATION') {
        const response = await instance.post('/chat', { memberIds, type });
        return response.data;
    },
    async getConversations() {
        const response = await instance.get('/chat');
        return response.data;
    },
    async getOneConversation(conversationId: string) {
        const response = await instance.get(`/chat/${conversationId}`);
        return response.data;
    },
    async sendMessage(conversationId: string, content: string) {
        const response = await instance.post(`/chat/send`, { content, conversationId });
        return response.data;
    }
}
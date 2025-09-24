export interface Message {
    id: string;
    chat_id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

export interface Notification {
    id: string,
    from_user_id: string,
    name: string,
    avatar: string
}
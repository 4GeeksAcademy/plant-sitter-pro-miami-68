import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

const ChatApp = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch(`/api/conversations?user_id=${store.user.id}`);
            const data = await response.json();
            setConversations(data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const response = await fetch(`/api/messages/${conversationId}`);
            const data = await response.json();
            setMessages(data);
            setSelectedConversation(conversationId);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (messageText) => {
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversationId: selectedConversation,
                    senderId: store.user.id,
                    text: messageText,
                }),
            });
            const newMessage = await response.json();
            setMessages([...messages, newMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-app">
            <ChatList users={conversations} onSelectUser={fetchMessages} />
            {selectedConversation && (
                <>
                    <ChatWindow messages={messages} />
                    <MessageInput onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    );
};

export default ChatApp;

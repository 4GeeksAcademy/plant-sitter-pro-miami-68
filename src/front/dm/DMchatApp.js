import React, { useState, useEffect } from 'react';
import DMchatList from './DMchatList';
import DMchatWindow from './DMchatWindow';
import DMchatInput from './DMchatInput';

const DMchatApp = () => {
    const [conversations, setConversations] = useState([]);
    const [DMchats, setDMchats] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch(`/conversations?user_id=${store.user.id}`);
            const data = await response.json();
            setConversations(data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    const fetchDMchats = async (conversationId) => {
        try {
            const response = await fetch(`/DMchat/${conversationId}`);
            const data = await response.json();
            setDMchats(data);
            setSelectedConversation(conversationId);
        } catch (error) {
            console.error("Error fetching DMchats:", error);
        }
    };

    const handleSendDMchat = async (DMchatText) => {
        try {
            const response = await fetch('/DMchat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversationId: selectedConversation,
                    senderId: store.user.id,
                    text: DMchatText,
                }),
            });
            const newDMchat = await response.json();
            setDMchats([...DMchats, newDMchat]);
        } catch (error) {
            console.error("Error sending DMchat:", error);
        }
    };

    return (
        <div className="DMchat-app">
            <DMchatList users={conversations} onSelectUser={fetchDMchats} />
            {selectedConversation && (
                <>
                    <DMchatWindow DMchats={DMchats} />
                    <DMchatInput onSendDMchat={handleSendDMchat} />
                </>
            )}
        </div>
    );
};

export default DMchatApp;

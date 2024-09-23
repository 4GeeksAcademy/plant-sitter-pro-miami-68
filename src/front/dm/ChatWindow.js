import React from 'react';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            <h3>Messages</h3>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;

import React, { useState } from "react";
// import '../../styles/MessagePage.css';  // Link to your custom CSS

const ChatPopup = ({ closeChat }) => {
    const [activeChat, setActiveChat] = useState(null); // Currently active chat

    const existingChats = [
        { id: 1, name: "RicK Sanchez", lastMessage: "I'm the greatest scientist in the universe" },
        { id: 2, name: "Morty Smith", lastMessage: "Rick, why are you always drunk?" },
    ];

    return (
        <div className="chat-popup">
            <div className="chat-sidebar">
                <h2>Chats</h2>
                <ul>
                    {existingChats.map(chat => (
                        <li key={chat.id} onClick={() => setActiveChat(chat)}>
                            <div className="chat-info">
                                <strong>{chat.name}</strong>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-main">
                {activeChat ? (
                    <div className="chat-window">
                        <div className="chat-header">
                            <strong>{activeChat.name}</strong>
                        </div>
                        <div className="chat-body">
                            {/* Message bubbles will go here */}
                        </div>
                        <div className="chat-input-area">
                            <input type="text" placeholder="Type a message" />
                            <button>📷</button> {/* Button to attach images/files */}
                            <button>😊</button> {/* Emoji button */}
                            <button>🎤</button> {/* Voice message button */}
                            <button>📞</button> {/* Video call button */}
                        </div>
                    </div>
                ) : (
                    <div className="no-chat-selected">
                        <p>Select a conversation to start chatting!</p>
                    </div>
                )}
            </div>
            <button className="close-btn" onClick={closeChat}>✕</button>
        </div>
    );
};

const MessagePage = () => {
    const [isChatOpen, setChatOpen] = useState(false);

    return (
        <div>
            <button className="open-chat-btn" onClick={() => setChatOpen(true)}>
                Open Chat
            </button>
            {isChatOpen && <ChatPopup closeChat={() => setChatOpen(false)} />}
        </div>
    );
};

export default MessagePage;

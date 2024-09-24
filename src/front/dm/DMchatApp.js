import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://congenial-space-enigma-5gvj4px9wpg5c4949-5000.app.github.dev/');  // Update as necessary

const DMChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                message: message,
                sender: 'You',  // Example: Update this based on logged-in user
                time: new Date().toLocaleTimeString(),  // Adding timestamp
            };

            socket.emit('send_message', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');  // Clear the input field
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="dm-chat-app" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <div
                className="dm-chat-window"
                style={{
                    backgroundImage: 'url(https://example.com/background-image.jpg)', // Replace with your actual image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #ccc',
                    padding: '10px',
                    maxHeight: '400px',
                    overflowY: 'scroll',
                    borderRadius: '10px',
                    position: 'relative',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start', // Align based on sender
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.sender === 'You' ? '#dcf8c6' : '#ffffff', // Different colors for sender/receiver
                                padding: '10px 15px',
                                borderRadius: '20px',
                                maxWidth: '70%',
                                wordBreak: 'break-word',
                                textAlign: 'left',
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <div>
                                <strong>{msg.sender}:</strong> {msg.message}
                            </div>
                            <div style={{ fontSize: '0.8em', color: 'gray', textAlign: 'right' }}>{msg.time}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dm-chat-input" style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default DMChatApp;

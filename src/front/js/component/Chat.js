import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Chat.css'; // Ensure this path is correct

function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        setMessages([...messages, { from: 'user', text: text }]); // Display user's message immediately

        try {
            const response = await fetch('https://api.example.com/chat', { // Replace with your bot's API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            setMessages(msgs => [...msgs, { from: 'bot', text: data.message }]);
        } catch (error) {
            setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, there was an error communicating with the bot.' }]);
            console.error('Chat bot error:', error);
        }
        setInput('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage(input);
            event.preventDefault(); // Prevent default to avoid any form submission behavior
        }
    };

    return (
        <div className="chat-container">
            <button className="chat-icon" onClick={toggleChat}>💬</button>
            {isOpen && (
                <div className="chat-box">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.from === 'user' ? 'user-message' : 'bot-message'}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                        />
                        <button onClick={() => sendMessage(input)}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;

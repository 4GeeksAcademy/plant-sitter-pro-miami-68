import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Chat.css';
import io from 'socket.io-client';

function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    
    useEffect(() => {
       
        socketRef.current = io('https://congenial-space-enigma-5gvj4px9wpg5c4949-3001.app.github.dev');  

       
        socketRef.current.on('receive_message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: newMessage }]);
        });

       
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    // Send message function (using socket instead of API)
    const sendMessage = (text) => {
        if (!text.trim()) return;

        // Emit the message to the server via socket
        socketRef.current.emit('send_message', text);

        // Display user's message immediately
        setMessages([...messages, { from: 'user', text: text }]);

        setInput('');  // Clear the input field after sending
    };

    const socket = io('https://congenial-space-enigma-5gvj4px9wpg5c4949-3001.app.github.dev');

socket.on('receive_message', (message) => {
    console.log('New message received:', message);
});


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage(input);
            event.preventDefault();
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
                            className="chat-input"
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

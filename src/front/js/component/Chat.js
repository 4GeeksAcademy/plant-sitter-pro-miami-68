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
        // Connect to the Socket.IO server
        socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
            transports: ['websocket'],
            secure: true
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socketRef.current.on('receive_message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: newMessage }]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = (text) => {
        if (!text.trim()) return;

        // Emit the message to the server via socket
        socketRef.current.emit('send_message', text);

        // Display user's message immediately
        setMessages((prevMessages) =>  [...prevMessages, { from: 'user', text: text }]);

        setInput('');  // Clear the input field after sending
    };

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
                            <div 
                                key={index} 
                                className={msg.from === 'user' ? 'user-message' : 'bot-message'}
                                dangerouslySetInnerHTML={msg.from === 'bot' ? { __html: msg.text } : { __html: msg.text }}
                            />
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

import React from 'react';

const DMchatWindow = ({ DMchats }) => {
    return (
        <div className="DMchat-window">
            <h3>Messages</h3>
            <div className="DMchats">
                {DMchats.map((chat, index) => (
                    <div key={index} className={`message ${chat.sender === 'me' ? 'sent' : 'received'}`}>
                        <p>{chat.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DMchatWindow;

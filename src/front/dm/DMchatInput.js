import React, { useState } from 'react';

const DMchatInput = ({ onSendDMchat }) => {
    const [DMchat, setDMchat] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (DMchat.trim()) {
            onSendDMchat(DMchat);
            setDMchat('');  // Clear input after sending
        }
    };

    return (
        <form onSubmit={handleSubmit} className="DMchat-input">
            <input
                type="text"
                value={DMchat}
                onChange={(e) => setDMchat(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default DMchatInput;

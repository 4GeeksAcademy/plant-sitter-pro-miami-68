import React from 'react';

const ChatList = ({ users, onSelectUser }) => {
    return (
        <div className="chat-list">
            <h3>Conversations</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => onSelectUser(user.id)}>
                        {user.user1} - {user.user2}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;

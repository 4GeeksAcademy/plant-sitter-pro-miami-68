import React from 'react';

const DMchatList = ({ users, onSelectUser }) => {
    return (
        <div className="DMchat-list">
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

export default DMchatList;

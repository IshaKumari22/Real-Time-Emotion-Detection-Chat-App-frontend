import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access');

        axios.get('http://127.0.0.1:8000/api/account/profile/', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res => setUserId(res.data.id));

        axios.get('http://127.0.0.1:8000/api/account/users/', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res => setUsers(res.data));
    }, []);

    const filteredUsers = users.filter(user => user.id !== userId);

    if (selectedUser) {
        return <ChatBox threadId={selectedUser.id} />;
    }

    return (
        <div>
            <h3>Available Users</h3>
            {filteredUsers.map(user => (
                <div key={user.id} style={{ margin: '10px', cursor: 'pointer' }}
                     onClick={() => setSelectedUser(user)}>
                    {user.username}
                </div>
            ))}
        </div>
    );
};

export default UserList;

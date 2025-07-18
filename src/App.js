import React, { useState } from 'react';
import Login from './components/Login';
import ChatBox from './components/ChatBox';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

    return (
        <div>
            <h1>Real-Time Emotion Chat</h1>
            {isLoggedIn ? <ChatBox /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </div>
    );
};

export default App;

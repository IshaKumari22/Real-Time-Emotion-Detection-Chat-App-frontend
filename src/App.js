import React, { useState } from 'react';
import Login from './components/Login';
import ChatBox from './components/ChatBox';
import UserList from './components/UserList';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
    const handleLogout=()=>{
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setIsLoggedIn(false);
      alert('Logged out successfully!');
    }

    return (
        <div>
            <h1>Real-Time Emotion Chat</h1>
            {isLoggedIn ? (<>
            <button onClick={handleLogout}>Logout
            </button>
           {/* <ChatBox threadId={1} /> */}
           <UserList /> 
            </> 
          ): (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
        </div>
    );
};

export default App;

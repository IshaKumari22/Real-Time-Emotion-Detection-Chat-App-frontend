
import React, { useState } from 'react';
import api from '../services/api';

function ChatBox() {
    const [message, setMessage] = useState('');
    const [emotion, setEmotion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
const emotionStyles = {
  happy: { emoji: "😊", color: "#d4edda" },          // light green
  sad: { emoji: "😢", color: "#d1ecf1" },            // light blue
  angry: { emoji: "😡", color: "#f8d7da" },          // light red
  neutral: { emoji: "😐", color: "#e2e3e5" },        // grayish
  fear: { emoji: "😨", color: "#fff3cd" },           // light yellow
  surprise: { emoji: "😲", color: "#fce4ec" },       // light pink
};
    const handleSend = async () => {
        if (!message) return;
        try {
            const res = await api.post('api/predict/', { text: message });
            const predictedEmotion = res.data.emotion;
            setEmotion(predictedEmotion);

            // Update chat history with message + emotion
            setChatHistory(prev => [...prev, { text: message, emotion: predictedEmotion }]);
            setMessage('');
        } catch (err) {
            alert('Error fetching emotion');
        }
    };

    const getStyle = (emotion) => {
        return {
            backgroundColor: emotionStyles[emotion]?.color || 'white',
            padding: '8px',
            margin: '5px 0',
            borderRadius: '8px',
        };
    };

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
            <button onClick={handleSend}>Send</button>

            {chatHistory.map((msg, idx) => (
                <div key={idx} style={getStyle(msg.emotion)}>
                    {emotionStyles[msg.emotion]?.emoji} {msg.text} ({msg.emotion})
                </div>
            ))}
        </div>
    );
}

export default ChatBox;







// import React, { useEffect, useState } from 'react';

// const ChatBox = () => {
//     const [socket, setSocket] = useState(null);
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/');
//         ws.onmessage = (e) => {
//             const data = JSON.parse(e.data);
//             setMessages(prev => [...prev, data]);
//         };
//         setSocket(ws);

//         return () => ws.close();
//     }, []);

//     const sendMessage = () => {
//         if (socket && message) {
//             socket.send(JSON.stringify({ message }));
//             setMessage('');
//         }
//     };

//     const emotionStyles = {
//         happy: { emoji: "😊", color: "lightgreen" },
//         sad: { emoji: "😢", color: "lightblue" },
//         angry: { emoji: "😠", color: "lightcoral" },
//         neutral: { emoji: "😐", color: "lightgray" },
//     };

//     return (
//         <div>
//             <textarea value={message} onChange={e => setMessage(e.target.value)} />
//             <button onClick={sendMessage}>Send</button>
//             {messages.map((msg, idx) => (
//                 <div key={idx} style={{
//                     backgroundColor: emotionStyles[msg.emotion]?.color || 'white',
//                     padding: '8px', margin: '5px', borderRadius: '10px'
//                 }}>
//                     {emotionStyles[msg.emotion]?.emoji || ''} {msg.message} ({msg.emotion})
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ChatBox;

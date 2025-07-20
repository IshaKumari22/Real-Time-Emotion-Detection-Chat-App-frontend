
// import React, { useState } from 'react';
// import api from '../services/api';

// function ChatBox() {
//     const [message, setMessage] = useState('');
//     const [emotion, setEmotion] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
// const emotionStyles = {
//   happy: { emoji: "😊", color: "#d4edda" },          // light green
//   sad: { emoji: "😢", color: "#d1ecf1" },            // light blue
//   angry: { emoji: "😡", color: "#f8d7da" },          // light red
//   neutral: { emoji: "😐", color: "#e2e3e5" },        // grayish
//   fear: { emoji: "😨", color: "#fff3cd" },           // light yellow
//   surprise: { emoji: "😲", color: "#fce4ec" },       // light pink
// };
//     const handleSend = async () => {
//         if (!message) return;
//         try {
//             const res = await api.post('api/predict/', { text: message });
//             const predictedEmotion = res.data.emotion;
//             setEmotion(predictedEmotion);

//             // Update chat history with message + emotion
//             setChatHistory(prev => [...prev, { text: message, emotion: predictedEmotion }]);
//             setMessage('');
//         } catch (err) {
//             alert('Error fetching emotion');
//         }
//     };

//     const getStyle = (emotion) => {
//         return {
//             backgroundColor: emotionStyles[emotion]?.color || 'white',
//             padding: '8px',
//             margin: '5px 0',
//             borderRadius: '8px',
//         };
//     };

//     return (
//         <div>
//             <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
//             <button onClick={handleSend}>Send</button>

//             {chatHistory.map((msg, idx) => (
//                 <div key={idx} style={getStyle(msg.emotion)}>
//                     {emotionStyles[msg.emotion]?.emoji} {msg.text} ({msg.emotion})
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ChatBox;







import React, { useEffect, useState } from 'react';

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/');
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages(prev => [...prev, data]);
        };
        setSocket(ws);
        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

  const emotionStyles = {
    happy: { emoji: "😊", color: "lightgreen" },
    joy: { emoji: "😄", color: "lightgreen" },
    sad: { emoji: "😢", color: "lightblue" },
    sadness: { emoji: "😭", color: "lightblue" },
    angry: { emoji: "😡", color: "lightcoral" },
    anger: { emoji: "🔥", color: "lightcoral" },
    surprise: { emoji: "😲", color: "lightyellow" },
    fear: { emoji: "😨", color: "lightgray" },
    delighted: { emoji: "🥳", color: "lightgreen" },
    grateful: { emoji: "🙏", color: "lightgreen" },
};

    const getEmoji = (emotion) => emotionStyles[emotion]?.emoji || '💬';
    const getColor = (emotion) => emotionStyles[emotion]?.color || 'white';

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
            <h2>Emotion Chat</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                style={{ width: '100%', marginBottom: '10px', fontSize: '16px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px 20px', fontSize: '16px' }}>Send</button>

            <div style={{ marginTop: '20px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        backgroundColor: getColor(msg.emotion),
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        fontSize: '18px'
                    }}>
                        {getEmoji(msg.emotion)} <strong>{msg.message}</strong> ({msg.emotion || "unknown"})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;

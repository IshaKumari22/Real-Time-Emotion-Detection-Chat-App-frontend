






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
//         if (socket && message.trim() !== '') {
//             socket.send(JSON.stringify({ message }));
//             setMessage('');
//         }
//     };

//   const emotionStyles = {
//     happy: { emoji: "😊", color: "lightgreen" },
//     joy: { emoji: "😄", color: "lightgreen" },
//     sad: { emoji: "😢", color: "lightblue" },
//     sadness: { emoji: "😭", color: "lightblue" },
//     angry: { emoji: "😡", color: "lightcoral" },
//     anger: { emoji: "🔥", color: "lightcoral" },
//     surprise: { emoji: "😲", color: "lightyellow" },
//     fear: { emoji: "😨", color: "lightgray" },
//     delighted: { emoji: "🥳", color: "lightgreen" },
//     grateful: { emoji: "🙏", color: "lightgreen" },
// };

//     const getEmoji = (emotion) => emotionStyles[emotion]?.emoji || '💬';
//     const getColor = (emotion) => emotionStyles[emotion]?.color || 'white';

//     return (
//         <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
//             <h2>Emotion Chat</h2>
//             <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows={3}
//                 style={{ width: '100%', marginBottom: '10px', fontSize: '16px' }}
//             />
//             <button onClick={sendMessage} style={{ padding: '10px 20px', fontSize: '16px' }}>Send</button>

//             <div style={{ marginTop: '20px' }}>
//                 {messages.map((msg, idx) => (
//                     <div key={idx} style={{
//                         backgroundColor: getColor(msg.emotion),
//                         padding: '10px',
//                         marginBottom: '10px',
//                         borderRadius: '8px',
//                         fontSize: '18px'
//                     }}>
//                         {getEmoji(msg.emotion)} <strong>{msg.message}</strong> ({msg.emotion || "unknown"})
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChatBox;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBox = ({ threadId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const token = localStorage.getItem('access');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/chat/threads/${threadId}/messages/`, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res => setMessages(res.data));

        // const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${threadId}/`);
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${threadId}/?token=${token}`);
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("Received:", data);
            setMessages(prev => [...prev, data]);
        };
        setSocket(ws);

        return () => ws.close();
    }, [threadId]);

    const sendMessage = () => {
        if (socket && message.trim()) {
            console.log("Sending:", message);
            socket.send(JSON.stringify({ message }));
            setMessage('');  // ✅ Clear input box after send
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h3>Chat (Thread {threadId})</h3>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        marginBottom: '10px',
                        backgroundColor: '#eee',
                        padding: '8px',
                        borderRadius: '5px'
                    }}>
                        <div>{msg.message || msg.content}</div>
                        {msg.emotion && <small>({msg.emotion})</small>}
                    </div>
                ))}
            </div>
            <textarea
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '100%' }}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage} style={{ marginTop: '5px' }}>Send</button>
        </div>
    );
};

export default ChatBox;

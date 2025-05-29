'use client';

import React from 'react';
// import { useState, useEffect, useRef } from 'react';
// import { useSession } from 'next-auth/react';

// interface Message {
//   id: string;
//   senderId: string;
//   receiverId: string;
//   content: string;
//   timestamp: string;
// }

const ChatComponent: React.FC<{ receiverId: string }> = () => {
// const ChatComponent: React.FC<{ receiverId: string }> = ({ receiverId }) => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const wsRef = useRef<WebSocket | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Initialize WebSocket connection
//     const ws = new WebSocket(`ws://your-websocket-server-url?userId=${session?.user?.id}`);
    
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     ws.onmessage = (event) => {
//       const message: Message = JSON.parse(event.data);
//       if (message.senderId === receiverId || message.receiverId === receiverId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     ws.onclose = () => {
//       console.log('WebSocket disconnected');
//     };

//     return () => {
//       ws.close();
//     };
//   }, [session, receiverId]);

//   useEffect(() => {
//     // Scroll to the latest message
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!input.trim() || !session?.user?.id || !wsRef.current) return;

//     const message: Message = {
//       id: crypto.randomUUID(),
//       senderId: session.user.id,
//       receiverId,
//       content: input,
//       timestamp: new Date().toISOString(),
//     };

//     wsRef.current.send(JSON.stringify(message));
//     setMessages((prev) => [...prev, message]);
//     setInput('');
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* {messages.map((msg) => ( */}
          <div
            // key={msg.id}
            // className={`flex ${
            //   msg.senderId === session?.user?.id ? 'justify-end' : 'justify-start'
            // }`}
          >
            <div
            //   className={`max-w-xs p-3 rounded-lg ${
            //     msg.senderId === session?.user?.id
            //       ? 'bg-blue-500 text-white'
            //       : 'bg-gray-200 text-gray-800'
            //   }`}
            >
              {/* <p>{msg.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p> */}
            </div>
          </div>
        {/* ))} */}
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex space-x-2">
          <input
            type="text"
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            // onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            // onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
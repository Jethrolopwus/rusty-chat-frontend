"use client";
import React, { useEffect, useState, useRef } from 'react';

export default function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Fetch initial messages
    // TODO: Replace with your backend API endpoint
    fetch(`/api/rooms/${roomId}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [roomId]);

  useEffect(() => {
    // Connect to WebSocket for this room
    // TODO: Replace with your WebSocket URL
    ws.current = new WebSocket(`wss://your-backend/ws/rooms/${roomId}`);
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    };
    return () => {
      ws.current && ws.current.close();
    };
  }, [roomId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify({ text: input }));
      setInput('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f4f4f4' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <b>{msg.user || 'User'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8, background: '#fff' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '8px 16px' }}>Send</button>
      </form>
    </div>
  );
} 
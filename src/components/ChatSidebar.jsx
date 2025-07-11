"use client";
import React, { useEffect, useState } from 'react';

export default function ChatSidebar({ onSelectRoom, selectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your backend API endpoint
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ width: 280, borderRight: '1px solid #eee', height: '100vh', overflowY: 'auto', background: '#fafafa' }}>
      <h2 style={{ padding: 16, margin: 0, fontSize: 20 }}>Rooms</h2>
      {loading ? (
        <div style={{ padding: 16 }}>Loading...</div>
      ) : (
        rooms.map(room => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              background: selectedRoom === room.id ? '#e0e7ff' : 'transparent',
              fontWeight: selectedRoom === room.id ? 'bold' : 'normal',
            }}
          >
            {room.name}
          </div>
        ))
      )}
    </div>
  );
} 
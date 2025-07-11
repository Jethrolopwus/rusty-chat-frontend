"use client";

import ChatSidebar from '../../components/ChatSidebar';
import ChatRoom from '../../components/ChatRoom';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for JWT token in localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      }
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatSidebar onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
      <div style={{ flex: 1, borderLeft: '1px solid #eee' }}>
        {selectedRoom ? (
          <ChatRoom roomId={selectedRoom} />
        ) : (
          <div style={{ padding: 32, color: '#888' }}>Select a room to start chatting</div>
        )}
      </div>
    </div>
  );
} 
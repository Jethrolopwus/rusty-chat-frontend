"use client"
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import AddRoomModal from "@/components/AddRoomModal";

const DashboardPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);

  const wsRef = useRef(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
            headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }});
        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await res.json();
        console.log("Fetched rooms:", data);
        setRooms(data.data);
        if (data.length > 0) setSelectedRoom(data[0]);
      } catch (err) {
        setRooms([]);
        setSelectedRoom(null);
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    console.log("Selected room changed:", selectedRoom);
    if (!selectedRoom) return;

    const token = localStorage.getItem("token");
    
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/?room_id=${selectedRoom.id}&token=${token}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    wsRef.current.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        console.warn("Received non-JSON message:", event.data);
        return;
      }
      if (data.type === "message") {
        setMessages((prev) => [
          ...prev,
          {
            id: data.id || Date.now(),
            sender: data.sender || "Unknown",
            content: data.content,
            timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isOwn: false,
          },
        ]);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      wsRef.current && wsRef.current.close();
    };
  }, [selectedRoom]);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleAddRoom = async (roomData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(roomData),
    });
    if (!res.ok) throw new Error("Failed to create room");
    const newRoom = await res.json();
    setRooms((prev) => [...prev, newRoom]);
    setSelectedRoom(newRoom);
  } catch (err) {
    console.error("Failed to create room:", err);
  }
};


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() && wsRef.current && wsRef.current.readyState === 1) {
      const msg = {
        type: "message",
        content: inputValue,
      };
      wsRef.current.send(JSON.stringify(msg));
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "You",
          content: inputValue,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: true,
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <Sidebar
          rooms={rooms}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
          onAddRoom={() => setAddRoomModalOpen(true)}
        />
        <div className="flex-1 flex flex-col bg-white">
          <ChatHeader roomName={selectedRoom ? selectedRoom.name : ""} />
          <MessageList messages={messages} />
          <ChatInput inputValue={inputValue} setInputValue={setInputValue} onSend={handleSendMessage} />
        </div>
      </div>
      <AddRoomModal
        open={addRoomModalOpen}
        onClose={() => setAddRoomModalOpen(false)}
        onCreate={async (roomData) => {
          await handleAddRoom(roomData);
          setAddRoomModalOpen(false);
        }}
      />
    </div>
  );
};

export default DashboardPage;
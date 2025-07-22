"use client";
import { useState, useEffect, useRef } from "react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function PrivateMessagePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        console.log("Fetched users:", data);
        setUsers(data.data || []);
        if (data.data?.length > 0) setSelectedUser(data.data[0]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
        setSelectedUser(null);
      }
    };
    fetchUsers();
  }, []);

  // WebSocket setup
  useEffect(() => {
    if (!selectedUser) return;

    const token = localStorage.getItem("token");
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/?room_id=0&token=${token}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("WebSocket connection opened");
      wsRef.current.send(
        JSON.stringify({ type: "join", userId: selectedUser.id })
      );
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
            timestamp: data.timestamp
              ? new Date(data.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            isOwn: data.sender === "You",
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
      if (wsRef.current) wsRef.current.close();
    };
  }, [selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (
      !inputValue.trim() ||
      !selectedUser ||
      !wsRef.current ||
      wsRef.current.readyState !== 1
    )
      return;

    const message = {
      type: "message",
      content: inputValue,
      recipient_id: selectedUser.id,
      timestamp: new Date().toISOString(),
    };

    wsRef.current.send(JSON.stringify(message));
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "You",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          {/* User List */}
          <aside className="w-full md:w-1/3 border-r border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Users</h2>
            <div className="flex-1 overflow-y-auto space-y-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3
                    ${
                      selectedUser?.id === user.id
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                    }
                  `}
                >
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.username}</span>
                </button>
              ))}
            </div>
          </aside>
          {/* Chat Area */}
          <section className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedUser
                  ? `Chat with ${selectedUser.username}`
                  : "Select a user to start chatting"}
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              <MessageList messages={messages} />
              <ChatInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSend={handleSendMessage}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

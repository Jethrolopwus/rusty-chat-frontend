"use client";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Send,
  Users,
  MessageCircle,
  Search,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function PrivateMessagePage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);
  const router = useRouter();
  const currentUserId = useRef(null);
  const currentUser = useRef(null);

  // Get current user ID and info
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const userData = await res.json();
          currentUserId.current = userData.data?.id;
          currentUser.current = userData.data;
          console.log("Current user set:", userData.data);
        } else {
          console.error(
            "Failed to get current user - response not ok:",
            res.status
          );
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
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

        // Filter out the current logged-in user
        const otherUsers = (data.data || []).filter(
          (user) => user.id !== currentUserId.current
        );
        setUsers(otherUsers);
        setFilteredUsers(otherUsers);

        if (otherUsers.length > 0) setSelectedUser(otherUsers[0]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
        setFilteredUsers([]);
        setSelectedUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Wait a bit for currentUserId to be set
    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  // WebSocket setup with improved message handling
  useEffect(() => {
    if (!selectedUser) return;

    const token = localStorage.getItem("token");
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/?room_id=0&token=${token}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("WebSocket connection opened");
      wsRef.current.send(
        JSON.stringify({
          type: "join_private",
          userId: selectedUser.id,
          currentUserId: currentUserId.current,
        })
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

      if (data.type === "message" || data.type === "private_message") {
        const isRelevantMessage =
          (data.sender_id === selectedUser.id &&
            data.recipient_id === currentUserId.current) ||
          (data.sender_id === currentUserId.current &&
            data.recipient_id === selectedUser.id);

        if (isRelevantMessage) {
          setMessages((prev) => {
            const messageExists = prev.some(
              (msg) =>
                msg.id === data.id ||
                (msg.content === data.content &&
                  msg.timestamp === data.timestamp &&
                  msg.sender === data.sender)
            );

            if (messageExists) return prev;

            return [
              ...prev,
              {
                id: data.id || Date.now(),
                sender:
                  data.sender ||
                  (data.sender_id === currentUserId.current
                    ? "You"
                    : selectedUser.username),
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
                isOwn:
                  data.sender_id === currentUserId.current ||
                  data.sender === "You",
              },
            ];
          });
        }
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

  // Clear messages when switching users
  useEffect(() => {
    setMessages([]);
  }, [selectedUser]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();

    console.log("Send button clicked", {
      inputValue: inputValue.trim(),
      selectedUser: selectedUser?.username,
      wsReadyState: wsRef.current?.readyState,
      currentUserId: currentUserId.current,
    });

    if (
      !inputValue.trim() ||
      !selectedUser ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      console.log("Send blocked:", {
        noInput: !inputValue.trim(),
        noUser: !selectedUser,
        noWs: !wsRef.current,
        wsNotOpen: wsRef.current?.readyState !== WebSocket.OPEN,
      });
      return;
    }

    const message = {
      type: "private_message",
      content: inputValue.trim(),
      recipient_id: selectedUser.id,
      sender_id: currentUserId.current,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending message:", message);

    try {
      wsRef.current.send(JSON.stringify(message));

      // Add message to UI immediately
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "You",
          content: inputValue.trim(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
        },
      ]);

      setInputValue("");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getUserStatus = (user) => {
    // You can implement actual online status logic here
    return Math.random() > 0.5 ? "online" : "offline";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style jsx global>{`
        input::placeholder {
          color: #9ca3af !important;
          opacity: 1 !important;
        }
        input:focus::placeholder {
          color: #6b7280 !important;
        }
      `}</style>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Dashboard</span>
            </button>

            <div className="flex items-center space-x-3">
              <MessageCircle className="text-indigo-600" size={24} />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Private Messages
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="flex h-[calc(100vh-12rem)]">
            {/* Users Sidebar */}
            <aside className="w-80 bg-gradient-to-b from-gray-50 to-gray-100/50 border-r border-gray-200/50 flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200/50">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Users Header */}
              <div className="px-4 py-3 border-b border-gray-200/50">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users size={16} />
                  <span className="font-semibold text-sm">
                    Users ({filteredUsers.length})
                  </span>
                </div>
              </div>

              {/* Users List */}
              <div className="flex-1 overflow-y-auto p-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <UserCircle size={48} className="mb-2 opacity-50" />
                    <p className="text-sm">No users found</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredUsers.map((user) => {
                      const status = getUserStatus(user);
                      return (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 group ${
                            selectedUser?.id === user.id
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                              : "hover:bg-white hover:shadow-md text-gray-700"
                          }`}
                        >
                          <div className="relative">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                selectedUser?.id === user.id
                                  ? "bg-white/20 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                              }`}
                            >
                              {getInitials(user.username)}
                            </div>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${
                                selectedUser?.id === user.id
                                  ? "border-white"
                                  : "border-white"
                              } ${
                                status === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {user.username}
                            </p>
                            <p
                              className={`text-xs truncate ${
                                selectedUser?.id === user.id
                                  ? "text-white/70"
                                  : "text-gray-500"
                              }`}
                            >
                              {status === "online" ? "Online" : "Offline"}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            {/* Chat Area */}
            <section className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {getInitials(selectedUser.username)}
                        </div>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${
                            getUserStatus(selectedUser) === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedUser.username}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {getUserStatus(selectedUser) === "online"
                            ? "Active now"
                            : "Last seen recently"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50/30 to-white">
                    <MessageList messages={messages} />
                    <div className="p-4 border-t border-gray-200/50 bg-white">
                      <form
                        onSubmit={handleSendMessage}
                        className="flex space-x-3"
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={`Message ${selectedUser.username}...`}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                        />
                        <button
                          type="submit"
                          disabled={!inputValue.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <Send size={18} />
                          <span className="font-medium">Send</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                /* No User Selected State */
                <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50/30 to-white">
                  <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Select a user from the sidebar to begin your private
                      conversation
                    </p>
                    {filteredUsers.length === 0 && !isLoading && (
                      <p className="text-sm text-gray-400">
                        No users available to chat with
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

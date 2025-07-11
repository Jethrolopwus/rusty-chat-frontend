import { useState } from "react";
import { MessageCircle, Plus, Settings } from "lucide-react";
import RoomList from "./RoomList";
import AddRoomModal from "./AddRoomModal";

const Sidebar = ({ rooms, selectedRoom, onRoomSelect, onAddRoom }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Rusty Chat</h1>
        </div>
        <button
  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center"
  onClick={onAddRoom}
>
  <Plus className="w-5 h-5 mr-2" />
  New Room
</button>
      </div>

      {/* Room List */}
      <RoomList rooms={rooms} selectedRoom={selectedRoom} onRoomSelect={onRoomSelect} />

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">John Doe</p>
              <p className="text-xs text-gray-600">Online</p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* <AddRoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={onAddRoom}
      /> */}
    </div>
  );
};

export default Sidebar;
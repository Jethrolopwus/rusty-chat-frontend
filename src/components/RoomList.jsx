const RoomList = ({ rooms, selectedRoom, onRoomSelect }) => (
  <div className="flex-1 overflow-y-auto p-4">
    <div className="space-y-2">
      {rooms.map((room) => (
        console.log("Rendering room:", room.id), // Debugging line
        <div
          key={room.id}
          onClick={() => onRoomSelect(room)}
          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
            selectedRoom?.id === room.id
              ? "bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200"
              : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900"># {room.name}</h3>
            {room.unread > 0 && (
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {room.unread}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
        </div>
      ))}
    </div>
  </div>
);

export default RoomList;
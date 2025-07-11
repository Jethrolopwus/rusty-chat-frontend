import { Users } from "lucide-react";

const ChatHeader = ({ roomName }) => (
  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-semibold">#</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{roomName}</h2>
          <p className="text-sm text-gray-600">3 members online</p>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
        <Users className="w-6 h-6" />
      </button>
    </div>
  </div>
);

export default ChatHeader;
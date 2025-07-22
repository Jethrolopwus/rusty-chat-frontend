import { Send } from "lucide-react";

const ChatInput = ({ inputValue, setInputValue, onSend }) => (
  <div className="p-6 border-t border-gray-200 bg-gray-50">
    <form onSubmit={onSend} className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-4 pr-12 bg-white border-2 text-gray-500 placeholder-gray-500 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  </div>
);

export default ChatInput;

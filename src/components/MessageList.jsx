const MessageList = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-6 space-y-4">
    {messages.map((message) => (
      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
          {!message.isOwn && (
            <div className="flex items-center mb-1">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-semibold text-xs">{message.sender.charAt(0)}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{message.sender}</span>
              <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
            </div>
          )}
          <div
            className={`p-4 rounded-2xl ${
              message.isOwn
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-gray-50 text-gray-900"
            }`}
          >
            <p>{message.content}</p>
            {message.isOwn && <p className="text-xs text-purple-100 mt-1 text-right">{message.timestamp}</p>}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;
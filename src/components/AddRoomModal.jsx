import { useState } from "react";

const AddRoomModal = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, is_private: isPrivate });
    setName("");
    setIsPrivate(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-500 text-center">
          Create New Room
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Name</label>
            <input
              type="text"
              className="w-full border text-gray-500 placeholder-gray-500 rounded-lg p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center  text-gray-500">
            <input
              id="private"
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate((v) => !v)}
              className="mr-2"
            />
            <label htmlFor="private" className="text-sm">
              Private Room
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg  text-gray-500 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;

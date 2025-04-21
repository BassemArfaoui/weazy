import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";


function ChatHistory() {
  return (
    <div className="flex flex-col w-full h-full max-h-screen gap-5">
      {/* Header */}
      <h1 className="text-center text-2xl font-bold">Chat History</h1>


      {/* Body */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Search */}
        <div className="w-full px-4 md:px-6">
          <div className="h-[50px] border-2 border-gray-500 flex items-center rounded-2xl">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full h-full bg-transparent outline-none text-white text-lg placeholder:text-gray-400 px-5 font-semibold font-inter"
            />
          </div>
        </div>


        {/* Chat List */}
        <div className="flex-1 flex px-4 md:px-8 pt-5 overflow-hidden">
  <div className="w-full h-full max-h-[calc(100vh-200px)] overflow-y-auto space-y-1.5 px-2">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="px-4 py-3 bg-primary/87 text-white rounded-2xl hover:bg-gray-500/30 transition-colors cursor-pointer flex gap-3"
      >
        <div className="flex-1 min-w-0 flex items-center">
          <span className="truncate overflow-hidden whitespace-nowrap font-semibold capitalize">
            chat {i + 1}
          </span>
        </div>
        <span className="flex items-center gap-2 shrink-0">
          <span className="p-2 hover:bg-indigo-500 rounded-xl aspect-square">
            <FaPen />
          </span>
          <span className="p-2 hover:bg-red-500 rounded-xl aspect-square">
            <FaTrashCan />
          </span>
        </span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default ChatHistory;

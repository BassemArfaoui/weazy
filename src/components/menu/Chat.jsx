import React from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useConversation } from "../../Contexts/ConversationContext";



function Chat({
  chat,
  isLast,
  editingId,
  chatEdits,
  startEditing,
  handleEditChange,
  handleSaveEdit,
  handleDelete,
  pageIndex,
  chatIndex,
  lastChatRef,
  closeHistory,
}) {

  const location = useLocation()
  const navigate = useNavigate()
  const {setModel}= useConversation()


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit(chat.id);
    }
  };

  const deleteChat = (id , pIndex , cIndex ) => {
    if (location.pathname === `/chat/${id}`) {
       navigate(`/`)
    }
    handleDelete(id, pIndex, cIndex)
  }


  const openChat = () => {
    closeHistory();
    setModel(chat.model)
    navigate(`/chat/${chat.id}?model=${chat.model}`);
  };

  return (
    <div
      ref={isLast ? lastChatRef : null}
      className={`px-4  bg-primary/87 text-white border-2 rounded-2xl hover:bg-gray-500/30 transition-colors cursor-pointer flex gap-0 ${
        editingId === chat.id ? "border-gray-200" : "border-transparent"
      }`}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {editingId === chat.id ? (
          <input
            type="text"
            className="bg-transparent border-none outline-none ring-0 w-full font-semibold capitalize"
            value={chatEdits[chat.id] || ""}
            onChange={(e) => handleEditChange(chat.id, e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => handleSaveEdit(chat.id)}
            autoFocus
          />
        ) : (
          <span className="truncate overflow-hidden whitespace-nowrap font-semibold capitalize py-3" onClick={openChat}>
            {chatEdits[chat.id] || chat.title}
          </span>
        )}
      </div>
      <span className="flex items-center gap-2 shrink-0 py-3">
        {editingId !== chat.id ? (
          <span
            className="p-2 hover:bg-blue-500 rounded-xl aspect-square"
            onClick={() => startEditing(chat.id, chat.title)}
          >
            <FaPen />
          </span>
        ) : (
          <span
            className="p-2 hover:bg-green-500 rounded-xl aspect-square"
            onClick={() => handleSaveEdit(chat.id)}
          >
            <FaCheck />
          </span>
        )}
        <span
          className="p-2 hover:bg-red-500 rounded-xl aspect-square"
          onClick={()=>{deleteChat(chat.id , pageIndex , chatIndex)}}
        >
          <FaTrashCan />
        </span>
      </span>
    </div>
  );
}

export default Chat;
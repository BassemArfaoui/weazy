import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import Loading from "../tools/Loading";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;
console.log(API_URL);
const userId = "11111111-1111-1111-1111-111111111111";

const fetchChats = async ({ pageParam = 1 }) => {
  const res = await fetch(`${API_URL}/chats/${userId}?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch chats");
  return res.json();
};

function ChatHistory() {
  const [editingId, setEditingId] = useState(null);
  const [chatEdits, setChatEdits] = useState({});

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["chats", userId],
    queryFn: fetchChats,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
  });

  const observer = useRef();
  const lastChatRef = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (lastChatRef.current) obs.observe(lastChatRef.current);
    observer.current = obs;
    return () => obs.disconnect();
  }, [hasNextPage, fetchNextPage, data]);

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setChatEdits((prev) => ({ ...prev, [id]: currentTitle }));
  };

  const stopEditing = () => {
    setEditingId(null);
  };

  const handleEditChange = (id, newTitle) => {
    setChatEdits((prev) => ({ ...prev, [id]: newTitle }));
  };

  const renderChat = (chat, isLast) => (
    <div
      key={chat.id}
      ref={isLast ? lastChatRef : null}
      className={`px-4 py-3 bg-primary/87 text-white border-2 rounded-2xl hover:bg-gray-500/30 transition-colors cursor-pointer flex gap-3 ${
        editingId === chat.id ? "border-gray-200" : "border-transparent"
      }`}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {editingId === chat.id ? (
          <input
            type="text"
            className="bg-transparent border-none outline-none ring-0 w-full font-semibold capitalize"
            value={chatEdits[chat.id]}
            onChange={(e) => handleEditChange(chat.id, e.target.value)}
            autoFocus
            onBlur={stopEditing}
          />
        ) : (
          <>
            <span className="truncate overflow-hidden whitespace-nowrap font-semibold capitalize">
              {chat.title}
            </span>
          </>
        )}
      </div>

      <span className="flex items-center gap-2 shrink-0">
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
            onClick={stopEditing}
          >
            <FaCheck />
          </span>
        )}
        <span className="p-2 hover:bg-red-500 rounded-xl aspect-square">
          <FaTrashCan />
        </span>
      </span>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full max-h-screen gap-5">
      <h1 className="text-center text-2xl font-bold">Chat History</h1>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar */}
        <div className="w-full px-4  md:px-6">
          <div className="h-[55px] border-2 border-gray-500 flex items-center rounded-2xl">
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
            {isLoading && (
              <div className="flex justify-center w-full h-full items-center"><Loading size={0.8} /></div>
            )}
            {status === "error" && (
              <p className="text-center text-red-500">Failed to load chats</p>
            )}
            {data?.pages.map((page, pageIndex) =>
              page.data.map((chat, i) =>
                renderChat(
                  chat,
                  pageIndex === data.pages.length - 1 &&
                    i === page.data.length - 1
                )
              )
            )}
            {isFetchingNextPage && (
              <div className="flex justify-center my-1"><Loading size={0.5} /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;

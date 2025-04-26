import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../tools/Loading";
import Chat from "./Chat";
import { notify } from "../tools/CustomToaster";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const userId = "11111111-1111-1111-1111-111111111111";

const fetchChats = async ({ pageParam = 1 }) => {
  const response = await axios.get(`${API_URL}/chats/${userId}`, {
    params: { page: pageParam },
  });
  return response.data;
};

const updateChatTitle = async ({ id, title }) => {
  const response = await axios.put(`${API_URL}/edit-chat/${id}`, { title });
  return response.data;
};

const deleteChat = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-chat/${id}`);
  return response.data;
};

function ChatHistory({ isOpen , closeHistory }) {
  const [editingId, setEditingId] = useState(null);
  const [chatEdits, setChatEdits] = useState({});
  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["chats", userId],
    queryFn: fetchChats,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    cacheTime: 0,
    staleTime: 0,
  });

  const observer = useRef();
  const lastChatRef = useRef();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

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

  const handleEditChange = (id, newTitle) => {
    setChatEdits((prev) => ({ ...prev, [id]: newTitle }));
  };

  const handleSaveEdit = async (id) => {
    const newTitle = chatEdits[id]?.trim();
    if (!newTitle) {
      alert("Title cannot be empty");
      setEditingId(null);
      return;
    }
  
    let originalTitle;
  
    for (const page of data?.pages || []) {
      const chat = page.data.find((c) => c.id === id);
      if (chat) {
        originalTitle = chat.title;
        break;
      }
    }
  
    if (!originalTitle || newTitle === originalTitle) {
      setEditingId(null);
      return;
    }
  
    setEditingId(null);
    setChatEdits((prev) => ({ ...prev, [id]: newTitle }));
  
    try {
      await updateChatTitle({ id, title: newTitle });
      queryClient.invalidateQueries(["chats", userId]); 
    } catch (error) {
      setChatEdits((prev) => ({ ...prev, [id]: originalTitle }));
      notify('Error renaming chat !')
    }
  };
  

  const handleDelete = async (id, pageIndex, chatIndex) => {
    const deletedChat = data.pages[pageIndex].data[chatIndex];
    if (!deletedChat || deletedChat.id !== id) return;

    queryClient.setQueryData(["chats", userId], (oldData) => {
      if (!oldData) return oldData;

      const updatedPages = oldData.pages.map((page, i) => ({
        ...page,
        data: i === pageIndex
          ? page.data.filter((_, index) => index !== chatIndex)
          : page.data,
      }));

      return { ...oldData, pages: updatedPages };
    });

    try {
      await deleteChat(id);
      await queryClient.invalidateQueries(["chats", userId]);
    } catch (error) {
      queryClient.setQueryData(["chats", userId], (oldData) => {
        if (!oldData) return oldData;

        const restoredPages = oldData.pages.map((page, i) => {
          if (i === pageIndex) {
            const newData = [...page.data];
            newData.splice(chatIndex, 0, deletedChat);
            return { ...page, data: newData };
          }
          return page;
        });

        return { ...oldData, pages: restoredPages };
      });

      notify("Failed to delete chat")
    }
  };

  const renderChat = (chat, isLast, pageIndex, chatIndex) => (
    <Chat
      chat={chat}
      isLast={isLast}
      key={chat.id}
      editingId={editingId}
      chatEdits={chatEdits}
      startEditing={startEditing}
      handleEditChange={handleEditChange}
      handleSaveEdit={handleSaveEdit}
      handleDelete={handleDelete}
      pageIndex={pageIndex}
      chatIndex={chatIndex}
      lastChatRef={lastChatRef}
      closeHistory={closeHistory}
    />
  );

  return (
    <div className="flex flex-col w-full h-full max-h-screen gap-5">
      <h1 className="text-center text-2xl font-bold">Chat History</h1>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="w-full md:px-6">
          <div className="h-[55px] border-2 border-gray-500 flex items-center rounded-2xl">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full h-full bg-transparent outline-none text-white text-lg placeholder:text-gray-400 px-5 font-semibold font-inter"
            />
          </div>
        </div>
        <div className="flex-1 flex px-1 md:px-8 pt-5 overflow-hidden">
          <div className="w-full h-full max-h-[calc(100vh-200px)] overflow-y-auto space-y-1.5 px-2">
            {isLoading && (
              <div className="flex justify-center w-full h-full items-center">
                <Loading size={0.7} />
              </div>
            )}
            {status === "error" && (
              <p className="text-center text-red-500 py-2 pb-4 text-md">Failed to update chats</p>
            )}
            {data?.pages.map((page, pageIndex) =>
              page.data.map((chat, chatIndex) =>
                renderChat(
                  chat,
                  pageIndex === data.pages.length - 1 &&
                    chatIndex === page.data.length - 1,
                  pageIndex,
                  chatIndex
                )
              )
            )}
            {isFetchingNextPage && (
              <div className="flex justify-center my-1">
                <Loading size={0.5} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PromptArea from '../components/main/prompt/PromptArea';
import ChatArea from '../components/main/chat/ChatArea';
import axios from 'axios';
import Loading from '../components/tools/Loading';

import { useConversation } from "../Contexts/ConversationContext"
import ErrorComponent from '../components/tools/ErrorComponent';

const userId = "11111111-1111-1111-1111-111111111111";

const fetchChatById = async (chatId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/chat/${chatId}/${userId}`);
  return response.data;
};

function ChatPage() {
    const { chatId } = useParams();
    const {
      conversation,
      setConversation,
      isGenerating,
      setIsGenerating,
      deepsearchLogs,
      refetchChatName,
      setRefetchChatName,
    } = useConversation();

    const {
      data,
      isPending,
      isError,
      error,
    } = useQuery({
      queryKey: ['chat', chatId],
      queryFn: () => fetchChatById(chatId),
      enabled: !!chatId,
    });
  
    useEffect(() => {
      if (data) {
        setConversation(data.data);
      }
    }, [data, setConversation]);

    useEffect(() => {
      const renameChat = async () => {
        if (refetchChatName) {
          try {
            await axios.put(`http://localhost:3333/rename-chat/${chatId}`, {
              chatId: chatId,
              title: "Test"+ Date.now(), 
            });
  
            setRefetchChatName(false);
          } catch (err) {
            console.error("Failed to rename chat:", err);
          }
        }
      };
  
      renameChat();
    }, [refetchChatName]); 
  
    if (isError) {
      return <ErrorComponent />
    }
  
    return (
      <div className="h-full w-full px-0 flex-col flex justify-between items-center gap-2 md:gap-1">
        {isPending ? (
          <div className="h-[80%] w-full px-0 flex justify-center items-center">
            <Loading size={0.7} />
          </div>
        ) : (
          <ChatArea
            conversation={conversation}
            setConversation={setConversation}
            isGenerating={isGenerating}
            deepsearchLogs={deepsearchLogs}
          />
        )}
        <PromptArea
          disabled={isPending}
          conversation={conversation}
          setConversation={setConversation}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>
    );
  }

export default ChatPage;



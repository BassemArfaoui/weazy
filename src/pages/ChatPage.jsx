import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PromptArea from '../components/main/prompt/PromptArea';
import ChatArea from '../components/main/chat/ChatArea';
import axios from 'axios';
import Loading from '../components/tools/Loading';
import errorImage from '../assets/images/error.png';

import { useConversation } from "../Contexts/ConversationContext"
import ErrorComponent from '../components/tools/ErrorComponent';

const fetchChatById = async (chatId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/chat/${chatId}`);
  return response.data;
};

function ChatPage() {
    const { chatId } = useParams();
    const { conversation, setConversation, isGenerating, setIsGenerating } = useConversation();
  
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
          />
        )}
        <PromptArea
          disabled={isPending}
          conversation={conversation}
          setConversation={setConversation}
          setIsGenerating={setIsGenerating}
        />
      </div>
    );
  }

export default ChatPage;



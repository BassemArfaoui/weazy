import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PromptArea from '../components/main/prompt/PromptArea';
import ChatArea from '../components/main/chat/ChatArea';
import axios from 'axios';
import Loading from '../components/tools/Loading';

const fetchChatById = async (chatId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/chat/${chatId}`);
  return response.data;
};

function HomePage() {
  const { chatId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversation, setConversation] = useState([]);

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
  }, [data]);

  
  if (isError) return <div className="h-full w-full px-0 flex justify-between items-center text-red-500">Error: {error.message}</div>;

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
        conversation={conversation}
        setConversation={setConversation}
        setIsGenerating={setIsGenerating}
      />
    </div>
  );
}

export default HomePage;

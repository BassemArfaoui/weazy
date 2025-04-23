import React, { useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi";
import { HiArrowSmUp } from "react-icons/hi";
import PromptArea from '../components/main/prompt/PromptArea';
import ChatArea from '../components/main/chat/ChatArea';

function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const [conversation, setConversation] = useState([
    {
      id: 1,
      sender: 'user',
      message: 'Show me sneakers under $100.',
      image_urls: [
        'https://picsum.photos/seed/user1/150',
        'https://picsum.photos/seed/user5/151',
        'https://picsum.photos/seed/user3/152',
      ],
    },
    {
      id: 2,
      sender: 'bot',
      message: 'Sure! Here are some top-rated sneakers under $100.',
      image_urls: [],
    },
    {
      id: 3,
      sender: 'user',
      message: 'I prefer white ones.',
      image_urls: ['https://picsum.photos/seed/userwhite/150'],
    },
    {
      id: 4,
      sender: 'bot',
      message: 'Got it! Filtering for white sneakers now.',
      image_urls: [
        'https://picsum.photos/seed/user1/150',
        'https://picsum.photos/seed/user5/151',
        'https://picsum.photos/seed/user3/152',
      ],
    },
    {
      id: 6,
      sender: 'user',
      message: 'Nike, preferably.',
      image_urls: ['https://picsum.photos/seed/nikelogo/150'],
    },
    {
      id: 7,
      sender: 'bot',
      message: 'Perfect! Showing white Nike sneakers under $100.',
      image_urls: [],
    },

  ]);

  return (
    <div className="h-full w-full px-0 flex-col flex justify-between items-center gap-2 md:gap-1">

       <ChatArea conversation={conversation} setConversation={setConversation} isGenerating={isGenerating}/>

       <PromptArea conversation={conversation} setConversation={setConversation} setIsGenerating={setIsGenerating}/>
    </div>
  );
}

export default HomePage
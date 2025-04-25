import React, { useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi";
import { HiArrowSmUp } from "react-icons/hi";
import PromptArea from '../components/main/prompt/PromptArea';
import ChatArea from '../components/main/chat/ChatArea';
import Welcome from '../components/main/chat/Welcome';

function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const [conversation, setConversation] = useState([]);

  return (
    <div className="h-full w-full px-0 flex-col flex justify-center items-center gap-2 md:gap-1">
       <Welcome />
       <PromptArea conversation={conversation} setConversation={setConversation} setIsGenerating={setIsGenerating}/>
    </div>
  );
}

export default HomePage
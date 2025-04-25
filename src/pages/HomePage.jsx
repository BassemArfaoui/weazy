import React, { use, useEffect, useState } from 'react'
import PromptArea from '../components/main/prompt/PromptArea';
import Welcome from '../components/main/chat/Welcome';
import { useConversation } from "../Contexts/ConversationContext"
import { useLocation } from 'react-router-dom';



function HomePage() {
  const { conversation, setConversation, isGenerating, setIsGenerating } = useConversation();
  const location = useLocation()

  useEffect(()=> setConversation([]), [])

  return (
    <div className="h-full w-full px-0 flex-col flex justify-center items-center gap-2 md:gap-1">
      {location.pathname === "/"  &&  <Welcome />}
      <PromptArea
        conversation={conversation}
        setConversation={setConversation}
        setIsGenerating={setIsGenerating}
      />
    </div>
  );
}

export default HomePage
import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ConversationContext.Provider value={{
      conversation,
      setConversation,
      isGenerating,
      setIsGenerating,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);

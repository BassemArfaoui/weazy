import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [deepsearchLogs, setDeepsearchLogs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [option, setOption] = useState("none");
  const [imageModel, setImageModel] = useState("resnet50");
  const [resultLimit, setResultLimit] = useState(10);
  const getSubdomain = () => {
    const host = window.location.hostname;
    console.log(host)
    const parts = host.split(".");
    return parts.length >= 2 ? parts[0] : ""; 
  };

  const shop = getSubdomain(); 

  return (
    <ConversationContext.Provider value={{
      conversation,
      setConversation,
      isGenerating,
      setIsGenerating,
      shop,  
      option,     
      setOption,
      imageModel,
      setImageModel,
      resultLimit,
      setResultLimit,
      deepsearchLogs,
      setDeepsearchLogs
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);

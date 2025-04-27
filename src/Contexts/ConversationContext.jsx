import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const allowedModels = [
    "DeepFashion",
    "Dataset 2",
    "Dataset 3",
    "Dataset 4",
  ];

  const paramModel = searchParams.get("model");
  
  const getInitialModel = () => {
    if (paramModel && allowedModels.includes(paramModel)) {
      return paramModel;
    } else {
      return allowedModels[0];
    }
  };

  const [model, setModel] = useState(getInitialModel);

  useEffect(() => {
    const paramModel = new URLSearchParams(location.search).get("model");
    if (!paramModel || !allowedModels.includes(paramModel)) {
      setSearchParams({ model: allowedModels[0] });
    }
  }, [location.search, allowedModels, setSearchParams]);

  const [conversation, setConversation] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ConversationContext.Provider value={{
      conversation,
      setConversation,
      isGenerating,
      setIsGenerating,
      model,
      setModel,
      allowedModels,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [deepsearchLogs, setDeepsearchLogs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [option, setOption] = useState("none");
  const [imageModel , setImageModel]=useState("resnet50")
  const [resultLimit, setResultLimit] = useState(10); 


  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const allowedModels = [
    "Fashion",
    "Dataset2",
    "Dataset3",
    "Dataset4",
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




  return (
    <ConversationContext.Provider value={{
      conversation,
      setConversation,
      isGenerating,
      setIsGenerating,
      model,
      setModel,
      allowedModels,
      option , 
      setOption ,
      imageModel ,
      setImageModel,
      resultLimit,
      setResultLimit,
      deepsearchLogs , 
      setDeepsearchLogs
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);

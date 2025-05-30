import React, { useState, useRef, useEffect } from "react";
import { HiArrowSmUp, HiOutlinePlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import TooltipWrapper from "../../tools/TooltipWrapper";
import PhotoDisplayer from "../../tools/PhotoDisplayer";
import { FaSearch, FaLightbulb } from "react-icons/fa";
import ImagesPreview from "./ImagesPreview";
import TextArea from "./TextArea";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../tools/Loading";
import { notify, processNotify } from "../../tools/CustomToaster";
import { useConversation } from "../../../Contexts/ConversationContext";
import { RiSearchEyeLine } from "react-icons/ri";


function PromptArea({ conversation, setConversation, setIsGenerating ,isGenerating , disabled}) {
  const maxImg = import.meta.env.VITE_MAX_IMAGES
  const userId = "11111111-1111-1111-1111-111111111111";
  const navigate = useNavigate();
  const location = useLocation();
  const {chatId} = useParams()
  const { model , option , setOption , imageModel , resultLimit , setDeepsearchLogs  } = useConversation()

  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isGeneratingInternal, setIsGeneratingInternal] = useState(false);
  const generationTimeoutRef = useRef(null);

  const uploadMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleUploadMenu = () => setIsUploadMenuOpen(prev => !prev);
  const closeUploadMenu = () => setIsUploadMenuOpen(false);

  const toggleSearchOption = () => {
    setOption(prev => (prev === "search" ? "none" : "search"));  
  };
  
  const toggleRecommendOption = () => {
    setOption(prev => (prev === "recommend" ? "none" : "recommend")); 

  };

  const toggleDeepSearchOption = () => {
    setOption(prev => (prev === "deepsearch" ? "none" : "deepsearch")); 
  };
  

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    if (files.length !== imageFiles.length) {
      notify("Only image files are allowed.");
      return;
    }

    if (uploadedImages.length + imageFiles.length > parseInt(maxImg) ) {
      notify(`You can only upload a maximum of ${maxImg} ${"image"+ (parseInt(maxImg) > 1 ? "s" : "") } .`);
      return;
    }

    const previews = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      uploading: true,
    }));

    setUploadedImages(prev => [...prev, ...previews]);
    event.target.value = "";

    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", imageFiles[i]);
    
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        const uploadedUrl = res.data.data.url;
    
        setUploadedImages(prev => {
          const newImages = [...prev];
          const previewIndex = newImages.findIndex(img => img.url === previews[i].url);
          if (previewIndex !== -1) {
            newImages[previewIndex] = { url: uploadedUrl, uploading: false };
          }
          return newImages;
        });
    
      } catch (error) {
        console.error("Image upload failed:", error);
        setUploadedImages(prev => prev.filter(img => img.url !== previews[i].url));
        notify("Failed to upload image.");
      }
    }
    
  };

  const handlePaste = async (event) => {
    const items = event.clipboardData.items;
    const imageItems = Array.from(items).filter(item => item.type.startsWith("image/"));
  
    if (imageItems.length === 0) return;
  
    if (uploadedImages.length + imageItems.length >parseInt(maxImg)) {
      notify(`You can only upload a maximum of ${maxImg} ${"image"+ (parseInt(maxImg) > 1 ? "s" : "") } .`);
      return;
    }
  
    const previews = imageItems.map(item => {
      const file = item.getAsFile();
      return {
        file,
        url: URL.createObjectURL(file),
        uploading: true,
      };
    });
  
    setUploadedImages(prev => [...prev, ...previews.map(p => ({ url: p.url, uploading: true }))]);
  
    for (let i = 0; i < previews.length; i++) {
      const formData = new FormData();
      formData.append("file", previews[i].file);
  
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        const uploadedUrl = res.data.data.url;
  
        setUploadedImages(prev => {
          const newImages = [...prev];
          const previewIndex = newImages.findIndex(img => img.url === previews[i].url);
          if (previewIndex !== -1) {
            newImages[previewIndex] = { url: uploadedUrl, uploading: false };
          }
          return newImages;
        });
      } catch (error) {
        console.error("Paste upload failed:", error);
        setUploadedImages(prev => prev.filter(img => img.url !== previews[i].url));
        notify("Failed to upload pasted image.");
      }
    }
  };
  

  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const openPhotoModal = (image) => {
    setSelectedImage(image.url);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedImage(null);
  };


  function extractProductIds(products) {
    return products.map(product => product.id);
  }

  const handleSubmit = async () => {
    if (disabled || isCreating || isGenerating) return;
  
    if (!promptText.trim() && uploadedImages.length === 0) return;
  
    if (uploadedImages.some(img => img.uploading)) {
      processNotify("Please wait for all images to finish uploading");
      return;
    }
  
    const newMessage = {
      id: Date.now(),
      sender: "user",
      message: promptText.trim(),
      image_urls: uploadedImages.map(img => img.url),
    };
  
    if (conversation.length === 0 || location.pathname === "/") {
      let res
      try{
      res = await createChat(newMessage.message, newMessage.image_urls);
      }
      catch (err)
      {
        console.log(err.message)
        notify("Failed to create chat.")
        navigate("/")
        return
      }

      try {
        setIsGenerating(true);
        setIsGeneratingInternal(true);
  
        const imageUrl = uploadedImages[0]?.url;
  
        const requestData = {
          tool : option , 
          image_url: imageUrl || "",
          chat_id: res.data.data.id,
          sender_role: "user",
          top_k: resultLimit,
          text: promptText.trim() ,
        };

       
  

        const api = `${import.meta.env.VITE_MODELS_API_URL}/${model.toLowerCase()}/process/${imageModel}`

        const response = await axios.post(api,requestData);
  
        const botMessage = {
          id: Date.now(),
          sender: "model",
          message: response.data.message || "Here is what i found",
          image_urls: response.data.image_urls || [] ,
          products : response.data.products || [] ,
        };  
  
        setConversation(prev => [...prev, botMessage]);
        setIsGenerating(false);
        setIsGeneratingInternal(false);

        const resp= {
          chat_id : res.data.data.id,
          sender_role: "model",
          text: response.data.message || "Here is what i found",
          image_urls: response.data.image_urls || [] ,
          products : extractProductIds(response.data.products)  ,
        }

        try{
          await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/save-response`, resp);
          }catch(error)
          {
            notify("failed to save response")
          }

        
      } catch (error) {
        console.error("Error contacting backend:", error);
        notify("Failed to get a response.");
        setIsGenerating(false);
        setIsGeneratingInternal(false);
      } 

 


  
    } else {
      // If it is a continuation of chat
      setConversation(prev => [...prev, newMessage]);
      setPromptText("");
      setUploadedImages([]);
      setIsGenerating(true);
      setIsGeneratingInternal(true);
      
  
      try {
        const imageUrl = uploadedImages[0]?.url;
  
        const requestData = {
          tool : option ,
          image_url: imageUrl || "",
          chat_id: chatId,
          sender_role: "user",
          top_k: resultLimit,
          text: promptText.trim(),
        };

        const api = `${import.meta.env.VITE_MODELS_API_URL}/${model.toLowerCase()}/process/${imageModel}`
  

        const response = await axios.post(api,requestData);
  
  
        const botMessage = {
          id: Date.now(),
          sender: "model",
          message: response.data.message || "Here’s what i found",
          image_urls: response.data.image_urls || [] ,
          products : response.data.products || [] ,

        };
  
        setConversation(prev => [...prev, botMessage]);
        setIsGenerating(false);
        setIsGeneratingInternal(false);

        const savePayload = {
          request: {
            chat_id: requestData.chat_id,
            sender_role: requestData.sender_role,
            text: requestData.text,
            image_urls: requestData.image_url ? [requestData.image_url] : [],
            products: [],
          },
          response: {
            chat_id: requestData.chat_id,
            sender_role: "model",
            text: botMessage.message,
            image_urls: botMessage.image_urls,
            products:  extractProductIds(botMessage.products),
          },
        };
        try{
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/save-payload`, savePayload);
        }catch(error)
        {
          notify("failed to save messages")
        }
        
      } catch (error) {
        console.error("Error contacting backend:", error);
        notify("Failed to fetch the response.");
        setConversation(prev => prev.filter(message => message.id !== newMessage.id));
        setUploadedImages([]);
        setIsGenerating(false);
        setIsGeneratingInternal(false);
      } 
    }
  };
  

  const cancelGeneration = () => {
    clearTimeout(generationTimeoutRef.current);
    setIsGenerating(false);
    setIsGeneratingInternal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isGeneratingInternal) handleSubmit();
    }
  };

  const createChat = async (message, image_urls) => {
    try {
      setIsCreating(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/create-chat`, {
        user_id: userId,
        message,
        model,
        image_urls,
      });
      setIsGenerating(true);
      navigate(`/chat/${res.data.data.id}?model=${model}`);
      setIsCreating(false);
      return res;
    } catch (error) {
      notify("Error starting chat");
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target)) {
        closeUploadMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handlePasteEvent = (event) => handlePaste(event);
    document.addEventListener("paste", handlePasteEvent);
    return () => document.removeEventListener("paste", handlePasteEvent);
  }, [uploadedImages]);

  useEffect(() => {
    if (!option) {
      setOption("search");
    }
  }, [option]);
  

  return (
    <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-2 md:mb-4 pb-1 pt-2">

      {/* Image Previews */}
      {uploadedImages.length > 0 && (
        <ImagesPreview uploadedImages={uploadedImages} removeImage={removeImage} openPhotoModal={openPhotoModal} />
      )}

      {/* Textarea */}
      <TextArea promptText={promptText} setPromptText={setPromptText} handleKeyDown={handleKeyDown} disabled={isGeneratingInternal || isCreating} />

      {/* Controls */}
      <div className="w-full flex items-center justify-between px-6 py-3 gap-3">
        <div className="flex gap-3 items-center">
          {/* Upload Button */}
          <div className="inline-flex relative mr-2" ref={uploadMenuRef}>
            <button
              className="p-2 rounded-full flex justify-center items-center border border-gray-500 hover:bg-gray-500/40 cursor-pointer size-10"
              onClick={toggleUploadMenu}
            >
              <HiOutlinePlus className="text-2xl" />
            </button>

            {isUploadMenuOpen && (
              <div className="absolute z-10 min-w-60 rounded-xl bg-secondary shadow-lg border border-gray-500 bottom-full md:left-1/2 -left-5 md:-translate-x-1/2 mb-3 px-1">
                <div className="divide-y divide-gray-500">
                  <div
                    className={`p-1 cursor-pointer ${uploadedImages.length >= parseInt(maxImg) ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => {
                      if (uploadedImages.length < parseInt(maxImg)) {
                        fileInputRef.current.click();
                        closeUploadMenu();
                      }
                    }}
                  >
                    <div className="text-center text-white font-semibold hover:bg-gray-400/40 rounded-lg p-2 py-2 my-0.5">
                      From Device
                    </div>
                  </div>

                  <div className="p-1 cursor-pointer opacity-50 pointer-events-none">
                    <div className="text-center text-white font-semibold hover:bg-gray-400/40 rounded-lg p-2 py-2 my-0.5">
                      From Google Drive
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploadedImages.length >= parseInt(maxImg) || isGeneratingInternal || isCreating}
          />

          {/* Search Button */}
          <button
            className={`border-1 md:px-3 justify-center flex items-center gap-1 md:py-1 p-2 aspect-square md:aspect-auto size-10 md:h-10 md:size-auto rounded-3xl border-gray-500 font-medium cursor-pointer ${
              option === "search" ? "bg-gray-200 text-secondary" : "hover:bg-gray-500/40"
            }`}
            onClick={toggleSearchOption}
            disabled={isGeneratingInternal}
          >
            <FaSearch className="inline-block mr-0" /> <span className="hidden md:inline-flex">Search</span>
          </button>

          <button
            className={`border-1 md:px-3 justify-center flex items-center gap-1 md:py-1 p-2 aspect-square md:aspect-auto size-10 md:h-10 md:size-auto rounded-3xl border-gray-500 font-medium cursor-pointer ${
              option === "deepsearch" ? "bg-gray-200 text-secondary" : "hover:bg-gray-500/40"
            }`}
            onClick={toggleDeepSearchOption}
            disabled={isGeneratingInternal}
          >
            <RiSearchEyeLine className="inline-block mr-0 text-[1.2em]" /> <span className="hidden md:inline-flex">DeepSearch</span>
          </button>

          {/* Recommend Button */}
          <button
            className={`border-1 md:px-3 md:h-10 justify-center flex items-center gap-1 md:py-1 p-2 aspect-square md:aspect-auto size-10 md:size-auto rounded-3xl border-gray-500 font-medium cursor-pointer ${
              option === "recommend" ? "bg-gray-200 text-secondary" : "hover:bg-gray-500/40"
            }`}
            onClick={toggleRecommendOption}
            disabled={isGeneratingInternal}
          >
            <FaLightbulb className="inline-block text-xl mr-0" /> <span className="hidden md:inline-flex">Recommend</span>
          </button>
        </div>

        {/* Submit / Cancel */}
        <div className="flex items-center">
          <TooltipWrapper tooltip={isGeneratingInternal ? "Cancel" : "Submit"} placement="right">
            {isCreating ? (
              <button disabled className="border-1 p-1 border-gray-500 bg-white text-gray-950 rounded-full size-10 flex justify-center items-center cursor-pointer">
                <Loading className="text-2xl" submit />
              </button>
            ) : isGeneratingInternal ? (
              <button
                onClick={cancelGeneration}
                className="border-1 p-1 border-gray-500 bg-white text-gray-950 rounded-full size-10 flex justify-center items-center cursor-pointer"
              >
                <IoMdClose className="text-2xl" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isGeneratingInternal}
                className="border-1 p-1 border-gray-500 bg-white text-gray-950 rounded-full size-10 flex justify-center items-center cursor-pointer"
              >
                <HiArrowSmUp className="text-3xl" />
              </button>
            )}
          </TooltipWrapper>
        </div>
      </div>

      {/* Modal Viewer */}
      <PhotoDisplayer
        open={isPhotoModalOpen}
        onClose={closePhotoModal}
        imageSrc={selectedImage}
      />
    </div>
  );
}

export default PromptArea;

import React, { useState, useRef, useEffect } from "react";
import { HiArrowSmUp, HiOutlinePlus } from "react-icons/hi";
import { FaSlidersH } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
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
import ToolsMenuItem from "../../parts/menus/ToolsMenuItem";
import ActiveTool from "../../parts/menus/ActiveTool";
import UploadMenuItem from "../../parts/menus/UploadMenuItem";

  // Define tools array for scalability
  const tools = [
    {
      name: "search",
      icon: <FaSearch className="inline-block mr-0" />,
    },
    {
      name: "recommend",
      icon: <FaLightbulb className="inline-block text-xl mr-0" />,
    },
    {
      name: "deepsearch",
      icon: <RiSearchEyeLine className="inline-block text-xl mr-0" />,
    },
  ];


function PromptArea({ conversation, setConversation, setIsGenerating, isGenerating, disabled }) {
  const maxImg = import.meta.env.VITE_MAX_IMAGES;
  const userId = "11111111-1111-1111-1111-111111111111";
  const navigate = useNavigate();
  const location = useLocation();
  const { chatId } = useParams();
  const { model, option, setOption, imageModel, resultLimit } = useConversation();

  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isGeneratingInternal, setIsGeneratingInternal] = useState(false);
  const generationTimeoutRef = useRef(null);

  const uploadMenuRef = useRef(null);
  const toolsMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleUploadMenu = () => setIsUploadMenuOpen(prev => !prev);

  const toggleToolsMenu = () => setIsToolsMenuOpen(prev => !prev);

  const toggleTool = (tool) => {
    setOption(prev => (prev === tool ? "none" : tool));
    setIsToolsMenuOpen(false);
  };


  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    if (files.length !== imageFiles.length) {
      notify("Only image files are allowed.");
      return;
    }

    if (uploadedImages.length + imageFiles.length > parseInt(maxImg)) {
      notify(`You can only upload a maximum of ${maxImg} ${"image" + (parseInt(maxImg) > 1 ? "s" : "")}.`);
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

    if (uploadedImages.length + imageItems.length > parseInt(maxImg)) {
      notify(`You can only upload a maximum of ${maxImg} ${"image" + (parseInt(maxImg) > 1 ? "s" : "")}.`);
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

  const openUploadInput = () => {
    if (uploadedImages.length < parseInt(maxImg)) {
      fileInputRef.current.click();
      setIsUploadMenuOpen(false);
    }
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
      let res;
      try {
        res = await createChat(newMessage.message, newMessage.image_urls);
      } catch (err) {
        console.log(err.message);
        notify("Failed to create chat.");
        navigate("/");
        return;
      }

      try {
        setIsGenerating(true);
        setIsGeneratingInternal(true);

        const imageUrl = uploadedImages[0]?.url;

        const requestData = {
          tool: option,
          image_url: imageUrl || "",
          chat_id: res.data.data.id,
          sender_role: "user",
          top_k: resultLimit,
          text: promptText.trim(),
        };

        const api = `${import.meta.env.VITE_MODELS_API_URL}/${model.toLowerCase()}/process/${imageModel}`;

        const response = await axios.post(api, requestData);

        const botMessage = {
          id: Date.now(),
          sender: "model",
          message: response.data.message || "Here is what i found",
          image_urls: response.data.image_urls || [],
          products: response.data.products || [],
        };

        setConversation(prev => [...prev, botMessage]);
        setIsGenerating(false);
        setIsGeneratingInternal(false);

        const resp = {
          chat_id: res.data.data.id,
          sender_role: "model",
          text: response.data.message || "Here is what i found",
          image_urls: response.data.image_urls || [],
          products: extractProductIds(response.data.products),
        };

        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/save-response`, resp);
        } catch (error) {
          notify("failed to save response");
        }
      } catch (error) {
        console.error("Error contacting backend:", error);
        notify("Failed to get a response.");
        setIsGenerating(false);
        setIsGeneratingInternal(false);
      }
    } else {
      setConversation(prev => [...prev, newMessage]);
      setPromptText("");
      setUploadedImages([]);
      setIsGenerating(true);
      setIsGeneratingInternal(true);

      try {
        const imageUrl = uploadedImages[0]?.url;

        const requestData = {
          tool: option,
          image_url: imageUrl || "",
          chat_id: chatId,
          sender_role: "user",
          top_k: resultLimit,
          text: promptText.trim(),
        };

        const api = `${import.meta.env.VITE_MODELS_API_URL}/${model.toLowerCase()}/process/${imageModel}`;

        const response = await axios.post(api, requestData);

        const botMessage = {
          id: Date.now(),
          sender: "model",
          message: response.data.message || "Here’s what i found",
          image_urls: response.data.image_urls || [],
          products: response.data.products || [],
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
            products: extractProductIds(botMessage.products),
          },
        };
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/save-payload`, savePayload);
        } catch (error) {
          notify("failed to save messages");
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
      navigate(`/chat/${res.data.data.id}`);
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
        setIsUploadMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsMenuOpen(false);
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
      setOption("none");
    }
  }, [option, setOption]);

  return (
    <div className="bg-secondary w-full max-w-[800px] border-1 border-border rounded-3xl items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-2 md:mb-4 pb-1 pt-2">
      {/* Image Previews */}
      {uploadedImages.length > 0 && (
        <ImagesPreview
          uploadedImages={uploadedImages}
          removeImage={removeImage}
          openPhotoModal={openPhotoModal}
        />
      )}

      {/* Textarea */}
      <TextArea
        promptText={promptText}
        setPromptText={setPromptText}
        handleKeyDown={handleKeyDown}
        disabled={isGeneratingInternal || isCreating}
      />

      {/* Controls */}
      <div className="w-full flex items-center justify-between px-6 py-3 gap-3">
        <div className="flex gap-3 md:gap-2 items-center">
          {/* Upload Button */}
          <div className="inline-flex relative mr-2" ref={uploadMenuRef}>
            <button
              className="p-2 rounded-full flex justify-center items-center border border-border hover:bg-gray-500/40 cursor-pointer md:size-9.5 size-9"
              onClick={toggleUploadMenu}
            >
              <HiOutlinePlus className="text-2xl" />
            </button>

            {isUploadMenuOpen && (
              <div className="absolute z-10 min-w-50 rounded-xl bg-secondary shadow-lg border border-gray-500 bottom-full md:left-1/2 -left-5 md:-translate-x-1/2 mb-2 px-0.5">
                <div className="divide-y divide-gray-500">
                  <UploadMenuItem title="From Device" disabled={uploadedImages.length >= parseInt(maxImg)} onClick={openUploadInput}/>
                  <UploadMenuItem title="From Google Drive" disabled={true} onClick={()=>{}}/>
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
            disabled={
              uploadedImages.length >= parseInt(maxImg) ||
              isGeneratingInternal ||
              isCreating
            }
          />

          {/* Tools Button */}
          <div className="flex items-center gap-2">
            <div className="relative inline-flex" ref={toolsMenuRef}>
                <button
                  className={`border-1 md:px-3 justify-center flex items-center gap-1 md:py-1 p-2 aspect-square md:aspect-auto size-9 md:h-9 md:size-auto rounded-3xl border-border font-medium cursor-pointer hover:bg-gray-500/40`}
                  onClick={toggleToolsMenu}
                  disabled={isGeneratingInternal || isGenerating}
                >
                  <FaSlidersH className="inline-block  size-4.5" />
                  <span className="hidden md:inline-flex text-[17px]">
                    Tools
                  </span>
                </button>

              {/* Tools Menu */}
              {isToolsMenuOpen && (
                <div className="absolute z-10 min-w-40 rounded-xl bg-secondary shadow-lg border border-gray-500 bottom-full left-1/2 -translate-x-1/2 mb-2 px-0.5">
                  <div className="divide-y-1 divide-gray-500">
                    {tools.map((t) => (
                      <ToolsMenuItem
                        tool={t.name}
                        isActivated={option === t.name}
                        onClick={() => {
                          toggleTool(t.name);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active Tool Display */}
            {option !== "none" && (
              <div className="flex items-center">
                <TooltipWrapper tooltip="Remove tool" placement="top" small>
                  <ActiveTool
                    tool={option}
                    icon={tools.find((tool) => tool.name === option)?.icon}
                    onClick={() => {
                      setOption("none");
                    }}
                    disabled={isGeneratingInternal || isGenerating}
                  />
                </TooltipWrapper>
              </div>
            )}
          </div>
        </div>

        {/* Submit / Cancel */}
        <div className="flex items-center">
          <TooltipWrapper
            tooltip={isGeneratingInternal ? "Cancel" : "Submit"}
            placement="right"
          >
            {isCreating ? (
              <button
                disabled
                className="border-0 p-1 bg-white text-submit-text bg-submit rounded-full md:size-9.5 size-9 flex justify-center items-center cursor-pointer"
              >
                <Loading className="text-xl" submit />
              </button>
            ) : isGeneratingInternal ? (
              <button
                onClick={cancelGeneration}
                className="p-1 border-0 bg-white text-submit-text rounded-full md:size-9.5 size-9 flex justify-center items-center cursor-pointer"
              >
                <IoMdClose className="text-2xl" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isGeneratingInternal}
                className="border-0 p-1 bg-submit text-submit-text rounded-full md:size-9.5 size-9 flex justify-center items-center cursor-pointer"
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
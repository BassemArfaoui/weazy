import React, { useState, useRef, useEffect } from "react";
import { HiArrowSmUp, HiOutlinePlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import TooltipWrapper from "../../tools/TooltipWrapper";
import PhotoDisplayer from "../../tools/PhotoDisplayer";
import { FaSearch } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import ImagesPreview from "./ImagesPreview";
import TextArea from "./TextArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../tools/Loading";


function PromptArea({ conversation, setConversation, setIsGenerating }) {

  const userId = "11111111-1111-1111-1111-111111111111";
  const navigate = useNavigate()

  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [option, setOption] = useState("search");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isCreating , setIisCreating] = useState(false);
  const [isGeneratingInternal, setIsGeneratingInternal] = useState(false);
  const generationTimeoutRef = useRef(null);

  const uploadMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleUploadMenu = () => setIsUploadMenuOpen(prev => !prev);
  const closeUploadMenu = () => setIsUploadMenuOpen(false);

  const toggleSearchOption = () => setOption(prev => (prev === "search" ? "" : "search"));
  const toggleRecommendOption = () => setOption(prev => (prev === "recommend" ? "" : "recommend"));

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    if (files.length !== imageFiles.length) {
      alert("Only image files are allowed.");
      return;
    }

    if (uploadedImages.length + imageFiles.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...imagePreviews]);

    event.target.value = "";
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        const imagePreview = URL.createObjectURL(file);
        if (uploadedImages.length < 3) {
          setUploadedImages(prev => [...prev, imagePreview]);
        } else {
          alert("You can only upload a maximum of 3 images.");
        }
      }
    }
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const openPhotoModal = (image) => {
    setSelectedImage(image);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = async() => {
    if (!promptText.trim() && uploadedImages.length === 0) return;

    const newMessage = {
      sender: "user",
      message: promptText.trim(),
      image_urls: uploadedImages,
    };

    if(conversation.length === 0) {
      await createChat(newMessage.message , newMessage.image_urls);
      generationTimeoutRef.current = setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            message: "Here’s your awesome result",
          },
        ]);
        setIsGenerating(false);
        setIsGeneratingInternal(false);
      }, 5000);
    }
    else
    {

    setConversation(prev => [...prev, newMessage]);
    setPromptText("");
    setUploadedImages([]);
    setIsGenerating(true);
    setIsGeneratingInternal(true);

    generationTimeoutRef.current = setTimeout(() => {
      setConversation(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          message: "Here’s your awesome result",
        },
      ]);
      setIsGenerating(false);
      setIsGeneratingInternal(false);
    }, 10000);}
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

  const createChat = async (message , image_urls) => {
    try {
      setIisCreating(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/create-chat`, {
        user_id : userId,
        message ,
        image_urls
      });
      setIsGenerating(true)
      navigate(`/chat/${res.data.data.id}`)
      setIisCreating(false);
      
    } catch (error) {
      alert("Error creating chat:", error);
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

  return (
    <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-2 md:mb-4 pb-1 pt-2">

      {/* Image Previews */}
      {uploadedImages.length > 0 && (
        <ImagesPreview uploadedImages={uploadedImages} removeImage={removeImage} openPhotoModal={openPhotoModal} />
      )}

      {/* Textarea */}
        <TextArea promptText={promptText} setPromptText={setPromptText} handleKeyDown={handleKeyDown}  disabled={isGeneratingInternal || isCreating}/>

      {/* Controls */}
      <div className="w-full flex items-center justify-between px-6 py-3 gap-3">
        <div className="flex gap-3 items-center">
          <div className="inline-flex relative mr-2" ref={uploadMenuRef}>
            <button
              className="p-2 rounded-full flex justify-center items-center border border-gray-500 hover:bg-gray-500/40 cursor-pointer size-10"
              onClick={toggleUploadMenu}
            >
              <HiOutlinePlus className="text-2xl" />
            </button>

            {isUploadMenuOpen && (
              <div className="absolute z-10 min-w-60 rounded-xl bg-secondary shadow-lg border border-gray-500 bottom-full md:left-1/2 -left-5 md:-translate-x-1/2 mb-3 px-1">
                <div className="divide-y divide-gray-500"                    
>
                  <div
                    className={`p-1 cursor-pointer ${
                      uploadedImages.length >= 3 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => {
                      if (uploadedImages.length < 3) {
                        fileInputRef.current.click();
                        closeUploadMenu();
                      }
                    }}
                    disabled={isGeneratingInternal}

                  >
                    <div className="text-center text-white font-semibold hover:bg-gray-400/40 rounded-lg p-2 py-2 my-0.5">
                      From Device
                    </div>
                    
                  </div>

                  <div
                    className={`p-1 cursor-pointer ${
                      uploadedImages.length >= 3 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => {
                      
                    }}
                    disabled={true}

                  >
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
            disabled={uploadedImages.length >= 3 || isGeneratingInternal || isCreating}
          />

          <button
            className={`border-1 md:px-3 justify-center  flex items-center gap-1 md:py-1  p-2 aspect-square md:aspect-auto size-10 md:h-10 md:size-auto rounded-3xl border-gray-500 font-medium cursor-pointer ${
              option === "search"
                ? "bg-gray-200 text-secondary"
                : "hover:bg-gray-500/40"
            }`}
            onClick={toggleSearchOption}
            disabled={isGeneratingInternal}
          >
           <FaSearch className="inline-block mr-0" /> <span className="p-0 m-0 hidden md:inline-flex">Search  </span>
          </button>

          <button
            className={`border-1 md:px-3 md:h-10 justify-center flex items-center h-10 gap-1 md:py-1  p-2 aspect-square md:aspect-auto size-10 md:size-auto rounded-3xl border-gray-500 font-medium cursor-pointer ${
              option === "recommend"
                ? "bg-gray-200 text-secondary"
                : "hover:bg-gray-500/40"
            }`}
            onClick={toggleRecommendOption}
            disabled={isGeneratingInternal}
          >
          <FaLightbulb className="inline-block text-xl mr-0" /> <span className="p-0 m-0 hidden md:inline-flex">Recommend  </span>

          </button>
        </div>

        {/* Submit / Cancel */}
        <div className="flex items-center">
          <TooltipWrapper tooltip={isGeneratingInternal ? "Cancel" : "Submit"} placement="right">
            {isCreating ?            
            <button
                disabled={true}
                className="border-1 p-1 border-gray-500 bg-white text-gray-950 rounded-full size-10 flex justify-center items-center cursor-pointer"
              >
                <Loading  className="text-2xl" submit />
              </button> :
             isGeneratingInternal ? (
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

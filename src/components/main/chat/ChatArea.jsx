import React, { useState, useEffect, useRef } from "react";
import PhotoDisplayer from "../../tools/PhotoDisplayer";
import PulseLoader from "../../tools/PulseLoader";
import Welcome from "./Welcome";
import Message from "./Message";
import PictureMessages from "./PictureMessages";

function ChatArea({ conversation, setConversation, isGenerating }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const lastMessageRef = useRef(null);

  const openPhotoModal = (img) => {
    setSelectedImage(img);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setSelectedImage(null);
    setIsPhotoModalOpen(false);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6 pb-8">
      <div className="max-w-[920px] mx-auto text-inter text-gray-200 flex flex-col justify-start gap-4">
        {conversation.length === 0 ? (
          <Welcome />
        ) : (
          conversation.map((msg, index) => (
            <div
              key={msg.id + Math.random()}
              className={`flex flex-col gap-2 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.message && (
                <Message message={msg.message} sender={msg.sender} />
              )}
              {msg.image_urls && msg.image_urls.length > 0 && (
                <PictureMessages sender={msg.message} image_urls={msg.image_urls} openPhotoModal={openPhotoModal} />
              )}

              {index === conversation.length - 1 && (
                <div ref={lastMessageRef} />
              )}
            </div>
          ))
        )}

        {isGenerating && (
          <div className="w-full flex items-center pb-4">
            <PulseLoader />
          </div>
        )}
      </div>

      <PhotoDisplayer
        open={isPhotoModalOpen}
        onClose={closePhotoModal}
        imageSrc={selectedImage}
      />
    </div>
  );
}

export default ChatArea;

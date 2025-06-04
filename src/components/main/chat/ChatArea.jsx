import React, { useState, useEffect, useRef } from "react";
import PhotoDisplayer from "../../tools/PhotoDisplayer";
import PulseLoader from "../../tools/PulseLoader";
import Welcome from "./Welcome";
import Message from "./Message";
import PictureMessages from "./PictureMessages";
import ProductsList from "./ProductsList"

function ChatArea({ conversation, isGenerating , deepsearchLogs }) {
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
        {conversation.map((msg, index) => (
          <div
            key={msg.id + Math.random()}
            className={`flex flex-col gap-2 mt-6 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Message Text */}
            {msg.message && (
              <Message message={msg.message} sender={msg.sender} />
            )}
            
            {/* Message Images */}
            {msg.image_urls && msg.image_urls.length > 0 && (
              <PictureMessages sender={msg.sender} image_urls={msg.image_urls} openPhotoModal={openPhotoModal} />
            )}

            {/* Display Products */}
            {msg.products && msg.products.length > 0 && (
                <ProductsList products={msg.products} />
            )}

            {index === conversation.length - 1 && (
              <div ref={lastMessageRef} />
            )}
          </div>
        ))}

        {isGenerating && deepsearchLogs.length > 0 && (
        <div className="deepsearch-log-loader">
          {deepsearchLogs.map((log, idx) => (
            <div key={idx} className="log-line">{log}</div>
          ))}
        </div>
        )}

        {isGenerating &&  deepsearchLogs.length === 0 && (
          <div className="w-full flex items-center pb-4">
            <PulseLoader text="Thinking ..."/>
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

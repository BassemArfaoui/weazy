import React, { useState, useEffect, useRef } from 'react';
import PhotoDisplayer from '../tools/PhotoDisplayer';
import PulseLoader from "../tools/PulseLoader";

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
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);  

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6 pb-8">
      <div className="max-w-[920px] mx-auto text-inter text-gray-200 flex flex-col justify-start gap-4">
        {conversation.length === 0 ? (
          <>
            <div className="text-gray-300 text-2xl text-center">
              Hello <span className="text-white">Bassem</span>,
            </div>
            <div className="text-gray-300 text-center">What do you want to find today?</div>
          </>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={msg.id + Math.random()}
              className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.message && (
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-base ${
                    msg.sender === 'user'
                      ? 'bg-msg text-gray-100 rounded-br-none'
                      : 'bg-transparent text-white rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              )}

              {msg.image_urls && msg.image_urls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      onClick={() => openPhotoModal(url)}
                      className="w-28 h-28 object-cover rounded-lg border border-white/10 cursor-pointer hover:brightness-110 transition duration-150"
                    />
                  ))}
                </div>
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

import React, { useState } from 'react';

function ChatArea() {
  const [conversation, setConversation] = useState([
    {
      id: 1,
      sender: 'user',
      message: 'Show me sneakers under $100.',
      image_urls: [
        'https://picsum.photos/seed/user1/150',
        'https://picsum.photos/seed/user5/151',
        'https://picsum.photos/seed/user3/152',
      ],
    },
    {
      id: 2,
      sender: 'bot',
      message: 'Sure! Here are some top-rated sneakers under $100.',
      image_urls: []   
     },
    {
      id: 3,
      sender: 'user',
      message: 'I prefer white ones.',
      image_urls: ['https://picsum.photos/seed/userwhite/150'],
    },
    {
      id: 4,
      sender: 'bot',
      message: 'Got it! Filtering for white sneakers now.',
    },
    {
      id: 5,
      sender: 'bot',
      message: 'Do you have a preferred brand?',
    },
    {
      id: 6,
      sender: 'user',
      message: 'Nike, preferably.',
      image_urls: ['https://picsum.photos/seed/nikelogo/150'],
    },
    {
      id: 7,
      sender: 'bot',
      message: 'Perfect! Showing white Nike sneakers under $100.',
      image_urls: [
      ],
    },
    {
      id: 8,
      sender: 'bot',
      message: 'Here are some popular models: Air Max, Revolution 6, and Court Vision.',
    },
    {
      id: 9,
      sender: 'user',
      message: 'Show me only Air Max.',
      image_urls: ['https://picsum.photos/seed/airmaxuser/150'],
    },
    {
      id: 10,
      sender: 'bot',
      message: 'Filtered! Only showing Nike Air Max under $100 in white.',
      image_urls: [],
    },
  ]);

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6 pb-20">
      <div className="max-w-[900px] mx-auto text-inter text-gray-200 flex flex-col justify-start gap-4">
        {conversation.length === 0 ? (
          <>
            <div className="text-gray-300 text-2xl text-center">
              Hello <span className="text-white">Bassem</span>,
            </div>
            <div className="text-gray-300 text-center">What do you want to find today?</div>
          </>
        ) : (
          conversation.map((msg) => (
            <div
              key={msg.id + Math.random()}
              className={`flex flex-col gap-2 ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-base ${
                  msg.sender === 'user'
                    ? 'bg-gray-700 text-gray-100 rounded-br-none'
                    : 'bg-primary text-white rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>

              {msg.image_urls && msg.image_urls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      className="w-28 h-28 object-cover rounded-lg border border-white/10"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatArea;

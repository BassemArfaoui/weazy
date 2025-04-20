import React, { useState } from 'react';

function ChatArea() {
  const [conversation, setConversation] = useState([
    { id: 1, sender: 'user', message: 'Show me sneakers under $100.' },
    { id: 2, sender: 'bot', message: 'Sure! Here are some top-rated sneakers under $100.' },
    { id: 3, sender: 'user', message: 'I prefer white ones.' },
    { id: 4, sender: 'bot', message: 'Got it! Filtering for white sneakers now.' },
    { id: 5, sender: 'bot', message: 'Do you have a preferred brand?' },
    { id: 6, sender: 'user', message: 'Nike, preferably.' },
    { id: 7, sender: 'bot', message: 'Perfect! Showing white Nike sneakers under $100.' },
    { id: 8, sender: 'bot', message: 'Here are some popular models: Air Max, Revolution 6, and Court Vision.' },
    { id: 9, sender: 'user', message: 'Show me only Air Max.' },
    { id: 10, sender: 'bot', message: 'Filtered! Only showing Nike Air Max under $100 in white.' },
  ]);

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6 pb-20">
      <div className="max-w-[900px] mx-auto text-inter text-gray-200 flex flex-col justify-start gap-4">
        {
          conversation.length === 0 ? (
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
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-base ${
                  msg.sender === 'user'
                    ? 'self-end bg-gray-700 text-gray-100 rounded-br-none'
                    : 'self-start bg-primary text-white rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default ChatArea;

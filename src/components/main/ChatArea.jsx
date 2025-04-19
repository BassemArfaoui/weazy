import React, { useState } from 'react'

function ChatArea() {

  const [conversation , setConversation] = useState([])

  return (
    <div className="w-full max-w-[900px] text-center text-inter text-2xl mb-2 text-gray-200 items-center flex flex-col flex-1 justify-center gap-2">        {
            conversation.length === 0 ? 
            (
              
        <>
        <div className="text-gray-300 text-2xl">
          Hello <span className="text-white">Bassem </span>,
        </div>
        <div className="text-gray-300">What do you want to find today ?</div>
        </>
   
            ) : 
            (
                <div>
                    conversation here
                </div>
            )
        }
    </div>
  )
}

export default ChatArea
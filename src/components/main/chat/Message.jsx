import React from 'react'

function Message({message , sender }) {
  return (
    <div
    className={`max-w-[90%]  text-base ${
      sender === 'user'
        ? 'user-msg px-4 py-3'
        : 'bg-transparent text-white rounded-bl-none'
    }`}
  >
    {message}
  </div>
  )
}

export default Message
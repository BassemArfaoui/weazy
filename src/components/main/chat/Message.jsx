import React from 'react'

function Message({message , sender }) {
  return (
    <div
    className={`max-w-[90%] rounded-2xl py-3 text-base ${
      sender === 'user'
        ? 'bg-msg text-gray-100 rounded-br-none px-4 '
        : 'bg-transparent text-white rounded-bl-none'
    }`}
  >
    {message}
  </div>
  )
}

export default Message
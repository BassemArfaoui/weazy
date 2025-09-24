import React from 'react'

function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center gap-1  mb-7'>
      <div className="text-gray-300 text-xl text-center">
        Hello <span className="text-title">Bassem </span>,
      </div>
      <div className="text-border-100 text-center text-2xl px-3">
        What do you want to find today?
      </div>
    </div>
  );
}

export default Welcome
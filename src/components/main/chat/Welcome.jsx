import React from 'react'

function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center gap-2  mb-9'>
      <div className="text-gray-300 text-2xl text-center">
        Hello <span className="text-white">Bassem</span>,
      </div>
      <div className="text-gray-300 text-center">
        What do you want to find today?
      </div>
    </div>
  );
}

export default Welcome
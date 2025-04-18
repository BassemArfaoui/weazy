import React from 'react'
import { HiArrowSmUp, HiOutlinePlus } from 'react-icons/hi'

function PromptArea() {
  return (
    <div className="bg-secondary w-[750px] h-[170px] rounded-3xl  items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-10 pb-1 pt-5">
    <div className='px-8 w-full'>
      <textarea
        rows={2}
        type="text"
        placeholder="Speak anything in your mind"
        style={{ resize: "none" }}
        className="bg-transparent flex items-center pt-3  text-inter w-full flex-1 border-none outline-none text-gray-300 text-lg"
      />
    </div>
    <div className="w-full flex items-center justify-between px-6 font-medium text-lg  text-inter py-3 gap-3">
      <div className='flex  gap-3 items-center justify-center'>
        <button className="p-2 aspect-square rounded-full flex justify-center items-center border-gray-500 cursor-pointer hover:bg-gray-500/20 gap-1 size-10 border-1">
          <span >
            <HiOutlinePlus className="text-2xl"/>
          </span>
        </button>
        <button className="border-1 px-3 py-1 rounded-3xl flex justify-center items-center border-gray-500 cursor-pointer hover:bg-gray-500/20 gap-1 h-10">
          <span className="text-md  flex items-center">Search</span>
        </button>
      </div>

      <div className='flex items-center'>
        <button className="border-1 p-1 flex justify-center items-center border-gray-500 cursor-pointer  gap-1 aspect-square rounded-full  bg-white text-gray-950 size-10">
          <span >
            <HiArrowSmUp className="text-3xl"/>
          </span>
        </button>
      </div>
    </div>
  </div>
  )
}

export default PromptArea
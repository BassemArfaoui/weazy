import React from 'react'
import { HiOutlinePlus } from "react-icons/hi";
import { HiArrowSmUp } from "react-icons/hi";
import PromptArea from '../components/main/PromptArea';
import ChatArea from '../components/main/ChatArea';

function HomePage() {
  return (
    <div className="h-full w-full px-0 flex-col flex justify-between items-center gap-1">

       <ChatArea />

       <PromptArea /> 
    </div>
  );
}

export default HomePage
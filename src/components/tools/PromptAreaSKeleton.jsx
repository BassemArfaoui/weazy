import React from "react";
import Loading from "./Loading";

function PromptAreaSkeleton() {
  return (
    <div className="h-full w-full px-0 flex-col flex justify-between items-center gap-2 md:gap-1">
      <div className="h-[80%] w-full px-0 flex justify-center items-center">
        <Loading size={0.7} />
      </div>
      <div className="flex justify-center w-full pb-2 md:pb-4">
        <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl flex flex-col gap-4 p-4 px-6 animate-pulse">
          {/* Textarea Placeholder */}
          <div className="bg-gray-400/20 rounded-2xl h-7 w-full" />
          {/* Controls Placeholder */}
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-3">
              <div className="bg-gray-400/20 rounded-full md:size-9.5 size-9 md:mr-2" />
              <div className="bg-gray-400/20 md:rounded-3xl md:w-21  size-9 rounded-full" />
        
            </div>
            <div className="bg-gray-400/30 rounded-full md:size-9.5 size-9" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptAreaSkeleton;

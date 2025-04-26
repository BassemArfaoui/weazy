import React from "react";

function PromptAreaSkeleton() {
  return (
    <div className="w-full h-full flex items-end justify-center pb-4">
        <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl flex flex-col gap-4 p-4 animate-pulse">
          {/* Textarea Placeholder */}
          <div className="bg-gray-600 rounded-2xl h-32 w-full" />
          {/* Controls Placeholder */}
          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-3">
              <div className="bg-gray-600 rounded-full size-10" />
              <div className="bg-gray-600 rounded-3xl w-24 h-10" />
              <div className="bg-gray-600 rounded-3xl w-24 h-10" />
            </div>
            <div className="bg-gray-600 rounded-full size-10" />
          </div>
        </div>
    </div>
  );
}

export default PromptAreaSkeleton;

import React, { useState, useRef, useEffect } from "react";
import { HiArrowSmUp, HiOutlinePlus } from "react-icons/hi";
import TooltipWrapper from "../tools/TooltipWrapper";

function PromptArea() {
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [option, setOption] = useState("");

  const uploadMenuRef = useRef(null);

  const toggleUploadMenu = () => {
    setIsUploadMenuOpen((prev) => !prev);
  };

  const closeUploadMenu = () => {
    setIsUploadMenuOpen(false);
  };

  const toggleSearchOption = () => {
    setOption((prev) => (prev === "search" ? "" : "search"));
  };

  const toggleRecommendOption = () => {
    setOption((prev) => (prev === "recommend" ? "" : "recommend"));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uploadMenuRef.current &&
        !uploadMenuRef.current.contains(event.target)
      ) {
        closeUploadMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-10 pb-1 pt-5">
      <div className="px-8 w-full">
        <textarea
          rows={2}
          type="text"
          placeholder="Speak anything in your mind"
          style={{ resize: "none" }}
          className="bg-transparent flex items-center pt-3 text-inter w-full flex-1 border-none outline-none text-gray-300 text-lg"
        />
      </div>

      <div className="w-full flex items-center justify-between px-6 font-medium text-lg text-inter py-3 gap-3">
        <div className="flex gap-3 items-center justify-center">
            <div className="inline-flex relative mr-2" ref={uploadMenuRef}>
              <button
                className="p-2 aspect-square rounded-full flex justify-center items-center border-gray-500 cursor-pointer hover:bg-gray-500/40 gap-1 size-10 border-1"
                onClick={toggleUploadMenu}
              >
                <span>
                  <HiOutlinePlus className="text-2xl" />
                </span>
              </button>

              {isUploadMenuOpen && (
                <div className="absolute z-10 min-w-60 rounded-xl bg-secondary shadow-lg border border-gray-500 focus:outline-none active:outline-none bottom-full left-1/2 -translate-x-1/2 mb-3  px-1">

                  <div className="divide-y divide-gray-500">
                    <div
                      className="p-1  cursor-pointer"
                      onClick={() => {
                        // handle option 2
                      }}
                    >
                      <div className="text-lg text-center text-white font-inter font-bold hover:bg-gray-400/60 rounded-lg p-2 py-2.5 my-0.5">
                        From Google Drive
                      </div>
                    </div>

                    <div
                      className="p-1 cursor-pointer"
                      onClick={() => {
                        // handle option 3
                      }}
                    >
                      <div className="text-lg text-center text-white font-inter font-bold hover:bg-gray-400/60 rounded-lg p-2 py-2.5 my-0.5">
                        From Computer
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

          <button
            className={`border-1 px-3 py-1 rounded-3xl flex justify-center items-center border-gray-500 ${
              option === "search"
                ? "bg-gray-200 text-secondary hover:bg-gray-200"
                : "hover:bg-gray-500/40"
            } cursor-pointer  gap-1 h-10`}
            onClick={toggleSearchOption}
          >
            <span className="text-md flex items-center">Search</span>
          </button>

          <button
            className={`border-1 px-3 py-1 rounded-3xl flex justify-center items-center border-gray-500 ${
              option === "recommend"
                ? "bg-gray-200 text-secondary hover:bg-gray-200"
                : "hover:bg-gray-500/40"
            } cursor-pointer  gap-1 h-10`}
            onClick={toggleRecommendOption}
          >
            <span className="text-md flex items-center">Recommend</span>
          </button>
        </div>

        <div className="flex items-center">
          <TooltipWrapper tooltip="Submit" placement="right">
            <button className="border-1 p-1 flex justify-center items-center border-gray-500 cursor-pointer gap-1 aspect-square rounded-full bg-white text-gray-950 size-10">
              <span>
                <HiArrowSmUp className="text-3xl" />
              </span>
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
}

export default PromptArea;

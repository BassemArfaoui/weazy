import React, { useState, useRef, useEffect } from "react";
import { HiArrowSmUp, HiOutlinePlus } from "react-icons/hi";
import TooltipWrapper from "../tools/TooltipWrapper";
import { IoMdClose } from "react-icons/io";

function PromptArea() {
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [option, setOption] = useState("");

  const uploadMenuRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const invalidFiles = files.filter((file) => !file.type.startsWith("image/"));

    if (invalidFiles.length > 0) {
      alert("Only image files are allowed.");
      return;
    }

    if (uploadedImages.length + imageFiles.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...imagePreviews]);

    // Reset input value to allow re-uploading the same file
    event.target.value = "";
  };

  const handlePaste = (event) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        const imagePreview = URL.createObjectURL(file);
        
        // Check if the total number of images exceeds 3
        if (uploadedImages.length < 3) {
          setUploadedImages((prev) => [...prev, imagePreview]);
        } else {
          alert("You can only upload a maximum of 3 images.");
        }
      }
    }
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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

  // Listen to the paste event on the component
  useEffect(() => {
    const handlePasteEvent = (event) => handlePaste(event);

    document.addEventListener("paste", handlePasteEvent);
    return () => document.removeEventListener("paste", handlePasteEvent);
  }, [uploadedImages]);

  return (
    <div className="bg-secondary w-full max-w-[800px] border-1 border-gray-500 rounded-3xl items-center justify-between text-inter text-xl text-gray-300 flex flex-col gap-1 mb-10 pb-1 pt-5">
      {/* Uploaded Images Area */}
      {uploadedImages.length > 0 && (
        <div className="flex gap-4 flex-wrap justify-start px-7 pb-3 w-full">
          {uploadedImages.map((src, index) => (
            <div key={index} className="relative size-17 rounded-lg  border border-gray-500">
              <img
                src={src}
                alt={`upload-${index}`}
                className="object-cover w-full  rounded-lg h-full"
              />
              <button
                className="absolute z-100 -top-2 -right-2 cursor-pointer bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 flex justify-center items-center"
                onClick={() => removeImage(index)}
              >
                <IoMdClose className="text-sm p-0 m-0" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Prompt Text Area */}
      <div className="px-8 w-full">
        <textarea
          type="text"
          placeholder="Speak anything in your mind"
          style={{ resize: "none" }}
          className="bg-transparent flex items-center pt-3 text-inter w-full flex-1 border-none outline-none text-gray-300 text-lg"
        />
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex items-center justify-between px-6 font-medium text-lg text-inter py-3 gap-3">
        <div className="flex gap-3 items-center justify-center">
          <div className="inline-flex relative mr-2" ref={uploadMenuRef}>
            <button
              className="p-2 aspect-square rounded-full flex justify-center items-center border-gray-500 cursor-pointer hover:bg-gray-500/40 gap-1 size-10 border-1"
              onClick={toggleUploadMenu}
            >
              <HiOutlinePlus className="text-2xl" />
            </button>

            {isUploadMenuOpen && (
              <div className="absolute z-10 min-w-60 rounded-xl bg-secondary shadow-lg border border-gray-500 bottom-full left-1/2 -translate-x-1/2 mb-3 px-1">
                <div className="divide-y divide-gray-500">
                  <div
                    className={`p-1 cursor-pointer ${
                      uploadedImages.length >= 3
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => {
                      if (uploadedImages.length < 3) {
                        fileInputRef.current.click();
                        closeUploadMenu();
                      }
                    }}
                  >
                    <div className="text-lg text-center text-white font-inter font-bold hover:bg-gray-400/40 rounded-lg p-2 py-2.5 my-0.5">
                      From Computer
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploadedImages.length >= 3}
          />

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
              <HiArrowSmUp className="text-3xl" />
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
}

export default PromptArea;

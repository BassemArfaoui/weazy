import React from "react";
import { MdClose } from "react-icons/md";

function ImagesPreview({ uploadedImages, removeImage, openPhotoModal }) {
  return (
    <div className="flex gap-3 px-7 justify-start w-full  flex-wrap mt-1">
      {uploadedImages.map((image, index) => (
        <div key={index} className="relative size-18 cursor-pointer" onClick={() => openPhotoModal(image)}>
          <img src={image.url} alt="Uploaded Preview" className="object-cover w-full h-full rounded-xl" />

          {image.uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <div className="w-6 h-6 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeImage(index);
            }}
            className="absolute -top-1 -right-1 aspect-square cursor-pointer bg-primary text-white rounded-full p-1 text-xs"
          >
            <MdClose />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImagesPreview;

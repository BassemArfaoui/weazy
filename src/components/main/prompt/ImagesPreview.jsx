import React from "react";
import { MdClose } from "react-icons/md";

function ImagesPreview({ uploadedImages, removeImage, openPhotoModal }) {
  return (
    <div className="flex gap-3 px-7 justify-start w-full  flex-wrap mt-1 mb-2">
      {uploadedImages.map((image, index) => (
        <div key={index} className="relative size-16 cursor-pointer" onClick={() => openPhotoModal(image)}>
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
            className="absolute top-1 right-1 translate-x-1/2 -translate-y-1/2 size-5 aspect-square cursor-pointer bg-primary text-white rounded-full p-1 text-xs flex items-center justify-center"

          >
            <MdClose />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImagesPreview;

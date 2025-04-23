import React from 'react'
import { IoMdClose } from 'react-icons/io'

function ImagesPreview({uploadedImages , removeImage , openPhotoModal}) {
  return (
    <div className="flex gap-4 flex-wrap justify-start px-7 pb-3 w-full">
          {uploadedImages.map((src, index) => (
            <div key={index} className="relative size-17 rounded-lg border border-gray-500">
              <img
                src={src}
                alt={`upload-${index}`}
                className="object-cover w-full rounded-lg h-full cursor-pointer"
                onClick={() => openPhotoModal(src)}
              />
              <button
                className="absolute z-100 -top-2 -right-2 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 cursor-pointer"
                onClick={() => removeImage(index)}
              >
                <IoMdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
  )
}

export default ImagesPreview
import React from 'react'

function PictureMessages({sender , image_urls , openPhotoModal}) {
  return (
    <div
    className={`flex flex-wrap gap-2 ${
      sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {image_urls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`preview-${index}`}
        onClick={() => openPhotoModal(url)}
        className="w-28 h-28 object-cover rounded-lg border border-white/10 cursor-pointer hover:brightness-110 transition duration-150"
      />
    ))}
  </div>  )
}

export default PictureMessages
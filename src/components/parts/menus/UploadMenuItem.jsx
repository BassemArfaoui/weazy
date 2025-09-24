import React from 'react'

function UploadMenuItem({title , onClick , disabled}) {
  return (
    <div
    className={`p-0.5 cursor-pointer ${
        disabled ? "opacity-50 pointer-events-none"
        : ""
    }`}
    onClick={onClick}
  >
    <div className="text-center text-white font-semibold hover:bg-gray-400/40 rounded-lg p-1.5 py-1.5 my-0.25 text-base">
      {title}
    </div>
  </div>
  )
}

export default UploadMenuItem
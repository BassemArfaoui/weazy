import React from 'react'

function ToolsMenuItem({tool , onClick  ,isActivated, icon }) {
  return (
    <div
    className="p-1 cursor-pointer"
    onClick={onClick}
  >
    <div
      className={`text-center font-semibold hover:bg-gray-400/40 rounded-lg p-1.5 py-1.5 my-0.25 text-base ${
        isActivated
          ? "bg-tool-activated text-tool-text-activated"
          : "text-white"
      }`}
    >
      {tool}
    </div>
  </div>
  )
}

export default ToolsMenuItem
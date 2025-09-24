import React from 'react'

function TextArea({promptText, setPromptText, handleKeyDown, disabled}) {
  return (
    <div className="px-8 w-full">
    <textarea
      placeholder="🔎︎  Look for whatever in your mind"
      style={{ resize: "none" }}
      className="bg-transparent pt-3 w-full border-none outline-none text-gray-300 text-lg"
      value={promptText}
      onChange={(e) => setPromptText(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      autoFocus
    />
  </div>
  )
}

export default TextArea
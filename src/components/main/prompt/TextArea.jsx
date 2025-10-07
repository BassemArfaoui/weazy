import React, { useEffect, useRef } from "react";

function TextArea({ promptText, setPromptText, handleKeyDown, disabled }) {
  const textareaRef = useRef(null);
  const maxRows = 4; 

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const lineHeight = 24; 
    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentRows <= maxRows) {
      textarea.style.overflowY = "hidden";
      textarea.style.height = textarea.scrollHeight + "px";
    } else {
      textarea.style.overflowY = "auto";
      textarea.style.height = `${lineHeight * maxRows}px`;
    }
  }, [promptText]);

  return (
    <div className="px-8 w-full">
      <textarea
        ref={textareaRef}
        placeholder="🔎︎  Look for whatever in your mind"
        style={{ resize: "none" }}
        className="bg-transparent pt-3 w-full border-none outline-none text-gray-300 text-lg leading-6 transition-all duration-200 ease-in-out"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        autoFocus
      />
    </div>
  );
}

export default TextArea;

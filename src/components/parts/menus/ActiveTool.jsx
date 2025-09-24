import React from 'react'

function ActiveTool({tool , icon , onClick , disabled}) {
  return (
    <button
    className={`md:px-3 justify-center flex items-center gap-1 md:py-1 p-2 md:aspect-auto rounded-3xl border-border font-medium bg-tool-activated text-tool-text-activated border-0 cursor-pointer`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    <span className="md:inline-flex text-[17px]">
      {tool}
    </span>
  </button>
  )
}

export default ActiveTool
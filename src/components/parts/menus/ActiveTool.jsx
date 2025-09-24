import { capitalize } from "../../tools/funcs.js"
function ActiveTool({tool , icon , onClick , disabled}) {
  return (
    <button
    className={`md:px-3 justify-center flex items-center gap-1 py-1 p-2 md:aspect-auto rounded-3xl  font-medium bg-tool-activated  text-tool-text-activated border-1 border-tool-activated cursor-pointer`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    <span className="md:inline-flex text-[17px]">
      {capitalize(tool)}
    </span>
  </button>
  )
}

export default ActiveTool
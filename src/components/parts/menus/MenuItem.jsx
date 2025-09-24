
function MenuItem({title , onClick}) {
  return (
    <div
    className="p-0.5 cursor-pointer"
    onClick={onClick}
  >
    <div className="text-center text-white font-inter font-bold rounded-lg p-1.5 py-1.5 my-0.25 text-base hover:bg-gray-400/40">
      {title}
    </div>
  </div>
  )
}

export default MenuItem
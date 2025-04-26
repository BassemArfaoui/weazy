import errorImage from '../../assets/images/error.png';
import { TbMoodSad } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";

function ErrorComponent() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="h-full w-full px-0 gap-3 flex flex-col justify-center items-center text-gray-300">
      <div className="w-[170px]">
        <img src={errorImage} alt="Error" />
      </div>
      <div className="text-lg font-inter flex items-center gap-1">
        Something went wrong <TbMoodSad className="text-2xl" />
      </div>
      <div 
        onClick={handleRefresh}
        className="bg-red mb-15 aspect-square bg-gray-500/40 rounded-full p-2 cursor-pointer hover:bg-gray-500/60 transition"
      >
        <IoMdRefresh className="text-gray-300 text-2xl" />
      </div>
    </div>
  );
}

export default ErrorComponent;

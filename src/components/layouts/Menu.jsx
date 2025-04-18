import { PiGlobeDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import profile from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";


const Menu = () => {

  const navigate = useNavigate();

  return (
    <div className="p-8 h-15 text-white flex items-center justify-between py-8  bg-primary shadow-md pt-10">
      <div className="flex items-center cursor-pointer">


        {/*          
      <span className="text-stone-900 mr-2 ml-1">
          <FaPlus className="text-2xl"/>

        </span> */}
        {/* 
        <span className="text-blue-500 mr-2 ml-1">
          <PiGlobeDuotone className="text-4xl"/>

        </span> */}

        <h1 className="text-xl text-white font-inter font-bold ml-2">
          DeepFashion
        </h1>

        <span
          className="text-white mr-2 ml-2"
        >
          <IoIosArrowDown className="text-xl"/>
        </span>

      </div>

      <div className="mr-3 flex  gap-5 items-center">

        <span className="cursor-pointer">
          <NewChat/>
        </span>

        <span className="cursor-pointer">
          <History />
        </span>


        <div className="size-10 rounded-full bg-gray-300 border-2 border-gray-100 ml-2">
          <img
            src={profile}
            alt="profile"
            className="rounded-full w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;

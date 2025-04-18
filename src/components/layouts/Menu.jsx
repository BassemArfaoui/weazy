import { IoIosArrowDown } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useNavigate} from "react-router-dom";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";
import BlackModal from "../tools/BlackModal";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Menu = ({ open, openHistory, closeHistory }) => {
  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false);
  const modelsMenuRef = useRef(null);

  const navigate = useNavigate();

  const toggleModelsMenu = () => {
    setIsModelsMenuOpen((prev) => !prev);
  };

  const closeModelsMenu = () => {
    setIsModelsMenuOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modelsMenuRef.current &&
        !modelsMenuRef.current.contains(event.target)
      ) {
        closeModelsMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
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

          <div className="relative">
            <div className="inline-flex items-center hover:bg-gray-700/50 py-2 border-2  border-gray-700 px-1 rounded-xl" onClick={toggleModelsMenu}>
              <h1 className="text-xl text-white font-inter font-bold ml-2">
                DeepFashion
              </h1>
              <span className="text-white mr-2 ml-2">
                <IoIosArrowDown className="text-xl" />
              </span>
            </div>

            {isModelsMenuOpen && (
              <div ref={modelsMenuRef} className="absolute z-10 w-44 origin-top-left rounded-md bg-white h-20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none active:outline-none top-full mb-3 left-2 mt-3">
                test
              </div>
            )}
          </div>
        </div>
        <div className="mr-3 flex  gap-5 items-center">
          <span className="cursor-pointer">
            <NewChat />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              openHistory();
            }}
          >
            <History />
          </span>
          <span className="cursor-pointer">
            <FaRegHeart className=" w-[26px]" />
          </span>

          <div className="size-10 rounded-full bg-gray-300 border-2 border-gray-100 ml-4">
            <img
              src={profile}
              alt="profile"
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
      </div>

      <BlackModal open={open} onClose={closeHistory} closeModal={closeHistory}>
        test
      </BlackModal>
    </div>
  );
};

export default Menu;

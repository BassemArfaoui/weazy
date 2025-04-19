import { IoIosArrowDown } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";
import BlackModal from "../tools/BlackModal";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import TooltipWrapper from "../tools/TooltipWrapper";

const Menu = ({
  historyOpen,
  openHistory,
  closeHistory,
  wishlistOpen,
  openWishlist,
  closeWishlist,
}) => {
  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modelsMenuRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const toggleModelsMenu = () => {
    setIsModelsMenuOpen((prev) => !prev);
  };

  const togglMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeModelsMenu = () => {
    setIsModelsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMenu);
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
            <div
              className="inline-flex items-center hover:bg-gray-700/50 py-2 border-2  border-gray-700 px-1 rounded-xl"
              onClick={toggleModelsMenu}
            >
              <h1 className="text-xl text-white font-inter font-bold ml-2">
                DeepFashion
              </h1>
              <span className="text-white mr-2 ml-2">
                <IoIosArrowDown className="text-xl" />
              </span>
            </div>

            {isModelsMenuOpen && (
              <div
                ref={modelsMenuRef}
                className="absolute z-10 w-44 origin-top-left rounded-md bg-white h-20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none active:outline-none top-full mb-3 left-2 mt-3"
              >
                test
              </div>
            )}
          </div>
        </div>
        <div className="mr-3 flex  gap-2 items-center ">
          <TooltipWrapper tooltip="New Chat" placement="bottom">
            <span className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl">
              <NewChat />
            </span>
          </TooltipWrapper>

          <TooltipWrapper tooltip="Chat History" placement="bottom">
            <span
              className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl"
              onClick={() => {
                openHistory();
              }}
            >
              <History />
            </span>
          </TooltipWrapper>

          <TooltipWrapper tooltip="Wishlist" placement="bottom">
            <span
              className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl"
              onClick={() => {
                openWishlist();
              }}
            >
              <FaRegHeart className=" w-[26px]" />
            </span>
          </TooltipWrapper>

          <div className="relative size-10 rounded-full bg-gray-300 border-2 border-gray-100 ml-4 cursor-pointer">
            <div
              className="w-full"
              onClick={() => {
                openMenu();
              }}
            >
              <img
                src={profile}
                alt="profile"
                className="rounded-full w-full h-full"
              />
            </div>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute z-10 w-44 origin-top-left rounded-md bg-white h-20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none active:outline-none top-full -right-3 mt-4"
              >
                test
              </div>
            )}
          </div>
        </div>
      </div>

      <BlackModal
        open={historyOpen}
        onClose={closeHistory}
        closeModal={closeHistory}
      >
        <h1 className="text-center text-2xl">chat list</h1>
      </BlackModal>

      <BlackModal
        open={wishlistOpen}
        onClose={closeWishlist}
        closeModal={closeWishlist}
      >
        <h3 className="text-center text-2xl">wishlist</h3>
      </BlackModal>
    </div>
  );
};

export default Menu;

import { IoIosArrowDown } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";
import BlackModal from "../tools/BlackModal";
import { FaRegHeart } from "react-icons/fa";
import { use, useEffect, useRef, useState } from "react";
import TooltipWrapper from "../tools/TooltipWrapper";

const Menu = ({
  historyOpen,
  openHistory,
  closeHistory,
  wishlistOpen,
  openWishlist,
  closeWishlist,
  closeSettings,
  settingsOpen,
  openSettings,
}) => {
  const [models, setModels] = useState([
    "DeepFashion",
    "Dataset 2",
    "Dataset 3",
    "Dataset 4",
  ]);

  const [model, setModel] = useState("DeepFashion");
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
            <button
              className="inline-flex items-center hover:bg-gray-700/50 py-2 border-1  border-gray-600 px-1 rounded-xl"
              onClick={toggleModelsMenu}
            >
              <h1 className="text-xl text-white font-inter font-bold ml-2">
                {model}
              </h1>
              <span className="text-white mr-2 ml-2">
                <IoIosArrowDown className="text-xl" />
              </span>
            </button>

            {/* models Menu */}
            {isModelsMenuOpen && models.length > 1 && (
              <div
                ref={modelsMenuRef}
                className="absolute z-10 min-w-53 rounded-xl bg-secondary shadow-lg border border-gray-500 focus:outline-none active:outline-none top-full left-0 mt-3  px-1"
              >
                <div className="divide-y divide-gray-500">
                  {models
                    .filter((modelItem) => modelItem !== model)
                    .map((modelItem, index) => (
                      <div
                        key={index}
                        className="p-1 py-2 "
                        onClick={() => {
                          setModel(modelItem);
                          closeModelsMenu();
                        }}
                      >
                        <div className="text-xl text-center px-6 text-white font-inter font-bold hover:bg-gray-400/60 rounded-lg p-2 py-2.5">
                          {modelItem}
                        </div>
                      </div>
                    ))}
                </div>
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

          <div className="relative size-10 rounded-full bg-gray-300 border-2 border-gray-100 ml-5 cursor-pointer">
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
                className="absolute z-10 min-w-45 rounded-xl bg-secondary shadow-lg border border-gray-500 focus:outline-none active:outline-none top-full -right-3 mt-4 px-3"
              >
                <div className="divide-y divide-gray-500">
                  <div
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      closeMenu()
                      openSettings()
                    }}
                  >
                    <div className="text-lg text-center text-white font-inter font-bold rounded-lg p-2 py-2.5 my-0.5">
                      Settings
                    </div>
                  </div>

                  <div
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      // handle Option 1
                    }}
                  >
                    <div className="text-lg text-center text-white font-inter font-bold rounded-lg p-2 py-2.5 my-0.5">
                      Logout
                    </div>
                  </div>

              
                </div>
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
        <h1 className="text-center text-2xl font-bold">Chat History</h1>
      </BlackModal>

      <BlackModal
        open={wishlistOpen}
        onClose={closeWishlist}
        closeModal={closeWishlist}
      >
        <h3 className="text-center text-2xl font-bold">wishlist</h3>
      </BlackModal>

      <BlackModal
        open={settingsOpen}
        onClose={closeSettings}
        closeModal={closeSettings}
      >
        <h3 className="text-center text-2xl font-bold">Settings</h3>
      </BlackModal>
    </div>
  );
};

export default Menu;

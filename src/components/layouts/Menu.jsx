import { IoIosArrowDown } from "react-icons/io";
import profile from "../../assets/images/profile.png";
import { useSearchParams } from "react-router-dom";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";
import BlackModal from "../tools/BlackModal";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import TooltipWrapper from "../tools/TooltipWrapper";
import ChatHistory from "../main/ChatHistory";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const paramModel = searchParams.get("model");

  const [models] = useState([
    "DeepFashion",
    "Dataset 2",
    "Dataset 3",
    "Dataset 4",
  ]);

  const [model, setModel] = useState(
    paramModel && models.includes(paramModel) ? paramModel : models[0]
  );

  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modelsMenuRef = useRef(null);
  const menuRef = useRef(null);

  const toggleModelsMenu = () => setIsModelsMenuOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeModelsMenu = () => setIsModelsMenuOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  const handleModelChange = (selectedModel) => {
    setModel(selectedModel);
    setSearchParams({ model: selectedModel });
    closeModelsMenu();
  };

  // Optional: clean up invalid model from URL
  useEffect(() => {
    if (!models.includes(paramModel)) {
      setSearchParams({ model: models[0] });
    }
  }, [paramModel, models, setSearchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelsMenuRef.current && !modelsMenuRef.current.contains(event.target)) {
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
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, []);

  return (
    <div>
      <div className="p-8 h-15 text-white flex items-center justify-between py-8 bg-primary shadow-md pt-10">
        <div className="flex items-center cursor-pointer">
          <div ref={modelsMenuRef} className="relative">
            <button
              className="inline-flex items-center hover:bg-gray-700/50 py-2 border-1 border-gray-600 px-1 rounded-xl"
              onClick={toggleModelsMenu}
            >
              <h1 className="text-xl text-white font-inter font-bold ml-2">
                {model}
              </h1>
              <span className="text-white mr-2 ml-2">
                <IoIosArrowDown className="text-xl" />
              </span>
            </button>

            {isModelsMenuOpen && models.length > 1 && (
              <div className="absolute z-10 min-w-53 rounded-xl bg-secondary shadow-lg border border-gray-500 top-full left-0 mt-3 px-1">
                <div className="divide-y divide-gray-500">
                  {models
                    .filter((modelItem) => modelItem !== model)
                    .map((modelItem, index) => (
                      <div
                        key={index}
                        className="p-1 py-2"
                        onClick={() => handleModelChange(modelItem)}
                      >
                        <div className="text-xl text-center px-6 text-white font-inter font-bold hover:bg-gray-400/40 rounded-lg p-2 py-2.5">
                          {modelItem}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mr-3 flex gap-2 items-center">
          <TooltipWrapper tooltip="New Chat" placement="bottom">
            <span className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl">
              <NewChat />
            </span>
          </TooltipWrapper>

          <TooltipWrapper tooltip="Chat History" placement="bottom">
            <span
              className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl"
              onClick={openHistory}
            >
              <History />
            </span>
          </TooltipWrapper>

          <TooltipWrapper tooltip="Wishlist" placement="bottom">
            <span
              className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl"
              onClick={openWishlist}
            >
              <FaRegHeart className="w-[26px]" />
            </span>
          </TooltipWrapper>

          <div ref={menuRef} className="relative ml-5 cursor-pointer size-10">
            <div className="rounded-full bg-gray-300 border-2 border-gray-100 w-full h-full overflow-hidden">
              <img
                src={profile}
                alt="profile"
                className="rounded-full w-full h-full"
                onClick={toggleMenu}
              />
            </div>

            {isMenuOpen && (
              <div className="absolute z-10 min-w-45 rounded-xl bg-secondary shadow-lg border border-gray-500 top-full -right-3 mt-4 px-1">
                <div className="divide-y divide-gray-500">
                  <div
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      closeMenu();
                      openSettings();
                    }}
                  >
                    <div className="text-lg text-center text-white font-inter font-bold rounded-lg p-2 py-2.5 my-0.5 hover:bg-gray-400/40">
                      Settings
                    </div>
                  </div>

                  <div className="p-1 cursor-pointer">
                    <div className="text-lg text-center text-white font-inter font-bold rounded-lg p-2 py-2.5 my-0.5 hover:bg-gray-400/40">
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <BlackModal open={historyOpen} onClose={closeHistory} closeModal={closeHistory}>
        <ChatHistory />
      </BlackModal>

      <BlackModal open={wishlistOpen} onClose={closeWishlist} closeModal={closeWishlist}>
        <h3 className="text-center text-2xl font-bold">Wishlist</h3>
      </BlackModal>

      <BlackModal open={settingsOpen} onClose={closeSettings} closeModal={closeSettings}>
        <h3 className="text-center text-2xl font-bold">Settings</h3>
      </BlackModal>
    </div>
  );
};

export default Menu;

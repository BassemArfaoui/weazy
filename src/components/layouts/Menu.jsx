import { FaBars } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import profile from "../../assets/images/profile.png";
import NewChat from "../../assets/svg/NewChat";
import History from "../../assets/svg/History";
import BlackModal from "../tools/BlackModal";
import TooltipWrapper from "../tools/TooltipWrapper";
import ChatHistory from "../menu/ChatHistory";
import { capitalize } from "../tools/funcs.js"
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConversation } from "../../Contexts/ConversationContext";
import Settings from "../menu/Settings";
import Wishlist from "../menu/Wishlist";
import MenuItem from "../parts/menus/MenuItem"

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
  const {
    model,
  } = useConversation();

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openNewChat = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };

  const openSettingsAndCloseMenu = () => {
    closeMenu();
    openSettings();
  }

  const logout = () =>
  {

  } 





  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, []);

  useEffect(() => {
    const handleClickOutsideMobileMenu = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
  }, []);

  return (
    <div>
      <div className="px-3 md:px-8 h-15 text-white flex items-center justify-between py-8 bg-primary shadow-md pt-10">
        <div className="flex items-center cursor-pointer">
          <div className="relative">
            <button className="inline-flex items-center hover:bg-gray-700/50 py-2 border-1 border-border px-1 rounded-xl">
              <h1 className="text-xl text-white font-inter font-bold mx-3">
                {capitalize(model)}
              </h1>
            </button>
          </div>
        </div>

        <div className="flex md:gap-2 items-center">
          <div className="md:flex hidden items-center">
            <TooltipWrapper tooltip="New Chat" placement="bottom">
              <span
                className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl text-icon"
                onClick={openNewChat}
              >
                <NewChat />
              </span>
            </TooltipWrapper>
            <TooltipWrapper tooltip="Chat History" placement="bottom">
              <span
                className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl text-icon"
                onClick={openHistory}
              >
                <History />
              </span>
            </TooltipWrapper>
            <TooltipWrapper tooltip="Wishlist" placement="bottom">
              <span
                className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl text-icon"
                onClick={openWishlist}
              >
                <FaRegHeart className="w-[26px]" />
              </span>
            </TooltipWrapper>
          </div>

          <div className="flex flex-col md:hidden relative" ref={mobileMenuRef}>
            <TooltipWrapper tooltip="Options" placement="left">
              <span
                className="cursor-pointer flex hover:bg-gray-500/40 py-2 px-3 rounded-xl text-icon"
                onClick={toggleMobileMenu}
              >
                <FaBars className="w-[22px] aspect-square" />
              </span>
            </TooltipWrapper>

            {isMobileMenuOpen && (
              <div className="absolute z-10 rounded-xl bg-secondary shadow-lg border border-gray-500 top-full left-1/2 -translate-x-1/2  px-2 flex flex-col gap-1 py-2">
                <TooltipWrapper tooltip="New Chat" placement="left">
                  <span
                    className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl text-icon"
                    onClick={openNewChat}
                  >
                    <NewChat />
                  </span>
                </TooltipWrapper>
                <TooltipWrapper tooltip="Chat History" placement="left">
                  <span
                    className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xlc text-icon"
                    onClick={openHistory}
                  >
                    <History />
                  </span>
                </TooltipWrapper>
                <TooltipWrapper tooltip="Wishlist" placement="left">
                  <span
                    className="cursor-pointer hover:bg-gray-500/40 p-2 rounded-xl text-icon"
                    onClick={openWishlist}
                  >
                    <FaRegHeart className="w-[26px]" />
                  </span>
                </TooltipWrapper>
              </div>
            )}
          </div>

          <div
            ref={menuRef}
            className="relative ml-2 md:ml-5 cursor-pointer size-11"
          >
            <div className="rounded-full bg-gray-300 border-2 border-border w-full h-full overflow-hidden">
              <img
                src={profile}
                alt="profile"
                className="rounded-full w-full h-full"
                onClick={toggleMenu}
              />
            </div>
            {isMenuOpen && (
              <div className="absolute z-10 min-w-40 rounded-xl bg-secondary shadow-lg border border-gray-500 top-full -right-3 mt-2 px-0.5">
                <div className="divide-y divide-gray-500">
                  <MenuItem title="Settings" onClick={openSettingsAndCloseMenu}/>
                  <MenuItem title="Logout" onClick={logout}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <BlackModal
        open={historyOpen}
        onClose={closeHistory}
        closeModal={closeHistory}
      >
        <ChatHistory closeHistory={closeHistory} />
      </BlackModal>

      <BlackModal
        open={wishlistOpen}
        onClose={closeWishlist}
        closeModal={closeWishlist}
      >
        <Wishlist closeWishlist={closeWishlist} />
      </BlackModal>

      <BlackModal
        open={settingsOpen}
        onClose={closeSettings}
        closeModal={closeSettings}
      >
        <Settings />
      </BlackModal>
    </div>
  );
};

export default Menu;

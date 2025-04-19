// src/components/Main.jsx
import { useState } from 'react';
import Menu from './Menu';

const Main = ({ children }) => {

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const openHistory = () =>
  {
    setIsHistoryOpen(true);
  }

  const openWishlist = () =>
  {
    setIsWishlistOpen(true);
  }

  const closeHistory = () =>
  {
    setIsHistoryOpen(false);
  }

  const closeWishlist = () =>
  {
    setIsWishlistOpen(false);
  }

  return (
    <div className="flex flex-col h-screen">
      <Menu  historyOpen={isHistoryOpen}  wishlistOpen={isWishlistOpen} openWishlist={openWishlist} closeWishlist={closeWishlist}  openHistory={openHistory} closeHistory={closeHistory} />

      <div className="flex flex-1 overflow-hidden">

        <div className="flex-1 overflow-y-auto px-10 md:px-5 bg-primary text-white">

          {children}
        </div>
      </div>
    </div>
  );
};


export default Main;

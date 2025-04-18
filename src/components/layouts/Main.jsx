// src/components/Main.jsx
import { useState } from 'react';
import Menu from './Menu';

const Main = ({ children }) => {

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const openHistory = () =>
  {
    setIsHistoryOpen(true);
  }

  const closeHistory = () =>
  {
    setIsHistoryOpen(false);
  }

  return (
    <div className="flex flex-col h-screen">
      <Menu  open={isHistoryOpen}  openHistory={openHistory} closeHistory={closeHistory} />

      <div className="flex flex-1 overflow-hidden">

        <div className="flex-1 overflow-y-auto px-20 md:px-5 bg-primary text-white">

          {children}
        </div>
      </div>
    </div>
  );
};


export default Main;

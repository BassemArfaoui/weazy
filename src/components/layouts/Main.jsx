// src/components/Main.jsx
import { useState } from 'react';
import Menu from './Menu';
import Sidebar from './Sidebar';

const Main = ({ children }) => {


  return (
    <div className="flex flex-col h-screen">
      <Menu/>

      <div className="flex flex-1 overflow-hidden">

        <div className="flex-1 overflow-y-auto px-20 md:px-5 bg-primary text-white">

          {children}
        </div>
      </div>
    </div>
  );
};


export default Main;

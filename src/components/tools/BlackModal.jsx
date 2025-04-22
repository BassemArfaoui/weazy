import React from 'react';
import { Modal, Box } from '@mui/material';
import { MdClose } from "react-icons/md";


const BlackModal = ({ open, onClose, closeModal , children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent', 
          backdropFilter: 'blur(2pt)', 
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 'none', 
          outline: 'none',
        }}

        className=" size-[90%] md:w-[70%] md:h-[90%] rounded-3xl bg-modal relative text-white border-2 border-gray-500 py-9 md:py-10 px-4 md:px-2"
      >
        <span className='absolute end-0 top-0 m-3 cursor-pointer p-1 aspect-square rounded-full  text-3xl text-white hover:bg-primary' onClick={()=>{closeModal()}}> 
        <MdClose />
        </span>

        {children}
      </Box>
    </Modal>
  );
};

export default BlackModal;

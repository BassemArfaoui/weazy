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
          p: 4,
          outline: 'none',
        }}

        className="w-[70%] h-[90%] rounded-3xl bg-dark relative text-white"
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

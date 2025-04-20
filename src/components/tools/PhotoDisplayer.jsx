import React from 'react';
import { Modal, Box } from '@mui/material';
import { MdClose } from "react-icons/md";

const PhotoDisplayer = ({ open, onClose, imageSrc }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(6px)', 
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
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        className="relative w-full h-full"
      >
  
        <span
          className="absolute top-5  right-10 cursor-pointer p-2 aspect-square rounded-full text-3xl text-gray-700 bg-gray-200 "
          onClick={onClose}
        >
          <MdClose />
        </span>

        {/* Image */}
        <div className="relative p-10">
          <img
            src={imageSrc}
            alt="Displayed"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default PhotoDisplayer;

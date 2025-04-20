import React from 'react';
import { Modal, Box } from '@mui/material';
import { MdClose } from "react-icons/md";

const PhotoDisplayer = ({ open, onClose, imageSrc }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(15px)',
        },
      }}
    >
      <Box
        onClick={onClose}
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
        {/* Close Button */}
        <span
          className="absolute top-5 right-10 cursor-pointer p-2 aspect-square rounded-full text-3xl text-gray-700 bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <MdClose />
        </span>

        {/* Image */}
        <div className="relative p-10 md:max-w-[500px]" onClick={stopPropagation}>
          <img
            src={imageSrc}
            alt="Displayed"
            className="object-contain max-w-full max-h-full rounded-3xl"
          />

        </div>
      </Box>
    </Modal>
  );
};

export default PhotoDisplayer;

import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CachedIcon from '@mui/icons-material/Cached';

function CustomToaster() {
  const toastOptions = {
    duration: 2100,
    position: 'top-center',
    icon: <ErrorIcon style={{ fontSize: '40px' }} />,
    style: {
      background: 'rgb(244, 67, 54)',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      margin: '0 10px 10px 10px',
      fontSize: '17px',
      lineHeight: '1.5',
    },
    className: 'font-inter'
  }




  return (
    <>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={20}
        toastOptions={toastOptions}
      />
    </>
  )
}

// success notification
const successOptions = {
  duration: 2100,
  position: 'top-center',
  style: {
    background: 'rgb(67, 160, 71)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    margin: '0 10px 10px 10px',
    fontSize: '17px',
    lineHeight: '1.5',
  },
  icon: <CheckCircleOutlineIcon style={{ fontSize: '40px' }} />,
  className: 'font-inter', 
}

const successNotify = (message) => toast.success(message, successOptions);

// processing notification
const processOptions = {
  duration: 1500,
  position: 'top-center',
  style: {
    background: 'rgb(255, 153, 51)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    margin: '0 10px 10px 10px',
    fontSize: '17px',
    lineHeight: '1.5',
  },
  icon: <CachedIcon style={{ fontSize: '40px' }} />,
  className: 'font-inter'
}





const processNotify = (message) => toast.loading(message, processOptions);

// default notify
const notify = (message) => toast(message, { className: 'font-inter' });

export default CustomToaster;
export { notify, successNotify, processNotify };

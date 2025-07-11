import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const TooltipWrapper = ({
  children,
  tooltip,
  placement = 'top',
  enterDelay = 1500, 
  leaveDelay = 200,  
  small
}) => {
  return (
    <Tooltip
      title={tooltip}
      placement={placement}
      arrow={false}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: '#0d0d0d',  
            color: '#fff',               
            fontSize: !small ? '1.15rem' : '0.85rem', 
            fontWeight: 900,
            padding: '0.70rem 0.9rem',
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },

      }}

 
    >
      {children}
    </Tooltip>
  );
};

export default TooltipWrapper;

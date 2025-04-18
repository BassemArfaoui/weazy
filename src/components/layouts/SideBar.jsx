import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({open , closeDrawer ,toggleDrawer}) => {



  const drawerContent = (
    <Box className="bg-dark text-white w-[300px] h-full" >
      <Typography variant="h6" gutterBottom>
        Menu
      </Typography>
      <List>
        {['Home', 'Products', 'About', 'Contact'].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='bg-dark'>
  
      <Drawer anchor="left" open={open} onClose={closeDrawer} className='bg-transparent' ModalProps={{
    BackdropProps: {
      invisible: true, // removes the semi-transparent shadow background
      sx: {
        backgroundColor: 'transparent', // ensures it's truly transparent
      },
    },
  }}>
      {/* <IconButton onClick={()=>{closeDrawer()}} edge="start" color="inherit" aria-label="menu" >
        <MenuIcon />
      </IconButton> */}
        {drawerContent}

      </Drawer>
    </div>
  );
};

export default Sidebar;

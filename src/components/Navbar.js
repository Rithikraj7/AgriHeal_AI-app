import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AgricultureIcon from '@mui/icons-material/Agriculture'; 
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' , color:'#fff', backgroundColor:'#4caf50'}}>
      <Typography variant="h6" sx={{ my: 3 }}>
            AgriHeal AI
      </Typography>
      <List>
        <ListItem button component={Link} to="AgriHeal_AI-app/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="AgriHeal_AI-app/history">
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button component={Link} to="AgriHeal_AI-app/about">
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#4caf50', // Green nav bar
          color: '#fff',              // White text/icons
        }}
      >
        <Toolbar>
          {/* Hamburger menu icon on mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, padding: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Title with icon */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: 'flex',       // Lay out icon + text horizontally
            }}
          >
            <AgricultureIcon
              sx={{
                mr: 1,
                fontSize: '2rem',
                color: '#fff',
              }}
            />
            <Box
              component="span"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '1px',
              }}
            >
              AgriHeal AI
            </Box>
          </Typography>

          {/* Desktop nav buttons */}
          {!isMobile && (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/history">
                History
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor:'#4caf50',
            color:'#fff'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

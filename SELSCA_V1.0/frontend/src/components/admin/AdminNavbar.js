import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import GearIcon from "../../misc/icons/RCTS - Logo - Transparent 1.png";
import UserIcon from "../../misc/icons/User.png";
import RegisterIcon from "../../misc/icons/Admin_forms.png";
import DateIcon from "../../misc/icons/Date_range.png";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItemButton, ListItemIcon } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import PersonIcon from '@mui/icons-material/Person';




const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    backgroundColor: '#4E4E4E', 
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: '#4E4E4E', 
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: '#4E4E4E', 
      },
    }),
  }),
);



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#D9D9D9', 
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));



const drawerWidth = 300;
const drawerMiniWidth = 80;

const AdminNavbar = () => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: "User Profile", to: "/admin/userprofile" , src : UserIcon , style : {width : "80%"}},
    { text: "Registration", to: "/admin/register"  , src : RegisterIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Exam Dates", to: "/admin/examDates" , src : DateIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Test Info", to: "/admin/TestInfo" },{/* new---added this line and removed the grades due date */},
    { text: "Academic Calendar", to: "/admin/Calendar" },  //for calendar
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isDrawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={GearIcon} style={{ width : "7.5%" , height : "30%"}}></img>
          <Typography variant="h6" noWrap component="div" sx={{ pl: 10, color: '#4E4E4E' , fontSize: 20 }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ marginLeft: 'auto', paddingRight: '1rem' }}>
            <Button color="primary" component={RouterLink} to="/">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.to}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isDrawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isDrawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={item.src} style={item.style} />
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container sx={{ paddingLeft: drawerWidth }}>

      </Container>
      </Box>
  );
};

export default AdminNavbar;

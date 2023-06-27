import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Drawer,
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

const drawerWidth = 260;

const AdminNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: "User Profile", to: "/admin/userprofile" , src : UserIcon , style : {width : "100%"}},
    { text: "Registration", to: "/admin/register"  , src : RegisterIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Users List", to: "/admin/userData" },
    { text: "Exam Dates", to: "/admin/examDates" , src : DateIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Test Info", to: "/admin/TestInfo" },{/* new---added this line and removed the grades due date */}
  ];

  return (
    <div>
      <AppBar position="static" sx={{backgroundColor : "#d9d9d9"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="primary" component={RouterLink} to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#4e4e4e",
          },
        }}
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem>
            <img
              src={GearIcon}
              style={{ width : "100%" , height : "50%"}}
            />
          </ListItem>
          {drawerItems.map((item) => (
            <>
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.to}
              onClick={handleDrawerToggle}
              >
                <Box sx={{width : "30%" , height : "10%"}}>

            <img src={item.src} style={item.style} />
                </Box>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ color: "white" }}
                />
            </ListItem>
          </>
          ))}
        </List>
      </Drawer>
      <Container sx={{ paddingLeft: drawerWidth }}>
        {/* your page content goes here */}
      </Container>
    </div>
  );
};

export default AdminNavbar;

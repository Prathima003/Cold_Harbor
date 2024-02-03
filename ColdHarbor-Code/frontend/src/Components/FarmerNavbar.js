import React, { useState } from "react";
import Logo from '../Assets/Logo.svg'
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';




function FarmerNavbar() {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    window.location = "/";
  }
  const login = () => {
    console.log("You are in login function");
  }
  const [openMenu, setOpenMenu] = useState(false);

  const [logInOut] = useState(localStorage.getItem("token")?"Logout":"Login");
  const [logInOutRoute] = useState(localStorage.getItem("token")?"/":"/loginas");

  

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      id: ""
    },
    {
      text: "About",
      icon: <InfoIcon />,
      id: "#about"
    },
    {
      text: "Testimonial",
      icon: <CommentRoundedIcon />,
      id: "#testimonial"
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      id: "#contact"
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      id: "#cart"
    },
    {
      text: logInOut,
      icon: <FaUserCircle size={20}/>,
      id: logInOutRoute
    },
  ];

  return (
    <nav id="home">
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <Link to="/">Home</Link>
        <a href="./#about">About</a>
        {/* <Link to="#about">About</Link> */}

        <a href="#testimonial">Testimonial</a>
        <a href="#contact">Contact</a>
        <a href="/cart" >
          <BsCart2 className="navbar-cart-icon" />
        </a>
        <Link to={logInOutRoute} className="login-home-button"><button className="primary-button " onClick={localStorage.getItem("token")?logout:login}>{logInOut}</button></Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <a href={item.id}>
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </a>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  )
}

export default FarmerNavbar
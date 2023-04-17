import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const navbarStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "1rem",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    marginRight: "1rem",
  },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={navbarStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            style={navbarStyles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={navbarStyles.title}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Download Gram
            </Link>
          </Typography>
          <div className={menuOpen ? "show-menu" : "hide-menu"}>
            <Button color="inherit">
              <Link to="/" style={navbarStyles.link}>
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/about" style={navbarStyles.link}>
                About Us
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/contact" style={navbarStyles.link}>
                Contact Us
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

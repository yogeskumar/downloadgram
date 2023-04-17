import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

const footerStyles = makeStyles((theme) => ({
  root: {
    top: "auto",
    bottom: 0,
    width: "100%",
    marginTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-evenly",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = footerStyles();

  return (
    <AppBar className={classes.root} position="relative">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.link}>
          <Typography variant="body1" color="white">
            Home
          </Typography>
        </Link>
        <Link to="/about" className={classes.link}>
          <Typography variant="body1" color="white">
            About
          </Typography>
        </Link>
        <Link to="/contact" className={classes.link}>
          <Typography variant="body1" color="white">
            Contact
          </Typography>
        </Link>
        <Typography variant="body1" align="center">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by Yogesh Kumar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";

import "fontsource-roboto";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
//import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import "./cursor.css";
import Switch from "@material-ui/core/Switch";

const mytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#cacaca",
    },
    secondary: {
      main: "#01579b",
    },
  },
});

function Layout(props) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mytheme}>
        <AppBar position="static" variant="dense">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6">
              <span>OS Admin</span>
              <span className="blinking-cursor">▋</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box p={2}>{props.children}</Box>
      </ThemeProvider>
    </>
  );
}

export default Layout;

import React, { useState, useEffect } from "react";

import "fontsource-roboto";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import "./cursor.css";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InfoIcon from "@material-ui/icons/Info";
import BuildIcon from "@material-ui/icons/Build";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

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

function MIcon({ name }) {
  switch (name) {
    case "logs":
      return (
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
      );
      break;
    case "systemd":
      return (
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
      );
      break;
    default:
      return (
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
      );
      break;
  }
}

function Layout({ io, children, go, page }) {
  const [openmenu, setOpenmenu] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    if (io) {
      io.on("menu", (data) => {
        setMenu(data);
        setShowmenu(true);
      });
      return function () {
        io.off("menu");
      };
    }
  }, [io]);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={mytheme}>
        {showmenu && (
          <Drawer
            open={openmenu}
            onClose={() => setOpenmenu(false)}
            variant="temporary"
          >
            <MenuList style={{ width: "300px" }}>
              {Object.keys(menu)
                .filter((k) => menu[k].enable)
                .map((k) => (
                  <MenuItem
                    key={k}
                    selected={page == k}
                    onClick={() => {
                      go(k);
                      setOpenmenu(false);
                    }}
                  >
                    <MIcon name={k} />
                    <Typography variant="inherit">{menu[k].label}</Typography>
                  </MenuItem>
                ))}
            </MenuList>
          </Drawer>
        )}
        <AppBar position="static" variant="elevation">
          <Toolbar>
            {showmenu && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setOpenmenu(true);
                }}
                style={{ marginRight: mytheme.spacing(2) }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">
              <span>OS Admin</span>
              <span className="blinking-cursor">▋</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box p={2}>{children}</Box>
      </ThemeProvider>
    </>
  );
}

export default Layout;

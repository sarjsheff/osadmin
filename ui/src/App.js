import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
import CPUChartAdapter from "./CPUChartAdapter";
import NETChartAdapter from "./NETChartAdapter";
import Summary from "./Summary";
import Systemd from "./Systemd";
import Logs from "./Logs";
import Avatar from "@material-ui/core/Avatar";
import iocli from "socket.io-client";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

function Login({ io }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={true}>
      {/*<DialogTitle>*/}
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Avatar alt="OSAdmin" src="/android-chrome-512x512.png" />
        </IconButton>
        <Typography variant="h6">Login</Typography>
      </Toolbar>
      {/*</DialogTitle>*/}
      <List>
        <ListItem>
          <TextField
            required
            id="standard-required"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </ListItem>
        <ListItem>
          <Button
            color="primary"
            variant="contained"
            style={{ width: "100%" }}
            onClick={() => {
              io.emit("login", { username: username, password: password });
            }}
          >
            Login
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

function Page({ io, page }) {
  switch (page) {
    case "systemd":
      return (
        <Grid item xs={12} md={12}>
          <Systemd io={io} />
        </Grid>
      );
    case "logs":
      return (
        <Grid item xs={12} md={12}>
          <Logs io={io} />
        </Grid>
      );
    default:
      return (
        <>
          <Grid item xs={12} md={6}>
            <Grid container>{io && <Summary io={io} />}</Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {io && <CPUChartAdapter io={io} />}
              </Grid>
              <Grid item xs={12} md={12}>
                {io && <NETChartAdapter io={io} />}
              </Grid>
            </Grid>
          </Grid>
        </>
      );
  }
}

function App() {
  const [io, setIo] = useState(undefined);
  const [login, setLogin] = useState(false);
  const [page, go] = useState("summary");

  useEffect(() => {
    const ii = iocli("http://192.168.7.5:3001", {
      query: {
        token: localStorage.getItem("sid"),
      },
    });

    ii.on("loggedin", (sid) => {
      localStorage.setItem("sid", sid);
      setLogin(true);
    });
    ii.on("logoff", () => {
      setLogin(false);
    });
    ii.on("error", (err) => {
      console.log("ErrRRR", err);
      setLogin(false);
    });
    ii.on("connect_error", (err) => {
      console.log(err);
      //setLogin(false);
    });

    setIo(ii);
  }, []);

  if (login) {
    return (
      <Layout io={io} go={go} page={page}>
        <Grid container spacing={2} justify="center">
          <Page page={page} io={io} />
        </Grid>
      </Layout>
    );
  } else {
    return <Login io={io} />;
  }
}

export default App;

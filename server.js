const si = require("systeminformation");
const fs = require("fs");
let config = {
  port: 3001,
  host: "0.0.0.0",
  username: "admin",
  password: Math.random().toString(36).slice(-8),
};
try {
  config = { ...config, ...require("./config.json") };
} catch (e) {
  fs.writeFileSync("./config.json", JSON.stringify(config));
  console.log(`PASSWORD FOR admin IS [${config.password}]`);
}

let menu = {
  summary: { label: "Summary", enable: true },
  systemd: { label: "Systemd", enable: false },
  logs: { label: "Logs", enable: false },
};

// load modules
let systemd = undefined;
try {
  systemd = require("./module_systemd.js")();
  menu.systemd.enable = true;
  menu.logs.enable = true;
} catch (e) {
  console.log("SYSTEMD not loaded.", e);
}
// end load modules

const EventEmitter = require("events");

class InfoEmitter extends EventEmitter {}

const events = new InfoEmitter();

const express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let cpustat = [];
let netstat = [];
let sum = {};
let authed = {};

app.use(express.static("ui/build/"));

/*app.get("/", (req, res) => {
  res.send("ok");
});*/

io.use(function (socket, next) {
  //  console.log(socket);
  var handshakeData = socket.request;
  console.log(
    socket.id,
    socket.handshake.query.token,
    authed[socket.handshake.query.token]
  ); //, authedSessions[socket.id] || "not authed");
  if (authed[socket.handshake.query.token]) {
    authed[socket.id] = authed[socket.handshake.query.token];
    authed[socket.handshake.query.token] = undefined;
  }
  next();
  //next(new Error("authentication error"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  if (authed[socket.id] == undefined) {
    socket.emit("logoff");
  }

  const jobs = (socket) => {
    events.on("menu", (data) => {
      socket.emit("menu", menu);
    });

    events.on("summary", (data) => {
      socket.emit("summary", data);
    });

    events.on("netstat", () => {
      socket.emit(
        "netstat",
        netstat.length < 101 ? netstat : netstat.slice(netstat.length - 100)
      );
    });

    events.on("cpustat", () => {
      socket.emit(
        "cpustat",
        cpustat.length < 101 ? cpustat : cpustat.slice(cpustat.length - 100)
      );
    });

    if (systemd) {
      console.log(typeof systemd);
      systemd.run(io, socket, app);
    }
  };

  socket.use((packet, next) => {
    if (packet[0] === "login" || authed[socket.id]) {
      console.log(socket.id);
      next();
    } else {
      next(new Error("authentication error"));
    }
  });

  socket.on("login", ({ username, password }) => {
    console.log("Login:", username);
    if (username === config.username && password === config.password) {
      authed[socket.id] = username;
      jobs(socket);
      socket.emit("loggedin", socket.id);
    }
  });
});

http.listen(config.port, config.host, () => {
  console.log("listening on *:" + config.port);
  network(5000);
  cpu(5000);
  summary(5000);
  sendmenu(5000);
});

function sendmenu(interval) {
  events.emit("menu", menu);
  if (interval) setTimeout(sendmenu, interval, interval);
}

function summary(interval) {
  si.get({
    cpu: "*",
    system: "manufacturer,model,uuid",
    osInfo: "platform,distro,release,kernel,arch,hostname,logofile",
    time: "*",
    mem: "*",
  }).then((data) => {
    sum = data;
    events.emit("summary", data);
    if (interval) setTimeout(summary, interval, interval);
  });
}

function network(interval) {
  si.networkStats().then((data) => {
    const tmp = { data: data, date: new Date() };
    if (netstat.length < 1001) {
      netstat.push(tmp);
    } else {
      netstat = [...netstat.slice(1), tmp];
    }
    events.emit("netstat", tmp);
    if (interval) setTimeout(network, interval, interval);
  });
}

function cpu(interval) {
  si.currentLoad().then((data) => {
    if (cpustat.length < 1001) {
      cpustat.push({ ...data, date: new Date() });
    } else {
      cpustat = [...cpustat.slice(1), { ...data, date: new Date() }];
    }
    events.emit("cpustat", { ...data, date: new Date() });
    if (interval) setTimeout(cpu, interval, interval);
  });
}

const si = require("systeminformation");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let cpustat = [];
let netstat = [];

app.get("/", (req, res) => {
  res.send("ok");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(3001, () => {
  console.log("listening on *:3000");
});

setInterval(function () {
  si.networkStats().then((data) => {
    console.log(data);
    const tmp = { data: data, date: new Date() };
    if (netstat.length < 101) {
      netstat.push(tmp);
    } else {
      netstat = [...netstat.slice(1), tmp];
    }
    io.emit("netstat", netstat);
  });
}, 1000);

setInterval(function () {
  si.currentLoad().then((data) => {
    //console.log(data);
    if (cpustat.length < 101) {
      cpustat.push({ ...data, date: new Date() });
    } else {
      cpustat = [...cpustat.slice(1), { ...data, date: new Date() }];
    }
    io.emit("cpustat", cpustat);
  });
}, 1000);

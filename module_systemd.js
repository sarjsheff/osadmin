process.env.DISPLAY = ":0";
process.env.DBUS_SESSION_BUS_ADDRESS = "unix:path=/run/dbus/system_bus_socket";
//const dbus = require("dbus");
const dbus = require("dbus-next");
const { exec } = require("child_process");

module.exports = function () {
  console.log("Systemctl module init");

  let bus = dbus.sessionBus();
  return {
    run: function (io, socket, app) {
      socket.on("getsystemctl", () => {
        bus
          .getProxyObject(
            "org.freedesktop.systemd1",
            "/org/freedesktop/systemd1"
          )
          .then((obj) => {
            const manager = obj.getInterface(
              "org.freedesktop.systemd1.Manager"
            );
            manager.ListUnits().then((lst) => {
              socket.emit("systemctl", lst);
            });
          });
      });
      socket.on("getlog", (ss) => {
        exec("journalctl -n 100 -o json", (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            socket.emit("log", { error: error.message });
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            socket.emit("log", { error: stderr });
            return;
          }
          const tmp = stdout.split("\n");
          let arr = [];
          for (var i = 0; i < tmp.length; i++) {
            if (tmp[i].length > 2) {
              const o = JSON.parse(tmp[i]);
              //console.log(o.__MONOTONIC_TIMESTAMP, o.MESSAGE);
              arr.push(o);
            }
          }
          socket.emit("log", arr);
          console.log("logs:", arr.length);
          //console.log(`stdout: ${stdout.split("\n").length}`);
        });
      });
    },
  };
};

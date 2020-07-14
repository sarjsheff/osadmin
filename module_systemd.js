process.env.DISPLAY = ":0";
process.env.DBUS_SESSION_BUS_ADDRESS = "unix:path=/run/dbus/system_bus_socket";
//const dbus = require("dbus");
const dbus = require("dbus-next");

module.exports = function () {
  console.log("Systemctl module init");

  try {
    let bus = dbus.sessionBus();
  } catch (e) {
    console.log(e);
  }
  return {
    run: function (io, socket, app) {
      console.log("emit");
      setInterval(() => {
        socket.emit("systemctl", [{ name: "unit", desc: "Description." }]);
      }, 10000);
    },
  };
};

const { exec } = require("child_process");

exec("journalctl -n 100 -o json", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  const tmp = stdout.split("\n");
  for (var i = 0; i < tmp.length; i++) {
    const o = JSON.parse(tmp[i]);
    console.log(o.__MONOTONIC_TIMESTAMP, o.MESSAGE);
  }
  //console.log(`stdout: ${stdout.split("\n").length}`);
});

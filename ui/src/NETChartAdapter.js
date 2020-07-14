import React, { useState, useEffect, useReducer } from "react";
import NETChartVictory from "./NETChartVictory";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import RouterIcon from "@material-ui/icons/Router";
const pb = require("pretty-bytes");

export default function ({ io }) {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    io.on("netstat", (msg) => {
      const dt = msg.map((e) => {
        const ret = { x: e.date, rx: 0, tx: 0 }; //sum:{rx_sec:0,tx_sec:0} };

        for (var i = 0; i < e.data.length; i++) {
          //ret[`y${i == 0 ? "" : i - 1}`] = e.data[i].rx_sec;
          ret.rx += e.data[i].rx_sec;
          ret.tx += e.data[i].tx_sec;
        }

        return ret;
      });
      setData(dt);
      setCurrent(dt[0]);
    });
  }, [io]);

  return (
    <Card>
      <CardHeader
        avatar={<RouterIcon />}
        title="Network utilization"
        subheader={current ? `RX/TX ↓${pb(current.rx)}/↑${pb(current.tx)}` : ""}
      />
      <CardContent style={{ height: "auto" }}>
        <NETChartVictory data={data} />
      </CardContent>
    </Card>
  );
}

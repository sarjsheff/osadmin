import React, { useState, useEffect, useReducer } from "react";
import NETChartVictory from "./NETChartVictory";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function ({ io }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    io.on("netstat", (msg) => {
      setData(
        msg.map((e) => {
          const ret = { x: e.date };
          for (var i = 0; i < e.data.length; i++) {
            ret[`y${i == 0 ? "" : i - 1}`] = e.data[i].rx_sec;
          }
          return ret;
        })
      );
    });
  }, [io]);

  return (
    <Card>
      <CardContent style={{ height: "auto" }}>
        <NETChartVictory data={data} />
      </CardContent>
    </Card>
  );
}

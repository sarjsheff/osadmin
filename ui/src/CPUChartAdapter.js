import React, { useState, useEffect } from "react";
import CPUChartJS from "./CPUChartJS";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ComputerIcon from "@material-ui/icons/Computer";

export default function ({ io }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    io.on("cpustat", (msg) => {
      setData(
        msg.map((e) => {
          return {
            x: new Date(e.date), //"" + msg.date.split("T")[1].split(".")[0],
            y: e.currentload,
          };
        })
      );
    });
    return function () {
      io.off("cpustat");
    };
  }, [io]);

  return (
    <Card>
      <CardHeader
        avatar={<ComputerIcon />}
        title="CPU utilization"
        subheader={data && data.length > 0 ? Math.round(data[0].y) + "%" : ""}
      />
      <CardContent style={{ height: "auto" }}>
        <CPUChartJS data={data} />
      </CardContent>
    </Card>
  );
}

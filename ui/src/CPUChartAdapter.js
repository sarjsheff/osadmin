import React, { useState, useEffect, useReducer } from "react";
import CPUChart from "./CPUChart";
import CPUChartStream from "./CPUChartStream";
import CPUChartVictory from "./CPUChartVictory";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

/*function reducer(state, action) {
  if (action.item) {
    if (state.data.length < 61) {
      return { data: [...state.data, action.item] };
    } else {
      return { data: [...state.data.slice(1), action.item] };
    }
  } else {
    throw new Error();
  }
}*/

export default function ({ io }) {
  //const [state, dispatch] = useReducer(reducer, { data: [] });
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
      /*dispatch({
        item: {
          x: new Date(msg.date), //"" + msg.date.split("T")[1].split(".")[0],
          y: msg.currentload,
        },
      });*/
    });
  }, [io]);

  return (
    <Card>
      <CardContent style={{ height: "auto" }}>
        {/*<CPUChart
          data={[{ id: "all", color: "hsl(202, 70%, 50%)", data: state.data }]}
        />*/}
        {/* <CPUChartStream data={state.data} /> */}
        <CPUChartVictory data={data} />
      </CardContent>
    </Card>
  );
}

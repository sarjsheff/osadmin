import React, { useState } from "react";
//import * as V from 'victory';
import {
  VictoryBar,
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from "victory";

const pb = require("pretty-bytes");

const NETChartVictory = ({ data }) => {
  //  console.log(data);

  return (
    <VictoryChart
      width={1000}
      //      minDomain={{ y: 0 }}
      //      maxDomain={{
      //        y: 100000000,
      //x: data.length > 0 ? data[0].x.getTime() + 60000 : 0,
      //      }}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        tickCount={10}
        tickFormat={(t) =>
          new Date(t).toISOString().split("T")[1].split(".")[0]
        }
        scale="time"
      />
      <VictoryAxis dependentAxis />
      {data.length > 0 && (
        <VictoryStack colorScale={["#cccccc", "orange"]}>
          <VictoryBar
            //barWidth={({ index }) => 60}
            alignment="start"
            barRatio={1}
            labels={({ datum }) => {
              //console.log(b);
              return `rx ${pb(datum.rx, { locale: "en" })}/s`;
            }}
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
            interpolation="natural"
            //animate={true}
            data={data}
            x="x"
            y="rx"
          />
          <VictoryBar
            //barWidth={({ index }) => 60}
            alignment="start"
            barRatio={1}
            labels={({ datum }) => {
              //console.log(b);
              return `tx ${pb(datum.tx, { locale: "en" })}/s`;
            }}
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
            interpolation="natural"
            //animate={true}
            data={data}
            x="x"
            y="tx"
          />
        </VictoryStack>
      )}
    </VictoryChart>
  );
};

export default NETChartVictory;

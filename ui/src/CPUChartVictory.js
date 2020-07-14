import React, { useState } from "react";
//import * as V from 'victory';
import {
  VictoryBar,
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
} from "victory";

const CPUChartVictory = ({ data }) => {
  //  console.log(data);

  return (
    <VictoryChart
      width={1000}
      minDomain={{ y: 0 }}
      maxDomain={{
        y: 100,
        //x: data.length > 0 ? data[0].x.getTime() + 60000 : 0,
      }}
      theme={VictoryTheme.material}
      //      containerComponent={<VictoryZoomContainer />}
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
        <VictoryBar
          barRatio={1}
          alignment="start"
          interpolation="natural"
          //animate={true}
          data={data}
          x="x"
          y="y"
        />
      )}
    </VictoryChart>
  );
};

export default CPUChartVictory;

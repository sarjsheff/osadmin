import React, { useState } from "react";
//import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveStream } from "@nivo/stream";

const CPUChartStream = ({ data }) => {
  console.log(data);

  const defs = [
    linearGradientDef("gradientA", [
      { offset: 0, color: "#000" },
      { offset: 100, color: "inherit" },
    ]),
  ];
  const fill = [{ match: "*", id: "gradientA" }];
  return (
    <ResponsiveStream
      data={data}
      keys={["y"]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      offsetType="silhouette"
      colors={{ scheme: "nivo" }}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#2c998f",
          size: 4,
          padding: 2,
          stagger: true,
        },
        {
          id: "squares",
          type: "patternSquares",
          background: "inherit",
          color: "#e4c912",
          size: 6,
          padding: 2,
          stagger: true,
        },
      ]}
      fill={[
        {
          match: {
            id: "all",
          },
          id: "dots",
        },
        {
          match: {
            id: "Marcel",
          },
          id: "squares",
        },
      ]}
      dotSize={8}
      dotColor={{ from: "color" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default CPUChartStream;

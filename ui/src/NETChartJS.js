import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";

export default function ({ data }) {
  const [chart, setChart] = useState(undefined);
  const canvas = useRef(null);

  useEffect(() => {
    if (chart) {
      chart.data.datasets[0].data = data.map((e) => {
        return { x: e.x, y: e.rx };
      });
      chart.data.datasets[1].data = data.map((e) => {
        return { x: e.x, y: e.tx };
      });
      chart.update();
    }
  }, [data]);

  useEffect(() => {
    if (canvas.current) {
      setChart(
        new Chart(canvas.current, {
          type: "line",
          data: {
            datasets: [
              {
                label: "rx",
                data: [],
                backgroundColor: "rgba(54, 162, 235,0.5 )",
                fill: false,
                lineTension: 0,
                //borderColor: "rgba(54, 162, 235, 0.8)",
                //borderWidth: 1,
              },
              {
                label: "tx",
                data: [],
                backgroundColor: "rgba(54, 0, 235,0.5 )",
                fill: false,
                lineTension: 0,
                //borderColor: "rgba(54, 0, 235, 0.8)",
                //borderWidth: 1,
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            animation: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 100,
                  },
                },
              ],
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "minute",
                  },
                },
              ],
            },
          },
        })
      );
    }
  }, [canvas]);
  return <canvas ref={canvas} width="400" height="100"></canvas>;
}

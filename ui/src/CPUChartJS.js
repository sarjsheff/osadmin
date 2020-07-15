import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";

export default function ({ data }) {
  const [chart, setChart] = useState(undefined);
  const canvas = useRef(null);

  useEffect(() => {
    if (chart) {
      chart.data.datasets[0].data = data;
      chart.update();
    }
  }, [data]);

  useEffect(() => {
    if (canvas.current) {
      setChart(
        new Chart(canvas.current, {
          type: "bar",
          data: {
            datasets: [
              {
                label: "CPU %",
                data: data,
                backgroundColor: "rgba(54, 162, 235,0.5 )",
                borderColor: "rgba(54, 162, 235, 0.8)",
                borderWidth: 1,
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

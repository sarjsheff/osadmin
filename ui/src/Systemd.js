import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  { label: "Name" },
  { label: "Description" },
  { label: "Load state" },
  { label: "Active state" },
  { label: "Sub state", options: { display: "false" } },
  { label: "Unit flow", options: { display: "false" } },
  { label: "Unit path", options: { display: "false" } },
  { label: "Job", options: { display: "false" } },
  { label: "Job type", options: { display: "false" } },
  { label: "Job path", options: { display: "false" } },
];

const options = {
  selectableRows: "none",
  onRowClick: (row) => {
    console.log(row);
  },
};

export default function ({ io }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (io) {
      io.emit("getsystemctl");
      io.on("systemctl", (dt) => {
        setData(dt);
      });

      return function () {
        io.off("systemctl");
      };
    }
  }, [io]);
  return (
    <MUIDataTable
      title={`Systemd services`}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import moment from "moment";

export default function ({ io }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    if (io) {
      io.on("log", (dt) => {
        console.log("data");
        if (dt.error) {
          setError(dt.error);
        } else {
          setData(dt);
        }
      });
    }
    return function () {
      io.off("log");
    };
  }, [io]);

  useEffect(() => {
    io.emit("getlog");
  }, []);
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  } else {
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row["__MONOTONIC_TIMESTAMP"]}>
                <TableCell>
                  {moment(row["__MONOTONIC_TIMESTAMP"]).toString()}
                </TableCell>
                <TableCell>{row.MESSAGE}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Box from "@material-ui/core/Box";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.light,
  },
}));

const pname = [
  "Emergency",
  "Alert",
  "Critical",
  "Error",
  "Warning",
  "Notice",
  "Info",
  "Debug",
];

function LogDialog({ data, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <Box p={2}>
        <Table size="small">
          <TableBody>
            {Object.keys(data).map((k) => {
              switch (k) {
                case "PRIORITY":
                  return (
                    <TableRow key={k}>
                      <TableCell>{k}</TableCell>
                      <TableCell>{pname[data[k]]}</TableCell>
                    </TableRow>
                  );
                default:
                  return (
                    <TableRow key={k}>
                      <TableCell>{k}</TableCell>
                      <TableCell>{data[k]}</TableCell>
                    </TableRow>
                  );
              }
            })}
          </TableBody>
        </Table>
      </Box>
    </Dialog>
  );
}

export default function ({ io }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const [dialogData, openDialog] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    if (io) {
      io.on("log", (dt) => {
        if (dt.error) {
          setError(dt.error);
        } else {
          setData(dt.reverse());
        }
        setTimeout(() => {
          io.emit("getlog");
        }, 5000);
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
      <>
        {dialogData && (
          <LogDialog data={dialogData} onClose={() => openDialog(undefined)} />
        )}
        <TableContainer>
          <Table aria-label="log table" size="small">
            <TableBody>
              {data.map((row) => (
                <TableRow
                  className={classes.error}
                  hover
                  key={row["__MONOTONIC_TIMESTAMP"]}
                  onClick={() => {
                    openDialog(row);
                  }}
                >
                  <TableCell>
                    {moment(
                      Number(row["__REALTIME_TIMESTAMP"]) / 1000
                    ).toString()}
                  </TableCell>
                  <TableCell>{row.MESSAGE}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";

import moment from "moment";
const pb = require("pretty-bytes");

function Info({ name, value }) {
  return (
    <TableRow key={name}>
      <TableCell>{name}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}

function SkeletonLine({ name }) {
  return (
    <TableRow key={name}>
      <TableCell width={"20%"}>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  );
}

function Summary({ io }) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    io.on("summary", (msg) => {
      setData(msg);
    });
    return function () {
      io.off("summary");
    };
  }, []);
  return (
    <Table>
      <TableBody>
        {data ? (
          <Info
            name="Hardware"
            value={`${data.system.manufacturer} ${data.system.model}`}
          />
        ) : (
          <SkeletonLine name="Hardware" />
        )}
        {data ? (
          <Info
            name="CPU"
            value={`${data.cpu.manufacturer} ${data.cpu.brand} ${data.cpu.physicalCores}x${data.cpu.speed}MHz`}
          />
        ) : (
          <SkeletonLine name="CPU" />
        )}
        {data ? (
          <Info
            name="Memory"
            value={`${pb(data.mem.total)}/${pb(data.mem.free)}`}
          />
        ) : (
          <SkeletonLine name="Memory" />
        )}
        {data ? (
          <Info name="Machine ID" value={`${data.system.uuid}`} />
        ) : (
          <SkeletonLine name="Machine ID" />
        )}
        {data ? (
          <Info
            name="OS"
            value={`${data.osInfo.distro} ${data.osInfo.release} ${data.osInfo.arch} kernel ${data.osInfo.kernel}`}
          />
        ) : (
          <SkeletonLine name="OS" />
        )}
        {data ? (
          <Info name="Hostname" value={`${data.osInfo.hostname}`} />
        ) : (
          <SkeletonLine name="Hostname" />
        )}
        {data ? (
          <Info name="System time" value={`${moment(data.time.current)}`} />
        ) : (
          <SkeletonLine name="System time" />
        )}
        {data ? (
          <Info
            name="Uptime"
            value={`${moment
              .duration(data.time.uptime, "seconds")
              .humanize(true)}`}
          />
        ) : (
          <SkeletonLine name="Uptime" />
        )}
      </TableBody>
    </Table>
  );
}

export default Summary;

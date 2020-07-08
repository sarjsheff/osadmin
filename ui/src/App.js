import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
import CPUChartAdapter from "./CPUChartAdapter";
import NETChartAdapter from "./NETChartAdapter";
import iocli from "socket.io-client";

function App() {
  const [io, setIo] = useState(undefined);

  useEffect(() => {
    setIo(iocli("http://localhost:3001"));
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} justify="center">
        <Grid item xs={6} md={6}>
          {io && <CPUChartAdapter io={io} />}
        </Grid>
        <Grid item xs={6} md={6}>
          {io && <NETChartAdapter io={io} />}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;

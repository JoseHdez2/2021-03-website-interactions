import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const calculateStats = (data) => {
  console.log("calculate");
  return {
    eventCount: data.length
  };
};

export const StatsDiv = (data) => {
  let [stats, setStats] = useState({});
  const handleButton = () => setStats(calculateStats(data));

  return (
    <Card>
      <h2>Stats</h2>
      <Button
        variant="success"
        onClick={handleButton}
        style={{ width: "10rem" }}
      >
        Calculate Stats
      </Button>
      {JSON.stringify(stats)}
    </Card>
  );
};

export const StatsButton = (data) => (
  <Button variant="success">Calculate Stats</Button>
);

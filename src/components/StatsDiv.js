import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { SaveJsonButton } from "./SaveJsonButton";
import { mean, sum } from "./FunctionalUtils";

const calculateStats = (data) => {
  console.log("calculate");
  const delays = data
    .map((item) => item.time)
    .sort((a, b) => a - b)
    .map((item, ind, ary) => (ind === 0 ? null : item - ary[ind - 1]));
  console.log(delays.sort((a, b) => a - b));
  console.log(delays.filter((item, i) => i !== 0));
  return {
    eventCount: {
      total: data.length,
      byType: data.reduce((acc, item) => {
        const type = item.event.type;
        if (type in acc) {
          acc[type] += 1;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {})
    },
    totalTime: millisToSeconds(sum(delays)),
    delayBetweenEvents: {
      min: millisToSeconds(Math.min(...delays.filter((item, i) => i !== 0))),
      max: millisToSeconds(Math.max(...delays)),
      mean: millisToSeconds(mean(delays))
    }
  };
};

const millisToSeconds = (millis) => `${(millis / 1000).toFixed(2)} seconds`;

const StatRow = ({ first, second }) => (
  <ListGroup.Item style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
    <span>
      <strong>{first}</strong>
    </span>
    <span>{second}</span>
  </ListGroup.Item>
);

export const StatsDiv = (data) => {
  let [stats, setStats] = useState(null);
  const handleButton = () => setStats(calculateStats(data.data));

  return (
    <Card
      style={{
        width: "95%",
        margin: "1rem auto"
      }}
    >
      <h2>Interaction statistics</h2>
      <Button
        variant="success"
        onClick={handleButton}
        style={{ margin: "1rem auto" }}
      >
        Calculate Stats
      </Button>
      <div style={{ display: "grid" }}>
        <StatRow
          first="Total event count:"
          second={stats?.eventCount?.total || "?"}
        />
        <StatRow
          first="Event count by type:"
          second={entriesToRows(stats?.eventCount?.byType)}
        />
        <StatRow first="Total time:" second={stats?.totalTime || "?"} />
        <StatRow
          first="Delay between events:"
          second={entriesToRows(stats?.delayBetweenEvents)}
        />
      </div>
      {stats ? (
        <SaveJsonButton json={stats} filename="stats" variant="success" />
      ) : (
        <span />
      )}
      {/* {JSON.stringify(stats)} */}
    </Card>
  );
};

const entriesToRows = (obj) =>
  Object.entries(obj || {}).map((item) => (
    <ListGroup.Item>
      {item[0]}: <strong>{item[1]}</strong>
    </ListGroup.Item>
  ));

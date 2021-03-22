import {
  Badge,
  Button,
  Tooltip,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import { format } from "date-fns";

export const Record = ({ record, onDelete }) => (
  <span
    key={record.time}
    style={{
      display: "grid",
      gridTemplateColumns: "3rem 5rem 6rem auto 3rem",
      columnGap: "2px"
    }}
  >
    <Badge>☰ {record.id}</Badge>
    <RecordDate date={new Date(record.time)} />
    <strong>{record.event.type}</strong>
    <RecordSetup setup={record.setup} />
    <Button
      variant="danger"
      size="sm"
      style={{ height: "1.5rem", width: "1.5rem", fontSize: "0.6em" }}
      onClick={() => onDelete(record.id)}
    >
      x
    </Button>
  </span>
);

export const RecordDate = ({ date }) => (
  <span>
    <OverlayTrigger
      key={`${date.getTime()}-overlay`}
      overlay={
        <Tooltip id={`tooltip`}>{format(date, "y-MM-dd H:mm:ss.SS")}</Tooltip>
      }
    >
      <Badge variant="primary">{format(date, "H:mm:ss.SS")}</Badge>
    </OverlayTrigger>
  </span>
);

export const RecordSetup = ({ setup }) => {
  const target = setup.url || setup.value || setup.altSelector;
  const targetShort = target; // limitStr(target, 28);
  if (target.length)
    return (
      <OverlayTrigger
        // key={`${record.time}-overlay`}
        placement="left"
        overlay={<Popover id={`tooltip`}>{target}</Popover>}
      >
        <Badge
          variant={setup.value ? "success" : "secondary"}
          style={{ overflow: "hidden" }}
        >
          {targetShort}
        </Badge>
      </OverlayTrigger>
    );
};

const limitStr = (str, length) =>
  str.length <= length
    ? str
    : `${str.substr(0, length / 2 - 1)}..${str.substr(-length / 2 + 1)}`;

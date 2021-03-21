import {
  Badge,
  Button,
  Tooltip,
  OverlayTrigger,
  ListGroup
} from "react-bootstrap";

export const RecordList = ({ data }) => (
  <ListGroup>
    {data?.records?.map((r) => (
      <Record record={r} />
    ))}
  </ListGroup>
);

export const Record = ({ record, onDelete }) => (
  <span key={record.time}>
    <Badge variant="secondary">{record.id || ""}</Badge>
    <RecordDate date={new Date(record.time)} />{" "}
    <Badge variant="primary">{record.event.type}</Badge>
    <OverlayTrigger
      key={`${record.time}-overlay`}
      overlay={<Tooltip id={`tooltip`}>{JSON.stringify(record)}</Tooltip>}
    >
      <span>...</span>
    </OverlayTrigger>
    <Button variant="danger" onClick={() => onDelete(record.id)}>
      x
    </Button>
  </span>
);

export const RecordDate = ({ date }) => (
  <span>
    <OverlayTrigger
      key={`${date.toLocaleTimeString()}-overlay`}
      overlay={<Tooltip id={`tooltip`}>{date.toISOString()}</Tooltip>}
    >
      <small>{date.toLocaleTimeString()}</small>
    </OverlayTrigger>
  </span>
);

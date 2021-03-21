import { Button } from "react-bootstrap";

export const SaveJsonButton = ({ json }) => (
  <Button
    download="output.json"
    href={URL.createObjectURL(
      new Blob([JSON.stringify(json)], { type: "application/json" })
    )}
  >
    Download as JSON
  </Button>
);

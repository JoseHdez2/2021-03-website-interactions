import { Button } from "react-bootstrap";
import { format } from "date-fns";

export const SaveJsonButton = ({ json, filename, variant }) => (
  <Button
    download={`${format(new Date(), "y-MM-dd_H-mm-ss")}_${filename}.json`}
    style={{ margin: "1rem auto" }}
    variant={variant || "primary"}
    href={URL.createObjectURL(
      new Blob([JSON.stringify(json)], { type: "application/json" })
    )}
  >
    Download as JSON
  </Button>
);

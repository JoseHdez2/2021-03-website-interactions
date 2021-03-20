import { useState, useEffect, useRef, useCallback } from "react";

const dataUrl = "https://api.jsonbin.io/b/605512787ffeba41c07e34c2";

const loadData = (url) =>
  fetch("https://api.jsonbin.io/b/605512787ffeba41c07e34c2").then((response) =>
    response.json()
  );

export const RecordList = () => {
  const [req, setReq] = useState(loadData(dataUrl));

  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadDataAsync() {
      try {
        let data = await loadData();
        console.log(data);
        setData(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }

    loadDataAsync();
  }, []);

  return (
    <div>
      {
        <ul>
          {data?.records?.map((r) => (
            <Record record={r} />
          ))}
        </ul>
      }
    </div>
  );
};

export const Record = ({ record }) => <li>{JSON.stringify(record)}</li>;

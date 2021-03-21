import "./styles.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Record, RecordList } from "./components/Record";
import { DNDList } from "./components/DNDList.js";
import { SaveJsonButton } from "./components/SaveJsonButton";
import { StatsDiv } from "./components/StatsDiv";

const loadData = (url) =>
  fetch("https://api.jsonbin.io/b/605512787ffeba41c07e34c2").then((response) =>
    response.json()
  );

export default function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        let data = await loadData();
        // console.log(data);
        setData(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    setItems(
      data?.records.map(
        (item, ind) => new Object({ ...item, id: ind.toString() })
      )
    );
    console.log(items);
  }, [data]);

  const myMapFn = (item) => <Record record={item} />;

  return (
    <div className="App">
      <h2>Website Interactions</h2>
      <DNDList items={items || []} setItems={setItems} mapFunction={myMapFn} />
      <StatsDiv />
      <SaveJsonButton json={items} />
    </div>
  );
}

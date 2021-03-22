import "./styles.css";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Record } from "./components/Record";
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

  useEffect(() => {
    setItems(
      data?.records.map(
        (item, ind) => new Object({ ...item, id: ind.toString() })
      )
    );
  }, [data]);

  const deleteItem = (id) => {
    console.log(`Deleting id ${id}.`);
    setItems(items.filter((item) => item.id !== id));
  };

  const myMapFn = (item) => <Record record={item} onDelete={deleteItem} />;

  return (
    <div className="App" style={{ margin: "1rem auto" }}>
      <h2>Website Interactions</h2>
      <Card
        style={{
          overflowY: "scroll",
          height: "30rem",
          width: "80%",
          margin: "auto"
        }}
      >
        <DNDList
          items={items || []}
          setItems={setItems}
          mapFunction={myMapFn}
        />
      </Card>
      <SaveJsonButton json={items} filename="interactions" />
      <StatsDiv data={items} />
    </div>
  );
}

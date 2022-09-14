import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [body, setBody] = useState("");
  const [engine, setEngine] = useState("");
  const [tracking, setTracking] = useState(0);

  const [newColor, setNewColor] = useState("");

  const [vehicleList, setVehicleList] = useState([]);

  const addVehicle = () => {
    Axios.post("http://localhost:3001/create", {
      color: color,
      model: model,
      body: body,
      engine: engine,
      tracking: tracking,
    }).then(() => {
      setVehicleList([
        ...vehicleList,
        {
          color: color,
          model: model,
          body: body,
          engine: engine,
          tracking: tracking,
        },
      ]);
    });
  };

  const getVehicle = () => {
    Axios.get("http://localhost:3001/vehicles").then((response) => {
      setVehicleList(response.data);
    });
  };

  const updateVehicle = (id) => {
    Axios.put("http://localhost:3001/update", { color: newColor, id: id }).then(
      (response) => {
        setVehicleList(
          vehicleList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  color: newColor,
                  model: val.model,
                  body: val.body,
                  engine: val.engine,
                  tracking: val.tracking,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteVehicle = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setVehicleList(
        vehicleList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Color:</label>
        <input
          type="text"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <label>Model:</label>
        <input
          type="text"
          onChange={(event) => {
            setModel(event.target.value);
          }}
        />
        <label>Body:</label>
        <input
          type="text"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <label>Engine:</label>
        <input
          type="text"
          onChange={(event) => {
            setEngine(event.target.value);
          }}
        />
        <label>Tracking Number</label>
        <input
          type="number"
          onChange={(event) => {
            setTracking(event.target.value);
          }}
        />
        <button onClick={addVehicle}>Add Vehicle</button>
      </div>
      <div className="vehicles">
        <button onClick={getVehicle}>Show Vehicles</button>

        {vehicleList.map((val, key) => {
          return (
            <div className="vehicle">
              <div>
                <h3>Color: {val.color}</h3>
                <h3>Model: {val.model}</h3>
                <h3>Body: {val.body}</h3>
                <h3>Engine: {val.engine}</h3>
                <h3>Tracking Number: {val.tracking}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="..."
                  onChange={(event) => {
                    setNewColor(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateVehicle(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteVehicle(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

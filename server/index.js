const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "ats",
  host: "localhost",
  port: 3309,
  password: "Ats112233",
  database: "ats",
});

app.post("/create", (req, res) => {
  const color = req.body.color;
  const model = req.body.model;
  const body = req.body.body;
  const engine = req.body.engine;
  const tracking = req.body.tracking;

  db.query(
    "INSERT INTO vehicles (color, model, body, engine, tracking) VALUES (?,?,?,?,?)",
    [color, model, body, engine, tracking],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/vehicles", (req, res) => {
  db.query("SELECT * FROM vehicles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const color = req.body.color;
  db.query(
    "UPDATE vehicles SET color = ? WHERE id = ?",
    [color, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM vehicles WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const API_KEY = "5545";
const app = express();
const puerto = 5000;

app.use(cors());

let data = [];


app.use(bodyParser.json());


const authenticate = (req, res, next) => {
  const apiKey = req.headers.authorization;

  if (apiKey && apiKey === `Bearer ${API_KEY}`) {
    next();
  } else {
    res.sendStatus(401); 
  }
};

app.get("/endpoint", authenticate, (req, res) => {
  res.json(data);
});

app.post("/endpoint", authenticate, (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json(newData);
  data = []
});

app.put("/endpoint/:id", authenticate, (req, res) => {
  const {id} = req.params;
  const updatedData = req.body;

  data = data.map((item) => {item.id === id ? updatedData : item})

  res.json(updatedData);
  data = []
});

app.delete("/endpoint/:id", authenticate, (req, res) => {
  const {id} = req.params.id;

  data = data.filter((item) => item.id !== id)

  res.sendStatus(204);
});

app.listen(puerto, () => {
  console.log("Servidor iniciado en el puerto 5000");
});

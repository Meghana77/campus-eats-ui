const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
const restaurants = [
  {
    id: 1,
    name: "Campus Cafe",
    cuisine: "South Indian",
  },
  {
    id: 2,
    name: "Food Corner",
    cuisine: "Chinese",
  },
  {
    id: 3,
    name: "Spice Hub",
    cuisine: "North Indian",
  },
];

app.use(
  cors({
    origin: "http://localhost:1234",
  }),
);

app.get("/", (req, res) => {
  res.send("CampusEats backend is running");
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

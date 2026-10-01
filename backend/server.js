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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusEats backend is running");
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/api/restaurants/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);

  if (!restaurant) {
    return res.status(404).json({
      message: "Restaurant data not found.",
    });
  }

  res.json(restaurant);
});

app.post("/api/orders", (req, res) => {
  const orderDetails = req.body;

  if (!orderDetails.customerName) {
    return res.status(400).json({
      message: "CustomerName is needed.",
    });
  }

  res.status(201).json({
    message: "Order is created successfully",
    order: orderDetails,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

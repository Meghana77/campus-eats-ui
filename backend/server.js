const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Restaurant = require("./models/Restaurant");

const app = express();
const PORT = process.env.PORT;
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("Mongo connection error:", error);
  });

app.use(
  cors({
    origin: "http://localhost:1234",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusEats backend is running");
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get restaurants.",
    });
  }
});

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({
      message: "Failed to get restaurant",
    });
  }
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

app.post("/api/restaurants", async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (e) {
    res.status(500).json({
      message: "Failed to create restaurant.",
    });
  }
});

app.put("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({
      message: "Failed to create restaurant.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

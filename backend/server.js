const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Restaurant = require("./models/Restaurant");
const Order = require("./models/Order");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:1234",
  }),
);

app.use(express.json());

// Check whether an ID is a valid MongoDB ObjectId.
function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

app.get("/", (req, res) => {
  res.send("CampusEats backend is running");
});

// GET all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurants",
    });
  }
});

// GET a restaurant by ID
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurant",
    });
  }
});

// CREATE a restaurant
app.post("/api/restaurants", async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
});

// UPDATE a restaurant
app.put("/api/restaurants/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update restaurant",
      error: error.message,
    });
  }
});

// DELETE a restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }

    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete restaurant",
    });
  }
});

// CREATE an order and save it in MongoDB
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (typeof customerName !== "string" || customerName.trim().length < 2) {
      return res.status(400).json({
        message: "Please provide a valid customer name",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Your order must contain at least one item",
      });
    }

    for (const item of items) {
      if (
        typeof item.name !== "string" ||
        !item.name.trim() ||
        typeof item.price !== "number" ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "One or more order items are invalid",
        });
      }
    }

    // Calculate the total on the server, not from the
    // total supplied by the browser.
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      customerName: customerName.trim(),
      items: items.map((item) => ({
        name: item.name.trim(),
        image: item.image || "",
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// GET an order by its ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});

// GET all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  }
}

startServer();

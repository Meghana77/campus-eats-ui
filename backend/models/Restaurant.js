const mongoose = require("mongoose");

//create a schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    image: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    menu: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        image: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

//Create a model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

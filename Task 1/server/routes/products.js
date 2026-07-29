const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "Laptop",
        price: 999,
        description: "Gaming Laptop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJGUZbgTYneufaIDtHdVbQ6p8OQmzPIItWL0RMNGJY6A&s=10"
      },
      {
        name: "Mouse",
        price: 25,
        description: "Wireless Mouse",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfbiVRSdaOTFiNlHnDYRUJkLp0iVtigTSOivefZW7IiQ&s=10"
      },
      {
        name: "Keyboard",
        price: 45,
        description: "Mechanical Keyboard",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRszr0KNsLfkfXMrB5ZOkEyTjvNY11Fa0Ek2yXBaWEiIQ&s=10"
      }
    ]);

    res.json({ message: "Products added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
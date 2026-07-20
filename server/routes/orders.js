const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place Order
router.post("/", async (req, res) => {
    try {

        const { user, products, total } = req.body;

        const order = new Order({
            user,
            products,
            total
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully!"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
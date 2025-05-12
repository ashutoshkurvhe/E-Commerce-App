const express = require("express");
const Order = require("../Models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/orders
//@desc Get all order (Admin only)
//@access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

//@route POST /api/admin/users
//@desc Add a new user (admin only)
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
    
});

//@route PUT /api/admin/orders/:id
//@desc Update order status
//@access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status || order.status;
            req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status = "Delivered" ? Date.now() : order.deliveredAt; 


            const updatedOrder = await order.save();
            res.json( updatedOrder );
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


//@route DELETE /api/admin/orders/:id
//@desc Delete a order 
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});



module.exports = router;
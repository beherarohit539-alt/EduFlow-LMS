const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/order.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get("/get-orders", isAuthenticated, authorizeRoles("admin"), getAllOrders);

module.exports = orderRouter;

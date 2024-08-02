import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/order.js";

const routerOrder = Router()

routerOrder.post("/", createOrder);
routerOrder.get("/", getAllOrders);
routerOrder.get("/:id", getOrderById);
routerOrder.patch("/:id", updateOrder);
routerOrder.delete("/:id", deleteOrder);

export default routerOrder
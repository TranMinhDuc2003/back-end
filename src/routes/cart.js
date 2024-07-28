import { Router } from "express";
import { createCart, deleteCart, deleteProductCart, getAllCart, getCartDetail } from "../controllers/cart.js";

const routerCart = Router()

routerCart.get("/",getAllCart)
routerCart.get("/:id",getCartDetail)
routerCart.get("/:user/:id",getCartDetail)
routerCart.post("/",createCart)
routerCart.delete("/user/:userId/product/:id",deleteProductCart)
routerCart.delete("/:id",deleteCart)

export default routerCart
import { Router } from "express";
import routerProduct from "./products.js";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerCart from "./cart.js";
import routerOrder from "./order.js";

const router = Router();

// Thêm các route vào đây
router.use('/products', routerProduct)
router.use('/users', routerAuth)
router.use('/categories', routerCategory)
router.use('/cart', routerCart)
router.use('/order', routerOrder)

export default router;

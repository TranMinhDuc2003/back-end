import { Router } from "express";
import routerProduct from "./products.js";
import routerAuth from "./auth.js";

const router = Router();

// Thêm các route vào đây
router.use('/products', routerProduct)
router.use('/users', routerAuth)

export default router;

import { Router } from "express";
import routerProduct from "./products";
import routerAuth from "./auth";

const router = Router();

// Thêm các route vào đây
router.use('/products', routerProduct)
router.use('/users', routerAuth)

export default router;
